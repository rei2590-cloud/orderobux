import { createClient } from "@supabase/supabase-js";
import { createHmac, timingSafeEqual } from "crypto";

export function getDb() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;
  if (!url || !key) throw new Error("Konfigurasi Supabase belum lengkap.");
  return createClient(url, key, { auth: { persistSession: false } });
}

// Cek cookie login admin (logika sama dengan /api/admin/login)
export function isAdmin(request) {
  const secret = process.env.ADMIN_SESSION_SECRET;
  const cookie = request.cookies.get("rei_admin")?.value;
  if (!secret || !cookie) return false;
  const expected = createHmac("sha256", secret)
    .update("rei-robux-admin-session")
    .digest("hex");
  const a = Buffer.from(cookie);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}
