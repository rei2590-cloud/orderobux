"use client";

import { useEffect, useState } from "react";

const formatRobux = (value) =>
  new Intl.NumberFormat("id-ID").format(value || 0);

async function readJson(response) {
  const raw = await response.text();
  if (!raw) {
    throw new Error(`Server memberi respons kosong (HTTP ${response.status}). Cek deployment Vercel.`);
  }
  try {
    return JSON.parse(raw);
  } catch {
    throw new Error(`Server tidak mengirim JSON (HTTP ${response.status}). Cek Vercel Logs.`);
  }
}

const STATUS_LABEL = {
  pending: "⏳ MENUNGGU",
  processing: "🔧 DIPROSES",
  completed: "✅ SELESAI",
};

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [orders, setOrders] = useState([]);
  const [stock, setStock] = useState(null);
  const [newStock, setNewStock] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [store, setStore] = useState({ is_open: true, closed_message: "" });
  const [closedMsg, setClosedMsg] = useState("");
  const [testimonials, setTestimonials] = useState([]);

  async function loadDashboard() {
    const [ordersRes, stockRes, storeRes, testiRes] = await Promise.all([
      fetch("/api/admin/orders", { cache: "no-store" }),
      fetch("/api/admin/stock", { cache: "no-store" }),
      fetch("/api/store", { cache: "no-store" }).catch(() => null),
      fetch("/api/admin/testimonials", { cache: "no-store" }).catch(() => null),
    ]);

    if (ordersRes.status === 401 || stockRes.status === 401) {
      setLoggedIn(false);
      throw new Error("Sesi admin tidak valid. Silakan login kembali.");
    }

    const ordersData = await readJson(ordersRes);
    const stockData = await readJson(stockRes);

    if (!ordersRes.ok) throw new Error(ordersData.error || "Gagal memuat pesanan.");
    if (!stockRes.ok) throw new Error(stockData.error || "Gagal memuat laporan stok.");

    try {
      if (storeRes?.ok) {
        const s = await storeRes.json();
        setStore(s);
        setClosedMsg(s.closed_message || "");
      }
    } catch {}
    try {
      if (testiRes?.ok) {
        const t = await testiRes.json();
        setTestimonials(t.testimonials || []);
      }
    } catch {}

    setOrders(ordersData.orders || []);
    setStock(stockData);
    setNewStock(String(stockData.available_stock ?? ""));
    setLoggedIn(true);
    setMessage("");
  }

  useEffect(() => {
    // Do not call protected endpoints until the user has logged in.
  }, []);

  async function login(event) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        body: JSON.stringify({ password }),
      });
      const data = await readJson(response);

      if (!response.ok) throw new Error(data.error || "Login gagal.");

      setPassword("");
      await loadDashboard();
    } catch (error) {
      setMessage(error.message || "Login gagal. Periksa koneksi server.");
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      setLoggedIn(false);
      setOrders([]);
      setStock(null);
      setMessage("Kamu sudah logout.");
    }
  }

  async function completeOrder(id) {
    if (!confirm("Pastikan pembayaran sudah diterima dan Robux sudah dikirim. Selesaikan pesanan ini?")) return;

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`/api/admin/orders/${id}/complete`, {
        method: "POST",
        cache: "no-store",
      });
      const data = await readJson(response);
      if (!response.ok) throw new Error(data.error || "Gagal menyelesaikan pesanan.");

      setMessage(`Pesanan selesai! Sisa stok ${formatRobux(data.remaining_stock)} Robux.`);
      await loadDashboard();
    } catch (error) {
      setMessage(error.message || "Gagal menyelesaikan pesanan.");
    } finally {
      setLoading(false);
    }
  }

  async function setOrderStatus(id, status) {
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch("/api/admin/order-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        body: JSON.stringify({ id, status }),
      });
      const data = await readJson(response);
      if (!response.ok) throw new Error(data.error || "Gagal mengubah status.");
      setMessage(status === "processing" ? "Pesanan ditandai DIPROSES." : "Pesanan dikembalikan ke MENUNGGU.");
      await loadDashboard();
    } catch (error) {
      setMessage(error.message || "Gagal mengubah status.");
    } finally {
      setLoading(false);
    }
  }

  async function saveStore(isOpen) {
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch("/api/admin/store", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        body: JSON.stringify({ is_open: isOpen, closed_message: closedMsg }),
      });
      const data = await readJson(response);
      if (!response.ok) throw new Error(data.error || "Gagal menyimpan pengaturan toko.");
      setStore({ is_open: isOpen, closed_message: closedMsg });
      setMessage(isOpen ? "Toko sekarang BUKA." : "Toko sekarang TUTUP.");
    } catch (error) {
      setMessage(error.message || "Gagal menyimpan pengaturan toko.");
    } finally {
      setLoading(false);
    }
  }

  async function moderateTestimonial(id, approve) {
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch("/api/admin/testimonials", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        body: JSON.stringify({ id, is_approved: approve }),
      });
      const data = await readJson(response);
      if (!response.ok) throw new Error(data.error || "Gagal memperbarui testimoni.");
      await loadDashboard();
    } catch (error) {
      setMessage(error.message || "Gagal memperbarui testimoni.");
    } finally {
      setLoading(false);
    }
  }

  async function deleteTestimonial(id) {
    if (!confirm("Hapus testimoni ini?")) return;
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch("/api/admin/testimonials", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        body: JSON.stringify({ id }),
      });
      const data = await readJson(response);
      if (!response.ok) throw new Error(data.error || "Gagal menghapus testimoni.");
      await loadDashboard();
    } catch (error) {
      setMessage(error.message || "Gagal menghapus testimoni.");
    } finally {
      setLoading(false);
    }
  }

  async function updateStock(event) {
    event.preventDefault();
    if (!confirm("Yakin ingin mengganti stok tersedia?")) return;

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/admin/stock", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        body: JSON.stringify({ available_stock: Number(newStock) }),
      });
      const data = await readJson(response);
      if (!response.ok) throw new Error(data.error || "Gagal memperbarui stok.");

      setMessage("Stok berhasil diperbarui!");
      await loadDashboard();
    } catch (error) {
      setMessage(error.message || "Gagal memperbarui stok.");
    } finally {
      setLoading(false);
    }
  }

  const pendingCount = orders.filter(
    (order) => order.status === "pending" || order.status === "processing"
  ).length;
  const waitingTestimonials = testimonials.filter((t) => !t.is_approved).length;

  if (!loggedIn) {
    return (
      <main className="admin-page">
        <form className="admin-login" onSubmit={login}>
          <div className="admin-flag">🏁 REI ROBUX</div>
          <h1>ADMIN RACING CLUB</h1>
          <p>Masuk untuk mengelola stok dan pesanan.</p>
          <label>Password Admin</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Masukkan password admin"
            autoComplete="current-password"
            required
          />
          {message && <p className="admin-message">{message}</p>}
          <button disabled={loading}>
            {loading ? "MEMERIKSA..." : "LOGIN ADMIN →"}
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="admin-page">
      <div className="admin-top">
        <div>
          <div className="admin-flag">🏁 REI ROBUX</div>
          <h1>RACING ADMIN PANEL</h1>
          <p>Kelola stok dan pesanan Robux kamu.</p>
        </div>
        <button className="admin-logout" onClick={logout}>LOGOUT</button>
      </div>

      {message && <div className="admin-message">{message}</div>}

      <section className="admin-stats">
        <div className="admin-stat"><span>TOTAL ROBUX MASUK</span><strong>{formatRobux(stock?.total_stock)} R$</strong></div>
        <div className="admin-stat"><span>ROBUX TERJUAL</span><strong>{formatRobux(stock?.sold_stock)} R$</strong></div>
        <div className="admin-stat"><span>STOK TERSEDIA</span><strong>{formatRobux(stock?.available_stock)} R$</strong></div>
        <div className="admin-stat"><span>ORDER MENUNGGU</span><strong>{pendingCount}</strong></div>
      </section>

      <section className="admin-panel">
        <h2>🏪 STATUS TOKO</h2>
        <p>
          Sekarang toko: <strong>{store.is_open ? "🟢 BUKA" : "🔴 TUTUP"}</strong>. Saat tutup, banner merah tampil di web.
        </p>
        <div className="admin-stock-form">
          <input
            type="text"
            maxLength={200}
            value={closedMsg}
            onChange={(event) => setClosedMsg(event.target.value)}
            placeholder="Pesan saat toko tutup (opsional)"
          />
          <button disabled={loading} onClick={() => saveStore(!store.is_open)}>
            {store.is_open ? "TUTUP TOKO" : "BUKA TOKO"}
          </button>
          <button disabled={loading} onClick={() => saveStore(store.is_open)}>
            SIMPAN PESAN
          </button>
        </div>
      </section>

      <section className="admin-panel">
        <h2>📊 LAPORAN PERSEDIAAN ROBUX</h2>
        <p>Total Robux terjual dihitung dari pesanan berstatus selesai di database.</p>
        <div className="admin-stock-report">
          <div><span>Total stok tersedia sepanjang pencatatan</span><strong>{formatRobux(stock?.total_stock)} R$</strong></div>
          <div><span>Sudah terjual / dikirim</span><strong>{formatRobux(stock?.sold_stock)} R$</strong></div>
          <div><span>Sisa stok saat ini</span><strong>{formatRobux(stock?.available_stock)} R$</strong></div>
          <small>Terakhir diperbarui: {stock?.updated_at ? new Date(stock.updated_at).toLocaleString("id-ID") : "-"}</small>
        </div>
      </section>

      <section className="admin-panel">
        <h2>🛠️ ATUR STOK ROBUX</h2>
        <p>Masukkan jumlah stok terbaru yang tersedia.</p>
        <form className="admin-stock-form" onSubmit={updateStock}>
          <input type="number" min="0" step="1" value={newStock} onChange={(event) => setNewStock(event.target.value)} required />
          <button disabled={loading}>UPDATE STOK</button>
        </form>
      </section>

      <section className="admin-panel">
        <div className="admin-orders-heading">
          <h2>📦 DAFTAR PESANAN</h2>
          <button disabled={loading} onClick={() => loadDashboard().catch((error) => setMessage(error.message))}>REFRESH ↻</button>
        </div>
        {orders.length === 0 ? <p>Belum ada pesanan masuk.</p> : (
          <div className="admin-order-list">
            {orders.map((order) => (
              <article className="admin-order" key={order.id}>
                <div>
                  <strong>@{order.username}</strong>
                  <p>{formatRobux(order.robux_amount)} Robux</p>
                  <small>Kode order: <strong>{String(order.id).slice(0, 8)}</strong> · {new Date(order.created_at).toLocaleString("id-ID")}</small>
                  <p className="admin-status">{STATUS_LABEL[order.status] || order.status}</p>
                </div>
                {(order.status === "pending" || order.status === "processing") && (
                  <div>
                    {order.status === "pending" && (
                      <button disabled={loading} onClick={() => setOrderStatus(order.id, "processing")}>TANDAI DIPROSES</button>
                    )}
                    {order.status === "processing" && (
                      <button disabled={loading} onClick={() => setOrderStatus(order.id, "pending")}>KEMBALI MENUNGGU</button>
                    )}
                    <button disabled={loading} onClick={() => completeOrder(order.id)}>PESANAN SELESAI</button>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="admin-panel">
        <h2>⭐ TESTIMONI ({waitingTestimonials} menunggu persetujuan)</h2>
        {testimonials.length === 0 ? <p>Belum ada testimoni masuk.</p> : (
          <div className="admin-order-list">
            {testimonials.map((t) => (
              <article className="admin-order" key={t.id}>
                <div>
                  <strong>{t.name}</strong> {"⭐".repeat(t.rating)}
                  <p>{t.message}</p>
                  <small>{new Date(t.created_at).toLocaleString("id-ID")}</small>
                  <p className="admin-status">{t.is_approved ? "✅ TAMPIL" : "⏳ MENUNGGU PERSETUJUAN"}</p>
                </div>
                <div>
                  {t.is_approved ? (
                    <button disabled={loading} onClick={() => moderateTestimonial(t.id, false)}>SEMBUNYIKAN</button>
                  ) : (
                    <button disabled={loading} onClick={() => moderateTestimonial(t.id, true)}>SETUJUI</button>
                  )}
                  <button disabled={loading} onClick={() => deleteTestimonial(t.id)}>HAPUS</button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
