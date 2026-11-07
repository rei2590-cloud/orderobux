
import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/adminAuth";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function PATCH(request) {
  if (!(await isAdmin())) {
    return NextResponse.json(
      { error: "Tidak diizinkan" },
      { status: 401 }
    );
  }

  const body = await request.json();
  const amount = Number(body.available_stock);

  if (
    !Number.isInteger(amount) ||
    amount < 0 ||
    amount > 10000000
  ) {
    return NextResponse.json(
      { error: "Jumlah stok tidak valid" },
      { status: 400 }
    );
  }

  const { data, error } = await supabaseAdmin
    .from("robux_stock")
    .update({
      initial_stock: amount,
      available_stock: amount,
      updated_at: new Date().toISOString(),
    })
    .eq("id", 1)
    .select("initial_stock, available_stock")
    .single();

  if (error) {
    return NextResponse.json(
      { error: "Gagal memperbarui stok" },
      { status: 500 }
    );
  }

  return NextResponse.json({ stock: data });
}
