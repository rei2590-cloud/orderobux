import { NextResponse } from "next/server";
import { getDb } from "../../../lib/rr-server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { data, error } = await getDb()
      .from("testimonials")
      .select("id, name, message, rating, created_at")
      .eq("is_approved", true)
      .order("created_at", { ascending: false })
      .limit(30);
    if (error) throw error;
    return NextResponse.json(
      { testimonials: data || [] },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    console.error("Testimonials load error:", error);
    return NextResponse.json({ testimonials: [] });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    // Honeypot anti-bot: kolom ini harus kosong
    if (body.website) return NextResponse.json({ success: true });

    const name = String(body.name ?? "").trim();
    const message = String(body.message ?? "").trim();
    const rating = Number(body.rating ?? 5);

    if (name.length < 2 || name.length > 40) {
      return NextResponse.json(
        { error: "Nama harus 2-40 karakter." },
        { status: 400 }
      );
    }
    if (message.length < 10 || message.length > 300) {
      return NextResponse.json(
        { error: "Testimoni harus 10-300 karakter." },
        { status: 400 }
      );
    }
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Rating tidak valid." }, { status: 400 });
    }

    const { error } = await getDb()
      .from("testimonials")
      .insert({ name, message, rating, is_approved: false });
    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Testimonial submit error:", error);
    return NextResponse.json(
      { error: "Gagal mengirim testimoni. Coba lagi nanti." },
      { status: 500 }
    );
  }
}
