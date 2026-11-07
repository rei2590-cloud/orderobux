import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

export async function GET() {
  // Return a useful, non-secret diagnostic instead of masking every database
  // failure as "stock unavailable". Never include the URL or API key.
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error("[public/stock] Missing Supabase environment variables", {
      hasUrl: Boolean(process.env.SUPABASE_URL),
      hasServiceRoleKey: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    });
    return NextResponse.json(
      { error: "Konfigurasi Supabase di Netlify belum lengkap. Periksa SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY, lalu deploy ulang." },
      { status: 503 }
    );
  }

  try {
    const { data, error } = await supabaseAdmin
      .from("robux_stock")
      .select("available_stock, updated_at")
      .eq("id", 1)
      .maybeSingle();

    if (error) {
      console.error("[public/stock] Supabase query failed:", error.code, error.message);

      const missingTable = error.code === "42P01" || error.code === "PGRST205";
      const message = missingTable
        ? "Tabel robux_stock belum ditemukan. Pastikan supabase/schema.sql dijalankan pada project Supabase yang sama dengan SUPABASE_URL di Netlify."
        : "Supabase menolak atau gagal memproses permintaan stok. Periksa URL dan service-role key Netlify. Detail: " + (error.message || "tidak tersedia");

      return NextResponse.json(
        { error: message, code: error.code || "SUPABASE_REQUEST_FAILED" },
        { status: 503 }
      );
    }

    if (!data) {
      console.error("[public/stock] No singleton stock row found (id=1)");
      return NextResponse.json(
        { error: "Tabel robux_stock ada, tetapi baris stok id=1 belum ada. Jalankan kembali bagian INSERT stok awal dari supabase/schema.sql.", code: "STOCK_ROW_MISSING" },
        { status: 503 }
      );
    }

    return NextResponse.json(data, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    console.error("[public/stock] Unexpected server error:", error);
    return NextResponse.json(
      { error: "Fungsi stok di Netlify mengalami kesalahan server. Periksa Netlify Function logs.", code: "STOCK_FUNCTION_ERROR" },
      { status: 500 }
    );
  }
}
