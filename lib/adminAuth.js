
import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";

function createToken() {
  return createHmac("sha256", process.env.ADMIN_SESSION_SECRET)
    .update("rei-robux-admin-session")
    .digest("hex");
}

export async function isAdmin() {
  if (!process.env.ADMIN_SESSION_SECRET) return false;

  const cookieStore = await cookies();
  const token = cookieStore.get("rei_admin")?.value;

  if (!token) return false;

  const expected = createToken();
  const a = Buffer.from(token);
  const b = Buffer.from(expected);

  return a.length === b.length && timingSafeEqual(a, b);
}
