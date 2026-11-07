"use client";

import { useState } from "react";

const STATUS = {
  pending: { title: "⏳ MENUNGGU", text: "Pesananmu sudah masuk dan menunggu diproses." },
  processing: { title: "🔧 DIPROSES", text: "Pesananmu sedang diproses. Mohon ditunggu ya." },
  completed: { title: "✅ SELESAI", text: "Robux sudah dikirim. Terima kasih sudah order!" },
};

const card = {
  background: "#fff",
  border: "4px solid #1b2540",
  borderRadius: 20,
  boxShadow: "6px 6px 0 #1b2540",
  padding: 24,
};

export default function CekStatusPage() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function check(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await fetch(`/api/order-status?code=${encodeURIComponent(code)}`, {
        cache: "no-store",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal mengecek pesanan.");
      setResult(data);
    } catch (e) {
      setError(e.message || "Gagal mengecek pesanan.");
    } finally {
      setLoading(false);
    }
  }

  const s = result ? STATUS[result.status] || STATUS.pending : null;

  return (
    <main style={{ maxWidth: 560, margin: "0 auto", padding: "40px 16px 120px" }}>
      <div style={card}>
        <h1 style={{ margin: "0 0 8px", color: "#1b2540" }}>📦 CEK STATUS PESANAN</h1>
        <p style={{ marginTop: 0 }}>Masukkan kode order (8 karakter) dari admin.</p>
        <form onSubmit={check} style={{ display: "grid", gap: 12 }}>
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="contoh: a1b2c3d4"
            maxLength={36}
            required
            style={{
              padding: 14,
              fontSize: 18,
              border: "3px solid #1b2540",
              borderRadius: 14,
            }}
          />
          <button
            disabled={loading}
            style={{
              padding: 14,
              fontWeight: 800,
              fontSize: 16,
              background: "#ffd62a",
              border: "3px solid #1b2540",
              borderRadius: 14,
              boxShadow: "3px 3px 0 #1b2540",
              cursor: "pointer",
            }}
          >
            {loading ? "MENGECEK..." : "CEK PESANAN →"}
          </button>
        </form>

        {error && (
          <p style={{ marginTop: 16, padding: 12, background: "#fff3c4", border: "3px solid #1b2540", borderRadius: 14, fontWeight: 700 }}>
            {error}
          </p>
        )}

        {result && (
          <div style={{ marginTop: 16, padding: 16, border: "3px solid #1b2540", borderRadius: 14, background: "#eaf1ff" }}>
            <h2 style={{ margin: "0 0 6px" }}>{s.title}</h2>
            <p style={{ margin: "0 0 10px" }}>{s.text}</p>
            <small>
              Kode #{result.code} · @{result.username} · {Number(result.robux_amount || 0).toLocaleString("id-ID")} Robux ·{" "}
              {new Date(result.created_at).toLocaleString("id-ID")}
            </small>
          </div>
        )}
      </div>
      <p style={{ textAlign: "center", marginTop: 20 }}>
        <a href="/">← Kembali ke toko</a>
      </p>
    </main>
  );
}
