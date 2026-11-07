
"use client";

import { useState } from "react";

const STORE_NAME = "REI ROBUX";
const WHATSAPP_ADMIN = "6281234567890"; // GANTI DENGAN NOMOR WA ADMIN

// RATE ROBUX: Rp15.500 / 100 ROBUX
const RATE = 155;

const products = [
  { id: 1, robux: 100, tag: "STARTER PACK", emoji: "🎮" },
  { id: 2, robux: 200, tag: "PLAYER PACK", emoji: "👾" },
  { id: 3, robux: 300, tag: "POPULAR", emoji: "⭐" },
  { id: 4, robux: 400, tag: "GAME PACK", emoji: "🕹️" },
  { id: 5, robux: 500, tag: "BEST SELLER", emoji: "🚀" },
  { id: 6, robux: 600, tag: "SUPER PACK", emoji: "💎" },
  { id: 7, robux: 800, tag: "PRO PLAYER", emoji: "🔥" },
  { id: 8, robux: 900, tag: "ELITE PACK", emoji: "🏆" },
  { id: 9, robux: 1000, tag: "MEGA PACK", emoji: "👑" },
];

const money = (n) =>
  "Rp" + n.toLocaleString("id-ID") + ",-";

export default function Home() {
  const [cart, setCart] = useState([]);
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [payment, setPayment] = useState("QRIS");
  const [customRobux, setCustomRobux] = useState("");
  const [accepted, setAccepted] = useState(false);

  const addCart = (product) => {
    setCart((old) => {
      const found = old.find((x) => x.id === product.id);

      if (found) {
        return old.map((x) =>
          x.id === product.id
            ? { ...x, qty: x.qty + 1 }
            : x
        );
      }

      return [...old, { ...product, qty: 1 }];
    });
  };

  const addCustom = () => {
    const amount = Number(customRobux);

    if (!Number.isInteger(amount) || amount <= 0) {
      alert("Masukkan nominal Robux yang benar!");
      return;
    }

    addCart({
      id: `custom-${amount}`,
      robux: amount,
      price: amount * RATE,
      tag: "CUSTOM ORDER",
      emoji: "🎯",
    });

    setCustomRobux("");
    alert("Custom Robux berhasil ditambahkan!");
  };

  const changeQty = (id, amount) => {
    setCart((old) =>
      old
        .map((x) =>
          x.id === id
            ? { ...x, qty: x.qty + amount }
            : x
        )
        .filter((x) => x.qty > 0)
    );
  };

  const total = cart.reduce(
    (sum, x) => sum + x.price * x.qty,
    0
  );

  const count = cart.reduce(
    (sum, x) => sum + x.qty,
    0
  );

  const totalRobux = cart.reduce(
    (sum, x) => sum + x.robux * x.qty,
    0
  );

  const order = () => {
    if (!username.trim() || !displayName.trim()) {
      alert("Isi username dan display name Roblox terlebih dahulu!");
      return;
    }

    if (!cart.length) {
      alert("Pilih paket Robux terlebih dahulu!");
      return;
    }

    if (!accepted) {
      alert("Silakan setujui Terms and Conditions terlebih dahulu!");
      return;
    }

    const details = cart
      .map(
        (x) =>
          `${x.robux} Robux x${x.qty} = ${money(x.price * x.qty)}`
      )
      .join("\n");

    const message = `HALO ${STORE_NAME}! 🎮

Saya ingin melakukan order Robux.

ROBLOX USERNAME: ${username}
DISPLAY NAME: ${displayName}

DETAIL PESANAN:
${details}

TOTAL ROBUX: ${totalRobux} R
TOTAL PEMBAYARAN: ${money(total)}

METODE PEMBAYARAN: ${payment}

Saya sudah membaca dan menyetujui Terms and Conditions.

Mohon konfirmasi pesanan saya. Terima kasih!`;

    window.open(
      `https://wa.me/${WHATSAPP_ADMIN}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <main>

      {/* TOP WELCOME */}
      <div className="top-strip">
        ★ WELCOME TO REI ROBUX ★
        YOUR NEXT GAME STARTS HERE ★
      </div>

      {/* NAVBAR */}
      <nav className="navbar">
        <a href="#" className="logo">
          <span className="logo-icon">🎮</span>
          <span>
            REI <span className="logo-yellow">ROBUX!</span>
          </span>
        </a>

        <a href="#catalog" className="nav-link">
          SHOP NOW ↗
        </a>
      </nav>

      {/* HERO */}
      <section className="hero">

        <div className="hero-deco deco-one">★</div>
        <div className="hero-deco deco-two">✦</div>
        <div className="hero-deco deco-three">🎮</div>

        <div className="hero-content">

          <div className="hero-label">
            ✹ WELCOME PLAYER! ✹
          </div>

          <h1>
            READY TO<br />
            <span>GET YOUR ROBUX?</span>
          </h1>

          <p>
            Welcome to REI ROBUX!
            Your little corner for Robux shopping.
            Pick your package, place your order
            and get ready to play!
          </p>

          <a href="#catalog" className="hero-button">
            LET'S SHOP! ➜
          </a>

          <div className="hero-note">
            ★ ROBUX CLEAN ★ EASY ORDER ★ HAPPY GAMING ★
          </div>

        </div>

        <div className="hero-art">
          <div className="art-card">
            <span className="art-star">✦</span>
            <span className="art-emoji">👾</span>
            <h2>
              GAME<br />ON!
            </h2>
            <span className="art-bottom">
              REI ROBUX STORE
            </span>
          </div>

          <div className="floating f1">⭐</div>
          <div className="floating f2">🎮</div>
          <div className="floating f3">💎</div>
        </div>

      </section>

      {/* TICKER */}
      <section className="ticker">
        <div>
          ★ REI ROBUX ★ HAPPY GAMING ★
          ROBUX TIME ★ LET'S PLAY ★
          REI ROBUX ★ HAPPY GAMING ★
        </div>
      </section>

      {/* BENEFITS */}
      <section className="section">
        <div className="product-grid">

          <article className="product-card blue">
            <div className="product-emoji">💎</div>
            <h3>ROBUX CLEAN</h3>
            <p>Clean Robux for your account!</p>
          </article>

          <article className="product-card yellow">
            <div className="product-emoji">🤝</div>
            <h3>AVAIL REKBER</h3>
            <p>Rekening bersama tersedia.</p>
          </article>

          <article className="product-card green">
            <div className="product-emoji">💳</div>
            <h3>AVAIL QRIS</h3>
            <p>Easy payment with QRIS.</p>
          </article>

        </div>
      </section>

      {/* CATALOG */}
      <section id="catalog" className="catalog section">

        <div className="section-heading">
          <div>
            <span className="mini-label">
              ✹ CHOOSE YOUR PACKAGE ✹
            </span>
            <h2>
              ROBUX <span>MENU!</span>
            </h2>
            <p>
              Rate: Rp15.500 / 100 Robux
            </p>
          </div>

          <div className="cart-count">
            🛒 {count} ITEMS
          </div>
        </div>

        <div className="product-grid">

          {products.map((p) => (
            <article
              className={`product-card ${
                ["blue", "yellow", "pink", "green", "purple", "orange"][
                  (p.id - 1) % 6
                ]
              }`}
              key={p.id}
            >

              <div className="product-tag">
                {p.tag}
              </div>

              <div className="product-emoji">
                {p.emoji}
              </div>

              <div className="robux-number">
                {p.robux}
              </div>

              <div className="robux-label">
                ROBUX
              </div>

              <div className="product-price">
                {money(p.robux * RATE)}
              </div>

              <button
                className="add-button"
                onClick={() =>
                  addCart({
                    ...p,
                    price: p.robux * RATE,
                  })
                }
              >
                + ADD TO CART
              </button>

            </article>
          ))}

        </div>

        {/* CUSTOM ROBUX */}
        <div className="order-box custom-box">

          <span className="mini-label">
            ✹ MAKE YOUR OWN PACKAGE ✹
          </span>

          <h3>WANT ANOTHER AMOUNT? 🎯</h3>

          <p>
            Choose any Robux amount you want!
            Price automatically calculated at Rp155 per Robux.
          </p>

          <div className="custom-input">
            <input
              type="number"
              min="1"
              step="1"
              value={customRobux}
              onChange={(e) =>
                setCustomRobux(e.target.value)
              }
              placeholder="Example: 750"
            />

            <button
              className="add-button"
              onClick={addCustom}
            >
              + ADD CUSTOM
            </button>
          </div>

          {Number(customRobux) > 0 &&
            Number.isInteger(Number(customRobux)) && (
              <div className="custom-result">
                {customRobux} ROBUX =
                {" "}
                <strong>
                  {money(Number(customRobux) * RATE)}
                </strong>
              </div>
            )}

        </div>

      </section>

      {/* ORDER */}
      <section className="order-section section" id="order">

        <div className="order-title">
          <span className="mini-label">
            ✹ ALMOST THERE! ✹
          </span>

          <h2>
            YOUR <span>ORDER!</span>
          </h2>

          <p>
            Check your cart and complete your order below.
          </p>
        </div>

        <div className="order-layout">

          {/* CART */}
          <div className="order-box">

            <h3>🛒 YOUR CART</h3>

            {cart.length === 0 ? (
              <div className="empty-cart">
                <span>🎮</span>
                <p>Your cart is empty!</p>
                <small>
                  Pick some Robux packages first.
                </small>
              </div>
            ) : (

              cart.map((x) => (
                <div className="cart-item" key={x.id}>

                  <div>
                    <b>{x.robux} ROBUX</b>
                    <small>
                      {money(x.price)} / pack
                    </small>
                  </div>

                  <div className="quantity">

                    <button
                      onClick={() =>
                        changeQty(x.id, -1)
                      }
                    >
                      −
                    </button>

                    <b>{x.qty}</b>

                    <button
                      onClick={() =>
                        changeQty(x.id, 1)
                      }
                    >
                      +
                    </button>

                  </div>

                </div>
              ))

            )}

            <div className="total-row">
              <span>TOTAL PAYMENT</span>
              <strong>{money(total)}</strong>
            </div>

            <div className="total-row">
              <span>TOTAL ROBUX</span>
              <strong>{totalRobux} R</strong>
            </div>

          </div>

          {/* FORM */}
          <div className="order-box form-box">

            <h3>📋 ORDER DETAILS</h3>

            <label>ROBLOX USERNAME</label>

            <input
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              placeholder="Enter your username..."
            />

            <label>ROBLOX DISPLAY NAME</label>

            <input
              value={displayName}
              onChange={(e) =>
                setDisplayName(e.target.value)
              }
              placeholder="Enter your display name..."
            />

            <label>PAYMENT METHOD</label>

            <select
              value={payment}
              onChange={(e) =>
                setPayment(e.target.value)
              }
            >
              <option value="QRIS">
                QRIS
              </option>

              <option value="REKBER">
                REKBER
              </option>
            </select>

            <div className="terms-confirm">
              <label className="terms-check">
                <input
                  type="checkbox"
                  checked={accepted}
                  onChange={(e) =>
                    setAccepted(e.target.checked)
                  }
                />

                I agree to the Terms and Conditions.
              </label>
            </div>

            <button
              className="checkout-button"
              onClick={order}
            >
              ORDER VIA WHATSAPP ↗
            </button>

            <small className="safe-note">
              ★ Double-check your Roblox details before ordering!
            </small>

          </div>

        </div>

      </section>

      {/* TERMS */}
      <section className="section terms-section">

        <div className="section-heading">
          <div>
            <span className="mini-label">
              ✹ PLEASE READ BEFORE ORDERING ✹
            </span>

            <h2>
              TERMS & <span>CONDITIONS!</span>
            </h2>
          </div>
        </div>

        <div className="order-box terms-box">

          <div className="term-item">
            <span>01</span>
            <div>
              <b>ACCOUNT INFORMATION</b>
              <p>
                Customer hanya perlu memberikan
                Username dan Display Name Roblox.
              </p>
            </div>
          </div>

          <div className="term-item">
            <span>02</span>
            <div>
              <b>ACCOUNT VERIFICATION</b>
              <p>
                Akun wajib sudah terverifikasi 18+.
              </p>
            </div>
          </div>

          <div className="term-item">
            <span>03</span>
            <div>
              <b>RECEIVING LIMIT</b>
              <p>
                Pastikan akun belum mencapai batas
                penerimaan Robux.
              </p>
            </div>
          </div>

          <div className="term-item">
            <span>04</span>
            <div>
              <b>NO REFUND</b>
              <p>
                Pastikan Username dan Display Name
                sudah benar. Tidak ada refund apabila
                Robux sudah berhasil masuk.
              </p>
            </div>
          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer>

        <div className="footer-logo">
          🎮 REI ROBUX!
        </div>

        <p>
          THANKS FOR VISITING REI ROBUX!
        </p>

        <p>
          YOUR GAME. YOUR STYLE. YOUR ROBUX.
        </p>

        <div className="footer-stars">
          ★ ✦ 🎮 ✦ ★
        </div>

        <small>
          © 2026 REI ROBUX. ALL RIGHTS RESERVED.
        </small>

      </footer>

    </main>
  );
}
