import { NextResponse } from "next/server";
import { getDb, isAdmin } from "../../../../lib/rr-server";

export const dynamic = "force-dynamic";

export async function PATCH(request) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: "Tidak diizinkan." }, { status: 401 });
  }
  try {
    const body = await request.json();
    const update = { updated_at: new Date().toISOString() };
    if (typeof body.is_open === "boolean") update.is_open = body.is_open;
    if (typeof body.closed_message === "string") {
      update.closed_message = body.closed_message.trim().slice(0, 200);
    }
    const { error } = await getDb()
      .from("store_settings")
      .update(update)
      .eq("id", 1);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Store update error:", error);
    return NextResponse.json(
      { error: "Gagal menyimpan pengaturan toko." },
      { status: 500 }
    );
  }
}
