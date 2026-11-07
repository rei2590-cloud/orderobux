import { NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const body = await request.json();
    const actual = Buffer.from(String(body?.password ?? ""));
    const expected = Buffer.from(process.env.ADMIN_PASSWORD ?? "");

    if (!expected.length) {
      return NextResponse.json(
        { error: "ADMIN_PASSWORD belum diatur di Vercel Production." },
        { status: 500 }
      );
    }

    if (
      actual.length !== expected.length ||
      !timingSafeEqual(actual, expected)
    ) {
      return NextResponse.json(
        { error: "Password admin salah." },
        { status: 401 }
      );
    }

    if (!process.env.ADMIN_SESSION_SECRET) {
      return NextResponse.json(
        { error: "ADMIN_SESSION_SECRET belum diatur di Vercel Production." },
        { status: 500 }
      );
    }

    const token = createHmac("sha256", process.env.ADMIN_SESSION_SECRET)
      .update("rei-robux-admin-session")
      .digest("hex");

    const response = NextResponse.json({ success: true });
    response.cookies.set("rei_admin", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8,
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "Permintaan login tidak valid. Muat ulang halaman dan coba lagi." },
      { status: 400 }
    );
  }
}
