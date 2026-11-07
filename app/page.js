
"use client";

import { useState } from "react";

const WHATSAPP = "6287838482178";
const RATE = 15500;

const packages = [
  { amount: 50, color: "blue" },
  { amount: 100, color: "lime", popular: true },
  { amount: 200, color: "yellow" },
  { amount: 300, color: "orange" },
  { amount: 500, color: "purple" },
  { amount: 1000, color: "green" },
];

function money(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function Home() {
  const [amount, setAmount] = useState(100);
  const [customAmount, setCustomAmount] = useState("");
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");

  const price = Math.ceil((amount / 100) * RATE);

  function selectPackage(value) {
    setAmount(value);
    setCustomAmount("");
  }

  function changeCustom(value) {
    setCustomAmount(value);
    if (value === "") return;

    const number = Number(value);
    if (Number.isInteger(number) && number > 0) {
      setAmount(number);
    }
  }

  function orderNow() {
    if (!username.trim() || !displayName.trim()) {
      alert("Username dan Display Name wajib diisi!");
      return;
    }

    if (!Number.isInteger(amount) || amount < 1) {
      alert("Masukkan jumlah Robux yang valid!");
      return;
    }

    const message = [
      "YO REI ROBUX! 🎮",
      "",
      "I WANT TO ORDER ROBUX!",
      "",
      `Username: ${username.trim()}`,
      `Display Name: ${displayName.trim()}`,
      `Robux: ${amount} R$`,
      "Payment: QRIS",
      `Total: ${money(price)}`,
      "",
      "Please assist me with my order. Thank you!",
    ].join("\n");

    window.open(
      `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  }

  return (
    <main>
      <div className="top-strip">
        <span>★ REI ROBUX ARCADE ★</span>
        <span>INSERT COINS & START PLAYING!</span>
        <span>★ EST. 2026 ★</span>
      </div>

      <nav className="navbar">
        <a href="#" className="brand">
          <span className="brand-icon">R$</span>
          <span>REI<span className="brand-highlight">ROBUX</span></span>
        </a>

        <div className="nav-links">
          <a href="#home">HOME</a>
          <a href="#packages">PACKAGES</a>
          <a href="#order">ORDER</a>
          <a href="#terms">T&C</a>
        </div>

        <a href="#packages" className="nav-order">PLAY NOW ↗</a>
      </nav>

      <section className="hero" id="home">
        <div className="hero-grid"></div>

        <div className="hero-content">
          <div className="hero-tag">
            <span className="live-dot"></span>
            WELCOME TO THE PLAYGROUND
          </div>

          <h1>
            GAME
            <br />
            <span>ON.</span>
            <br />
            <span className="outline-text">ROBUX UP!</span>
          </h1>

          <p>
            Your Roblox adventure starts here.
            Pick your Robux, make your order,
            and get ready to level up!
          </p>

          <div className="hero-actions">
            <a href="#packages" className="main-button">
              GET ROBUX <span>↗</span>
            </a>
            <a href="#terms" className="text-button">
              READ THE RULES +
            </a>
          </div>

          <div className="hero-stats">
            <div><strong>R$</strong><span>ROBUX STORE</span></div>
            <div><strong>QRIS</strong><span>EASY PAYMENT</span></div>
            <div><strong>2026</strong><span>GAME SEASON</span></div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-sticker sticker-star">★</div>
          <div className="visual-sticker sticker-boom">BOOM!</div>
          <div className="visual-sticker sticker-play">LET'S PLAY!</div>

          <div className="game-console">
            <div className="console-top">
              <span>REI ARCADE</span>
              <span>● ONLINE</span>
            </div>
            <div className="console-screen">
              <div className="screen-symbol">R$</div>
              <div className="screen-text">LEVEL UP!</div>
              <div className="screen-stars">✦ ★ ✦</div>
            </div>
            <div className="console-controls">
              <div className="dpad">
                <span>✚</span>
              </div>
              <div className="console-buttons">
                <span>A</span>
                <span>B</span>
              </div>
            </div>
          </div>
          <div className="visual-caption">YOUR NEXT LEVEL STARTS HERE_</div>
        </div>

        <div className="hero-bottom-label">
          <span>PRESS START TO CONTINUE</span>
          <span>▼ SCROLL DOWN ▼</span>
        </div>
      </section>

      <div className="marquee">
        <div>
          ★ REI ROBUX ★ ROBUX CLEAN ★ LEVEL UP ★
          AVAILABLE REKBER ★ QRIS PAYMENT ★
          REI ROBUX ★ ROBUX CLEAN ★ LEVEL UP ★
        </div>
      </div>

      <section className="packages-section" id="packages">
        <div className="section-topline">
          <span>01 / SELECT YOUR ITEM</span>
          <span>PLAYER MARKETPLACE</span>
        </div>

        <div className="section-heading">
          <span className="mini-tag">CHOOSE YOUR POWER-UP</span>
          <h2>ROBUX <span>SHOP.</span></h2>
          <p>Pick your package. Get ready to play.</p>
        </div>

        <div className="package-grid">
          {packages.map((item) => (
            <button
              key={item.amount}
              type="button"
              onClick={() => selectPackage(item.amount)}
              className={`package-card ${item.color} ${
                amount === item.amount && !customAmount ? "selected" : ""
              }`}
            >
              {item.popular && <span className="popular-label">HOT PICK ★</span>}
              <span className="package-icon">R$</span>
              <strong>{item.amount.toLocaleString("id-ID")}</strong>
              <span className="package-unit">ROBUX</span>
              <span className="package-price">
                {money(Math.ceil((item.amount / 100) * RATE))}
              </span>
              <span className="package-select">
                {amount === item.amount && !customAmount
                  ? "✓ SELECTED"
                  : "SELECT ITEM →"}
              </span>
            </button>
          ))}
        </div>

        <div className="custom-amount">
          <div>
            <span className="custom-label">CUSTOM ITEM</span>
            <h3>BUILD YOUR OWN PACKAGE!</h3>
            <p>Enter the Robux amount you want.</p>
          </div>
          <input
            type="number"
            min="1"
            step="1"
            placeholder="ENTER AMOUNT..."
            value={customAmount}
            onChange={(e) => changeCustom(e.target.value)}
          />
        </div>
      </section>

      <section className="order-section" id="order">
        <div className="section-topline">
          <span>02 / PLAYER CHECKOUT</span>
          <span>READY PLAYER ONE?</span>
        </div>

        <div className="order-layout">
          <div className="order-copy">
            <span className="mini-tag">ONE MORE STEP!</span>
            <h2>LET'S MAKE<br /><span>IT OFFICIAL.</span></h2>
            <p>
              Enter your Roblox details, check your order,
              and continue to WhatsApp.
            </p>

            <div className="checkout-sticker">
              <span>⚡</span>
              <div>
                <strong>NO PASSWORD NEEDED!</strong>
                <p>Username and Display Name only.</p>
              </div>
            </div>
          </div>

          <div className="checkout-card">
            <div className="checkout-header">
              <span>▣ PLAYER CHECKOUT</span>
              <span>01 — 04</span>
            </div>

            <label htmlFor="username">ROBLOX USERNAME</label>
            <input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your username..."
            />

            <label htmlFor="displayName">DISPLAY NAME</label>
            <input
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Your display name..."
            />

            <label>PAYMENT METHOD</label>
            <div className="payment-option">
              <div className="qris-icon">QR</div>
              <div>
                <strong>QRIS PAYMENT</strong>
                <small>SCAN & PAY</small>
              </div>
              <span className="payment-check">✓</span>
            </div>

            <div className="order-summary">
              <div>
                <span>SELECTED ROBUX</span>
                <strong>{amount.toLocaleString("id-ID")} R$</strong>
              </div>
              <div>
                <span>PAYMENT</span>
                <strong>QRIS</strong>
              </div>
              <div className="total-line">
                <span>TOTAL PRICE</span>
                <strong>{money(price)}</strong>
              </div>
            </div>

            <button type="button" onClick={orderNow} className="checkout-button">
              CONTINUE VIA WHATSAPP ↗
            </button>

            <p className="checkout-note">
              Payment instructions and QRIS details will be confirmed by admin.
            </p>
          </div>
        </div>
      </section>

      <section className="terms-section" id="terms">
        <div className="section-topline">
          <span>03 / PLAYER RULEBOOK</span>
          <span>READ BEFORE PLAYING</span>
        </div>

        <div className="section-heading">
          <span className="mini-tag">IMPORTANT!</span>
          <h2>RULES OF <span>THE GAME.</span></h2>
          <p>Read these terms before making your order.</p>
        </div>

        <div className="terms-card">
          <div className="terms-header">
            <strong>REI ROBUX // TERMS & CONDITIONS</strong>
            <span>V.2026</span>
          </div>

          <div className="term-row">
            <span className="term-index">I</span>
            <div>
              <h3>ACCOUNT INFORMATION</h3>
              <p>Hanya membutuhkan Username dan Display Name Roblox.</p>
            </div>
          </div>

          <div className="term-row">
            <span className="term-index">II</span>
            <div>
              <h3>ACCOUNT REQUIREMENT</h3>
              <p>
                Akun wajib memenuhi persyaratan verifikasi usia 18+
                sesuai ketentuan yang berlaku.
              </p>
            </div>
          </div>

          <div className="term-row">
            <span className="term-index">III</span>
            <div>
              <h3>RECEIVING LIMIT</h3>
              <p>
                Pastikan akun belum terkena limit dan masih dapat
                menerima Robux.
              </p>
            </div>
          </div>

          <div className="term-row">
            <span className="term-index">IV</span>
            <div>
              <h3>DOUBLE CHECK YOUR DATA</h3>
              <p>
                Pastikan Username dan Display Name sudah tepat.
                Tidak ada refund jika Robux sudah berhasil masuk.
              </p>
            </div>
          </div>

          <div className="terms-warning">
            ⚠️ Pastikan semua informasi benar sebelum pesanan diproses.
          </div>
        </div>

        <div className="store-badges">
          <div className="store-badge">
            <span>✦</span>
            <div>
              <strong>ROBUX CLEAN</strong>
              <small>STORE INFORMATION</small>
            </div>
          </div>
          <div className="store-badge">
            <span>▣</span>
            <div>
              <strong>REKBER AVAILABLE</strong>
              <small>SAFE TRANSACTION OPTION</small>
            </div>
          </div>
          <div className="store-badge">
            <span>QR</span>
            <div>
              <strong>QRIS AVAILABLE</strong>
              <small>EASY PAYMENT</small>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <a href="#" className="brand">
          <span className="brand-icon">R$</span>
          <span>REI<span className="brand-highlight">ROBUX</span></span>
        </a>
        <p>GAME HARD. PLAY HAPPY. LEVEL UP. ★</p>
        <span>© 2026 REI ROBUX — ALL RIGHTS RESERVED.</span>
      </footer>
    </main>
  );
}
