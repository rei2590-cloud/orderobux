import { NextResponse } from "next/server";
import isAdmin from "@/lib/adminAuth";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Tidak diizinkan" }, { status: 401 });
  }

  const { data, error } = await supabaseAdmin
    .from("robux_orders")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    return NextResponse.json({ error: "Gagal mengambil pesanan" }, { status: 500 });
  }

  return NextResponse.json(
    { orders: data },
    { headers: { "Cache-Control": "no-store" } }
  );
}
