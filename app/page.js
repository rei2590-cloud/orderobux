
"use client";

import { useState } from "react";

const RATE = 15500;
const WHATSAPP = "628XXXXXXXXXX"; // GANTI NOMOR ADMIN

const packages = [
  { amount: 50, icon: "🕹️", name: "MINI PLAYER" },
  { amount: 100, icon: "⭐", name: "STARTER PACK" },
  { amount: 200, icon: "👾", name: "PLAYER PACK" },
  { amount: 300, icon: "⚡", name: "POWER UP" },
  { amount: 500, icon: "🏆", name: "PRO PLAYER" },
  { amount: 1000, icon: "💎", name: "MEGA PLAYER" },
];

const rupiah = (number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(number);

const getPrice = (amount) => Math.ceil((amount / 100) * RATE);

export default function Home() {
  const [selected, setSelected] = useState(100);
  const [custom, setCustom] = useState(150);
  const [username, setUsername] = useState("");
  const [method, setMethod] = useState("Game Pass");
  const [agree, setAgree] = useState(false);

  const order = () => {
    const message = `HALO REI ROBUX!

Username: ${username}
Robux: ${selected}
Metode: ${method}
Total: ${rupiah(getPrice(selected))}

Saya ingin melakukan pemesanan. Terima kasih!`;

    window.open(
      `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <main>
      <div className="announcement">
        ★ WELCOME TO REI ROBUX ★ YOUR NEXT ADVENTURE STARTS HERE!
      </div>

      <header className="navbar">
        <a href="#" className="logo">
          <span className="logo-icon">R</span>
          <span>REI<span className="blue-text">ROBux</span>
            <small>PLAYER SUPPLY STORE</small>
          </span>
        </a>

        <nav>
          <a href="#packages">PACKAGES</a>
          <a href="#custom">CUSTOM</a>
          <a href="#order">ORDER</a>
        </nav>

        <a href="#packages" className="nav-button">LET'S PLAY ↗</a>
      </header>

      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow">🎮 PLAYER 001 HAS ENTERED</span>

          <h1>
            READY TO
            <br />
            <span>POWER UP?</span>
          </h1>

          <p>
            Your Roblox adventure starts here!
            Choose your Robux, place your order,
            and get ready to play.
          </p>

          <div className="hero-buttons">
            <a href="#packages" className="main-button">
              EXPLORE PACKAGES →
            </a>
            <a href="#how" className="secondary-button">
              HOW IT WORKS ↗
            </a>
          </div>

          <div className="hero-info">
            <span>01 PICK A PACK</span>
            <span>02 PLACE ORDER</span>
            <span>03 HAVE FUN</span>
          </div>
        </div>

        <div className="hero-visual">
          <div className="decor decor-one">✦</div>
          <div className="game-card">
            <div className="game-top">
              <span>REI ARCADE</span>
              <span>● ● ●</span>
            </div>
            <div className="game-character">👾</div>
            <h2>GAME<br />ON!</h2>
            <div className="game-bottom">
              INSERT FUN HERE ★
            </div>
          </div>
          <div className="floating floating-one">+100 R$</div>
          <div className="floating floating-two">LEVEL UP!</div>
          <div className="decor decor-two">★</div>
        </div>
      </section>

      <div className="ticker">
        ★ ROBUX TIME ★ HAPPY GAMING ★ LET'S PLAY ★ ROBUX TIME ★
      </div>

      <section className="features">
        <div>⚡ <span><b>QUICK ORDER</b><small>Easy ordering</small></span></div>
        <div>🎮 <span><b>GAMER STYLE</b><small>Made for players</small></span></div>
        <div>💬 <span><b>CHAT SUPPORT</b><small>Contact our admin</small></span></div>
      </section>

      <section className="section" id="packages">
        <div className="section-heading">
          <div>
            <span className="section-label">CHOOSE YOUR POWER-UP</span>
            <h2>PLAYER <span>PACKAGES</span></h2>
          </div>
          <p>Pick your favorite Robux package!</p>
        </div>

        <div className="package-grid">
          {packages.map((item) => (
            <button
              key={item.amount}
              className={`package-card ${
                selected === item.amount ? "active" : ""
              }`}
              onClick={() => setSelected(item.amount)}
            >
              <span className="package-icon">{item.icon}</span>
              <span className="package-name">{item.name}</span>
              <strong>{item.amount.toLocaleString("id-ID")}</strong>
              <span className="robux-label">ROBUX</span>
              <span className="package-price">
                {rupiah(getPrice(item.amount))}
              </span>
              <span className="choose-label">
                {selected === item.amount ? "✓ SELECTED" : "SELECT PACK →"}
              </span>
            </button>
          ))}
        </div>

        <div className="selected-box">
          <div>
            <small>YOUR PACKAGE</small>
            <b>{selected.toLocaleString("id-ID")} ROBUX</b>
          </div>
          <div>
            <small>ESTIMATED PRICE</small>
            <b>{rupiah(getPrice(selected))}</b>
          </div>
          <a href="#order" className="main-button">CONTINUE →</a>
        </div>
      </section>

      <section className="custom-section" id="custom">
        <div>
          <span className="section-label">MAKE YOUR OWN PACKAGE</span>
          <h2>BUILD YOUR<br /><span>OWN PACK!</span></h2>
          <p>
            Can't find your favorite package?
            Create your own Robux amount!
          </p>
          <div className="rate">CURRENT RATE: Rp15.500 / 100 ROBUX</div>
        </div>

        <div className="calculator">
          <label>HOW MANY ROBUX?</label>
          <div className="counter">
            <button onClick={() => setCustom(Math.max(50, custom - 50))}>−</button>
            <input
              type="number"
              min="50"
              value={custom}
              onChange={(e) => setCustom(Math.max(0, Number(e.target.value)))}
            />
            <button onClick={() => setCustom(custom + 50)}>+</button>
          </div>

          <div className="total">
            <small>ESTIMATED TOTAL</small>
            <strong>{rupiah(getPrice(custom))}</strong>
          </div>

          <button
            className="main-button full"
            onClick={() => {
              setSelected(Math.max(50, custom));
              document.getElementById("order").scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            USE THIS AMOUNT →
          </button>
        </div>
      </section>

      <section className="section order-section" id="order">
        <div className="section-heading">
          <div>
            <span className="section-label">ALMOST IN THE GAME</span>
            <h2>PLACE YOUR <span>ORDER</span></h2>
          </div>
          <p>Fill in your Roblox details.</p>
        </div>

        <div className="order-layout">
          <div className="order-form">
            <label>ROBLOX USERNAME</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your Roblox username"
            />

            <label>DELIVERY METHOD</label>
            <select value={method} onChange={(e) => setMethod(e.target.value)}>
              <option>Game Pass</option>
              <option>Group Payout</option>
              <option>Other / Ask Admin</option>
            </select>

            <label className="agreement">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
              />
              I confirm that my username and order details are correct.
            </label>

            <button
              className="main-button full"
              disabled={!username.trim() || !agree}
              onClick={order}
            >
              ORDER VIA WHATSAPP ↗
            </button>
          </div>

          <div className="ticket">
            <div className="ticket-header">REI ROBUX ★ ORDER TICKET</div>
            <div className="ticket-character">👾</div>
            <h3>PLAYER ORDER</h3>
            <div className="ticket-row">
              <span>Package</span>
              <b>{selected} Robux</b>
            </div>
            <div className="ticket-row">
              <span>Delivery</span>
              <b>{method}</b>
            </div>
            <div className="ticket-total">
              <small>ESTIMATED TOTAL</small>
              <strong>{rupiah(getPrice(selected))}</strong>
            </div>
            <div className="ticket-footer">THANKS FOR PLAYING WITH REI!</div>
          </div>
        </div>
      </section>

      <section className="how-section" id="how">
        <span className="section-label">THREE EASY STEPS</span>
        <h2>HOW TO <span>ORDER?</span></h2>

        <div className="steps">
          <article>
            <span>01</span>
            <div>🛒</div>
            <h3>PICK YOUR PACK</h3>
            <p>Choose your favorite Robux package.</p>
          </article>
          <article>
            <span>02</span>
            <div>💬</div>
            <h3>CHAT WITH ADMIN</h3>
            <p>Send your order through WhatsApp.</p>
          </article>
          <article>
            <span>03</span>
            <div>🎮</div>
            <h3>ENJOY YOUR GAME</h3>
            <p>Follow the admin's instructions.</p>
          </article>
        </div>
      </section>

      <footer className="footer">
        <div className="logo">
          <span className="logo-icon">R</span>
          <span>REI<span className="blue-text">ROBux</span>
            <small>PLAYER SUPPLY STORE</small>
          </span>
        </div>
        <p>PIXEL VIBES. BIG GAME ENERGY. ★</p>
        <small>© {new Date().getFullYear()} REI ROBUX</small>
      </footer>
    </main>
  );
}
