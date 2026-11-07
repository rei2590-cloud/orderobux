import { NextResponse } from "next/server";
import { getDb } from "../../../lib/rr-server";

export const dynamic = "force-dynamic";

const SHORT = /^[0-9a-f]{8}$/;
const FULL = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

export async function GET(request) {
  try {
    const raw = new URL(request.url).searchParams.get("code") || "";
    const code = raw.trim().toLowerCase().replace(/^#/, "");

    if (!SHORT.test(code) && !FULL.test(code)) {
      return NextResponse.json(
        { error: "Kode order tidak valid. Masukkan 8 karakter kode order kamu." },
        { status: 400 }
      );
    }

    let query = getDb()
      .from("robux_orders")
      .select("id, username, robux_amount, status, created_at")
      .limit(2);

    if (SHORT.test(code)) {
      query = query
        .gte("id", `${code}-0000-0000-0000-000000000000`)
        .lte("id", `${code}-ffff-ffff-ffff-ffffffffffff`);
    } else {
      query = query.eq("id", code);
    }

    const { data, error } = await query;
    if (error) throw error;

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: "Pesanan tidak ditemukan. Cek lagi kode order kamu." },
        { status: 404 }
      );
    }
    if (data.length > 1) {
      return NextResponse.json(
        { error: "Kode kurang spesifik. Hubungi admin untuk bantuan." },
        { status: 400 }
      );
    }

    const o = data[0];
    const name = String(o.username || "");
    return NextResponse.json({
      code: o.id.slice(0, 8),
      username: name.slice(0, 2) + "***",
      robux_amount: o.robux_amount,
      status: o.status,
      created_at: o.created_at,
    });
  } catch (error) {
    console.error("Order status error:", error);
    return NextResponse.json(
      { error: "Gagal mengecek pesanan. Coba lagi nanti." },
      { status: 500 }
    );
  }
}
