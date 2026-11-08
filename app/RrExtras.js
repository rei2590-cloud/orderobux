
"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const WA_NUMBER = (process.env.NEXT_PUBLIC_WA_NUMBER || "").replace(/\D/g, "");

const pill = {
  background: "#ffd62a",
  color: "#1b2540",
  border: "3px solid #1b2540",
  borderRadius: 14,
  boxShadow: "3px 3px 0 #1b2540",
  padding: "12px 6px",
  fontWeight: 800,
  fontSize: 14,
  textDecoration: "none",
  textAlign: "center",
  display: "block",
  width: "100%",
  boxSizing: "border-box",
};

export default function RrExtras() {
  const pathname = usePathname() || "";
  const [store, setStore] = useState(null);

  useEffect(() => {
    fetch("/api/store", { cache: "no-store" })
      .then((r) => r.json())
      .then(setStore)
      .catch(() => {});
  }, []);

  if (pathname.startsWith("/admin")) return null;

  const closed = store && store.is_open === false;

  return (
    <>
      {closed && (
        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 50,
            background: "#e84a2f",
            color: "#fff",
            textAlign: "center",
            fontWeight: 800,
            padding: "10px 14px",
            borderBottom: "3px solid #1b2540",
          }}
        >
          🔴 TOKO TUTUP — {store.closed_message || "Order akan diproses saat toko buka."}
        </div>
      )}

      <div
        style={{
          position: "fixed",
          left: 12,
          right: 12,
          bottom: "calc(12px + env(safe-area-inset-bottom))",
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          maxWidth: 480,
          margin: "0 auto",
        }}
      >
        {/* TOMBOL CEK STATUS & TESTIMONI */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
          }}
        >
          <a href="/cek-status" style={pill}>
            📦 Cek Status
          </a>

          <a href="/testimoni" style={pill}>
            ⭐ Testimoni
          </a>
        </div>

        {/* TOMBOL WHATSAPP */}
        {WA_NUMBER && (
          <a
            href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
              "Halo kak, aku mau tanya soal Robux di REI ROBUX."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat WhatsApp"
            style={{
              background: "#25d366",
              color: "#fff",
              border: "3px solid #1b2540",
              borderRadius: 999,
              boxShadow: "3px 3px 0 #1b2540",
              padding: "14px 16px",
              fontWeight: 800,
              fontSize: 16,
              textDecoration: "none",
              textAlign: "center",
              display: "block",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            💬 Chat WhatsApp
          </a>
        )}
      </div>
    </>
  );
}
