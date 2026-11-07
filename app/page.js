
"use client";

import { useState } from "react";

const RATE = 15500;
const WHATSAPP = "628XXXXXXXXXX";

const packages = [
  { amount: 50, tag: "STARTER", icon: "★" },
  { amount: 100, tag: "POPULAR", icon: "⚡" },
  { amount: 200, tag: "BOOST", icon: "🚀" },
  { amount: 300, tag: "PLAYER", icon: "🎮" },
  { amount: 500, tag: "SUPER", icon: "🏆" },
  { amount: 1000, tag: "LEGEND", icon: "👑" },
];

const money = (value) =>
  "Rp" + value.toLocaleString("id-ID");

export default function Home() {
  const [amount, setAmount] = useState(100);
  const [custom, setCustom] = useState("");
  const [username, setUsername] = useState("");
  const [method, setMethod] = useState("Game Pass");

  const price = Math.ceil((amount / 100) * RATE);

  function choosePackage(value) {
    setAmount(value);
    setCustom("");
  }

  function chooseCustom() {
    const value = Number(custom);

    if (!Number.isInteger(value) || value < 1) {
      alert("Masukkan jumlah Robux yang valid!");
      return;
    }

    setAmount(value);
  }

  function orderNow() {
    if (!username.trim()) {
      alert("Isi username Roblox kamu dulu!");
      return;
    }

    if (WHATSAPP === "628XXXXXXXXXX") {
      alert("Nomor WhatsApp admin belum diatur.");
      return;
    }

    const message = [
      "HALO REI ROBUX! 🎮",
      "",
      "Saya ingin memesan Robux.",
      "",
      `Username Roblox: ${username.trim()}`,
      `Jumlah Robux: ${amount} R$`,
      `Metode: ${method}`,
      `Total: ${money(price)}`,
      "",
      "Mohon info langkah selanjutnya. Terima kasih!",
    ].join("\n");

    window.open(
      `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  }

  return (
    <main>
      <div className="top-strip">
        <span>★ WELCOME TO THE PLAYGROUND ★</span>
        <span>ROBLOX TIME! LET'S GO!</span>
      </div>

      <nav className="navbar">
        <a className="brand" href="#">
          <span className="brand-mark">R!</span>
          <span>REI<span className="brand-yellow">ROBUX</span></span>
        </a>

        <div className="nav-links">
          <a href="#home">HOME</a>
          <a href="#packages">PACKAGES</a>
          <a href="#how">HOW TO ORDER</a>
        </div>

        <a href="#order" className="nav-order">
          ORDER NOW <span>↗</span>
        </a>
      </nav>

      <section className="hero" id="home">
        <div className="hero-pattern"></div>

        <div className="hero-content">
          <div className="hero-sticker">
            <span>✦</span> HEY PLAYER!
          </div>

          <h1>
            READY
            <br />
            TO <span>PLAY?</span>
          </h1>

          <p>
            Your game, your rules!
            <br />
            Saatnya bikin petualangan Roblox kamu
            jadi makin seru bersama REI ROBUX.
          </p>

          <div className="hero-actions">
            <a href="#packages" className="yellow-button">
              GET YOUR ROBUX <span>➜</span>
            </a>
            <span className="hero-note">LET'S HAVE FUN!</span>
          </div>

          <div className="hero-mini">
            <span>★</span> GAME ON. WORRY OFF.
          </div>
        </div>

        <div className="hero-visual">
          <div className="sun-shape"></div>
          <div className="hero-star star-a">✦</div>
          <div className="hero-star star-b">★</div>
          <div className="hero-star star-c">✳</div>

          <div className="hero-game-card">
            <div className="game-card-top">
              <span>PLAYER 001</span>
              <span>★ ★ ★</span>
            </div>

            <div className="block-character">
              <div className="character-hair"></div>
              <div className="character-head">
                <span className="eye"></span>
                <span className="eye"></span>
                <span className="mouth"></span>
              </div>
              <div className="character-body">R!</div>
              <div className="character-leg left-leg"></div>
              <div className="character-leg right-leg"></div>
            </div>

            <div className="game-card-bottom">
              <strong>SUPER PLAYER</strong>
              <span>LEVEL UP YOUR WORLD!</span>
            </div>
          </div>

          <div className="floating-robux">R$</div>
          <div className="floating-bubble">WOW!</div>
          <div className="floating-lightning">ϟ</div>
        </div>

        <div className="hero-bottom-label">
          <span>✦</span> THE HAPPIEST ROBUX STOP <span>✦</span>
        </div>
      </section>

      <section className="ticker">
        <div>
          ★ ROBLOX ★ ROBUX ★ GOOD VIBES ★ GAME ON ★
          ROBLOX ★ ROBUX ★ GOOD VIBES ★ GAME ON ★
        </div>
      </section>

      <section className="features">
        <div className="feature-item">
          <span className="feature-icon blue-icon">⚡</span>
          <div>
            <strong>EASY ORDER</strong>
            <small>Pesan dengan praktis</small>
          </div>
        </div>

        <div className="feature-item">
          <span className="feature-icon yellow-icon">🎮</span>
          <div>
            <strong>GAMER ZONE</strong>
            <small>Untuk petualanganmu</small>
          </div>
        </div>

        <div className="feature-item">
          <span className="feature-icon orange-icon">💬</span>
          <div>
            <strong>CHAT ADMIN</strong>
            <small>Pesan lewat WhatsApp</small>
          </div>
        </div>
      </section>

      <section className="packages-section" id="packages">
        <div className="section-title">
          <span className="eyebrow">PICK YOUR POWER-UP</span>
          <h2>
            CHOOSE YOUR <span>ROBUX!</span>
          </h2>
          <p>Pilih paket favoritmu dan mulai petualangan!</p>
          <div className="title-decoration">✦ ━━━━━ ★ ━━━━━ ✦</div>
        </div>

        <div className="package-grid">
          {packages.map((item) => (
            <button
              key={item.amount}
              className={`package-card ${
                amount === item.amount && !custom ? "selected" : ""
              }`}
              onClick={() => choosePackage(item.amount)}
            >
              {item.amount === 100 && (
                <span className="popular-ribbon">BEST PICK!</span>
              )}

              <span className="package-tag">{item.tag}</span>
              <span className="package-icon">{item.icon}</span>
              <strong className="package-number">
                {item.amount.toLocaleString("id-ID")}
              </strong>
              <span className="package-unit">ROBUX</span>
              <span className="package-price">
                {money(Math.ceil((item.amount / 100) * RATE))}
              </span>
              <span className="select-label">
                {amount === item.amount && !custom
                  ? "✓ SELECTED"
                  : "SELECT PACKAGE"}
              </span>
            </button>
          ))}
        </div>

        <div className="custom-card">
          <div className="custom-decoration">✳</div>
          <div className="custom-copy">
            <span className="eyebrow">MAKE YOUR OWN PACKAGE</span>
            <h3>WANT A CUSTOM AMOUNT?</h3>
            <p>Masukkan jumlah Robux sesuai keinginanmu!</p>
          </div>

          <div className="custom-controls">
            <input
              type="number"
              min="1"
              placeholder="Contoh: 750"
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
            />
            <button onClick={chooseCustom}>USE THIS ↗</button>
          </div>
        </div>
      </section>

      <section className="order-section" id="order">
        <div className="order-heading">
          <span className="eyebrow">ALMOST THERE, PLAYER!</span>
          <h2>LET'S MAKE IT <span>OFFICIAL.</span></h2>
          <p>Isi detail pesananmu di bawah ini.</p>
        </div>

        <div className="order-layout">
          <div className="order-form">
            <div className="form-heading">
              <span>01</span>
              <h3>YOUR PLAYER INFO</h3>
            </div>

            <label htmlFor="username">ROBLOX USERNAME</label>
            <input
              id="username"
              type="text"
              placeholder="Masukkan username Roblox"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label htmlFor="method">PURCHASE METHOD</label>
            <select
              id="method"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
            >
              <option>Game Pass</option>
              <option>Group Payout</option>
            </select>

            <div className="form-tip">
              <span>💡</span>
              Pastikan username Roblox kamu sudah benar sebelum memesan.
            </div>
          </div>

          <div className="receipt-card">
            <div className="receipt-top">
              <span>★ YOUR ORDER ★</span>
              <span>REI #001</span>
            </div>

            <div className="receipt-robux">
              <span>R$</span>
              <div>
                <strong>{amount.toLocaleString("id-ID")}</strong>
                <small>ROBUX PACKAGE</small>
              </div>
            </div>

            <div className="receipt-line">
              <span>Robux amount</span>
              <strong>{amount.toLocaleString("id-ID")} R$</strong>
            </div>

            <div className="receipt-line">
              <span>Price / 100 R$</span>
              <strong>Rp15.500</strong>
            </div>

            <div className="receipt-total">
              <span>TOTAL PRICE</span>
              <strong>{money(price)}</strong>
            </div>

            <button className="checkout-button" onClick={orderNow}>
              ORDER VIA WHATSAPP <span>↗</span>
            </button>

            <p className="receipt-note">
              THANK YOU FOR PLAYING WITH REI ROBUX!
            </p>
          </div>
        </div>
      </section>

      <section className="how-section" id="how">
        <div className="section-title">
          <span className="eyebrow">SUPER SIMPLE!</span>
          <h2>HOW TO <span>ORDER?</span></h2>
          <p>Tiga langkah gampang untuk mulai pesan.</p>
        </div>

        <div className="steps-grid">
          <div className="step-card">
            <span className="step-number">01</span>
            <div className="step-emoji">🎮</div>
            <h3>PICK YOUR ROBUX</h3>
            <p>Pilih paket Robux yang kamu mau.</p>
            <span className="step-star">★</span>
          </div>

          <div className="step-card">
            <span className="step-number">02</span>
            <div className="step-emoji">📝</div>
            <h3>FILL THE FORM</h3>
            <p>Isi username dan metode pembelian.</p>
            <span className="step-star">✦</span>
          </div>

          <div className="step-card">
            <span className="step-number">03</span>
            <div className="step-emoji">💬</div>
            <h3>CHAT THE ADMIN</h3>
            <p>Kirim detail pesanan melalui WhatsApp.</p>
            <span className="step-star">⚡</span>
          </div>
        </div>
      </section>

      <section className="last-banner">
        <div className="banner-stars">★ ✦ ★ ✦ ★</div>
        <h2>GAME ON, PLAYER!</h2>
        <p>See you in your next Roblox adventure.</p>
        <a href="#packages" className="yellow-button">
          LET'S GO! ↗
        </a>
      </section>

      <footer className="footer">
        <a className="brand footer-brand" href="#">
          <span className="brand-mark">R!</span>
          <span>REI<span className="brand-yellow">ROBUX</span></span>
        </a>
        <p>MADE FOR PLAYERS. POWERED BY GOOD VIBES.</p>
        <span className="footer-copy">© 2026 REI ROBUX</span>
      </footer>
    </main>
  );
}
