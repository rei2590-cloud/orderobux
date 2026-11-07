
"use client";

import { useEffect, useState } from "react";

const formatRobux = (value) =>
  new Intl.NumberFormat("id-ID").format(value || 0);

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [orders, setOrders] = useState([]);
  const [stock, setStock] = useState(null);
  const [newStock, setNewStock] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function loadDashboard() {
    const [ordersRes, stockRes] = await Promise.all([
      fetch("/api/admin/orders", { cache: "no-store" }),
      fetch("/api/admin/stock", { cache: "no-store" }),
    ]);

    if (ordersRes.status === 401) {
      setLoggedIn(false);
      return;
    }

    const ordersData = await ordersRes.json();
    const stockData = await stockRes.json();

    if (!ordersRes.ok || !stockRes.ok) {
      throw new Error("Gagal memuat dashboard");
    }

    setOrders(ordersData.orders || []);
    setStock(stockData);
    setNewStock(String(stockData.available_stock ?? ""));
    setLoggedIn(true);
  }

  useEffect(() => {
    loadDashboard().catch(() => {
      setMessage("Gagal menghubungkan dashboard.");
    });
  }, []);

  async function login(event) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      setPassword("");
      await loadDashboard();
    } catch (error) {
      setMessage(error.message || "Login gagal");
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setLoggedIn(false);
    setOrders([]);
    setStock(null);
    setMessage("Kamu sudah logout.");
  }

  async function completeOrder(id) {
    if (
      !confirm(
        "Pastikan pembayaran sudah diterima dan Robux sudah dikirim. Selesaikan pesanan ini?"
      )
    ) return;

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        `/api/admin/orders/${id}/complete`,
        { method: "POST" }
      );

      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      setMessage(
        `Pesanan selesai! Sisa stok ${formatRobux(data.remaining_stock)} Robux.`
      );

      await loadDashboard();
    } catch (error) {
      setMessage(error.message || "Gagal menyelesaikan pesanan");
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
        body: JSON.stringify({
          available_stock: Number(newStock),
        }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      setMessage("Stok berhasil diperbarui!");
      await loadDashboard();
    } catch (error) {
      setMessage(error.message || "Gagal memperbarui stok");
    } finally {
      setLoading(false);
    }
  }

  const pendingCount = orders.filter(
    (order) => order.status === "pending"
  ).length;

  const completedCount = orders.filter(
    (order) => order.status === "completed"
  ).length;

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

        <button className="admin-logout" onClick={logout}>
          LOGOUT
        </button>
      </div>

      {message && <div className="admin-message">{message}</div>}

      <section className="admin-stats">
        <div className="admin-stat">
          <span>TOTAL ROBUX MASUK</span>
          <strong>{formatRobux(stock?.total_stock)} R$</strong>
        </div>
        <div className="admin-stat">
          <span>ROBUX TERJUAL</span>
          <strong>{formatRobux(stock?.sold_stock)} R$</strong>
        </div>
        <div className="admin-stat">
          <span>STOK TERSEDIA</span>
          <strong>{formatRobux(stock?.available_stock)} R$</strong>
        </div>
        <div className="admin-stat">
          <span>ORDER MENUNGGU</span>
          <strong>{pendingCount}</strong>
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
          <input
            type="number"
            min="0"
            step="1"
            value={newStock}
            onChange={(event) => setNewStock(event.target.value)}
            required
          />

          <button disabled={loading}>UPDATE STOK</button>
        </form>
      </section>

      <section className="admin-panel">
        <div className="admin-orders-heading">
          <h2>📦 DAFTAR PESANAN</h2>
          <button disabled={loading} onClick={() => loadDashboard()}>
            REFRESH ↻
          </button>
        </div>

        {orders.length === 0 ? (
          <p>Belum ada pesanan masuk.</p>
        ) : (
          <div className="admin-order-list">
            {orders.map((order) => (
              <article className="admin-order" key={order.id}>
                <div>
                  <strong>@{order.username}</strong>
                  <p>{formatRobux(order.robux_amount)} Robux</p>
                  <small>
                    {new Date(order.created_at).toLocaleString("id-ID")}
                  </small>

                  <p className="admin-status">
                    {order.status === "completed"
                      ? "✅ SELESAI"
                      : "⏳ MENUNGGU"}
                  </p>
                </div>

                {order.status === "pending" && (
                  <button
                    disabled={loading}
                    onClick={() => completeOrder(order.id)}
                  >
                    PESANAN SELESAI
                  </button>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
