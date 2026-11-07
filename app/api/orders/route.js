
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(request) {
  try {
    const body = await request.json();
    const amount = Number(body.robux_amount);
    const username = String(body.username || "").trim();
    const displayName = String(body.display_name || "").trim();

    if (
      !Number.isInteger(amount) ||
      amount < 1 ||
      amount > 100000 ||
      !username ||
      username.length > 50 ||
      displayName.length > 50
    ) {
      return NextResponse.json(
        { error: "Data pesanan tidak valid" },
        { status: 400 }
      );
    }

    const { data: stock, error: stockError } = await supabaseAdmin
      .from("robux_stock")
      .select("available_stock")
      .eq("id", 1)
      .single();

    if (stockError) {
      return NextResponse.json(
        { error: "Stok belum dapat diperiksa" },
        { status: 500 }
      );
    }

    if (amount > stock.available_stock) {
      return NextResponse.json(
        { error: "Jumlah Robux melebihi stok tersedia" },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("robux_orders")
      .insert({
        robux_amount: amount,
        username,
        display_name: displayName || null,
      })
      .select("*")
      .single();

    if (error) {
      return NextResponse.json(
        { error: "Gagal membuat pesanan" },
        { status: 500 }
      );
    }

    return NextResponse.json({ order: data }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Permintaan tidak valid" },
      { status: 400 }
    );
  }
}
