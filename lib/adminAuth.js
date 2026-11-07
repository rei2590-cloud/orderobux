
import { NextResponse } from "next/server";

export function adminAuth(request) {
  const token = request.cookies.get("admin_session")?.value;

  if (!token || token !== process.env.ADMIN_SESSION_SECRET) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  return null;
}
