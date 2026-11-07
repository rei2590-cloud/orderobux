
"use client";

import { useState } from "react";

const RATE = 15500;
const WHATSAPP = "628XXXXXXXXXX";

const packages = [50, 100, 200, 300, 500, 1000];

export default function Home() {
  const [amount, setAmount] = useState(100);
  const [username, setUsername] = useState("");
  const [method, setMethod] = useState("Game Pass");
  const [custom, setCustom] = useState("");

  const price = Math.ceil((amount / 100) * RATE);

  function selectAmount(value) {
    setAmount(value);
    setCustom("");
  }

  function orderNow() {
    if (!username.trim()) {
      alert("Masukkan username Roblox kamu terlebih dahulu!");
      return;
    }

    if (WHATSAPP === "628XXXXXXXXXX") {
      alert("Nomor WhatsApp admin belum diatur!");
      return;
    }

    const message =
      `HALO ADMIN REI ROBUX!\n\n` +
      `Username Roblox: ${username}\n` +
      `Jumlah Robux: ${amount} R$\n` +
      `Metode: ${method}\n` +
      `Total Harga: Rp${price.toLocaleString("id-ID")}\n\n` +
      `Saya ingin melakukan pemesanan.`;

    window.open(
      `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  }

  return (
    <main>
      <nav className="navbar">
        <a href="#" className="brand">
          <span className="brand-icon">R</span>
          REI<span>ROBUX</span>
        </a>
        <span className="nav-status">
          <i></i> ROBUX STORE
        </span>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <div className="hero-tag">★ YOUR ROBLOX PARTNER ★</div>
          <h1>
            LEVEL UP
            <br />
            YOUR <span>GAME!</span>
          </h1>
          <p>
            Saatnya upgrade pengalaman bermain Roblox kamu.
            Pesan Robux dengan mudah di REI ROBUX!
          </p>
          <a href="#order" className="hero-button">
            ORDER NOW <span>→</span>
          </a>
        </div>

        <div className="hero-art">
          <div className="art-circle"></div>
          <div className="roblox-card">
            <div className="roblox-face">◉ ◉</div>
            <div className="roblox-mouth">▱</div>
            <div className="roblox-body">R$</div>
          </div>
          <div className="floating-coin coin-one">R$</div>
          <div className="floating-coin coin-two">★</div>
          <div className="floating-label">GAME ON!</div>
        </div>
      </section>

      <section className="features">
        <div className="feature">
          <span>⚡</span>
          <div>
            <strong>FAST ORDER</strong>
            <small>Pemesanan mudah</small>
          </div>
        </div>
        <div className="feature">
          <span>🎮</span>
          <div>
            <strong>ROBLOX READY</strong>
            <small>Untuk petualanganmu</small>
          </div>
        </div>
        <div className="feature">
          <span>💬</span>
          <div>
            <strong>CHAT ADMIN</strong>
            <small>Hubungi admin langsung</small>
          </div>
        </div>
      </section>

      <section className="order-section" id="order">
        <div className="section-heading">
          <span className="section-label">LET'S GET STARTED</span>
          <h2>CHOOSE YOUR <span>ROBUX</span></h2>
          <p>Pilih jumlah Robux yang kamu inginkan.</p>
        </div>

        <div className="order-layout">
          <div className="package-panel">
            <h3>★ PILIH PAKET</h3>
            <div className="package-grid">
              {packages.map((item) => (
                <button
                  key={item}
                  className={`package-card ${amount === item && !custom ? "active" : ""}`}
                  onClick={() => selectAmount(item)}
                >
                  <span className="package-coin">R$</span>
                  <strong>{item.toLocaleString("id-ID")}</strong>
                  <small>ROBUX</small>
                  <b>
                    Rp{Math.ceil((item / 100) * RATE).toLocaleString("id-ID")}
                  </b>
                </button>
              ))}
            </div>

            <div className="custom-box">
              <label htmlFor="custom">CUSTOM ROBUX</label>
              <div className="custom-input">
                <input
                  id="custom"
                  type="number"
                  min="1"
                  placeholder="Masukkan jumlah Robux..."
                  value={custom}
                  onChange={(e) => setCustom(e.target.value)}
                />
                <button
                  onClick={() => {
                    const value = Number(custom);
                    if (value > 0) setAmount(value);
                    else alert("Masukkan jumlah Robux yang valid!");
                  }}
                >
                  PILIH
                </button>
              </div>
              <small>Harga Rp15.500 per 100 Robux.</small>
            </div>
          </div>

          <div className="summary-panel">
            <h3>★ DETAIL PESANAN</h3>

            <label htmlFor="username">USERNAME ROBLOX</label>
            <input
              id="username"
              type="text"
              placeholder="Masukkan username Roblox"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <label htmlFor="method">METODE PEMBELIAN</label>
            <select
              id="method"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
            >
              <option>Game Pass</option>
              <option>Group Payout</option>
            </select>

            <div className="summary-detail">
              <div>
                <span>Jumlah Robux</span>
                <strong>{amount.toLocaleString("id-ID")} R$</strong>
              </div>
              <div>
                <span>Harga per 100 R$</span>
                <strong>Rp15.500</strong>
              </div>
            </div>

            <div className="total-price">
              <span>TOTAL PEMBAYARAN</span>
              <strong>Rp{price.toLocaleString("id-ID")}</strong>
            </div>

            <button className="order-button" onClick={orderNow}>
              PESAN SEKARANG <span>→</span>
            </button>
            <p className="secure-note">
              Pastikan username Roblox kamu sudah benar.
            </p>
          </div>
        </div>
      </section>

      <section className="how-section">
        <div className="section-heading">
          <span className="section-label">EASY AS 1, 2, 3</span>
          <h2>HOW TO <span>ORDER?</span></h2>
        </div>

        <div className="steps">
          <div className="step">
            <b>01</b>
            <span>🎮</span>
            <h3>PILIH ROBUX</h3>
            <p>Tentukan jumlah Robux yang ingin dibeli.</p>
          </div>
          <div className="step">
            <b>02</b>
            <span>📝</span>
            <h3>ISI DATA</h3>
            <p>Masukkan username dan metode pembelian.</p>
          </div>
          <div className="step">
            <b>03</b>
            <span>💬</span>
            <h3>CHAT ADMIN</h3>
            <p>Kirim pesanan melalui WhatsApp admin.</p>
          </div>
        </div>
      </section>

      <footer>
        <a href="#" className="brand">
          <span className="brand-icon">R</span>
          REI<span>ROBUX</span>
        </a>
        <p>© 2026 REI ROBUX. GAME ON, LEVEL UP!</p>
      </footer>
    </main>
  );
}
