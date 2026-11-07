import { NextResponse } from "next/server";
import isAdmin from "@/lib/adminAuth";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Tidak diizinkan" }, { status: 401 });
  }

  const [{ data: stock, error: stockError }, { data: completed, error: ordersError }] =
    await Promise.all([
      supabaseAdmin.from("robux_stock")
        .select("initial_stock, available_stock, updated_at")
        .eq("id", 1).single(),
      supabaseAdmin.from("robux_orders")
        .select("robux_amount")
        .eq("status", "completed"),
    ]);

  if (stockError || ordersError) {
    return NextResponse.json({ error: "Gagal mengambil laporan stok" }, { status: 500 });
  }

  const sold_stock = (completed || []).reduce(
    (total, order) => total + Number(order.robux_amount || 0), 0
  );

  return NextResponse.json({
    ...stock,
    sold_stock,
    total_stock: Number(stock.available_stock || 0) + sold_stock,
  }, { headers: { "Cache-Control": "no-store" } });
}

export async function PATCH(request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Tidak diizinkan" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const amount = Number(body.available_stock);

    if (!Number.isSafeInteger(amount) || amount < 0 || amount > 10000000) {
      return NextResponse.json({ error: "Jumlah stok tidak valid" }, { status: 400 });
    }

    const { data: completed, error: ordersError } = await supabaseAdmin
      .from("robux_orders")
      .select("robux_amount")
      .eq("status", "completed");

    if (ordersError) {
      return NextResponse.json({ error: "Gagal menghitung penjualan" }, { status: 500 });
    }

    const sold = (completed || []).reduce(
      (total, order) => total + Number(order.robux_amount || 0), 0
    );

    const { data, error } = await supabaseAdmin
      .from("robux_stock")
      .update({
        initial_stock: amount + sold,
        available_stock: amount,
        updated_at: new Date().toISOString(),
      })
      .eq("id", 1)
      .select("initial_stock, available_stock, updated_at")
      .single();

    if (error) {
      return NextResponse.json({ error: "Gagal memperbarui stok. Pastikan baris stok id=1 sudah tersedia." }, { status: 500 });
    }

    return NextResponse.json({
      ...data,
      sold_stock: sold,
      total_stock: amount + sold,
    });
  } catch {
    return NextResponse.json({ error: "Permintaan tidak valid" }, { status: 400 });
  }
}
