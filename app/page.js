
"use client";

import { useState } from "react";

const STORE_NAME = "ROBux VISEND";
const WHATSAPP_ADMIN = "6281234567890"; // Ganti nomor WA kamu

const products = [
  { id: 1, robux: 50, price: 5000, tag: "STARTER", color: "blue", emoji: "⭐" },
  { id: 2, robux: 100, price: 10000, tag: "POPULAR", color: "yellow", emoji: "🍭" },
  { id: 3, robux: 250, price: 25000, tag: "BEST SELLER", color: "pink", emoji: "🎮" },
  { id: 4, robux: 400, price: 40000, tag: "FAVORITE", color: "green", emoji: "🧸" },
  { id: 5, robux: 500, price: 50000, tag: "SUPER PACK", color: "purple", emoji: "🚀" },
  { id: 6, robux: 1000, price: 100000, tag: "MEGA PACK", color: "orange", emoji: "👾" },
];

const money = (n) => "Rp" + n.toLocaleString("id-ID");

export default function Home() {
  const [cart, setCart] = useState([]);
  const [username, setUsername] = useState("");
  const [payment, setPayment] = useState("DANA");

  const addCart = (product) => {
    setCart((old) => {
      const found = old.find((x) => x.id === product.id);
      if (found) {
        return old.map((x) =>
          x.id === product.id ? { ...x, qty: x.qty + 1 } : x
        );
      }
      return [...old, { ...product, qty: 1 }];
    });
  };

  const changeQty = (id, amount) => {
    setCart((old) =>
      old
        .map((x) => x.id === id ? { ...x, qty: x.qty + amount } : x)
        .filter((x) => x.qty > 0)
    );
  };

  const total = cart.reduce((sum, x) => sum + x.price * x.qty, 0);
  const count = cart.reduce((sum, x) => sum + x.qty, 0);

  const order = () => {
    if (!username.trim()) {
      alert("Isi username Roblox kamu dulu!");
      return;
    }
    if (!cart.length) {
      alert("Pilih paket Robux dulu!");
      return;
    }

    const details = cart.map(
      (x) => `${x.robux} Robux x${x.qty} = ${money(x.price * x.qty)}`
    ).join("\n");

    const message = `HALO ${STORE_NAME}! 🎮\n\nSaya mau order Robux:\n\nUsername: ${username}\n\n${details}\n\nTotal: ${money(total)}\nPembayaran: ${payment}\n\nMohon konfirmasi pesanan saya. Terima kasih!`;

    window.open(
      `https://wa.me/${WHATSAPP_ADMIN}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <main>
      <div className="top-strip">
        ★ WELCOME TO ROBUX VISEND ★ YOUR HAPPY ROBUX STORE ★
      </div>

      <nav className="navbar">
        <a href="#" className="logo">
          <span className="logo-icon">👾</span>
          <span>ROBUX<span className="logo-yellow">VISEND!</span></span>
        </a>
        <a href="#catalog" className="nav-link">SHOP NOW ↗</a>
      </nav>

      <section className="hero">
        <div className="hero-deco deco-one">✦</div>
        <div className="hero-deco deco-two">★</div>
        <div className="hero-deco deco-three">✿</div>

        <div className="hero-content">
          <div className="hero-label">✹ YOUR LITTLE ROBUX SHOP ✹</div>
          <h1>
            LET'S GET<br />
            <span>YOUR ROBUX!</span>
          </h1>
          <p>
            Need Robux? You're in the right place!
            Choose your favorite package and let's play!
          </p>
          <a href="#catalog" className="hero-button">
            EXPLORE PACKAGES <span>➜</span>
          </a>
          <div className="hero-note">★ EASY ORDER ★ FUN SHOP ★</div>
        </div>

        <div className="hero-art">
          <div className="art-card">
            <span className="art-star">✦</span>
            <span className="art-emoji">🎮</span>
            <h2>GAME<br />ON!</h2>
            <span className="art-bottom">ROBLOX TIME!</span>
          </div>
          <div className="floating f1">⭐</div>
          <div className="floating f2">🍬</div>
          <div className="floating f3">👾</div>
        </div>
      </section>

      <section className="ticker">
        <div>
          ★ ROBUX TIME ★ HAPPY GAMING ★ LET'S PLAY ★
          ROBUX TIME ★ HAPPY GAMING ★ LET'S PLAY ★
        </div>
      </section>

      <section id="catalog" className="catalog section">
        <div className="section-heading">
          <div>
            <span className="mini-label">✹ PICK YOUR FAVORITE ✹</span>
            <h2>ROBUX <span>MENU!</span></h2>
          </div>
          <div className="cart-count">🛒 {count} ITEMS</div>
        </div>

        <div className="product-grid">
          {products.map((p) => (
            <article className={`product-card ${p.color}`} key={p.id}>
              <div className="product-tag">{p.tag}</div>
              <div className="product-emoji">{p.emoji}</div>
              <div className="robux-number">{p.robux}</div>
              <div className="robux-label">ROBUX</div>
              <div className="product-price">{money(p.price)}</div>
              <button className="add-button" onClick={() => addCart(p)}>
                + ADD TO CART
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="order-section section" id="order">
        <div className="order-title">
          <span className="mini-label">✹ ALMOST THERE! ✹</span>
          <h2>YOUR <span>ORDER!</span></h2>
          <p>Check your cart and complete your order below.</p>
        </div>

        <div className="order-layout">
          <div className="order-box">
            <h3>🛒 YOUR CART</h3>
            {cart.length === 0 ? (
              <div className="empty-cart">
                <span>🧸</span>
                <p>Your cart is empty!</p>
                <small>Pick some Robux packages first.</small>
              </div>
            ) : (
              cart.map((x) => (
                <div className="cart-item" key={x.id}>
                  <div>
                    <b>{x.robux} ROBUX</b>
                    <small>{money(x.price)} / pack</small>
                  </div>
                  <div className="quantity">
                    <button onClick={() => changeQty(x.id, -1)}>−</button>
                    <b>{x.qty}</b>
                    <button onClick={() => changeQty(x.id, 1)}>+</button>
                  </div>
                </div>
              ))
            )}
            <div className="total-row">
              <span>TOTAL PAYMENT</span>
              <strong>{money(total)}</strong>
            </div>
          </div>

          <div className="order-box form-box">
            <h3>📋 ORDER DETAILS</h3>

            <label>ROBLOX USERNAME</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your Roblox username..."
            />

            <label>PAYMENT METHOD</label>
            <select
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
            >
              <option>DANA</option>
              <option>GOPAY</option>
              <option>OVO</option>
              <option>QRIS</option>
              <option>BANK TRANSFER</option>
            </select>

            <button className="checkout-button" onClick={order}>
              ORDER VIA WHATSAPP ↗
            </button>
            <small className="safe-note">
              ★ Check your username before placing an order!
            </small>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-logo">👾 ROBUX VISEND!</div>
        <p>THANKS FOR VISITING OUR LITTLE GAME STORE!</p>
        <div className="footer-stars">★ ✦ ★ ✦ ★</div>
        <small>© 2026 ROBUX VISEND. ALL RIGHTS RESERVED.</small>
      </footer>
    </main>
  );
}
