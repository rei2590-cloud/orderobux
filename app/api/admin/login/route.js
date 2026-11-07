
import { NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";

export async function POST(request) {
  const { password } = await request.json();

  const actual = Buffer.from(String(password || ""));
  const expected = Buffer.from(process.env.ADMIN_PASSWORD || "");

  if (
    !expected.length ||
    actual.length !== expected.length ||
    !timingSafeEqual(actual, expected)
  ) {
    return NextResponse.json(
      { error: "Password admin salah" },
      { status: 401 }
    );
  }

  if (!process.env.ADMIN_SESSION_SECRET) {
    return NextResponse.json(
      { error: "Konfigurasi sesi admin belum tersedia" },
      { status: 500 }
    );
  }

  const token = createHmac(
    "sha256",
    process.env.ADMIN_SESSION_SECRET
  )
    .update("rei-robux-admin-session")
    .digest("hex");

  const response = NextResponse.json({ success: true });

  response.cookies.set("rei_admin", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return response;
}
