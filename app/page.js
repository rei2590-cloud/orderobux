
"use client";

import { useState } from "react";

const WHATSAPP = "6287838482178";
const RATE = 15500;

const packages = [
  { amount: 50, color: "blue", popular: false },
  { amount: 100, color: "yellow", popular: true },
  { amount: 200, color: "pink", popular: false },
  { amount: 300, color: "green", popular: false },
  { amount: 500, color: "purple", popular: false },
  { amount: 1000, color: "orange", popular: false },
];

function formatPrice(value) {
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

  function choosePackage(value) {
    setAmount(value);
    setCustomAmount("");
  }

  function handleCustomAmount(value) {
    setCustomAmount(value);
    const number = Number(value);

    if (number > 0 && Number.isInteger(number)) {
      setAmount(number);
    }
  }

  function orderNow() {
    if (!username.trim() || !displayName.trim()) {
      alert("Isi Username dan Display Name terlebih dahulu!");
      return;
    }

    if (!Number.isInteger(amount) || amount < 1) {
      alert("Masukkan jumlah Robux yang valid!");
      return;
    }

    const message = [
      "HALO REI ROBUX! 🎮",
      "",
      "Saya ingin melakukan pemesanan Robux.",
      "",
      `Username: ${username.trim()}`,
      `Display Name: ${displayName.trim()}`,
      `Jumlah Robux: ${amount} R$`,
      "Metode: Robux Visend",
      `Total: ${formatPrice(price)}`,
      "",
      "Mohon bantu proses pesanan saya. Terima kasih!",
    ].join("\n");

    window.open(
      `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  }

  return (
    <main>
      <div className="announcement">
        ⭐ WELCOME TO REI ROBUX PLAYGROUND! ⭐
      </div>

      <nav className="navbar">
        <a href="#" className="logo">
          <span className="logo-icon">R$</span>
          <span>REI <b>ROBUX</b></span>
        </a>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#packages">Packages</a>
          <a href="#terms">Terms & Conditions</a>
        </div>

        <a href="#order" className="nav-button">ORDER NOW ✦</a>
      </nav>

      <section className="hero" id="home">
        <div className="hero-content">
          <div className="hero-label">🎮 YOUR HAPPY ROBUX STORE</div>

          <h1>
            LEVEL UP
            <br />
            YOUR <span>GAME!</span>
          </h1>

          <p>
            Need more Robux? You're in the right place!
            Let's make your Roblox adventure more exciting!
          </p>

          <div className="hero-buttons">
            <a href="#packages" className="primary-button">
              GET YOUR ROBUX →
            </a>
            <a href="#terms" className="secondary-button">
              READ T&C
            </a>
          </div>

          <div className="hero-features">
            <span>✨ ROBUX CLEAN</span>
            <span>💳 REKBER AVAILABLE</span>
            <span>💛 FRIENDLY SERVICE</span>
          </div>
        </div>

        <div className="hero-art">
          <div className="floating-star star-one">★</div>
          <div className="floating-star star-two">✦</div>
          <div className="floating-star star-three">✧</div>

          <div className="robux-card">
            <div className="robux-symbol">R$</div>
            <div className="robux-sparkle">✦</div>
            <div className="robux-caption">LET'S PLAY!</div>
          </div>

          <div className="bubble bubble-one">WOW!</div>
          <div className="bubble bubble-two">+ ROBUX</div>
        </div>
      </section>

      <div className="ticker">
        <div>
          ✦ REI ROBUX ✦ ROBUX CLEAN ✦ HAPPY GAMING ✦
          AVAILABLE REKBER & QRIS ✦ REI ROBUX ✦
          ROBUX CLEAN ✦ HAPPY GAMING ✦
        </div>
      </div>

      <section className="packages-section" id="packages">
        <div className="section-heading">
          <span className="section-label">PICK YOUR FAVORITE!</span>
          <h2>ROBUX <span>PACKAGES</span></h2>
          <p>Choose your Robux package and let's go!</p>
        </div>

        <div className="package-grid">
          {packages.map((item) => (
            <button
              type="button"
              key={item.amount}
              className={`package-card ${item.color} ${
                amount === item.amount && !customAmount ? "selected" : ""
              }`}
              onClick={() => choosePackage(item.amount)}
            >
              {item.popular && <span className="popular-tag">POPULAR!</span>}
              <span className="package-icon">R$</span>
              <strong>{item.amount.toLocaleString("id-ID")}</strong>
              <span className="robux-text">ROBUX</span>
              <span className="package-price">
                {formatPrice(Math.ceil((item.amount / 100) * RATE))}
              </span>
              <span className="choose-text">
                {amount === item.amount && !customAmount
                  ? "✓ SELECTED"
                  : "SELECT PACKAGE"}
              </span>
            </button>
          ))}
        </div>

        <div className="custom-box">
          <div>
            <h3>WANT A DIFFERENT AMOUNT?</h3>
            <p>Enter your own Robux amount here!</p>
          </div>
          <input
            type="number"
            min="1"
            step="1"
            placeholder="Example: 750"
            value={customAmount}
            onChange={(e) => handleCustomAmount(e.target.value)}
          />
        </div>
      </section>

      <section className="order-section" id="order">
        <div className="order-container">
          <div className="order-info">
            <span className="section-label">READY TO ORDER?</span>
            <h2>LET'S MAKE YOUR <span>ORDER!</span></h2>
            <p>
              Fill in your Roblox account details correctly.
              Then continue your order through WhatsApp!
            </p>

            <div className="order-note">
              <span>💡</span>
              <p>
                Only Username and Display Name are needed.
                Never share your password or verification codes.
              </p>
            </div>
          </div>

          <div className="order-form">
            <div className="form-title">
              <span>🛒</span>
              <h3>YOUR ORDER</h3>
            </div>

            <label htmlFor="username">ROBLOX USERNAME</label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label htmlFor="displayName">ROBLOX DISPLAY NAME</label>
            <input
              id="displayName"
              type="text"
              placeholder="Enter your display name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />

            <label>PAYMENT METHOD</label>
            <div className="payment-method">
              <span>💎</span>
              <strong>ROBUX VISEND</strong>
              <span className="payment-check">✓</span>
            </div>

            <div className="receipt">
              <div>
                <span>Robux Amount</span>
                <strong>{amount.toLocaleString("id-ID")} R$</strong>
              </div>
              <div>
                <span>Price</span>
                <strong>{formatPrice(price)}</strong>
              </div>
              <div className="receipt-total">
                <span>TOTAL PAYMENT</span>
                <strong>{formatPrice(price)}</strong>
              </div>
            </div>

            <button
              type="button"
              className="order-button"
              onClick={orderNow}
            >
              ORDER VIA WHATSAPP →
            </button>

            <p className="form-disclaimer">
              Please double-check your account details before ordering.
            </p>
          </div>
        </div>
      </section>

      <section className="terms-section" id="terms">
        <div className="section-heading">
          <span className="section-label">IMPORTANT INFORMATION!</span>
          <h2>TERMS & <span>CONDITIONS</span></h2>
          <p>Please read before placing your order!</p>
        </div>

        <div className="terms-card">
          <div className="terms-top">
            <strong>📋 PLAYER RULEBOOK</strong>
            <strong>REI ROBUX ★</strong>
          </div>

          <div className="term-item">
            <span className="term-number">I</span>
            <div>
              <h3>ONLY TWO DETAILS!</h3>
              <p>
                Hanya membutuhkan Username dan Display Name Roblox.
              </p>
            </div>
          </div>

          <div className="term-item">
            <span className="term-number">II</span>
            <div>
              <h3>ACCOUNT REQUIREMENT</h3>
              <p>
                Akun wajib memenuhi persyaratan verifikasi usia 18+
                yang berlaku sesuai ketentuan Roblox.
              </p>
            </div>
          </div>

          <div className="term-item">
            <span className="term-number">III</span>
            <div>
              <h3>CHECK YOUR ROBUX LIMIT!</h3>
              <p>
                Pastikan akun belum terkena limit dan masih dapat
                menerima Robux.
              </p>
            </div>
          </div>

          <div className="term-item">
            <span className="term-number">IV</span>
            <div>
              <h3>DOUBLE CHECK YOUR DATA!</h3>
              <p>
                Pastikan Username dan Display Name sudah tepat.
                Tidak ada refund jika Robux sudah berhasil masuk.
              </p>
            </div>
          </div>

          <div className="terms-bottom">
            💛 Dengan melakukan pemesanan, pelanggan dianggap telah
            membaca dan memahami ketentuan di atas.
          </div>
        </div>

        <div className="shop-info">
          <div className="shop-info-card clean">
            <span>✨</span>
            <div>
              <strong>ROBUX CLEAN</strong>
              <small>ROBUX STORE INFORMATION</small>
            </div>
          </div>

          <div className="shop-info-card payment">
            <span>💳</span>
            <div>
              <strong>PAYMENT OPTIONS</strong>
              <small>AVAILABLE REKBER N AVAIL QRIS</small>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <a href="#" className="logo">
          <span className="logo-icon">R$</span>
          <span>REI <b>ROBUX</b></span>
        </a>
        <p>Made for happy gaming adventures! 🎮</p>
        <span className="footer-copy">© 2026 REI ROBUX. ALL RIGHTS RESERVED.</span>
      </footer>
    </main>
  );
}
