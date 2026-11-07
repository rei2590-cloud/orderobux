
"use client";

import { useEffect, useState } from "react";

const RATE = 15500;
const WHATSAPP = "6287838482178";

const packages = [
  { amount: 50, color: "blue", number: "01", label: "STARTER LAP" },
  { amount: 100, color: "yellow", number: "02", label: "BEST SELLER" },
  { amount: 200, color: "green", number: "03", label: "TURBO PACK" },
  { amount: 300, color: "orange", number: "04", label: "SPEED PACK" },
  { amount: 500, color: "red", number: "05", label: "PRO RACER" },
  { amount: 1000, color: "purple", number: "06", label: "CHAMPION" },
];

function rupiah(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function Home() {
  const [selected, setSelected] = useState(100);
  const [custom, setCustom] = useState("");
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [availableStock, setAvailableStock] = useState(null);
  const [store, setStore] = useState(null);

  // Mengambil stok Robux.
  useEffect(() => {
    let active = true;

    fetch("/api/stock", { cache: "no-store" })
      .then((response) =>
        response.ok ? response.json() : Promise.reject()
      )
      .then((data) => {
        if (active) {
          setAvailableStock(Number(data.available_stock));
        }
      })
      .catch(() => {
        if (active) setAvailableStock(null);
      });

    return () => {
      active = false;
    };
  }, []);

  // Memeriksa status toko setiap 15 detik.
  useEffect(() => {
    let active = true;

    async function loadStoreStatus() {
      try {
        const response = await fetch("/api/store", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Gagal mengambil status toko");
        }

        const data = await response.json();

        if (active) setStore(data);
      } catch (error) {
        console.error("Gagal memeriksa status toko:", error);
        if (active) setStore(null);
      }
    }

    loadStoreStatus();

    const intervalId = setInterval(loadStoreStatus, 15000);

    return () => {
      active = false;
      clearInterval(intervalId);
    };
  }, []);

  const isCustom = custom.trim() !== "";
  const amount = isCustom ? Number(custom) : selected;

  const validAmount =
    Number.isSafeInteger(amount) &&
    amount > 0 &&
    amount <= 100000;

  const total = validAmount
    ? Math.ceil((amount / 100) * RATE)
    : 0;

  function selectPackage(value) {
    setSelected(value);
    setCustom("");
  }

  async function orderNow() {
    if (!store) {
      alert("Status toko belum bisa diperiksa. Silakan refresh halaman.");
      return;
    }

    if (!store.is_open) {
      alert(
        store.closed_message ||
          "Maaf, toko sedang tutup. Silakan kembali lagi nanti."
      );
      return;
    }

    if (!validAmount || !username.trim() || !displayName.trim()) {
      alert(
        "Lengkapi username, display name, dan nominal Robux dulu ya!"
      );
      return;
    }

    if (availableStock === null || amount > availableStock) {
      alert(
        "Stok belum bisa dipastikan atau jumlah Robux melebihi stok tersedia. Silakan refresh halaman."
      );
      return;
    }

    const whatsappWindow = window.open("about:blank", "_blank");

    if (!whatsappWindow) {
      alert(
        "Izinkan pop-up untuk melanjutkan pesanan melalui WhatsApp."
      );
      return;
    }

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
        body: JSON.stringify({
          username: username.trim(),
          display_name: displayName.trim(),
          robux_amount: amount,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Pesanan gagal disimpan.");
      }

      const message = [
        "🏁 HELLO REI ROBUX RACING CLUB!",
        "",
        "I WANT TO PLACE AN ORDER!",
        `Order ID: #${data.order.id}`,
        `Username: ${username.trim()}`,
        `Display Name: ${displayName.trim()}`,
        `Robux: ${amount} R`,
        `Total: ${rupiah(total)}`,
        "Payment: QRIS",
        "",
        "Please help me with my order. Thank you!",
      ].join("\n");

      whatsappWindow.location.href =
        `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
    } catch (error) {
      whatsappWindow.close();

      alert(
        error.message ||
          "Pesanan gagal disimpan. Silakan coba lagi."
      );
    }
  }

  return (
    <main>
      {/* NOTIFIKASI TOKO PALING ATAS */}
      <div
        role="status"
        aria-live="polite"
        style={{
          position: "relative",
          width: "100%",
          zIndex: 99999,
          background:
            store === null
              ? "#374151"
              : store.is_open
                ? "#15803d"
                : "#b91c1c",
          color: "#ffffff",
          padding: "16px 20px",
          textAlign: "center",
          fontWeight: 900,
          borderBottom: "3px solid #202b3b",
        }}
      >
        {store === null ? (
          <div>MEMERIKSA STATUS TOKO...</div>
        ) : (
          <>
            <div style={{ fontSize: "18px" }}>
              {store.is_open
                ? "🟢 TOKO SEDANG BUKA"
                : "🔴 TOKO SEDANG TUTUP"}
            </div>

            <div
              style={{
                fontSize: "13px",
                marginTop: "5px",
                fontWeight: 700,
              }}
            >
              {store.is_open
                ? "Silakan lakukan pemesanan sekarang!"
                : store.closed_message ||
                  "Maaf, toko sedang tutup. Silakan kembali lagi nanti."}
            </div>
          </>
        )}
      </div>

      <div className="race-top">
        <span>🏁 REI ROBUX RACING CLUB</span>
        <span>★ FAST CHECKOUT ★ GOOD VIBES ★</span>
        <span>EST. 2026</span>
      </div>

      <nav className="navbar">
        <a href="#" className="brand">
          <span className="brand-mark">R!</span>
          <span>
            REI<span className="brand-blue">ROBUX</span>
          </span>
        </a>

        <div className="nav-links">
          <a href="#packages">PACKAGES</a>
          <a href="#order">ORDER</a>
          <a href="#rules">RULES</a>
        </div>

        <a href="#packages" className="nav-cta">
          LET'S RACE ↗
        </a>
      </nav>

      <section className="hero">
        <div className="hero-copy">
          <div className="hero-label">
            <span>🏎️</span> WELCOME TO THE CLUB
          </div>

          <h1>
            READY.
            <span>SET.</span>
            <strong>ROBUX!</strong>
          </h1>

          <p className="hero-description">
            YO, PLAYER! Welcome to REI ROBUX Racing Club.
            Pick your Robux, choose your ride, and let's get
            your next Roblox adventure started!
          </p>

          <a href="#packages" className="start-button">
            START YOUR ORDER <span>➜</span>
          </a>

          <div className="hero-tags">
            <span>★ ROBUX CLEAN</span>
            <span>✓ QRIS AVAILABLE</span>
            <span>🏁 RACE READY</span>
          </div>
        </div>

        <div className="race-visual">
          <div className="speed-lines">/////</div>
          <div className="race-number">09</div>

          <div className="car-scene">
            <div className="car-cloud">☁</div>

            <div className="race-car">
              <div className="car-window"></div>

              <div className="car-body">
                <span>REI</span>
                <b>09</b>
              </div>

              <div className="wheel wheel-left"></div>
              <div className="wheel wheel-right"></div>
            </div>

            <div className="car-shadow"></div>
          </div>

          <div className="visual-sticker sticker-fast">FAST!</div>
          <div className="visual-sticker sticker-go">LET'S GO!</div>
          <div className="visual-checker"></div>
          <div className="visual-caption">
            FULL SPEED • FULL FUN
          </div>
        </div>
      </section>

      <div className="race-ticker">
        <div>
          🏁 READY SET ROBUX ✦ REI RACING CLUB ✦ GOOD VIBES ONLY ✦
          START YOUR ENGINE ✦ READY SET ROBUX ✦ REI RACING CLUB ✦
        </div>
      </div>

      <section className="public-stock-banner" aria-live="polite">
        <div>
          <span className="public-stock-kicker">
            🏁 LIVE ROBUX INVENTORY
          </span>

          <h2>STOK ROBUX TERSEDIA</h2>
          <p>Periksa persediaan sebelum memilih paket.</p>
        </div>

        <strong>
          {availableStock === null
            ? "STOK BELUM TERSEDIA"
            : `${new Intl.NumberFormat("id-ID").format(
                availableStock
              )} R`}
        </strong>
      </section>

      <section className="packages-section" id="packages">
        <div className="section-kicker">
          01 / CHOOSE YOUR PACKAGE
        </div>

        <h2>
          PICK YOUR <span>ROBUX!</span>
        </h2>

        <p className="section-subtitle">
          Choose your package and get ready to roll.
        </p>

        <div className="package-grid">
          {packages.map((item) => (
            <button
              key={item.amount}
              type="button"
              onClick={() => selectPackage(item.amount)}
              className={`package-card ${item.color} ${
                selected === item.amount && !isCustom
                  ? "active"
                  : ""
              }`}
            >
              <div className="package-top">
                <span>RACE PACK</span>
                <span>#{item.number}</span>
              </div>

              {item.amount === 100 && (
                <span className="best-tag">
                  ★ BEST SELLER
                </span>
              )}

              <div className="package-icon">R</div>
              <div className="package-amount">
                {item.amount}
              </div>
              <div className="package-unit">ROBUX</div>

              <div className="package-price">
                {rupiah(
                  Math.ceil((item.amount / 100) * RATE)
                )}
              </div>

              <div className="package-label">
                {item.label}
              </div>

              <div className="package-select">
                {selected === item.amount && !isCustom
                  ? "✓ SELECTED"
                  : "SELECT PACK"}
              </div>
            </button>
          ))}
        </div>

        <div className="custom-card">
          <div className="custom-number">07</div>

          <div className="custom-content">
            <div className="custom-kicker">
              CUSTOM PIT STOP
            </div>

            <h3>YOUR OWN AMOUNT!</h3>
            <p>
              Want a different Robux amount? Type it here!
            </p>

            <input
              type="number"
              min="1"
              max="100000"
              step="1"
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              placeholder="Enter Robux amount..."
            />

            <div className="custom-price">
              <span>YOUR TOTAL PRICE</span>

              <strong>
                {isCustom && validAmount
                  ? rupiah(total)
                  : isCustom
                    ? "Enter a valid amount"
                    : "PRICE WILL APPEAR HERE"}
              </strong>
            </div>

            {isCustom && validAmount && (
              <div className="custom-confirm">
                ✓ CUSTOM AMOUNT SELECTED
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="order-section" id="order">
        <div className="section-kicker">
          02 / CHECKOUT ZONE
        </div>

        <h2>
          READY TO <span>ORDER?</span>
        </h2>

        <p className="section-subtitle">
          Fill in your Roblox account details below.
        </p>

        <div className="order-card">
          <div className="order-card-heading">
            <div className="order-icon">🏁</div>

            <div>
              <h3>RACER INFORMATION</h3>
              <p>Let's get your order on track!</p>
            </div>
          </div>

          <label htmlFor="username">
            ROBLOX USERNAME
          </label>

          <input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Your Roblox username"
          />

          <label htmlFor="displayname">
            DISPLAY NAME
          </label>

          <input
            id="displayname"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Your display name"
          />

          <div className="order-summary">
            <div>
              <span>Robux amount</span>
              <strong>
                {validAmount ? `${amount} R` : "Not selected"}
              </strong>
            </div>

            <div>
              <span>Payment method</span>
              <strong>QRIS ONLY</strong>
            </div>

            <div className="total-row">
              <span>TOTAL PAYMENT</span>
              <strong>
                {validAmount ? rupiah(total) : "Rp0"}
              </strong>
            </div>
          </div>

          <div className="payment-info">
            <div className="payment-icon">▦</div>

            <div>
              <strong>PAYMENT VIA QRIS</strong>

              <p>
                Contact admin through WhatsApp to receive the QRIS
                payment code and confirm your payment.
              </p>
            </div>
          </div>

          <button
            className="order-button"
            onClick={orderNow}
            disabled={!store || !store.is_open}
          >
            {!store
              ? "MEMERIKSA TOKO..."
              : store.is_open
                ? <>PLACE MY ORDER <span>➜</span></>
                : "TOKO SEDANG TUTUP"}
          </button>

          <p className="order-footnote">
            🏁 THANK YOU FOR JOINING THE RACE!
          </p>
        </div>
      </section>

      <section className="rules-section" id="rules">
        <div className="section-kicker">
          03 / BEFORE THE RACE
        </div>

        <h2>
          RACE <span>RULES.</span>
        </h2>

        <div className="rules-grid">
          <div className="rule-card">
            <b>01</b>
            <span>🎮</span>
            <p>
              Hanya membutuhkan username dan display name.
            </p>
          </div>

          <div className="rule-card">
            <b>02</b>
            <span>🔐</span>
            <p>Akun wajib sudah verifikasi 18+.</p>
          </div>

          <div className="rule-card">
            <b>03</b>
            <span>📩</span>
            <p>
              Pastikan akun belum limit menerima Robux.
            </p>
          </div>

          <div className="rule-card">
            <b>04</b>
            <span>🏁</span>
            <p>
              Pastikan username dan display name benar.
              Tidak ada refund jika Robux sudah masuk.
            </p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-checker"></div>
        <div className="footer-brand">
          REI<span>ROBUX</span> 🏁
        </div>
        <p>GOOD VIBES. GREAT RACES. MORE ROBUX.</p>
        <small>© 2026 REI ROBUX RACING CLUB</small>
      </footer>
    </main>
  );
}
