"use client";

import { useEffect, useState } from "react";

const card = {
  background: "#fff",
  border: "4px solid #1b2540",
  borderRadius: 20,
  boxShadow: "6px 6px 0 #1b2540",
  padding: 24,
};

const input = {
  padding: 12,
  fontSize: 16,
  border: "3px solid #1b2540",
  borderRadius: 14,
  width: "100%",
  boxSizing: "border-box",
};

export default function TestimoniPage() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [website, setWebsite] = useState("");
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/testimonials", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => setItems(d.testimonials || []))
      .catch(() => {});
  }, []);

  async function submit(event) {
    event.preventDefault();
    setLoading(true);
    setInfo("");
    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message, rating, website }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal mengirim testimoni.");
      setName("");
      setMessage("");
      setRating(5);
      setInfo("Terima kasih! Testimonimu akan tampil setelah disetujui admin.");
    } catch (e) {
      setInfo(e.message || "Gagal mengirim testimoni.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "40px 16px 120px", display: "grid", gap: 24 }}>
      <section style={card}>
        <h1 style={{ margin: "0 0 12px", color: "#1b2540" }}>⭐ TESTIMONI PEMBELI</h1>
        {items.length === 0 ? (
          <p>Belum ada testimoni. Jadilah yang pertama!</p>
        ) : (
          <div style={{ display: "grid", gap: 12 }}>
            {items.map((t) => (
              <article key={t.id} style={{ border: "3px solid #1b2540", borderRadius: 14, padding: 14, background: "#eaf1ff" }}>
                <strong>{t.name}</strong>{" "}
                <span aria-label={`${t.rating} bintang`}>{"⭐".repeat(t.rating)}</span>
                <p style={{ margin: "6px 0 0" }}>{t.message}</p>
              </article>
            ))}
          </div>
        )}
      </section>

      <section style={card}>
        <h2 style={{ marginTop: 0 }}>✍️ TULIS TESTIMONI</h2>
        <form onSubmit={submit} style={{ display: "grid", gap: 12 }}>
          <input style={input} value={name} onChange={(e) => setName(e.target.value)} placeholder="Nama / username (boleh disamarkan)" maxLength={40} required />
          <select style={input} value={rating} onChange={(e) => setRating(Number(e.target.value))}>
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>{"⭐".repeat(n)} ({n})</option>
            ))}
          </select>
          <textarea style={{ ...input, minHeight: 100 }} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Ceritakan pengalaman order kamu (10-300 karakter)" maxLength={300} required />
          <input value={website} onChange={(e) => setWebsite(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px" }} />
          <button disabled={loading} style={{ padding: 14, fontWeight: 800, fontSize: 16, background: "#ffd62a", border: "3px solid #1b2540", borderRadius: 14, boxShadow: "3px 3px 0 #1b2540", cursor: "pointer" }}>
            {loading ? "MENGIRIM..." : "KIRIM TESTIMONI →"}
          </button>
        </form>
        {info && <p style={{ marginTop: 12, fontWeight: 700 }}>{info}</p>}
      </section>

      <p style={{ textAlign: "center" }}><a href="/">← Kembali ke toko</a></p>
    </main>
  );
}
