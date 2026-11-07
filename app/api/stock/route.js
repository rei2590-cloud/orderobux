import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("robux_stock")
    .select("available_stock, updated_at")
    .eq("id", 1)
    .single();

  if (error) {
    return NextResponse.json(
      { error: "Gagal mengambil stok" },
      { status: 500 }
    );
  }

  return NextResponse.json(data, {
    headers: { "Cache-Control": "no-store" },
  });
}
