"use client";

import { useMemo, useState } from "react";

const RATE = 15500;
const WHATSAPP = "6287838482178";

const packages = [
  { amount: 50, color: "blue", sticker: "⭐", tag: "mini" },
  { amount: 100, color: "yellow", sticker: "🍋", tag: "popular" },
  { amount: 200, color: "green", sticker: "🍏", tag: "fun" },
  { amount: 300, color: "orange", sticker: "🍊", tag: "yay!" },
  { amount: 500, color: "purple", sticker: "🪁", tag: "more" },
  { amount: 1000, color: "blue", sticker: "🚀", tag: "big pack" },
];

function formatRupiah(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function Home() {
  const [selected, setSelected] = useState(100);
  const [customAmount, setCustomAmount] = useState("");
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");

  const isCustom = customAmount.trim() !== "";
  const amount = isCustom ? Number(customAmount) : selected;
  const validAmount = Number.isFinite(amount) && amount > 0;
  const total = validAmount ? Math.ceil((amount / 100) * RATE) : 0;

  const orderMessage = useMemo(() => {
    return [
      "Hiii REI ROBUX! Aku mau order Robux ✨",
      "",
      `Username: ${username}`,
      `Display Name: ${displayName}`,
      `Nominal: ${amount} Robux`,
      `Total harga: ${formatRupiah(total)}`,
      "Pembayaran: QRIS",
      "",
      "Mohon bantu proses pesananku yaa! Thank you 💙",
    ].join("\n");
  }, [username, displayName, amount, total]);

  function choosePackage(value) {
    setSelected(value);
    setCustomAmount("");
  }

  function handleOrder() {
    if (!validAmount || !username.trim() || !displayName.trim()) {
      alert("Isi username, display name, dan nominal Robux dulu yaa! 🌈");
      return;
    }

    const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(orderMessage)}`;
    window.open(url, "_blank");
  }

  return (
    <main>
      <div className="welcome-bar">
        <span>🌈 HELLO, ROBLOX BESTIES!</span>
        <span>WELCOME TO REI ROBUX STORE ⭐</span>
        <span>HAPPY SHOPPING! 🍬</span>
      </div>

      <nav className="navbar">
        <a className="logo" href="#">
          <span className="logo-icon">R!</span>
          <span>REI<span className="logo-blue">ROBUX</span></span>
        </a>
        <div className="nav-links">
          <a href="#packages">Packages</a>
          <a href="#order">Order</a>
          <a href="#rules">Rules</a>
        </div>
        <a className="nav-button" href="#packages">LET'S ORDER! ↗</a>
      </nav>

      <section className="hero">
        <div className="hero-copy">
          <div className="tiny-label">✦ YOUR HAPPY ROBUX CORNER ✦</div>
          <h1>
            WELCOME TO
            <span className="hero-title-blue">REI ROBUX!</span>
          </h1>
          <p className="hero-description">
            Haii, Roblox player! 💙
            <br />
            Saatnya bikin avatar kamu makin kece.
            Pilih Robux favoritmu dan checkout dengan mudah di sini!
          </p>
          <div className="hero-actions">
            <a href="#packages" className="primary-button">SHOP NOW! ♡</a>
            <span className="mini-note">easy • cute • happy!</span>
          </div>
          <div className="hero-stickers">
            <span>⭐ ROBUX CLEAN</span>
            <span>🍭 QRIS AVAILABLE</span>
            <span>💌 FAST RESPONSE</span>
          </div>
        </div>

        <div className="hero-art">
          <div className="art-cloud cloud-one">☁️</div>
          <div className="art-cloud cloud-two">☁️</div>
          <div className="art-star star-one">✦</div>
          <div className="art-star star-two">★</div>
          <div className="robux-card">
            <div className="card-top">
              <span>REI'S PLAYGROUND</span>
              <span>♡ 01</span>
            </div>
            <div className="robux-symbol">R</div>
            <div className="card-caption">MORE ROBUX, MORE FUN!</div>
            <div className="card-bottom">✿ PLAY • SHOP • REPEAT ✿</div>
          </div>
          <div className="art-sticker sticker-left">YAY!</div>
          <div className="art-sticker sticker-right">100% FUN</div>
        </div>
      </section>

      <div className="ticker">
        <div>✦ GOOD VIBES ONLY ✦ ROBLOX TIME ✦ HAPPY SHOPPING ✦ REI ROBUX ✦ GOOD VIBES ONLY ✦</div>
      </div>

      <section className="packages-section" id="packages">
        <div className="section-label">🍬 PICK YOUR FAVORITE!</div>
        <h2>CHOOSE YOUR <span>ROBUX</span></h2>
        <p className="section-description">
          Pilih paket yang kamu mau. Tinggal klik, beres deh!
        </p>

        <div className="package-grid">
          {packages.map((item) => (
            <button
              type="button"
              key={item.amount}
              className={`package-card ${item.color} ${selected === item.amount && !isCustom ? "active" : ""}`}
              onClick={() => choosePackage(item.amount)}
            >
              {item.amount === 100 && <span className="popular-tag">BEST SELLER!</span>}
              <span className="package-sticker">{item.sticker}</span>
              <span className="package-number">{item.amount}</span>
              <span className="package-unit">ROBUX</span>
              <span className="package-price">
                {formatRupiah(Math.ceil((item.amount / 100) * RATE))}
              </span>
              <span className="package-tag">{item.tag} package ✦</span>
              <span className="select-text">
                {selected === item.amount && !isCustom ? "✓ SELECTED" : "SELECT THIS"}
              </span>
            </button>
          ))}
        </div>

        <div className="custom-box">
          <div className="custom-emoji">🎨</div>
          <div className="custom-content">
            <h3>WANT ANOTHER AMOUNT?</h3>
            <p>Ketik nominal Robux yang kamu inginkan di bawah ini!</p>
            <input
              type="number"
              min="1"
              step="1"
              placeholder="Contoh: 75"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
            />
            <div className="custom-result">
              <span>YOUR TOTAL PRICE</span>
              <strong>
                {validAmount && isCustom ? formatRupiah(total) : "Harga akan muncul di sini ✨"}
              </strong>
            </div>
            {isCustom && validAmount && (
              <button
                type="button"
                className="use-custom"
                onClick={() => setSelected(amount)}
              >
                NOMINAL CUSTOM DIPILIH ✓
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="order-section" id="order">
        <div className="section-label">💌 LET'S CHECKOUT!</div>
        <h2>READY TO <span>ORDER?</span></h2>
        <p className="section-description">
          Isi detail akun Roblox kamu dengan benar, ya!
        </p>

        <div className="checkout-card">
          <div className="checkout-heading">
            <span>🧸</span>
            <div>
              <h3>YOUR ORDER FORM</h3>
              <p>Just a little information!</p>
            </div>
          </div>

          <label>ROBLOX USERNAME</label>
          <input
            type="text"
            placeholder="Masukkan username Roblox..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label>DISPLAY NAME</label>
          <input
            type="text"
            placeholder="Masukkan display name..."
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />

          <div className="summary">
            <div><span>Nominal Robux</span><strong>{validAmount ? `${amount} Robux` : "Belum dipilih"}</strong></div>
            <div><span>Metode pembayaran</span><strong>QRIS 📱</strong></div>
            <div className="summary-total"><span>TOTAL PAYMENT</span><strong>{validAmount ? formatRupiah(total) : "Rp0"}</strong></div>
          </div>

          <div className="qris-note">
            <span>📱</span>
            <div>
              <strong>PAYMENT VIA QRIS</strong>
              <p>Hubungi admin melalui WhatsApp untuk mendapatkan QRIS dan konfirmasi pembayaran.</p>
            </div>
          </div>

          <button type="button" className="checkout-button" onClick={handleOrder}>
            ORDER VIA WHATSAPP 💬
          </button>
          <p className="checkout-footnote">♡ Thank you for shopping at REI ROBUX!</p>
        </div>
      </section>

      <section className="rules-section" id="rules">
        <div className="section-label">📌 BEFORE YOU ORDER</div>
        <h2>OUR LITTLE <span>RULES</span></h2>
        <div className="rules-grid">
          <div className="rule-card"><b>01</b><span>🍀</span><p>Hanya membutuhkan username dan display name.</p></div>
          <div className="rule-card"><b>02</b><span>🔐</span><p>Akun wajib sudah verifikasi 18+.</p></div>
          <div className="rule-card"><b>03</b><span>📩</span><p>Pastikan akun belum limit menerima Robux.</p></div>
          <div className="rule-card"><b>04</b><span>✏️</span><p>Pastikan username dan display name benar. Tidak ada refund jika Robux sudah masuk.</p></div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-logo">REI<span>ROBUX</span> ✦</div>
        <p>Made with love & colorful vibes ♡</p>
        <small>© 2026 REI ROBUX STORE. HAPPY PLAYING!</small>
      </footer>
    </main>
  );
}
