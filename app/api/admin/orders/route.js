import { NextResponse } from "next/server";
import isAdmin from "@/lib/adminAuth";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Sesi admin berakhir. Silakan login kembali." }, { status: 401 });
  }

  const { data, error } = await supabaseAdmin
    .from("robux_orders")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    console.error("[admin/orders] Supabase error:", error.code, error.message);
    if (error.code === "42P01" || error.code === "PGRST205") {
      return NextResponse.json({
        error: "Tabel pesanan belum tersedia. Jalankan seluruh SQL dari file supabase/schema.sql di Supabase SQL Editor."
      }, { status: 500 });
    }
    return NextResponse.json({
      error: "Database pesanan bermasalah. Kode: " + (error.code || "unknown") + ". " + error.message
    }, { status: 500 });
  }

  return NextResponse.json(
    { orders: data || [] },
    { headers: { "Cache-Control": "no-store" } }
  );
}
