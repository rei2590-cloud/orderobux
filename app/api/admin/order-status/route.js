import { NextResponse } from "next/server";
import { getDb, isAdmin } from "../../../../lib/rr-server";

export const dynamic = "force-dynamic";

export async function POST(request) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "Tidak diizinkan." }, { status: 401 });
  }
  try {
    const { id, status } = await request.json();
    if (!id || !["pending", "processing"].includes(status)) {
      return NextResponse.json({ error: "Data tidak valid." }, { status: 400 });
    }
    const { data, error } = await getDb()
      .from("robux_orders")
      .update({ status })
      .eq("id", id)
      .in("status", ["pending", "processing"])
      .select("id");
    if (error) throw error;
    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: "Pesanan tidak ditemukan atau sudah selesai." },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Order status update error:", error);
    return NextResponse.json(
      { error: "Gagal mengubah status pesanan." },
      { status: 500 }
    );
  }
}
