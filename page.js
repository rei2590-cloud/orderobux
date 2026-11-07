"use client";

import { useState } from "react";
import { ShoppingBag, Sparkles, Plus, Minus, ShoppingCart, Trash2, Gamepad2 } from "lucide-react";

// ========== PENGATURAN TOKO: EDIT BAGIAN INI ==========
const STORE_NAME = "VISEND STORE";
const WHATSAPP_ADMIN = "6281234567890"; // Ganti dengan nomor WA admin, format 62...

// Ubah nama, jumlah Robux, harga, label, dan emoji sesuai tokomu.
// Harga angka tanpa titik. Contoh 15000 akan tampil sebagai Rp15.000.
const PRODUCTS = [
  { id: 1, name: "Paket Starter", robux: 50, price: 5000, badge: "STARTER", emoji: "🌷" },
  { id: 2, name: "Paket Mini", robux: 100, price: 10000, badge: "POPULAR", emoji: "🍓" },
  { id: 3, name: "Paket Medium", robux: 250, price: 25000, badge: "BEST SELLER", emoji: "🧸" },
  { id: 4, name: "Paket Large", robux: 400, price: 40000, badge: "FAVORITE", emoji: "🎀" },
  { id: 5, name: "Paket Super", robux: 800, price: 80000, badge: "SPECIAL", emoji: "🦄" },
  { id: 6, name: "Paket Mega", robux: 1000, price: 100000, badge: "MEGA PACK", emoji: "💗" }
];
// ======================================================

const money = (n) => new Intl.NumberFormat("id-ID", {
  style: "currency", currency: "IDR", maximumFractionDigits: 0
}).format(n);

export default function Home() {
  const [cart, setCart] = useState([]);
  const [username, setUsername] = useState("");
  const [contact, setContact] = useState("");
  const [method, setMethod] = useState("Gamepass");
  const [notes, setNotes] = useState("");

  function addToCart(product) {
    setCart(old => {
      const found = old.find(item => item.id === product.id);
      return found
        ? old.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item)
        : [...old, { ...product, qty: 1 }];
    });
  }

  function changeQty(id, amount) {
    setCart(old => old.map(item =>
      item.id === id ? { ...item, qty: item.qty + amount } : item
    ).filter(item => item.qty > 0));
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const count = cart.reduce((sum, item) => sum + item.qty, 0);

  function checkout(e) {
    e.preventDefault();
    if (!cart.length) return alert("Keranjang masih kosong. Pilih paket terlebih dahulu.");
    if (!username.trim()) return alert("Isi username Roblox terlebih dahulu.");
    if (WHATSAPP_ADMIN === "6281234567890" || !WHATSAPP_ADMIN) {
      return alert("Ganti nomor WHATSAPP_ADMIN di bagian pengaturan app/page.js terlebih dahulu.");
    }

    const items = cart.map(item =>
      `- ${item.name} (${item.robux} Robux) x${item.qty}: ${money(item.price * item.qty)}`
    ).join("\\n");
    const message = `Halo ${STORE_NAME}! Saya ingin order Robux.\\n\\nUsername Roblox: ${username}\\nKontak: ${contact || "-"}\\nMetode: ${method}\\n\\nDetail pesanan:\\n${items}\\n\\nTotal: ${money(total)}\\nCatatan: ${notes || "-"}`;
    window.open(`https://wa.me/${WHATSAPP_ADMIN}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <main>
      <nav className="navbar">
        <a className="logo" href="#home">♡ {STORE_NAME}</a>
        <div className="nav-links">
          <a href="#home">Home</a><a href="#products">Produk</a><a href="#how">Cara Order</a><a href="#order">Keranjang ({count})</a>
        </div>
      </nav>

      <section className="hero" id="home">
        <div className="hero-content">
          <div className="pill"><Sparkles size={15}/> WELCOME TO {STORE_NAME}</div>
          <h1>Your Cute<br/><span>Robux Shop!</span> 💗</h1>
          <p>Pilih paket Robux favoritmu, masukkan username Roblox, lalu kirim pesanan langsung ke admin dengan mudah.</p>
          <a className="main-button" href="#products">BELANJA SEKARANG <ShoppingBag size={18}/></a>
          <div className="hero-note">♡ Happy shopping, Roblox players!</div>
        </div>
        <div className="hero-decoration" aria-hidden="true">
          <div className="big-heart">💗</div><div className="floating f1">🎀</div><div className="floating f2">⭐</div><div className="floating f3">🧸</div>
        </div>
      </section>

      <section className="features">
        <div><span>💌</span><b>Easy Order</b><small>Pesan dengan mudah</small></div>
        <div><span>🎀</span><b>Cute Store</b><small>Tampilan lucu dan nyaman</small></div>
        <div><span>💗</span><b>Robux Shop</b><small>Pilih paket favoritmu</small></div>
      </section>

      <section className="section" id="products">
        <div className="section-title"><span>OUR COLLECTION</span><h2>Choose Your Robux! 🎀</h2><p>Pilih paket Robux yang kamu inginkan.</p></div>
        <div className="product-grid">
          {PRODUCTS.map(product => (
            <article className="product-card" key={product.id}>
              <div className="product-art"><span>{product.emoji}</span><div className="product-badge">{product.badge}</div></div>
              <h3>{product.name}</h3>
              <p className="product-desc">{product.robux.toLocaleString("id-ID")} Robux</p>
              <div className="price">{money(product.price)}</div>
              <button className="add-button" onClick={() => addToCart(product)}><Plus size={17}/> Tambah ke Keranjang</button>
            </article>
          ))}
        </div>
      </section>

      <section className="how-section" id="how">
        <div className="section-title"><span>HOW TO ORDER</span><h2>Gampang Banget! 🛍️</h2></div>
        <div className="how-grid">
          <div><strong>01</strong><h3>Pilih Paket</h3><p>Pilih jumlah Robux yang kamu inginkan.</p></div>
          <div><strong>02</strong><h3>Isi Data</h3><p>Masukkan username Roblox dan metode pengiriman.</p></div>
          <div><strong>03</strong><h3>Kirim Order</h3><p>Checkout dan lanjutkan pesanan melalui WhatsApp admin.</p></div>
        </div>
      </section>

      <section className="order-section" id="order">
        <div className="section-title"><span>LET'S CHECKOUT</span><h2>Keranjang & Pesanan 💌</h2><p>Periksa paket pilihanmu sebelum mengirim pesanan.</p></div>
        <div className="checkout-box">
          <div className="cart-box">
            <h3><ShoppingCart size={20}/> Keranjang Belanja</h3>
            {!cart.length ? <p className="empty">Keranjang kamu masih kosong 🧸</p> : cart.map(item => (
              <div className="cart-item" key={item.id}>
                <div><b>{item.name}</b><small>{item.robux.toLocaleString("id-ID")} Robux · {money(item.price)}</small></div>
                <div className="quantity">
                  <button type="button" onClick={() => changeQty(item.id, -1)} aria-label="Kurangi"><Minus size={14}/></button>
                  <span>{item.qty}</span>
                  <button type="button" onClick={() => changeQty(item.id, 1)} aria-label="Tambah"><Plus size={14}/></button>
                </div>
              </div>
            ))}
            <div className="total"><span>Total</span><b>{money(total)}</b></div>
          </div>

          <form className="checkout-form" onSubmit={checkout}>
            <h3><Gamepad2 size={20}/> Data Pemesanan</h3>
            <label htmlFor="username">Username Roblox *</label>
            <input id="username" value={username} onChange={e => setUsername(e.target.value)} placeholder="Masukkan username Roblox" required/>
            <label htmlFor="contact">Nama / kontak pemesan</label>
            <input id="contact" value={contact} onChange={e => setContact(e.target.value)} placeholder="Nama atau nomor WhatsApp"/>
            <label htmlFor="method">Metode pengiriman</label>
            <select id="method" value={method} onChange={e => setMethod(e.target.value)}>
              <option>Gamepass</option><option>Group Payout</option><option>Metode lain (konfirmasi admin)</option>
            </select>
            <label htmlFor="notes">Catatan tambahan</label>
            <textarea id="notes" rows="3" value={notes} onChange={e => setNotes(e.target.value)} placeholder="Tulis catatan jika ada..."/>
            <button className="checkout-button" type="submit">KIRIM ORDER VIA WHATSAPP 💗</button>
            <p className="form-note">Pesanan dikirim ke WhatsApp admin untuk konfirmasi.</p>
          </form>
        </div>
      </section>

      <footer><div className="logo">♡ {STORE_NAME}</div><p>Made with love for Roblox players 🎀</p><small>© {new Date().getFullYear()} {STORE_NAME}. All rights reserved.</small></footer>
    </main>
  );
}
