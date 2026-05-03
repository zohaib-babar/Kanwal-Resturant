import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Home", "Menu", "About", "Contact"];

const CATEGORIES = [
  { key: "chicken", label: "Chicken", icon: "🍗" },
  { key: "mutton", label: "Mutton", icon: "🍖" },
  { key: "beef", label: "Beef", icon: "🥩" },
  { key: "fish", label: "Fish", icon: "🐟" },
  { key: "soup", label: "Soup", icon: "🍲" },
  { key: "daal", label: "Daal & Sabzi", icon: "🫘" },
  { key: "specials", label: "Specials", icon: "⭐" },
];

const MENU = {
  chicken: [
    { name: "Chicken Karahi", half: 1000, full: 2000 },
    { name: "Chicken Qorma", half: 1000, full: 2000 },
    { name: "Chicken Shinwari", half: 1000, full: 2000 },
    { name: "Chicken Jalfrezi", half: 1200, full: 2400 },
    { name: "Chicken Achari Boti", half: 1200, full: 2400 },
    { name: "Chicken Boneless Boti", half: 1200, full: 2400 },
    { name: "Chicken Champ", half: 1200, full: 2400 },
    { name: "Desi Chicken", half: 1900, full: null },
  ],
  mutton: [
    { name: "Mutton Karahi", half: 1900, full: 2000 },
    { name: "Mutton Achari", half: 1900, full: 3800 },
    { name: "Mutton White", half: 2000, full: 4000 },
    { name: "Mutton Shinwari", half: 1900, full: 3800 },
    { name: "Mutton Seekhani", half: 1900, full: 3800 },
  ],
  beef: [
    { name: "Beef Karahi", half: 1300, full: 2500 },
    { name: "Beef Achari", half: 1300, full: 2500 },
    { name: "Beef White", half: 1300, full: 2500 },
    { name: "Beef Qeema", half: 1300, full: 2500 },
    { name: "Beef Shinwari", half: 1300, full: 2500 },
  ],
  fish: [
    { name: "Finger Fish", single: 3000 },
    { name: "Rohu Grilled Fish", single: 1700 },
    { name: "Rohu Fried Fish", single: 1700 },
  ],
  soup: [
    { name: "Kanwal Special Soup", half: 550, full: 1000 },
    { name: "B-19 Soup", half: 600, full: 1100 },
    { name: "Hot & Sour Soup", half: 450, full: 800 },
    { name: "Chicken Corn Soup", half: null, full: 700 },
    { name: "Vegetable Soup", half: 300, full: 600 },
    { name: "Thai Soup", half: 280, full: 500 },
  ],
  daal: [
    { name: "Kanwal Daal Mash Makhni", single: 450 },
    { name: "Daal Chana", single: 270 },
    { name: "Daal Mash", single: 300 },
    { name: "Chanay Plate", single: 270 },
    { name: "Sabzi", single: 270 },
  ],
  specials: [
    { name: "Gajar Halwa", single: 1200 },
    { name: "Kheer (Per Plate)", single: 200 },
    { name: "Ice Cream", single: 200 },
    { name: "Brain Karahi — 4 pcs", single: 800 },
    { name: "Brain Karahi — 8 pcs", single: 1600 },
  ],
};

const STATS = [
  { value: "15+", label: "Years of Excellence" },
  { value: "50+", label: "Signature Dishes" },
  { value: "1000+", label: "Happy Customers Daily" },
  { value: "5★", label: "Customer Rating" },
];

const FEATURES = [
  { icon: "👨‍🍳", title: "Master Chefs", desc: "Experienced chefs with 15+ years of expertise in traditional Pakistani cuisine." },
  { icon: "🌿", title: "Fresh Ingredients", desc: "We source only the freshest, highest-quality ingredients daily." },
  { icon: "🏆", title: "Award Winning", desc: "Faisalabad's most loved restaurant with thousands of loyal customers." },
  { icon: "⚡", title: "Fast Service", desc: "Your meal is ready in 25–30 minutes. We respect your time." },
  { icon: "🍽️", title: "Wide Variety", desc: "From sizzling Karahi to soups and desserts — something for everyone." },
  { icon: "❤️", title: "Family Friendly", desc: "A warm atmosphere perfect for family gatherings and celebrations." },
];

export default function KanwalRestaurant() {
  const [activeTab, setActiveTab] = useState("chicken");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 100);
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => { clearTimeout(t); window.removeEventListener("scroll", onScroll); };
  }, []);

  const items = MENU[activeTab] || [];
  const activeCat = CATEGORIES.find(c => c.key === activeTab);

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: "#faf7f2", color: "#1a1208", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }

        /* ---- NAVBAR ---- */
        .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 999; transition: all 0.4s; }
        .nav.solid { background: rgba(250,247,242,0.97); backdrop-filter: blur(16px); box-shadow: 0 1px 24px rgba(0,0,0,0.07); }
        .nav-inner { max-width: 1200px; margin: 0 auto; padding: 0 24px; height: 70px; display: flex; align-items: center; justify-content: space-between; }
        .nav-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
        .logo-circle { width: 38px; height: 38px; border-radius: 50%; background: linear-gradient(135deg,#e8793a,#c45218); display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
        .logo-text { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 700; letter-spacing: 0.3px; }
        .nav-links { display: flex; gap: 32px; align-items: center; }
        .nav-link { font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500; color: rgba(255,255,255,0.75); text-decoration: none; transition: color 0.25s; }
        .nav-link.dark { color: #555; }
        .nav-link:hover { color: #e8793a !important; }
        .btn-primary { display: inline-flex; align-items: center; gap: 8px; padding: 12px 28px; border-radius: 50px; background: linear-gradient(135deg,#e8793a,#c45218); color: #fff; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 600; text-decoration: none; border: none; cursor: pointer; box-shadow: 0 6px 28px rgba(196,82,24,0.38); transition: all 0.3s; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 36px rgba(196,82,24,0.48); }
        .btn-outline { display: inline-flex; align-items: center; gap: 8px; padding: 11px 26px; border-radius: 50px; background: transparent; color: rgba(255,255,255,0.85); font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500; text-decoration: none; border: 1.5px solid rgba(255,255,255,0.28); cursor: pointer; transition: all 0.3s; }
        .btn-outline:hover { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.55); transform: translateY(-2px); }
        .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; background: none; border: none; padding: 6px; }
        .hamburger span { display: block; width: 24px; height: 2px; border-radius: 2px; transition: background 0.4s; }

        /* ---- MOBILE OVERLAY ---- */
        .mob-overlay { display: none; position: fixed; inset: 0; background: #1a1208; z-index: 998; flex-direction: column; align-items: center; justify-content: center; gap: 28px; }
        .mob-overlay.open { display: flex; }
        .mob-close { position: absolute; top: 22px; right: 24px; background: none; border: none; color: #fff; font-size: 30px; cursor: pointer; }
        .mob-link { font-family: 'Cormorant Garamond', serif; font-size: 44px; font-weight: 700; color: #fff; text-decoration: none; cursor: pointer; transition: color 0.2s; }
        .mob-link:hover { color: #e8793a; }

        /* ---- HERO ---- */
        .hero { min-height: 100vh; background: #1c0e03; position: relative; overflow: hidden; display: flex; align-items: center; }
        .hero-glow { position: absolute; inset: 0; background: radial-gradient(ellipse 75% 65% at 50% 55%, rgba(180,60,0,0.32) 0%, transparent 70%); }
        .hero-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px); background-size: 60px 60px; }
        .hero-content { max-width: 1200px; margin: 0 auto; padding: 120px 24px 80px; position: relative; z-index: 2; width: 100%; }
        .hero-badge { display: inline-flex; align-items: center; gap: 8px; border: 1px solid rgba(212,164,90,0.45); color: #d4a45a; padding: 8px 22px; border-radius: 50px; font-family: 'DM Sans', sans-serif; font-size: 12px; letter-spacing: 2.5px; text-transform: uppercase; background: rgba(212,164,90,0.07); }
        .hero-h1 { font-family: 'Cormorant Garamond', serif; font-size: clamp(60px, 12vw, 118px); font-weight: 700; line-height: 0.9; color: #fff; letter-spacing: -2px; margin-top: 28px; }
        .hero-h1 em { color: #e8793a; font-style: italic; }
        .hero-sub { font-family: 'DM Sans', sans-serif; font-size: 16px; color: rgba(255,255,255,0.5); line-height: 1.75; margin-top: 26px; max-width: 500px; }
        .hero-btns { display: flex; gap: 14px; flex-wrap: wrap; margin-top: 38px; }
        .hero-micro { display: flex; gap: 44px; flex-wrap: wrap; margin-top: 60px; }
        .hero-micro-val { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 700; color: #e8793a; }
        .hero-micro-lbl { font-family: 'DM Sans', sans-serif; font-size: 11px; color: rgba(255,255,255,0.38); letter-spacing: 1.5px; text-transform: uppercase; margin-top: 2px; }
        .scroll-line { width: 1px; height: 56px; background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.28)); margin: 0 auto; }

        /* ---- STATS ---- */
        .stats-wrap { background: #fff; }
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); max-width: 1200px; margin: 0 auto; }
        .stat-cell { padding: 44px 28px; text-align: center; border-right: 1px solid #f0e8d8; }
        .stat-cell:last-child { border-right: none; }
        .stat-val { font-family: 'Cormorant Garamond', serif; font-size: 52px; font-weight: 700; color: #1a1208; line-height: 1; }
        .stat-lbl { font-family: 'DM Sans', sans-serif; font-size: 13px; color: #aaa; margin-top: 8px; }

        /* ---- SECTION COMMONS ---- */
        .sec-label { font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 3.5px; text-transform: uppercase; color: #e8793a; }
        .sec-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(36px, 5.5vw, 58px); font-weight: 700; line-height: 1.05; color: #1a1208; }
        .sec-title em { font-style: italic; color: #e8793a; }
        .sec-title.light { color: #fff; }
        .divider { width: 48px; height: 2px; background: #e8793a; border-radius: 2px; margin: 22px auto 0; }

        /* ---- MENU ---- */
        .menu-sec { padding: 96px 24px; background: #faf7f2; }
        .tabs-wrap { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; margin-bottom: 34px; }
        .tab-btn { display: inline-flex; align-items: center; gap: 6px; padding: 10px 20px; border-radius: 40px; cursor: pointer; border: 1px solid #e8e0d4; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; background: #fff; color: #666; transition: all 0.25s; white-space: nowrap; }
        .tab-btn:hover { background: #fef5ec; border-color: #e8793a; color: #e8793a; }
        .tab-btn.active { background: #1a1208; color: #fff; border-color: #1a1208; box-shadow: 0 4px 18px rgba(26,18,8,0.22); }
        .menu-card { background: #fff; border-radius: 22px; box-shadow: 0 2px 32px rgba(0,0,0,0.06); overflow: hidden; }
        .menu-head { padding: 26px 32px; background: linear-gradient(135deg,#1a1208,#2e1f0a); display: flex; align-items: center; justify-content: space-between; }
        .menu-row { display: flex; align-items: center; justify-content: space-between; padding: 18px 32px; border-bottom: 1px solid #f5efe6; transition: background 0.18s; gap: 12px; }
        .menu-row:last-child { border-bottom: none; }
        .menu-row:hover { background: #fef9f4; }
        .dish-name { font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 600; color: #1a1208; flex: 1; min-width: 0; }
        .price-tags { display: flex; gap: 8px; align-items: center; flex-shrink: 0; flex-wrap: wrap; justify-content: flex-end; }
        .tag { font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 500; padding: 5px 13px; border-radius: 20px; white-space: nowrap; }
        .tag-half { background: #fef5ec; color: #c45218; border: 1px solid #faddbc; }
        .tag-full { background: #1a1208; color: #e8793a; border: 1px solid #1a1208; }
        .tag-single { background: #fef5ec; color: #c45218; border: 1px solid #faddbc; }
        .menu-note { background: #fffbf6; border: 1px solid #faddbc; border-radius: 16px; padding: 22px 26px; margin-top: 22px; }

        /* ---- ABOUT ---- */
        .about-sec { background: #1a1208; padding: 96px 24px; }
        .feat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; max-width: 1200px; margin: 56px auto 0; }
        .feat-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.09); border-radius: 18px; padding: 32px 24px; transition: all 0.3s; }
        .feat-card:hover { background: rgba(232,121,58,0.09); border-color: rgba(232,121,58,0.28); transform: translateY(-4px); }
        .feat-icon { font-size: 34px; margin-bottom: 16px; }
        .feat-title { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 700; color: #fff; margin-bottom: 10px; }
        .feat-desc { font-family: 'DM Sans', sans-serif; font-size: 14px; color: rgba(255,255,255,0.48); line-height: 1.75; }

        /* ---- CONTACT ---- */
        .contact-sec { padding: 96px 24px; background: #faf7f2; }
        .contact-card { background: #fff; border-radius: 22px; padding: 40px; box-shadow: 0 4px 36px rgba(0,0,0,0.07); max-width: 680px; margin: 0 auto; }
        .contact-row { display: flex; align-items: center; gap: 18px; padding: 20px 22px; border-radius: 14px; background: #faf7f2; border: 1px solid #ede6da; text-decoration: none; color: #1a1208; transition: all 0.25s; margin-bottom: 14px; }
        .contact-row:last-of-type { margin-bottom: 0; }
        .contact-row:hover { border-color: #e8793a; background: #fef5ec; transform: translateX(4px); }
        .contact-icon { width: 50px; height: 50px; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 22px; flex-shrink: 0; }
        .contact-lbl { font-family: 'DM Sans', sans-serif; font-size: 11px; color: #aaa; letter-spacing: 1.2px; text-transform: uppercase; }
        .contact-val { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 700; color: #1a1208; line-height: 1.25; }
        .contact-arrow { margin-left: auto; color: #ccc; font-size: 18px; }
        .contact-note { background: #fef5ec; border-radius: 12px; padding: 18px 22px; text-align: center; margin-top: 22px; font-family: 'DM Sans', sans-serif; font-size: 14px; color: #c45218; font-weight: 500; }

        /* ---- FOOTER ---- */
        .footer { background: #1a1208; padding: 36px 24px; }
        .footer-inner { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; }
        .footer-copy { font-family: 'DM Sans', sans-serif; font-size: 13px; color: rgba(255,255,255,0.35); }

        /* ---- FADE ---- */
        .fade { opacity: 0; transform: translateY(22px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .fade.on { opacity: 1; transform: translateY(0); }
        .d1 { transition-delay: 0.1s; } .d2 { transition-delay: 0.22s; } .d3 { transition-delay: 0.34s; } .d4 { transition-delay: 0.46s; }

        /* ---- RESPONSIVE ---- */
        @media (max-width: 900px) {
          .feat-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 700px) {
          .nav-links { display: none; }
          .hamburger { display: flex; }
          .stats-grid { grid-template-columns: 1fr 1fr; }
          .stat-cell { border-right: none; border-bottom: 1px solid #f0e8d8; padding: 28px 16px; }
          .stat-cell:nth-child(odd) { border-right: 1px solid #f0e8d8; }
          .stat-cell:nth-last-child(-n+2) { border-bottom: none; }
          .feat-grid { grid-template-columns: 1fr; }
          .menu-head { padding: 20px; }
          .menu-row { padding: 14px 20px; flex-wrap: wrap; }
          .tabs-wrap { overflow-x: auto; flex-wrap: nowrap; justify-content: flex-start; padding-bottom: 6px; -webkit-overflow-scrolling: touch; scrollbar-width: none; }
          .tabs-wrap::-webkit-scrollbar { display: none; }
          .contact-card { padding: 24px 18px; }
          .hero-micro { gap: 28px; }
          .menu-sec, .about-sec, .contact-sec { padding: 70px 20px; }
        }
        @media (max-width: 440px) {
          .hero-h1 { font-size: 54px; letter-spacing: -1px; }
          .hero-btns { flex-direction: column; }
          .dish-name { font-size: 17px; }
          .stat-val { font-size: 40px; }
        }
      `}</style>

      {/* MOBILE OVERLAY */}
      <div className={`mob-overlay ${mobileOpen ? "open" : ""}`}>
        <button className="mob-close" onClick={() => setMobileOpen(false)}>✕</button>
        {NAV_LINKS.map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} className="mob-link" onClick={() => setMobileOpen(false)}>{l}</a>
        ))}
        <a href="tel:03001322575" className="btn-primary" onClick={() => setMobileOpen(false)}>📞 Call Now</a>
      </div>

      {/* NAVBAR */}
      <nav className={`nav ${scrolled ? "solid" : ""}`}>
        <div className="nav-inner">
          <a className="nav-logo" href="#home">
            <div className="logo-circle">🔥</div>
            <span className="logo-text" style={{ color: scrolled ? "#1a1208" : "#fff" }}>
              Kanwal <span style={{ color: "#e8793a" }}>Restaurant</span>
            </span>
          </a>
          <div className="nav-links">
            {NAV_LINKS.map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className={`nav-link ${scrolled ? "dark" : ""}`}>{l}</a>
            ))}
            <a href="tel:03001322575" className="btn-primary" style={{ padding: "10px 22px", fontSize: 13 }}>📞 Call Now</a>
          </div>
          <button className="hamburger" onClick={() => setMobileOpen(true)}>
            <span style={{ background: scrolled ? "#1a1208" : "rgba(255,255,255,0.85)" }} />
            <span style={{ background: scrolled ? "#1a1208" : "rgba(255,255,255,0.85)" }} />
            <span style={{ background: scrolled ? "#1a1208" : "rgba(255,255,255,0.85)" }} />
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section id="home" className="hero">
        <div className="hero-glow" />
        <div className="hero-grid" />
        <div className="hero-content">
          <div style={{ maxWidth: 680 }}>
            <div className={`fade ${show ? "on" : ""}`}>
              <span className="hero-badge">🏆 Faisalabad's Finest Since 2009</span>
            </div>
            <h1 className={`hero-h1 fade d1 ${show ? "on" : ""}`}>
              The Art of<br /><em>Authentic</em><br />Flavor
            </h1>
            <p className={`hero-sub fade d2 ${show ? "on" : ""}`}>
              Where traditional recipes meet the finest ingredients.<br />
              Karahi, Mutton, Beef, Fish & more — cooked to perfection.
            </p>
            <div className={`hero-btns fade d3 ${show ? "on" : ""}`}>
              <a href="#menu" className="btn-primary">🍽️ Explore Menu</a>
              <a href="https://wa.me/923001322575" className="btn-outline">💬 WhatsApp Us</a>
            </div>
            <div className={`hero-micro fade d4 ${show ? "on" : ""}`}>
              {[["25–30 min", "Service Time"], ["5% Charge", "Service Fee"], ["Faisalabad", "Bypass Road"]].map(([v, l]) => (
                <div key={l}>
                  <div className="hero-micro-val">{v}</div>
                  <div className="hero-micro-lbl">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", textAlign: "center" }}>
          <div className="scroll-line" />
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: 3, marginTop: 10, textTransform: "uppercase" }}>Scroll</div>
        </div>
      </section>

      {/* STATS */}
      <div className="stats-wrap">
        <div className="stats-grid">
          {STATS.map(s => (
            <div key={s.label} className="stat-cell">
              <div className="stat-val">{s.value}</div>
              <div className="stat-lbl">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* MENU */}
      <section id="menu" className="menu-sec">
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 50 }}>
            <p className="sec-label" style={{ marginBottom: 14 }}>Our Menu</p>
            <h2 className="sec-title">Crafted with <em>Passion</em></h2>
            <div className="divider" />
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#999", marginTop: 18, lineHeight: 1.7 }}>Fresh ingredients · Traditional recipes · Unforgettable taste</p>
          </div>

          <div className="tabs-wrap">
            {CATEGORIES.map(c => (
              <button key={c.key} className={`tab-btn ${activeTab === c.key ? "active" : ""}`} onClick={() => setActiveTab(c.key)}>
                {c.icon} {c.label}
              </button>
            ))}
          </div>

          <div className="menu-card">
            <div className="menu-head">
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 30 }}>{activeCat?.icon}</span>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 700, color: "#fff" }}>{activeCat?.label}</span>
              </div>
              {items[0]?.half !== undefined && (
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.38)", letterSpacing: 2, textTransform: "uppercase" }}>Half · Full</span>
              )}
            </div>
            {items.map((item, i) => (
              <div key={i} className="menu-row">
                <span className="dish-name">{item.name}</span>
                <div className="price-tags">
                  {item.single !== undefined && <span className="tag tag-single">Rs. {item.single.toLocaleString()}</span>}
                  {item.half != null && <span className="tag tag-half">½ Rs. {item.half.toLocaleString()}</span>}
                  {item.full != null && <span className="tag tag-full">Full Rs. {item.full.toLocaleString()}</span>}
                </div>
              </div>
            ))}
          </div>

          <div className="menu-note">
            <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
              <span style={{ fontSize: 24, flexShrink: 0 }}>ℹ️</span>
              <div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, color: "#1a1208", marginBottom: 6 }}>Please Note</p>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#777", lineHeight: 1.75 }}>
                  Service meal takes <strong>25–30 minutes</strong> to prepare. A <strong>+5% service charge</strong> will be added.
                  Thank you for dining at Kanwal Restaurant — enjoy your meal! 🙏
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="about-sec">
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center" }}>
            <p className="sec-label" style={{ marginBottom: 14 }}>Why Choose Us</p>
            <h2 className="sec-title light">The <em>Kanwal</em> Experience</h2>
            <div className="divider" />
          </div>
          <div className="feat-grid">
            {FEATURES.map(f => (
              <div key={f.title} className="feat-card">
                <div className="feat-icon">{f.icon}</div>
                <div className="feat-title">{f.title}</div>
                <div className="feat-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="contact-sec">
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 50 }}>
            <p className="sec-label" style={{ marginBottom: 14 }}>Get In Touch</p>
            <h2 className="sec-title">Visit <em>Us Today</em></h2>
            <div className="divider" />
          </div>
          <div className="contact-card">
            <a href="https://wa.me/923001322575" className="contact-row">
              <div className="contact-icon" style={{ background: "#25D366" }}>💬</div>
              <div>
                <div className="contact-lbl">WhatsApp</div>
                <div className="contact-val">0300-1322575</div>
              </div>
              <span className="contact-arrow">→</span>
            </a>
            <a href="tel:04133422575" className="contact-row">
              <div className="contact-icon" style={{ background: "#1a1208" }}>📞</div>
              <div>
                <div className="contact-lbl">Phone</div>
                <div className="contact-val">041-3422575</div>
              </div>
              <span className="contact-arrow">→</span>
            </a>
            <div className="contact-row" style={{ cursor: "default" }}>
              <div className="contact-icon" style={{ background: "#e8793a" }}>📍</div>
              <div>
                <div className="contact-lbl">Address</div>
                <div className="contact-val">465 Bypass Road, Faisalabad<br />Board Samundri Road</div>
              </div>
            </div>
            <div className="contact-note">🕐 Open Daily · Lunch & Dinner · Dine-in & Takeaway</div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div className="logo-circle" style={{ width: 32, height: 32, fontSize: 15 }}>🔥</div>
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 700, color: "#fff" }}>Kanwal Restaurant</span>
          </div>
          <p className="footer-copy">© 2026 Kanwal Restaurant · Faisalabad · All rights reserved</p>
        </div>
      </footer>
    </div>
  );
}
