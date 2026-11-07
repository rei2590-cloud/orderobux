
import { NextResponse } from "next/server";
import isAdmin from "@/lib/adminAuth";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json(
        { error: "Tidak diizinkan. Silakan login kembali." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { id, status } = body;

    if (!id || !["pending", "processing"].includes(status)) {
      return NextResponse.json(
        { error: "ID pesanan atau status tidak valid." },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from("robux_orders")
      .update({ status })
      .eq("id", id)
      .select("id, status")
      .single();

    if (error) {
      console.error("[order-status]", error);
      return NextResponse.json(
        { error: error.message || "Gagal mengubah status pesanan." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      order: data
    });
  } catch (error) {
    console.error("[order-status]", error);

    return NextResponse.json(
      { error: "Terjadi kesalahan server." },
      { status: 500 }
    );
  }
}
