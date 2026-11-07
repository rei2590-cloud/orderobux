import { NextResponse } from "next/server";
import { getDb, isAdmin } from "../../../../lib/rr-server";

export const dynamic = "force-dynamic";

function deny() {
  return NextResponse.json({ error: "Tidak diizinkan." }, { status: 401 });
}

export async function GET(request) {
  if (!isAdmin(request)) return deny();
  try {
    const { data, error } = await getDb()
      .from("testimonials")
      .select("id, name, message, rating, is_approved, created_at")
      .order("created_at", { ascending: false })
      .limit(100);
    if (error) throw error;
    return NextResponse.json({ testimonials: data || [] });
  } catch (error) {
    console.error("Admin testimonials error:", error);
    return NextResponse.json(
      { error: "Gagal memuat testimoni." },
      { status: 500 }
    );
  }
}

export async function PATCH(request) {
  if (!isAdmin(request)) return deny();
  try {
    const { id, is_approved } = await request.json();
    if (!id || typeof is_approved !== "boolean") {
      return NextResponse.json({ error: "Data tidak valid." }, { status: 400 });
    }
    const { error } = await getDb()
      .from("testimonials")
      .update({ is_approved })
      .eq("id", id);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Testimonial update error:", error);
    return NextResponse.json({ error: "Gagal memperbarui." }, { status: 500 });
  }
}

export async function DELETE(request) {
  if (!isAdmin(request)) return deny();
  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: "Data tidak valid." }, { status: 400 });
    }
    const { error } = await getDb().from("testimonials").delete().eq("id", id);
    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Testimonial delete error:", error);
    return NextResponse.json({ error: "Gagal menghapus." }, { status: 500 });
  }
}
