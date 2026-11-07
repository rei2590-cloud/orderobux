import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";

// Export named + default so either import style works in every API route.
export async function isAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("rei_admin")?.value;

  if (!token || !process.env.ADMIN_SESSION_SECRET) return false;

  const expected = createHmac("sha256", process.env.ADMIN_SESSION_SECRET)
    .update("rei-robux-admin-session")
    .digest("hex");

  const actualBuffer = Buffer.from(token);
  const expectedBuffer = Buffer.from(expected);

  return actualBuffer.length === expectedBuffer.length &&
    timingSafeEqual(actualBuffer, expectedBuffer);
}

export default isAdmin;
