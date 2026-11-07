import { NextResponse } from "next/server";
import isAdmin from "@/lib/adminAuth";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(request, { params }) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Tidak diizinkan" }, { status: 401 });
  }

  const { id } = await params;

  const { data, error } = await supabaseAdmin.rpc(
    "complete_robux_order",
    { p_order_id: id }
  );

  if (error) {
    return NextResponse.json(
      { error: error.message || "Pesanan gagal diselesaikan" },
      { status: 400 }
    );
  }

  return NextResponse.json({ success: true, remaining_stock: data });
}
