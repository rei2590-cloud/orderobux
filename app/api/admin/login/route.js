import { NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    const { password } = await request.json();

    const adminPassword = process.env.ADMIN_PASSWORD;
    const sessionSecret = process.env.ADMIN_SESSION_SECRET;

    // Cek konfigurasi server
    if (!adminPassword) {
      console.error("ADMIN_PASSWORD belum diatur di Vercel.");

      return NextResponse.json(
        { error: "Konfigurasi password admin belum tersedia." },
        { status: 500 }
      );
    }

    if (!sessionSecret) {
      console.error("ADMIN_SESSION_SECRET belum diatur di Vercel.");

      return NextResponse.json(
        { error: "Konfigurasi session admin belum tersedia." },
        { status: 500 }
      );
    }

    // Pastikan password berupa string
    const actual = Buffer.from(String(password ?? ""), "utf8");
    const expected = Buffer.from(adminPassword, "utf8");

    // Bandingkan password dengan aman
    const passwordCorrect =
      actual.length === expected.length &&
      timingSafeEqual(actual, expected);

    if (!passwordCorrect) {
      return NextResponse.json(
        { error: "Password admin salah." },
        { status: 401 }
      );
    }

    // Buat session token
    const token = createHmac("sha256", sessionSecret)
      .update("rei-robux-admin-session")
      .digest("hex");

    const response = NextResponse.json({
      success: true,
    });

    // Simpan session di cookie
    response.cookies.set("rei_admin", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8,
    });

    return response;
  } catch (error) {
    console.error("Admin login error:", error);

    return NextResponse.json(
      { error: "Permintaan login tidak valid." },
      { status: 400 }
    );
  }
}
