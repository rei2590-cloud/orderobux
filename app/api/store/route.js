import { NextResponse } from "next/server";
import { getDb } from "../../../lib/rr-server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { data } = await getDb()
      .from("store_settings")
      .select("is_open, closed_message")
      .eq("id", 1)
      .maybeSingle();
    return NextResponse.json(
      {
        is_open: data?.is_open ?? true,
        closed_message: data?.closed_message ?? "",
      },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch {
    return NextResponse.json({ is_open: true, closed_message: "" });
  }
}
