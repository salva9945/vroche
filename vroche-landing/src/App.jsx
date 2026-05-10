import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";

// ─── Brand & Config ───────────────────────────────────────────────────────────
const BRAND = {
  mint:  "#63D7B1",
  coral: "#FF5733",
  white: "#FCFFFE",
  black: "#040806",
};
const VROCHE_LOGO_SRC      = "https://i.postimg.cc/7ZnpbB79/vroche-Blanco.png";
const VROCHE_LOGO_TEXT_SRC = "https://i.postimg.cc/0Qn4yrwr/vroche-Blanco-Texto.png";

// Replace with live store URLs when the app is published
const STORE_HREFS = { apple: "#waitlist", google: "#waitlist" };

const LEGAL = {
  company:   "VROCHE APP S.L.",
  cif:       "B22761977",
  address:   "Calle Don Abraham Quintanilla, 12, Madrid",
  email:     "privacidad@info.vroche.com",
  domain:    "vroche.com",
  dpo_email: "privacidad@info.vroche.com",
  aepd_url:  "https://www.aepd.es",
};

// ─── Utils ────────────────────────────────────────────────────────────────────
export function clamp(v, mn, mx) { return Math.min(Math.max(v, mn), mx); }
export function isValidWaitlistEmail(v) {
  return typeof v === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}
export function createLogoFieldItems(count = 110, seed = 91) {
  let s = seed;
  const rnd = () => { s = (s * 1664525 + 1013904223) % 4294967296; return s / 4294967296; };
  return Array.from({ length: count }, (_, i) => ({
    id: `vbg-${i}`,
    size: 12 + rnd() * 20,
    left: 2 + rnd() * 96,
    top:  2 + rnd() * 96,
    rotate:   -38 + rnd() * 76,
    opacity:   0.03 + rnd() * 0.055,
    driftX:   -7  + rnd() * 14,
    driftY:   -7  + rnd() * 14,
    duration: 12  + rnd() * 10,
    delay:    rnd() * 8,
  }));
}
export function calculateLogoRotation(px, py, rect, vw = 1440, vh = 900) {
  if (!rect) return { rotateX: 0, rotateY: 0, shineX: 50, shineY: 50 };
  const cx = rect.left + rect.width  / 2;
  const cy = rect.top  + rect.height / 2;
  return {
    rotateX: clamp((-( py - cy) / Math.max(vh * 0.3, 1)) * 24, -28, 28),
    rotateY: clamp(((  px - cx) / Math.max(vw * 0.32, 1)) * 26, -30, 30),
    shineX:  clamp(((px - rect.left) / Math.max(rect.width,  1)) * 100, 0, 100),
    shineY:  clamp(((py - rect.top ) / Math.max(rect.height, 1)) * 100, 0, 100),
  };
}

const SCATTERED_LOGOS = createLogoFieldItems(110, 91);

// ─── Icons ────────────────────────────────────────────────────────────────────
function IconBase({ children, className = "h-5 w-5", style }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" style={style}>
      {children}
    </svg>
  );
}
const ArrowRightIcon   = (p) => <IconBase {...p}><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></IconBase>;
const CameraIcon       = (p) => <IconBase {...p}><path d="M4 7h3l2-2h6l2 2h3a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z"/><circle cx="12" cy="13" r="4"/></IconBase>;
const ShirtIcon        = (p) => <IconBase {...p}><path d="M9 4l3 2 3-2 4 3-2 4-2-1v10H9V10l-2 1-2-4 4-3z"/></IconBase>;
const SocialIcon       = (p) => <IconBase {...p}><circle cx="6.5" cy="12" r="2.2"/><circle cx="17.5" cy="7" r="2.2"/><circle cx="17.5" cy="17" r="2.2"/><path d="M8.6 11l6.6-3"/><path d="M8.6 13l6.6 3"/></IconBase>;
const Wand2Icon        = (p) => <IconBase {...p}><path d="M15 4V2"/><path d="M15 10V8"/><path d="M19 6h2"/><path d="M9 6H7"/><path d="M17.5 3.5l1-1"/><path d="M12 21l-7-7 9-9 7 7-9 9z"/></IconBase>;
const Layers3Icon      = (p) => <IconBase {...p}><path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 12l9 5 9-5"/><path d="M3 16l9 5 9-5"/></IconBase>;
const CalendarDaysIcon = (p) => <IconBase {...p}><path d="M7 2v4"/><path d="M17 2v4"/><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/></IconBase>;
const LockIcon         = (p) => <IconBase {...p}><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V8a4 4 0 1 1 8 0v3"/></IconBase>;
const SmartphoneIcon   = (p) => <IconBase {...p}><rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/></IconBase>;
const ScanLineIcon     = (p) => <IconBase {...p}><path d="M4 7V5a1 1 0 0 1 1-1h2"/><path d="M17 4h2a1 1 0 0 1 1 1v2"/><path d="M20 17v2a1 1 0 0 1-1 1h-2"/><path d="M7 20H5a1 1 0 0 1-1-1v-2"/><path d="M4 12h16"/></IconBase>;
const CloudSunIcon     = (p) => <IconBase {...p}><path d="M12 5V3"/><path d="M5.6 6.6L4.2 5.2"/><path d="M3 12H1"/><path d="M18 18a4 4 0 1 0-1.2-7.8A5 5 0 0 0 7 11a4 4 0 0 0 1 7h10z"/><circle cx="12" cy="12" r="3"/></IconBase>;
const ZapIcon          = (p) => <IconBase {...p}><path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z"/></IconBase>;
const ShoppingBagIcon  = (p) => <IconBase {...p}><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></IconBase>;
const XIcon            = (p) => <IconBase {...p}><path d="M18 6L6 18"/><path d="M6 6l12 12"/></IconBase>;
const ChevronDownIcon  = (p) => <IconBase {...p}><path d="M6 9l6 6 6-6"/></IconBase>;
const ShieldIcon       = (p) => <IconBase {...p}><path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V6l-8-4z"/></IconBase>;
const FileTextIcon     = (p) => <IconBase {...p}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></IconBase>;
const CookieIcon       = (p) => <IconBase {...p}><circle cx="12" cy="12" r="10"/><path d="M8 13.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" fill="currentColor"/><path d="M12 7.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" fill="currentColor"/><path d="M16 13.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" fill="currentColor"/><path d="M12 17.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" fill="currentColor"/></IconBase>;
const HeartIcon        = (p) => <IconBase {...p}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></IconBase>;
const UsersIcon        = (p) => <IconBase {...p}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></IconBase>;
const StarIcon         = (p) => <IconBase {...p}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></IconBase>;
const TrendingUpIcon   = (p) => <IconBase {...p}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></IconBase>;

// Apple logo SVG
function AppleSVG() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
  );
}

// Google Play icon
function PlayStoreSVG() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 20.5L14.5 12 3 3.5V20.5Z"        fill="#00D4FF"/>
      <path d="M3 3.5L14.5 12L18.5 8L3 3.5Z"       fill="#34E89E"/>
      <path d="M3 20.5L18.5 16L14.5 12L3 20.5Z"    fill="#FF4B4B"/>
      <path d="M14.5 12L18.5 8L21.5 12L18.5 16L14.5 12Z" fill="#FFB300"/>
    </svg>
  );
}

// ─── Cookie Consent ───────────────────────────────────────────────────────────
const COOKIE_KEY = "vroche_cookie_consent_v1";
function getCookieConsent() { try { return JSON.parse(localStorage.getItem(COOKIE_KEY)); } catch { return null; } }
function setCookieConsent(v) { try { localStorage.setItem(COOKIE_KEY, JSON.stringify(v)); } catch {} }

function CookieBanner({ onOpenPolicy }) {
  const [visible, setVisible]       = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [prefs, setPrefs]           = useState({ analytics: false, marketing: false });
  useEffect(() => { if (!getCookieConsent()) setVisible(true); }, []);
  const acceptAll  = () => { setCookieConsent({ analytics: true,  marketing: true,  necessary: true, ts: Date.now() }); setVisible(false); };
  const rejectAll  = () => { setCookieConsent({ analytics: false, marketing: false, necessary: true, ts: Date.now() }); setVisible(false); };
  const savePrefs  = () => { setCookieConsent({ ...prefs, necessary: true, ts: Date.now() }); setVisible(false); };
  if (!visible) return null;
  return (
    <div role="dialog" aria-modal="true" aria-label="Consentimiento de cookies"
      style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 9999, padding: "0 0 env(safe-area-inset-bottom)", fontFamily: "DM Sans, sans-serif" }}>
      <div style={{ background: "rgba(4,8,6,0.97)", backdropFilter: "blur(24px)", borderTop: "1px solid rgba(99,215,177,0.18)", padding: "20px 24px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 12 }}>
            <CookieIcon className="h-5 w-5" style={{ color: BRAND.mint, flexShrink: 0, marginTop: 2 }} />
            <div style={{ flex: 1 }}>
              <p style={{ color: "#FCFFFE", fontSize: 14, fontWeight: 700, margin: 0 }}>Vroche usa cookies</p>
              <p style={{ color: "rgba(252,255,254,0.62)", fontSize: 13, margin: "4px 0 0", lineHeight: 1.6 }}>
                Usamos cookies necesarias para el funcionamiento de la web y, con tu consentimiento, cookies analíticas (Google Analytics).{" "}
                <button onClick={onOpenPolicy} style={{ color: BRAND.mint, background: "none", border: "none", cursor: "pointer", fontSize: 13, padding: 0, textDecoration: "underline" }}>Política de cookies</button>
              </p>
            </div>
          </div>
          {showDetails && (
            <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 14, padding: "14px 16px", marginBottom: 14, display: "flex", flexDirection: "column", gap: 10 }}>
              <CookieToggle title="Cookies necesarias" desc="Imprescindibles para el funcionamiento de la web." checked={true} disabled={true} />
              <CookieToggle title="Cookies analíticas (Google Analytics)" desc="Análisis estadístico del uso de la web (datos anónimos)." checked={prefs.analytics} onChange={v => setPrefs(p => ({ ...p, analytics: v }))} />
              <CookieToggle title="Cookies de marketing" desc="Para mostrarte anuncios relevantes. Actualmente no activas." checked={prefs.marketing} onChange={v => setPrefs(p => ({ ...p, marketing: v }))} />
            </div>
          )}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
            <button onClick={() => setShowDetails(d => !d)} style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(252,255,254,0.7)", borderRadius: 999, padding: "9px 16px", fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 5, fontFamily: "DM Sans, sans-serif" }}>
              {showDetails ? "Ocultar opciones" : "Personalizar"}
              <ChevronDownIcon className="h-3 w-3" style={{ transform: showDetails ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
            </button>
            {showDetails && <button onClick={savePrefs} style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.18)", color: "#FCFFFE", borderRadius: 999, padding: "9px 18px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "DM Sans, sans-serif" }}>Guardar preferencias</button>}
            <div style={{ marginLeft: "auto", display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button onClick={rejectAll} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.18)", color: "rgba(252,255,254,0.65)", borderRadius: 999, padding: "9px 18px", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "DM Sans, sans-serif" }}>Solo necesarias</button>
              <button onClick={acceptAll} style={{ background: BRAND.mint, border: "none", color: BRAND.black, borderRadius: 999, padding: "9px 20px", fontSize: 12, fontWeight: 800, cursor: "pointer", letterSpacing: "0.08em", fontFamily: "DM Sans, sans-serif" }}>Aceptar todo</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function CookieToggle({ title, desc, checked, disabled, onChange }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
      <div>
        <p style={{ color: "#FCFFFE", fontSize: 13, fontWeight: 600, margin: 0 }}>{title}</p>
        <p style={{ color: "rgba(252,255,254,0.48)", fontSize: 12, margin: "2px 0 0", lineHeight: 1.5 }}>{desc}</p>
      </div>
      <label style={{ flexShrink: 0, position: "relative", cursor: disabled ? "not-allowed" : "pointer" }}>
        <input type="checkbox" checked={checked} disabled={disabled} onChange={e => onChange && onChange(e.target.checked)} style={{ position: "absolute", opacity: 0, width: 0, height: 0 }} />
        <div style={{ width: 40, height: 22, borderRadius: 999, background: checked ? BRAND.mint : "rgba(255,255,255,0.15)", transition: "background 0.2s", display: "flex", alignItems: "center", padding: "2px", opacity: disabled ? 0.5 : 1 }}>
          <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#FCFFFE", transform: checked ? "translateX(18px)" : "translateX(0)", transition: "transform 0.2s" }} />
        </div>
      </label>
    </div>
  );
}

// ─── Legal Modal ──────────────────────────────────────────────────────────────
function LegalModal({ page, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const h = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", h); };
  }, [onClose]);
  const pages  = { privacy: <PrivacyPolicy />, terms: <TermsConditions />, legal: <LegalNotice />, cookies: <CookiePolicy /> };
  const titles = { privacy: "Política de Privacidad", terms: "Términos y Condiciones", legal: "Aviso Legal", cookies: "Política de Cookies" };
  return (
    <div onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      style={{ position: "fixed", inset: 0, zIndex: 10000, background: "rgba(4,8,6,0.88)", backdropFilter: "blur(16px)", display: "flex", alignItems: "flex-end", justifyContent: "center", fontFamily: "DM Sans, sans-serif" }}
      role="dialog" aria-modal="true" aria-label={titles[page]}>
      <div style={{ background: "#0a120e", border: "1px solid rgba(99,215,177,0.14)", borderRadius: "28px 28px 0 0", width: "100%", maxWidth: 780, maxHeight: "90vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ padding: "20px 28px 16px", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <h2 style={{ color: "#FCFFFE", fontSize: 18, fontWeight: 800, margin: 0, letterSpacing: "-0.02em" }}>{titles[page]}</h2>
          <button onClick={onClose} aria-label="Cerrar" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "50%", width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "rgba(252,255,254,0.7)" }}>
            <XIcon className="h-4 w-4" />
          </button>
        </div>
        <div style={{ overflowY: "auto", padding: "24px 28px 40px", flex: 1 }}>{pages[page]}</div>
      </div>
    </div>
  );
}

// ─── Legal Content ────────────────────────────────────────────────────────────
const LS = {
  h2:   { color: BRAND.mint, fontSize: 15, fontWeight: 800, marginTop: 28, marginBottom: 8, letterSpacing: "-0.01em" },
  h3:   { color: "#FCFFFE", fontSize: 13, fontWeight: 700, marginTop: 18, marginBottom: 6 },
  p:    { color: "rgba(252,255,254,0.68)", fontSize: 13, lineHeight: 1.75, margin: "0 0 10px" },
  li:   { color: "rgba(252,255,254,0.68)", fontSize: 13, lineHeight: 1.75, marginBottom: 4 },
  date: { color: "rgba(252,255,254,0.38)", fontSize: 12, marginBottom: 20, display: "block" },
  link: { color: BRAND.mint, textDecoration: "none" },
  tbl:  { width: "100%", borderCollapse: "collapse", marginBottom: 16, fontSize: 12 },
  th:   { color: BRAND.mint, fontWeight: 700, padding: "8px 10px", borderBottom: "1px solid rgba(99,215,177,0.2)", textAlign: "left" },
  td:   { color: "rgba(252,255,254,0.65)", padding: "8px 10px", borderBottom: "1px solid rgba(255,255,255,0.06)", verticalAlign: "top" },
};
function LS2({ title, children }) { return <><h2 style={LS.h2}>{title}</h2>{children}</>; }

function PrivacyPolicy() {
  return (
    <div>
      <span style={LS.date}>Última actualización: mayo de 2025 · Versión 1.0</span>
      <p style={LS.p}>En <strong style={{ color: "#FCFFFE" }}>VROCHE APP S.L.</strong> tratamos tus datos personales con transparencia y en cumplimiento del <strong style={{ color: "#FCFFFE" }}>RGPD (UE) 2016/679</strong> y la <strong style={{ color: "#FCFFFE" }}>LOPDGDD 3/2018</strong>.</p>
      <LS2 title="1. Responsable del tratamiento">
        <table style={LS.tbl}><tbody>{[["Denominación social", LEGAL.company],["CIF", LEGAL.cif],["Domicilio social", LEGAL.address],["Correo de contacto", LEGAL.email],["DPO / Delegado", LEGAL.dpo_email]].map(([k,v]) => (<tr key={k}><td style={{ ...LS.td, fontWeight: 600, color: "rgba(252,255,254,0.85)", width: "42%" }}>{k}</td><td style={LS.td}>{v}</td></tr>))}</tbody></table>
      </LS2>
      <LS2 title="2. Datos que recogemos y finalidades">
        <table style={LS.tbl}><thead><tr><th style={LS.th}>Dato</th><th style={LS.th}>Finalidad</th><th style={LS.th}>Base legal</th></tr></thead>
        <tbody>{[["Nombre y correo", "Gestión de acceso beta / waitlist", "Consentimiento (art. 6.1.a RGPD)"],["Fotografías / imágenes", "Virtual try-on (datos biométricos)", "Consentimiento explícito (art. 9 RGPD)"],["Medidas y talla", "Recomendaciones personalizadas", "Consentimiento (art. 6.1.a RGPD)"],["Perfil de estilo", "Personalización AI Stylist", "Consentimiento (art. 6.1.a RGPD)"],["Login social", "Autenticación", "Ejecución de contrato (art. 6.1.b RGPD)"],["Cookies navegación", "Análisis estadístico (Google Analytics)", "Consentimiento (art. 6.1.a RGPD)"]].map(([d,f,b]) => (<tr key={d}><td style={{ ...LS.td, fontWeight: 600, color: "rgba(252,255,254,0.85)" }}>{d}</td><td style={LS.td}>{f}</td><td style={LS.td}>{b}</td></tr>))}</tbody></table>
        <p style={{ ...LS.p, borderLeft: `3px solid ${BRAND.coral}`, paddingLeft: 12 }}><strong style={{ color: "#FCFFFE" }}>Nota especial:</strong> Las imágenes de personas pueden constituir datos biométricos (art. 9 RGPD). Se eliminan de nuestros servidores en máximo 30 días.</p>
      </LS2>
      <LS2 title="3. Conservación"><p style={LS.p}>Mientras mantengas la cuenta activa; después bloqueamos hasta 6 años (art. 30 C.Com.) y eliminamos.</p></LS2>
      <LS2 title="4. Destinatarios"><ul style={{ paddingLeft: 20 }}>{["Google LLC (Analytics, Firebase) — CCT","Apple Inc. (Sign in with Apple) — CCT","Infraestructura cloud UE/EEE"].map(i => <li key={i} style={LS.li}>{i}</li>)}</ul><p style={LS.p}>No vendemos ni cedemos datos a terceros.</p></LS2>
      <LS2 title="5. Tus derechos (RGPD)"><p style={LS.p}>Escribe a <a href={`mailto:${LEGAL.email}`} style={LS.link}>{LEGAL.email}</a> para ejercer: acceso, rectificación, supresión, oposición, limitación, portabilidad y retirada del consentimiento. Puedes reclamar ante la <a href={LEGAL.aepd_url} style={LS.link} target="_blank" rel="noopener noreferrer">AEPD</a>.</p></LS2>
      <LS2 title="6. Seguridad"><p style={LS.p}>Cifrado TLS, control de acceso, seudonimización. Notificamos brechas en 72 h (RGPD).</p></LS2>
    </div>
  );
}
function TermsConditions() {
  return (
    <div>
      <span style={LS.date}>Última actualización: mayo de 2025 · Versión 1.0</span>
      <p style={LS.p}>Estos Términos regulan el acceso a <strong style={{ color: "#FCFFFE" }}>Vroche</strong> ofrecido por <strong style={{ color: "#FCFFFE" }}>VROCHE APP S.L.</strong></p>
      <LS2 title="1. Aceptación"><p style={LS.p}>El acceso implica aceptación plena. Si no estás de acuerdo, no uses el servicio.</p></LS2>
      <LS2 title="2. Fase beta">
        <p style={{ ...LS.p, borderLeft: `3px solid ${BRAND.mint}`, paddingLeft: 12 }}><strong style={{ color: "#FCFFFE" }}>Servicio en beta cerrada.</strong> Puede contener errores y Vroche puede interrumpir el acceso en cualquier momento. El acceso es gratuito y sin garantías de continuidad.</p>
      </LS2>
      <LS2 title="3. Registro"><ul style={{ paddingLeft: 20 }}>{["Mínimo 14 años (menores con consentimiento parental).","Responsable de la confidencialidad de tus credenciales.","Información veraz y actualizada.","Prohibido crear cuentas falsas o suplantar identidades."].map(i => <li key={i} style={LS.li}>{i}</li>)}</ul></LS2>
      <LS2 title="4. Uso aceptable"><p style={LS.p}>Queda prohibido subir contenido ilegal u ofensivo, usar spam, acceder sin autorización a sistemas ajenos, realizar ingeniería inversa o usar bots.</p></LS2>
      <LS2 title="5. Contenido de usuario"><p style={LS.p}>Conservas la titularidad de tu contenido y concedes a Vroche licencia limitada para prestar el servicio. Vroche puede eliminar contenido que infrinja estos Términos.</p></LS2>
      <LS2 title="6. Propiedad intelectual"><p style={LS.p}>Diseño, código, marca, logos y modelos de IA son propiedad de VROCHE APP S.L. Prohibida su reproducción sin autorización.</p></LS2>
      <LS2 title="7. Limitación de responsabilidad"><p style={LS.p}>Servicio «as-is» durante beta. Sin garantía de disponibilidad ininterrumpida ni exactitud de recomendaciones. Responsabilidad máxima: importes abonados en 12 meses (€0 en beta).</p></LS2>
      <LS2 title="8. Ley aplicable"><p style={LS.p}>Legislación española. Juzgados y Tribunales de Madrid, salvo fuero imperativo de consumidores.</p></LS2>
    </div>
  );
}
function LegalNotice() {
  return (
    <div>
      <span style={LS.date}>Última actualización: mayo de 2025</span>
      <p style={LS.p}>En cumplimiento del art. 10 <strong style={{ color: "#FCFFFE" }}>LSSI-CE</strong>:</p>
      <table style={LS.tbl}><tbody>{[["Denominación social", LEGAL.company],["CIF", LEGAL.cif],["Domicilio", LEGAL.address + ", España"],["Correo", LEGAL.email],["Dominio", LEGAL.domain],["Registro mercantil", "Pendiente de inscripción en el RM de Madrid"]].map(([k,v]) => (<tr key={k}><td style={{ ...LS.td, fontWeight: 600, color: "rgba(252,255,254,0.85)", width: "42%" }}>{k}</td><td style={LS.td}>{v}</td></tr>))}</tbody></table>
      <LS2 title="Objeto"><p style={LS.p}>VROCHE APP S.L. es titular de vroche.com y la aplicación Vroche, servicios de moda inteligente basados en IA.</p></LS2>
      <LS2 title="Propiedad intelectual"><p style={LS.p}>Todos los contenidos (textos, imágenes, diseños, código, logotipos) son propiedad de VROCHE APP S.L. o de sus licenciantes. Se prohíbe su reproducción sin autorización.</p></LS2>
      <LS2 title="Legislación aplicable"><p style={LS.p}>Legislación española. Juzgados y Tribunales de Madrid.</p></LS2>
    </div>
  );
}
function CookiePolicy() {
  return (
    <div>
      <span style={LS.date}>Última actualización: mayo de 2025</span>
      <p style={LS.p}>Política de Cookies de <strong style={{ color: "#FCFFFE" }}>vroche.com</strong> conforme al art. 22.2 LSSI-CE y el RGPD.</p>
      <LS2 title="¿Qué es una cookie?"><p style={LS.p}>Un fichero de texto que un sitio web envía al navegador y que queda almacenado en tu dispositivo para recordar preferencias y analizar el uso.</p></LS2>
      <LS2 title="Cookies que utilizamos">
        <table style={LS.tbl}><thead><tr><th style={LS.th}>Cookie</th><th style={LS.th}>Tipo</th><th style={LS.th}>Finalidad</th><th style={LS.th}>Duración</th><th style={LS.th}>Consentimiento</th></tr></thead>
        <tbody>{[["vroche_cookie_consent_v1","Técnica / Necesaria","Preferencias de consentimiento","1 año","No requerido"],["_ga, _ga_*","Analítica GA4","Análisis estadístico (anónimo)","2 años","Requerido"],["_gid","Analítica GA","Distingue sesiones (anónimo)","24 h","Requerido"]].map(([n,t,f,d,c]) => (<tr key={n}><td style={{ ...LS.td, fontFamily: "monospace", fontSize: 11, color: BRAND.mint }}>{n}</td><td style={LS.td}>{t}</td><td style={LS.td}>{f}</td><td style={LS.td}>{d}</td><td style={{ ...LS.td, color: c === "No requerido" ? "rgba(252,255,254,0.45)" : BRAND.mint }}>{c}</td></tr>))}</tbody></table>
      </LS2>
      <LS2 title="Gestión y retirada"><p style={LS.p}>Gestiona tus preferencias desde el banner de cookies del pie de página o en la configuración de tu navegador (Chrome: chrome://settings/cookies · Firefox: about:preferences#privacy · Safari: Preferencias › Privacidad).</p></LS2>
    </div>
  );
}

// ─── UI Primitives ────────────────────────────────────────────────────────────
function Badge({ children, className = "" }) {
  return (
    <div className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-extrabold uppercase tracking-[0.2em] text-white backdrop-blur-xl ${className}`} style={{ fontFamily: "DM Sans" }}>
      {children}
    </div>
  );
}
function SectionLabel({ children, dark = false }) {
  return (
    <p className="mb-5 text-xs font-extrabold uppercase tracking-[0.3em]"
      style={{ fontFamily: "DM Sans", color: dark ? "rgba(252,255,254,0.4)" : "rgba(4,8,6,0.4)" }}>
      {children}
    </p>
  );
}
function Pill({ children }) {
  return <span className="rounded-full border border-black/10 bg-black/[0.04] px-4 py-2 text-sm font-medium text-black/70" style={{ fontFamily: "Roboto" }}>{children}</span>;
}
function FeatureCard({ icon: Ic, title, text, accent }) {
  const isCoral = accent === "coral";
  return (
    <div className={`group relative overflow-hidden rounded-[2rem] border p-7 transition hover:-translate-y-1 hover:shadow-2xl ${isCoral ? "border-[#FF5733]/20 bg-[#FF5733]/[0.04]" : "border-black/[0.08] bg-white shadow-[0_20px_70px_rgba(4,8,6,0.06)]"}`}>
      <div className={`mb-6 flex h-12 w-12 items-center justify-center rounded-2xl ${isCoral ? "bg-[#FF5733]/15" : "bg-[#63D7B1]/15"}`}>
        <Ic className={`h-5 w-5 ${isCoral ? "text-[#FF5733]" : "text-[#040806]"}`} />
      </div>
      <h3 className="mb-3 text-xl font-extrabold tracking-[-0.02em]" style={{ fontFamily: "DM Sans" }}>{title}</h3>
      <p className="text-sm leading-7 text-black/[0.55]" style={{ fontFamily: "Roboto" }}>{text}</p>
    </div>
  );
}
function NavChipGroup() {
  return (
    <nav aria-label="Secciones" className="hidden items-center gap-1 md:flex">
      {[["#how","Cómo funciona"],["#features","Features"],["#community","Comunidad"],["#waitlist","Beta"]].map(([href, label]) => (
        <a key={href} href={href} className="rounded-full px-4 py-2 text-xs font-semibold text-white/60 transition hover:bg-white/[0.08] hover:text-white" style={{ fontFamily: "DM Sans" }}>{label}</a>
      ))}
    </nav>
  );
}
function HeaderLogo() {
  return (
    <div className="flex items-center">
      <img src={VROCHE_LOGO_TEXT_SRC} alt="Vroche" style={{ height: 34, width: "auto", maxWidth: 145, objectFit: "contain" }} />
    </div>
  );
}

// ─── Store Download Button ────────────────────────────────────────────────────
function StoreButton({ store, size = "md" }) {
  const isApple = store === "apple";
  const sm      = size === "sm";
  return (
    <a
      href={STORE_HREFS[store]}
      className="inline-flex items-center gap-3 rounded-2xl transition hover:scale-105 active:scale-100"
      style={{
        background:  "rgba(255,255,255,0.08)",
        border:      "1px solid rgba(255,255,255,0.14)",
        padding:     sm ? "10px 18px" : "12px 22px",
        color:       BRAND.white,
        textDecoration: "none",
        backdropFilter: "blur(12px)",
        minWidth:    sm ? 140 : 160,
      }}
      aria-label={isApple ? "Download on the App Store" : "Get it on Google Play"}
    >
      <div style={{ flexShrink: 0 }}>{isApple ? <AppleSVG /> : <PlayStoreSVG />}</div>
      <div>
        <div style={{ fontSize: sm ? 9 : 10, opacity: 0.6, fontFamily: "DM Sans", fontWeight: 500, lineHeight: 1.3 }}>
          {isApple ? "Download on the" : "Get it on"}
        </div>
        <div style={{ fontSize: sm ? 14 : 16, fontFamily: "DM Sans", fontWeight: 700, lineHeight: 1.2 }}>
          {isApple ? "App Store" : "Google Play"}
        </div>
      </div>
    </a>
  );
}

// ─── Logo Reveal Background (interactive cursor) ──────────────────────────────
function LogoRevealBackground() {
  const fieldRef   = useRef(null);
  const rafRef     = useRef(null);
  const pointerRef = useRef({ x: -9999, y: -9999 });
  const handleMove = useCallback((e) => {
    pointerRef.current = { x: e.clientX, y: e.clientY };
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      if (!fieldRef.current) return;
      const { x, y } = pointerRef.current;
      fieldRef.current.style.setProperty("--reveal-x", `${x}px`);
      fieldRef.current.style.setProperty("--reveal-y", `${y}px`);
      fieldRef.current.style.setProperty("--reveal-opacity", "1");
    });
  }, []);
  const handleLeave = useCallback(() => {
    if (fieldRef.current) {
      fieldRef.current.style.setProperty("--reveal-x", "-9999px");
      fieldRef.current.style.setProperty("--reveal-y", "-9999px");
      fieldRef.current.style.setProperty("--reveal-opacity", "0");
    }
  }, []);
  useEffect(() => {
    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("pointerleave", handleLeave, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerleave", handleLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleMove, handleLeave]);
  return (
    <div ref={fieldRef} className="logo-reveal-field pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="logo-noise-layer">
        {SCATTERED_LOGOS.map((item) => (
          <div key={item.id} className="logo-noise-wrap" style={{ position: "absolute", left: `${item.left}%`, top: `${item.top}%`, width: item.size, height: item.size, opacity: item.opacity, "--rotation": `${item.rotate}deg`, "--drift-x": `${item.driftX}px`, "--drift-y": `${item.driftY}px`, "--drift-duration": `${item.duration}s`, "--drift-delay": `${item.delay}s`, transform: `translate(-50%,-50%) rotate(${item.rotate}deg)` }}>
            <img src={VROCHE_LOGO_SRC} alt="" className="logo-noise-img logo-noise-img-base" style={{ width: item.size, height: item.size }} />
          </div>
        ))}
      </div>
      <div className="logo-reveal-layer">
        {SCATTERED_LOGOS.map((item) => (
          <div key={item.id + "-r"} className="logo-noise-wrap" style={{ position: "absolute", left: `${item.left}%`, top: `${item.top}%`, width: item.size, height: item.size, opacity: item.opacity * 2.5, "--rotation": `${item.rotate}deg`, "--drift-x": `${item.driftX}px`, "--drift-y": `${item.driftY}px`, "--drift-duration": `${item.duration}s`, "--drift-delay": `${item.delay}s`, transform: `translate(-50%,-50%) rotate(${item.rotate}deg)` }}>
            <img src={VROCHE_LOGO_SRC} alt="" className="logo-noise-img logo-noise-img-reveal" style={{ width: item.size, height: item.size }} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── 3-D Vroche Logo ──────────────────────────────────────────────────────────
function Global3DVrocheLogo() {
  const rootRef   = useRef(null);
  const objectRef = useRef(null);
  const rafRef    = useRef(null);
  const ptrRef    = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  useEffect(() => {
    function onMove(e) {
      ptrRef.current = { x: e.clientX, y: e.clientY };
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        if (!rootRef.current || !objectRef.current) return;
        const rect = objectRef.current.getBoundingClientRect();
        const { rotateX, rotateY, shineX, shineY } = calculateLogoRotation(ptrRef.current.x, ptrRef.current.y, rect, window.innerWidth, window.innerHeight);
        objectRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        rootRef.current.style.setProperty("--shine-x", `${shineX}%`);
        rootRef.current.style.setProperty("--shine-y", `${shineY}%`);
        rootRef.current.style.setProperty("--glow-x",  `${shineX}%`);
        rootRef.current.style.setProperty("--glow-y",  `${shineY}%`);
        rootRef.current.style.setProperty("--glow-opacity", "0.85");
      });
    }
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => { window.removeEventListener("pointermove", onMove); if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);
  const depths = [0.88, 0.76, 0.64, 0.52, 0.40, 0.28];
  return (
    <div ref={rootRef} className="logo3d-root relative mx-auto flex items-center justify-center" style={{ width: "min(380px,72vw)", height: "min(380px,72vw)" }} aria-hidden="true">
      <div className="logo3d-global-aura" />
      <div className="logo3d-orbit logo3d-orbit-a" />
      <div className="logo3d-orbit logo3d-orbit-b" />
      <div className="particle-a logo3d-particle" /><div className="particle-b logo3d-particle" /><div className="particle-c logo3d-particle" /><div className="particle-d logo3d-particle" />
      <div ref={objectRef} className="logo3d-object" style={{ animation: "heroFloat 6s ease-in-out infinite" }}>
        <div className="logo3d-depth-stack">
          {depths.map((op, i) => (
            <div key={i} style={{ position: "absolute", inset: 0, transform: `translateZ(${(i + 1) * -10}px)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img src={VROCHE_LOGO_SRC} alt="" className="logo-depth-image" style={{ opacity: op * 0.45, width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
          ))}
        </div>
        <div className="logo3d-front">
          <img src={VROCHE_LOGO_SRC} alt="Vroche logo" className="logo-front-image" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </div>
        <div className="logo3d-shine" />
      </div>
      <div className="logo3d-shadow" />
    </div>
  );
}

// ─── Fashion Figure (Scroll Story Visual) ────────────────────────────────────
function FashionFigure({ step }) {
  const t = (s, delay = 0) => ({ opacity: step >= s ? 1 : 0, transition: `opacity 0.7s ease ${delay}s` });
  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 260, margin: "0 auto" }}>
      <svg viewBox="0 0 260 520" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto", display: "block" }}>
        {/* ── Base silhouette (ghost, always visible) ── */}
        {/* Head */}
        <ellipse cx="130" cy="54" rx="34" ry="40" stroke="rgba(255,255,255,0.14)" strokeWidth="1.5" fill="rgba(255,255,255,0.02)" />
        {/* Hair suggestion */}
        <path d="M 96 50 Q 96 14 130 14 Q 164 14 164 50" stroke="rgba(255,255,255,0.09)" strokeWidth="2" fill="none" />
        {/* Neck */}
        <rect x="122" y="93" width="16" height="20" rx="6" stroke="rgba(255,255,255,0.12)" strokeWidth="1" fill="rgba(255,255,255,0.02)" />
        {/* Torso */}
        <path d="M 80 113 Q 66 128 68 170 L 70 228 L 190 228 L 192 170 Q 194 128 180 113 Z" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" fill="rgba(255,255,255,0.02)" />
        {/* Hips */}
        <path d="M 70 228 L 62 292 L 198 292 L 190 228 Z" stroke="rgba(255,255,255,0.10)" strokeWidth="1.5" fill="rgba(255,255,255,0.01)" />
        {/* Left arm */}
        <path d="M 80 113 L 42 218 L 56 223 L 92 126 Z" stroke="rgba(255,255,255,0.10)" strokeWidth="1" fill="rgba(255,255,255,0.02)" />
        {/* Right arm */}
        <path d="M 180 113 L 218 218 L 204 223 L 168 126 Z" stroke="rgba(255,255,255,0.10)" strokeWidth="1" fill="rgba(255,255,255,0.02)" />
        {/* Left leg */}
        <path d="M 62 292 L 56 476 L 104 476 L 112 292 Z" stroke="rgba(255,255,255,0.10)" strokeWidth="1.5" fill="rgba(255,255,255,0.01)" />
        {/* Right leg */}
        <path d="M 148 292 L 156 476 L 204 476 L 198 292 Z" stroke="rgba(255,255,255,0.10)" strokeWidth="1.5" fill="rgba(255,255,255,0.01)" />

        {/* ── Scan beam (step 0) ── */}
        {step === 0 && (
          <rect x="62" y="0" width="136" height="3" rx="1.5" fill={BRAND.mint} style={{ animation: "scanBeam 2.2s ease-in-out infinite" }} opacity="0.8" />
        )}

        {/* ── Scan grid overlay (step 0) ── */}
        {step === 0 && (
          <g opacity="0.18">
            {[130,160,190,220,250,280,310,340,370,400,430,460].map(y => (
              <line key={y} x1="62" y1={y > 520 ? 520 : y} x2="198" y2={y > 520 ? 520 : y} stroke={BRAND.mint} strokeWidth="0.5" />
            ))}
            {[80,100,120,140,160,180].map(x => (
              <line key={x} x1={x} y1="113" x2={x} y2="490" stroke={BRAND.mint} strokeWidth="0.5" />
            ))}
          </g>
        )}

        {/* ── Style DNA tags (step 1) ── */}
        <g style={t(1)}>
          {[
            { x: 30,  y: 80,  label: "Casual", color: BRAND.mint },
            { x: 166, y: 68,  label: "Minimal", color: BRAND.coral },
            { x: 20,  y: 200, label: "Chic",   color: BRAND.mint },
            { x: 168, y: 188, label: "Urban",  color: BRAND.coral },
          ].map(({ x, y, label, color }) => (
            <g key={label}>
              <rect x={x} y={y} width={label.length * 7 + 16} height={20} rx="10" fill={color} fillOpacity="0.18" />
              <rect x={x} y={y} width={label.length * 7 + 16} height={20} rx="10" stroke={color} strokeWidth="0.8" fill="none" />
              <text x={x + 8} y={y + 13.5} fill={color} fontSize="9" fontFamily="DM Sans" fontWeight="600">{label}</text>
            </g>
          ))}
          {/* Color palette dots */}
          {[BRAND.mint,"#1e3a5f",BRAND.coral,"#f5e6c8","#2c2c2c"].map((c, i) => (
            <circle key={c} cx={100 + i * 13} cy={500} r="5" fill={c} />
          ))}
        </g>

        {/* ── Outfit: Top (step 2) ── */}
        <g style={t(2)}>
          <path d="M 82 113 Q 68 128 70 170 L 72 226 L 188 226 L 190 170 Q 192 128 178 113 Z" fill={BRAND.mint} fillOpacity="0.82" />
          {/* Left sleeve */}
          <path d="M 82 113 L 44 216 L 58 221 L 94 126 Z" fill={BRAND.mint} fillOpacity="0.70" />
          {/* Right sleeve */}
          <path d="M 178 113 L 216 216 L 202 221 L 166 126 Z" fill={BRAND.mint} fillOpacity="0.70" />
          {/* Collar detail */}
          <path d="M 118 113 L 130 130 L 142 113" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none" />
        </g>

        {/* ── Outfit: Pants (step 2) ── */}
        <g style={{ ...t(2), transitionDelay: "0.15s" }}>
          <path d="M 72 226 L 64 290 L 196 290 L 188 226 Z" fill="#1e3a5f" fillOpacity="0.88" />
          {/* Left leg */}
          <path d="M 64 290 L 58 474 L 106 474 L 114 290 Z" fill="#1e3a5f" fillOpacity="0.88" />
          {/* Right leg */}
          <path d="M 146 290 L 154 474 L 202 474 L 196 290 Z" fill="#1e3a5f" fillOpacity="0.88" />
          {/* Belt line */}
          <line x1="64" y1="300" x2="196" y2="300" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        </g>

        {/* ── Shoes (step 2) ── */}
        <g style={{ ...t(2), transitionDelay: "0.3s" }}>
          <ellipse cx="82"  cy="481" rx="30" ry="9" fill="#111" />
          <ellipse cx="82"  cy="479" rx="28" ry="7" fill="#1a1a1a" />
          <ellipse cx="178" cy="481" rx="30" ry="9" fill="#111" />
          <ellipse cx="178" cy="479" rx="28" ry="7" fill="#1a1a1a" />
        </g>

        {/* ── Jacket / Outer layer (step 3) ── */}
        <g style={t(3)}>
          <path d="M 78 113 L 64 130 L 68 228 L 82 224 L 80 132 L 130 122 L 180 132 L 178 224 L 192 228 L 196 130 L 182 113 Z"
            fill={BRAND.coral} fillOpacity="0.72" />
          {/* Lapels */}
          <path d="M 110 113 L 124 135 L 130 122 L 136 135 L 150 113" stroke="rgba(255,255,255,0.3)" strokeWidth="1" fill="none" />
          {/* Jacket line */}
          <line x1="130" y1="122" x2="130" y2="226" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
        </g>

        {/* ── Try-on glow ring (step 3) ── */}
        {step >= 3 && (
          <g>
            <ellipse cx="130" cy="300" rx="90" ry="240"
              stroke={BRAND.mint} strokeWidth="2" fill="none"
              strokeOpacity="0.35"
              style={{ animation: "pulseRing 2s ease-in-out infinite" }} />
            <ellipse cx="130" cy="300" rx="105" ry="255"
              stroke={BRAND.mint} strokeWidth="1" fill="none"
              strokeOpacity="0.15"
              style={{ animation: "pulseRing 2s ease-in-out 0.5s infinite" }} />
            {/* AR corner markers */}
            {[[62,110],[198,110],[62,490],[198,490]].map(([x,y], i) => (
              <g key={i}>
                <line x1={x} y1={y} x2={x + (x < 130 ? 12 : -12)} y2={y} stroke={BRAND.mint} strokeWidth="1.5" />
                <line x1={x} y1={y} x2={x} y2={y + (y < 300 ? 12 : -12)} stroke={BRAND.mint} strokeWidth="1.5" />
              </g>
            ))}
          </g>
        )}

        {/* ── Social reactions (step 4) ── */}
        {step >= 4 && (
          <g>
            {[
              { emoji: "❤️", x: 20,  y: 150, delay: "0s"    },
              { emoji: "🔥", x: 210, y: 120, delay: "0.3s"  },
              { emoji: "✨", x: 15,  y: 310, delay: "0.5s"  },
              { emoji: "👏", x: 215, y: 290, delay: "0.2s"  },
              { emoji: "💚", x: 40,  y: 440, delay: "0.7s"  },
              { emoji: "🎯", x: 190, y: 420, delay: "0.4s"  },
            ].map(({ emoji, x, y, delay }) => (
              <text key={emoji+x} x={x} y={y} fontSize="18" style={{ animation: `socialFloat 3s ease-in-out ${delay} infinite` }}>{emoji}</text>
            ))}
          </g>
        )}

        {/* ── Buy smarter tag (step 5) ── */}
        {step >= 5 && (
          <g>
            <rect x="75" y="10" width="110" height="26" rx="13" fill={BRAND.mint} fillOpacity="0.15" />
            <rect x="75" y="10" width="110" height="26" rx="13" stroke={BRAND.mint} strokeWidth="1" fill="none" />
            <text x="130" y="27" fill={BRAND.mint} fontSize="10" fontFamily="DM Sans" fontWeight="700" textAnchor="middle">Smart pick 💡</text>
          </g>
        )}
      </svg>

      {/* Floating info chip — shows for each step */}
      <div style={{
        position: "absolute", bottom: -8, left: "50%", transform: "translateX(-50%)",
        background: "rgba(4,8,6,0.85)", backdropFilter: "blur(12px)",
        border: `1px solid rgba(99,215,177,0.25)`, borderRadius: 999,
        padding: "6px 14px", whiteSpace: "nowrap",
        opacity: 1, transition: "opacity 0.4s",
        fontFamily: "DM Sans", fontSize: 11, fontWeight: 600,
        color: BRAND.mint, letterSpacing: "0.1em",
      }}>
        {["SCANNING",  "STYLE DNA", "AI OUTFIT", "TRY-ON", "SOCIAL", "SMART BUY"][Math.min(step, 5)]}
      </div>
    </div>
  );
}

// ─── Scroll Story Section ─────────────────────────────────────────────────────
const STORY_STEPS = [
  {
    step: "01", badge: "Digital Closet", color: BRAND.mint,
    title: "Scan your closet",
    desc:  "Upload photos or scan tags. Vroche catalogs every piece, organizes by category, color, and season — instantly.",
  },
  {
    step: "02", badge: "Style DNA", color: BRAND.mint,
    title: "Understand your style",
    desc:  "AI maps your wardrobe DNA: occasions, color palettes, and personal patterns you didn't even know you had.",
  },
  {
    step: "03", badge: "AI Stylist", color: BRAND.coral,
    title: "Build AI outfits",
    desc:  "Get complete, curated outfit suggestions from what you already own. Contextual. Clever. Personalized to you.",
  },
  {
    step: "04", badge: "Virtual Try-On", color: BRAND.coral,
    title: "Try it on virtually",
    desc:  "See exactly how a full look comes together on you before stepping out. No more guessing.",
  },
  {
    step: "05", badge: "Social Feed", color: BRAND.mint,
    title: "Share & get inspired",
    desc:  "Post your looks, get real feedback from the community, and discover styles from people like you.",
  },
  {
    step: "06", badge: "Smart Shopping", color: BRAND.mint,
    title: "Buy smarter",
    desc:  "Discover exactly what your wardrobe is missing. Buy with purpose, not impulse. Zero waste.",
  },
];

function ScrollStory() {
  const containerRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const handler = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect  = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const scrolled  = Math.max(0, -rect.top);
      const progress  = Math.min(1, scrolled / total);
      const rawStep   = progress * STORY_STEPS.length;
      setActiveStep(Math.min(STORY_STEPS.length - 1, Math.floor(rawStep)));
    };
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const current = STORY_STEPS[activeStep];

  return (
    <section
      id="how"
      ref={containerRef}
      style={{ height: `${STORY_STEPS.length * 120 + 20}vh`, background: BRAND.black }}
    >
      <div style={{
        position: "sticky", top: 0,
        height: "100vh", overflow: "hidden",
        display: "flex", flexDirection: "column",
      }}>
        {/* Top label */}
        <div style={{ textAlign: "center", paddingTop: 40, paddingBottom: 12, flexShrink: 0 }}>
          <p style={{ fontFamily: "DM Sans", fontSize: 11, fontWeight: 800, letterSpacing: "0.3em", color: "rgba(252,255,254,0.35)", textTransform: "uppercase", margin: 0 }}>
            Cómo funciona
          </p>
        </div>

        {/* Main content */}
        <div style={{
          flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
          padding: "0 24px", gap: "min(80px, 6vw)",
          flexWrap: "wrap",
        }}>
          {/* Left: Progress dots (hidden on small mobile) */}
          <div className="story-dots" style={{ display: "flex", flexDirection: "column", gap: 10, flexShrink: 0 }}>
            {STORY_STEPS.map((_, i) => (
              <div key={i} style={{
                width:  i === activeStep ? 8 : 5,
                height: i === activeStep ? 8 : 5,
                borderRadius: "50%",
                background:   i === activeStep ? BRAND.mint : i < activeStep ? "rgba(99,215,177,0.4)" : "rgba(255,255,255,0.15)",
                transition:   "all 0.3s ease",
                flexShrink: 0,
              }} />
            ))}
          </div>

          {/* Center: Fashion figure */}
          <div style={{ flexShrink: 0, width: "min(220px, 38vw)" }} className="story-figure">
            <FashionFigure step={activeStep} />
          </div>

          {/* Right: Step text */}
          <div style={{ maxWidth: 420, flex: "1 1 280px" }}>
            {/* Badge */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: `${current.color}18`,
              border: `1px solid ${current.color}40`,
              borderRadius: 999, padding: "5px 14px",
              fontFamily: "DM Sans", fontSize: 10, fontWeight: 800,
              color: current.color, letterSpacing: "0.15em",
              textTransform: "uppercase", marginBottom: 20,
              transition: "all 0.4s ease",
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: current.color, flexShrink: 0 }} />
              {current.badge}
            </div>

            {/* Step number */}
            <p style={{
              fontFamily: "DM Serif Display, serif", fontStyle: "italic",
              fontSize: "clamp(64px, 8vw, 100px)", color: "rgba(255,255,255,0.06)",
              lineHeight: 1, margin: "0 0 -18px", letterSpacing: "-0.04em",
              transition: "all 0.4s ease",
            }}>
              {current.step}
            </p>

            {/* Title */}
            <h2 style={{
              fontFamily: "DM Serif Display, serif", fontStyle: "italic",
              fontSize: "clamp(32px, 4vw, 52px)", color: BRAND.white,
              lineHeight: 1.05, margin: "0 0 20px", letterSpacing: "-0.03em",
              transition: "all 0.4s ease",
            }}>
              {current.title}
            </h2>

            {/* Description */}
            <p style={{
              fontFamily: "Roboto, sans-serif", fontSize: "clamp(14px, 1.6vw, 17px)",
              color: "rgba(252,255,254,0.58)", lineHeight: 1.8, margin: "0 0 32px",
              transition: "all 0.4s ease",
            }}>
              {current.desc}
            </p>

            {/* Step indicator bar */}
            <div style={{ display: "flex", gap: 6 }}>
              {STORY_STEPS.map((_, i) => (
                <div key={i} style={{
                  height: 3, borderRadius: 2,
                  flex: i === activeStep ? 3 : 1,
                  background: i === activeStep ? BRAND.mint : i < activeStep ? `${BRAND.mint}40` : "rgba(255,255,255,0.1)",
                  transition: "all 0.4s ease",
                }} />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom scroll hint */}
        <div style={{ textAlign: "center", paddingBottom: 28, flexShrink: 0, opacity: activeStep === STORY_STEPS.length - 1 ? 0 : 1, transition: "opacity 0.4s" }}>
          <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            <span style={{ fontFamily: "DM Sans", fontSize: 10, color: "rgba(255,255,255,0.25)", letterSpacing: "0.2em", textTransform: "uppercase" }}>scroll</span>
            <div style={{ width: 1, height: 28, background: "linear-gradient(to bottom, rgba(99,215,177,0.5), transparent)", borderRadius: 1, animation: "scrollPulse 2s ease-in-out infinite" }} />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Phone Mockup ─────────────────────────────────────────────────────────────
function PhoneMockup() {
  return (
    <div className="product-preview mx-auto mt-2 w-full max-w-xs" aria-hidden="true">
      <div className="relative mx-auto w-[210px] overflow-hidden rounded-[2.6rem] border border-white/[0.12] bg-[#0a120e] shadow-[0_40px_100px_rgba(0,0,0,0.55)]" style={{ aspectRatio: "9/19.5" }}>
        <div className="absolute inset-0 flex flex-col p-3">
          <div className="mb-3 flex items-center justify-between px-1">
            <span className="text-[10px] font-semibold text-white/50" style={{ fontFamily: "Roboto" }}>9:41</span>
            <div className="flex gap-1"><div className="h-1.5 w-1.5 rounded-full bg-white/40"/><div className="h-1.5 w-3 rounded-full bg-white/40"/><div className="h-1.5 w-4 rounded-full bg-white/40"/></div>
          </div>
          <div className="relative mb-3 overflow-hidden rounded-2xl bg-gradient-to-b from-[#63D7B1]/20 to-[#040806]" style={{ height: "38%" }}>
            <div className="absolute inset-0 flex items-center justify-center">
              <img src={VROCHE_LOGO_SRC} alt="" style={{ width: 52, height: 52, objectFit: "contain", opacity: 0.9 }} />
            </div>
            <div className="absolute bottom-2 left-3 right-3 flex items-end justify-between">
              <div><p className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/40" style={{ fontFamily: "DM Sans" }}>VIRTUAL TRY-ON</p><p className="text-xs font-extrabold text-white" style={{ fontFamily: "DM Sans" }}>Outfit del día</p></div>
              <div className="rounded-full bg-[#63D7B1] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.15em] text-[#040806]">AI</div>
            </div>
          </div>
          <div className="mb-2 grid grid-cols-2 gap-2" style={{ height: "28%" }}>
            {["Casual","Formal"].map(label => (
              <div key={label} className="overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.05]">
                <div className="flex h-full flex-col items-center justify-center p-2">
                  <div className="mb-1 h-6 w-6 rounded-lg bg-[#63D7B1]/20"/>
                  <p className="text-[9px] font-semibold text-white/60" style={{ fontFamily: "DM Sans" }}>{label}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between rounded-[1.4rem] border border-white/[0.08] bg-white/[0.04] px-4 py-3">
            <span className="text-xs text-white/[0.65]" style={{ fontFamily: "Roboto" }}>Smart styling in one app</span>
            <span className="rounded-full bg-[#63D7B1] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#040806]">Beta</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Social Section ───────────────────────────────────────────────────────────
function SocialSection() {
  const posts = [
    { user: "Ana M.", handle: "@ana.looks", outfit: "Minimalist Monday", likes: 284, color: BRAND.mint },
    { user: "Cris V.", handle: "@crisv.style", outfit: "Date Night Edit", likes: 512, color: BRAND.coral },
    { user: "Lena K.", handle: "@lena.wardrobe", outfit: "Work From Chic", likes: 193, color: "#a78bfa" },
    { user: "Mia R.", handle: "@mia.fits", outfit: "Weekend Energy", likes: 377, color: "#fbbf24" },
  ];
  const stats = [
    { value: "50K+",  label: "Outfits shared",    icon: ShirtIcon },
    { value: "12K+",  label: "Active stylists",   icon: UsersIcon },
    { value: "94%",   label: "Satisfaction rate", icon: StarIcon  },
    { value: "3×",    label: "More closet usage", icon: TrendingUpIcon },
  ];
  return (
    <section id="community" className="relative overflow-hidden py-28 px-6 lg:px-8" style={{ background: "#060f0a" }}>
      <div className="absolute left-0 top-0 h-80 w-80 rounded-full blur-[100px]" style={{ background: `${BRAND.mint}18` }} />
      <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full blur-[100px]" style={{ background: `${BRAND.coral}14` }} />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-16 max-w-3xl">
          <SectionLabel dark>Comunidad</SectionLabel>
          <h2 style={{ fontFamily: "DM Serif Display, serif", fontStyle: "italic", fontSize: "clamp(40px,6vw,72px)", color: BRAND.white, lineHeight: 0.95, letterSpacing: "-0.04em", margin: "0 0 20px" }}>
            Fashion is better<br /><span style={{ color: BRAND.mint }}>together.</span>
          </h2>
          <p style={{ fontFamily: "Roboto", fontSize: "clamp(15px,1.5vw,18px)", color: "rgba(252,255,254,0.55)", lineHeight: 1.8, maxWidth: 520, margin: 0 }}>
            Vroche no es solo un armario privado. Es una comunidad donde el estilo real se comparte, valida e inspira — sin filtros de marca, sin aesthetics impuestos.
          </p>
        </div>

        {/* Stats row */}
        <div className="mb-16 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map(({ value, label, icon: Ic }) => (
            <div key={label} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 24, padding: "20px 24px" }}>
              <Ic className="h-5 w-5 mb-3" style={{ color: BRAND.mint }} />
              <p style={{ fontFamily: "DM Serif Display, serif", fontStyle: "italic", fontSize: "clamp(28px,3vw,38px)", color: BRAND.white, lineHeight: 1, margin: "0 0 4px" }}>{value}</p>
              <p style={{ fontFamily: "DM Sans", fontSize: 12, color: "rgba(252,255,254,0.4)", margin: 0 }}>{label}</p>
            </div>
          ))}
        </div>

        {/* Mock feed */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {posts.map(({ user, handle, outfit, likes, color }) => (
            <div key={user} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 24, padding: "20px", transition: "transform 0.2s, border-color 0.2s" }}
              className="hover:-translate-y-1 hover:border-white/20 cursor-pointer">
              {/* Mock outfit visual */}
              <div style={{ height: 100, borderRadius: 16, marginBottom: 14, background: `linear-gradient(135deg, ${color}28, rgba(255,255,255,0.03))`, border: `1px solid ${color}30`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ShirtIcon className="h-8 w-8" style={{ color, opacity: 0.5 }} />
              </div>
              {/* User */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: `${color}30`, border: `1px solid ${color}50`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color, fontFamily: "DM Sans", fontWeight: 700, flexShrink: 0 }}>
                  {user[0]}
                </div>
                <div>
                  <p style={{ fontFamily: "DM Sans", fontSize: 12, fontWeight: 700, color: BRAND.white, margin: 0 }}>{user}</p>
                  <p style={{ fontFamily: "Roboto", fontSize: 10, color: "rgba(252,255,254,0.35)", margin: 0 }}>{handle}</p>
                </div>
              </div>
              <p style={{ fontFamily: "DM Sans", fontSize: 13, fontWeight: 600, color: BRAND.white, margin: "0 0 10px" }}>{outfit}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <HeartIcon className="h-3.5 w-3.5" style={{ color: BRAND.coral, fill: BRAND.coral }} />
                <span style={{ fontFamily: "Roboto", fontSize: 11, color: "rgba(252,255,254,0.45)" }}>{likes}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Main Landing Page ────────────────────────────────────────────────────────
export default function VrocheLandingPage() {
  const [email, setEmail]               = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [legalPage, setLegalPage]       = useState(null);

  const features = useMemo(() => [
    { icon: CameraIcon,       title: "Virtual Try-On",          text: "Prueba prendas y looks sobre tu foto antes de ponértelo o comprarlo." },
    { icon: Wand2Icon,        title: "AI Stylist personal",      text: "Looks personalizados según tu estilo, la ocasión, el clima y tu armario real.", accent: "coral" },
    { icon: ShirtIcon,        title: "Armario digital",          text: "Sube tus prendas, organízalas y conviértelas en algo útil y visual." },
    { icon: CalendarDaysIcon, title: "Planificación de outfits", text: "Prepara looks para trabajo, viajes, cenas o cualquier evento.", accent: "coral" },
    { icon: SocialIcon,       title: "Red social de estilo",     text: "Comparte looks, recibe feedback real y descubre inspiración de otros usuarios." },
    { icon: LockIcon,         title: "Privacidad primero",       text: "Tus fotos y preferencias siempre bajo tu control. Privacy by design.", accent: "coral" },
  ], []);

  const useCases = ["No sé qué ponerme hoy","Quiero comprar mejor","Tengo un evento y necesito ideas","Quiero aprovechar más mi armario","Voy de viaje y necesito outfits","Quiero validar un look antes de salir"];

  function handleSubmit(e) {
    e.preventDefault();
    if (!isValidWaitlistEmail(email)) return;
    setSubmittedEmail(email.trim());
  }

  return (
    <>
      <CookieBanner onOpenPolicy={() => setLegalPage("cookies")} />
      {legalPage && <LegalModal page={legalPage} onClose={() => setLegalPage(null)} />}

      <main className="min-h-screen overflow-hidden" data-testid="vroche-landing">
        <style>{`
          @font-face {} /* Fonts loaded via <link> in index.html */
          .font-title    { font-family: 'DM Serif Display', serif; font-style: italic; }
          .font-subtitle { font-family: 'DM Sans', sans-serif; }
          .font-body     { font-family: 'Roboto', sans-serif; }
          html { scroll-behavior: smooth; }

          /* ── Keyframes ── */
          @keyframes fadeUp     { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
          @keyframes heroFloat  { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-10px); } }
          @keyframes orbitSpinA { from { transform:rotateX(68deg) rotateZ(0deg); }   to { transform:rotateX(68deg) rotateZ(360deg); } }
          @keyframes orbitSpinB { from { transform:rotateY(74deg) rotateZ(360deg); } to { transform:rotateY(74deg) rotateZ(0deg);   } }
          @keyframes particleFloat { 0%,100%{transform:translate3d(0,0,0) scale(1);opacity:.55;} 50%{transform:translate3d(14px,-14px,0) scale(1.15);opacity:1;} }
          @keyframes scatterDrift  { 0%,100%{transform:translate(-50%,-50%) rotate(var(--rotation,0deg));}
            50%{transform:translate(calc(-50% + var(--drift-x,0px)),calc(-50% + var(--drift-y,0px))) rotate(calc(var(--rotation,0deg) + 5deg));} }
          @keyframes scanBeam    { 0%{transform:translateY(-520px);opacity:0;} 8%{opacity:1;} 92%{opacity:1;} 100%{transform:translateY(520px);opacity:0;} }
          @keyframes pulseRing   { 0%,100%{opacity:0.35;} 50%{opacity:0.7;} }
          @keyframes socialFloat { 0%,100%{transform:translateY(0) scale(1);} 50%{transform:translateY(-10px) scale(1.1);} }
          @keyframes scrollPulse { 0%,100%{opacity:0.3;} 50%{opacity:0.9;} }
          @keyframes shimmer     { 0%{background-position:-200% center;} 100%{background-position:200% center;} }
          .fade-up { animation: fadeUp 0.8s ease-out both; }

          /* ── Logo reveal ── */
          .logo-reveal-field { --reveal-x:-9999px; --reveal-y:-9999px; --reveal-size:175px; --reveal-opacity:0; }
          .logo-noise-layer, .logo-reveal-layer { position:absolute; inset:0; }
          .logo-noise-wrap { position:absolute; width:auto; max-width:none; transform-origin:center; animation:scatterDrift var(--drift-duration,16s) ease-in-out var(--drift-delay,0s) infinite; pointer-events:none; user-select:none; }
          .logo-noise-img  { display:block; height:100%; width:auto; max-width:none; object-fit:contain; pointer-events:none; user-select:none; }
          .logo-noise-img-base   { filter:grayscale(1) blur(3.6px) saturate(.45) contrast(.95); opacity:1; mix-blend-mode:screen; }
          .logo-noise-img-reveal { filter:brightness(0) saturate(100%) invert(81%) sepia(31%) saturate(565%) hue-rotate(96deg) brightness(92%) contrast(90%) drop-shadow(0 0 10px rgba(99,215,177,.45)); opacity:1; mix-blend-mode:screen; }
          .logo-reveal-layer { opacity:var(--reveal-opacity); -webkit-mask-image:radial-gradient(circle var(--reveal-size) at var(--reveal-x) var(--reveal-y),#000 0%,#000 52%,rgba(0,0,0,.55) 64%,transparent 81%); mask-image:radial-gradient(circle var(--reveal-size) at var(--reveal-x) var(--reveal-y),#000 0%,#000 52%,rgba(0,0,0,.55) 64%,transparent 81%); transition:opacity .16s ease; }

          /* ── 3-D Logo ── */
          .logo3d-root { --shine-x:50%; --shine-y:50%; --glow-x:50%; --glow-y:50%; --glow-opacity:0.85; perspective:1500px; }
          .logo3d-global-aura { position:absolute; left:var(--glow-x); top:var(--glow-y); width:320px; height:320px; border-radius:9999px; transform:translate(-50%,-50%); background:radial-gradient(circle,rgba(99,215,177,.28) 0%,rgba(99,215,177,.12) 36%,rgba(99,215,177,.04) 58%,transparent 78%); filter:blur(18px); opacity:var(--glow-opacity); transition:left .08s,top .08s,opacity .18s; pointer-events:none; }
          .logo3d-object { position:relative; width:min(380px,72vw); height:min(380px,72vw); transform-style:preserve-3d; will-change:transform; }
          .logo3d-depth-stack,.logo3d-front { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; transform-style:preserve-3d; }
          .logo3d-front { transform:translateZ(72px); }
          .logo-front-image,.logo-depth-image { position:absolute; inset:0; width:100%; height:100%; object-fit:contain; pointer-events:none; }
          .logo-front-image { filter:drop-shadow(0 34px 60px rgba(0,0,0,.34)) drop-shadow(0 0 26px rgba(99,215,177,.22)); }
          .logo-depth-image { filter:brightness(.35) saturate(1.1); }
          .logo3d-shine { position:absolute; left:var(--shine-x); top:var(--shine-y); z-index:4; width:175px; height:175px; border-radius:999px; transform:translate(-50%,-50%) translateZ(96px); background:radial-gradient(circle,rgba(255,255,255,.28) 0%,rgba(255,255,255,.12) 30%,transparent 68%); filter:blur(10px); mix-blend-mode:screen; pointer-events:none; transition:left .08s,top .08s; }
          .logo3d-shadow { position:absolute; left:50%; bottom:-26px; width:60%; height:15%; transform:translateX(-50%) rotateX(86deg) translateZ(-90px); border-radius:999px; background:rgba(0,0,0,.44); filter:blur(22px); }
          .logo3d-orbit { position:absolute; width:min(400px,78vw); height:min(400px,78vw); border-radius:9999px; border:1px solid rgba(255,255,255,.13); pointer-events:none; }
          .logo3d-orbit-a { animation:orbitSpinA 18s linear infinite; box-shadow:0 0 60px rgba(99,215,177,.10); }
          .logo3d-orbit-b { width:min(300px,60vw); height:min(300px,60vw); border-color:rgba(255,87,51,.17); animation:orbitSpinB 14s linear infinite; }
          .logo3d-particle { position:absolute; width:10px; height:10px; border-radius:999px; background:${BRAND.mint}; box-shadow:0 0 22px rgba(99,215,177,.8); animation:particleFloat 5s ease-in-out infinite; }
          .particle-a { left:18%; top:28%; }
          .particle-b { right:17%; top:24%; background:${BRAND.coral}; box-shadow:0 0 22px rgba(255,87,51,.75); animation-delay:.8s; }
          .particle-c { left:22%; bottom:22%; animation-delay:1.4s; }
          .particle-d { right:23%; bottom:25%; width:7px; height:7px; animation-delay:1.9s; }

          /* ── Responsive ── */
          @media (max-width:768px) {
            body { overflow-x:hidden; }
            .logo-reveal-field { --reveal-size:108px; }
            .logo-noise-wrap:nth-child(n+45) { display:none; }
            .product-preview { display:none; }
            .story-dots { display:none !important; }
            .story-figure { width:min(160px,42vw) !important; }
          }
          @media (max-width:480px) {
            .story-figure { display:none !important; }
          }
        `}</style>

        <LogoRevealBackground />

        {/* ── HEADER ── */}
        <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8"
          style={{ background: "rgba(4,8,6,0)" }}>
          <a href="#top" className="flex items-center gap-3">
            <HeaderLogo />
          </a>
          <NavChipGroup />
          <a href="#waitlist" className="rounded-[1rem] border border-white/10 bg-white/[0.06] px-5 py-2.5 text-xs font-bold uppercase tracking-[0.14em] text-white backdrop-blur-xl transition hover:bg-white/[0.12]"
            style={{ fontFamily: "DM Sans" }}>
            Get Beta
          </a>
        </header>

        {/* ── HERO ── */}
        <section id="top" className="relative overflow-hidden text-white" style={{ background: BRAND.black, minHeight: "calc(100vh - 72px)" }}>
          {/* Ambient blobs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute left-1/2 top-[-100px] h-[500px] w-[500px] -translate-x-1/2 rounded-full blur-[120px]" style={{ background: `${BRAND.mint}22` }} />
            <div className="absolute right-[-80px] top-[160px] h-[360px] w-[360px] rounded-full blur-[110px]" style={{ background: `${BRAND.coral}18` }} />
            <div className="absolute left-[-80px] bottom-[60px] h-[280px] w-[280px] rounded-full blur-[90px]" style={{ background: "rgba(255,255,255,0.05)" }} />
            <div className="absolute inset-0 opacity-[0.14]" style={{ backgroundImage: "linear-gradient(rgba(252,255,254,0.1) 1px,transparent 1px),linear-gradient(90deg,rgba(252,255,254,0.1) 1px,transparent 1px)", backgroundSize: "44px 44px" }} />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-6 pt-8 pb-24 lg:px-8 lg:pt-12 lg:pb-32">
            <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
              {/* Copy */}
              <div className="fade-up text-left">
                {/* Eyebrow badge */}
                <Badge>
                  <span className="h-2 w-2 rounded-full" style={{ background: BRAND.mint }} />
                  AI Fashion · Virtual Try-On · Smart Closet · Social
                </Badge>

                {/* Headline */}
                <h1 className="font-title mt-8 leading-[0.9] tracking-[-0.05em] text-white"
                  style={{ fontSize: "clamp(52px,9vw,96px)", maxWidth: "12ch" }}>
                  Your wardrobe,<br />
                  <span style={{ color: BRAND.mint }}>upgraded by AI.</span>
                </h1>

                {/* Subheadline */}
                <p className="font-body mt-6 leading-8 text-white/[0.62]"
                  style={{ fontSize: "clamp(15px,1.6vw,19px)", maxWidth: 520 }}>
                  Scan your closet. Style with AI. Try looks on before you wear them — and share your best outfits with a community that actually cares about fashion.
                </p>

                {/* Store CTAs — primary */}
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <StoreButton store="apple" />
                  <StoreButton store="google" />
                </div>

                {/* Waitlist — secondary */}
                <div className="mt-6">
                  <a href="#waitlist" className="font-subtitle text-sm font-semibold transition"
                    style={{ color: "rgba(252,255,254,0.4)", textDecoration: "none", borderBottom: "1px solid rgba(252,255,254,0.15)", paddingBottom: 2 }}
                    onMouseEnter={e => e.currentTarget.style.color = "rgba(252,255,254,0.8)"}
                    onMouseLeave={e => e.currentTarget.style.color = "rgba(252,255,254,0.4)"}>
                    O apúntate a la waitlist →
                  </a>
                </div>

                {/* Social proof mini-strip */}
                <div className="mt-10 flex flex-wrap gap-3">
                  {[["AI", "Stylist"],["VTO","Try-on"],["Closet","Digital"],["Social","Community"]].map(([t, s]) => (
                    <div key={t} className="rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3 backdrop-blur-xl">
                      <p className="font-subtitle text-base font-extrabold text-white">{t}</p>
                      <p className="font-body mt-0.5 text-[10px] uppercase tracking-[0.2em] text-white/[0.35]">{s}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual */}
              <div className="fade-up" style={{ animationDelay: "0.15s" }}>
                <Global3DVrocheLogo />
                <PhoneMockup />
              </div>
            </div>
          </div>
        </section>

        {/* ── PROBLEM ── */}
        <section className="relative px-6 py-24 lg:px-8" style={{ background: BRAND.white }}>
          <div className="relative z-10 mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div>
                <SectionLabel>El problema</SectionLabel>
                <h2 className="font-title leading-[0.95] tracking-[-0.04em] text-black"
                  style={{ fontSize: "clamp(38px,6vw,72px)" }}>
                  Tenemos más ropa que nunca, pero decidimos peor.
                </h2>
              </div>
              <p className="font-body leading-9 text-black/60"
                style={{ fontSize: "clamp(15px,1.5vw,18px)", maxWidth: 540 }}>
                El usuario medio tiene 77 prendas pero solo usa el 20%. Compramos por impulso, repetimos outfits y olvidamos lo que ya tenemos. Vroche une moda, inteligencia artificial y experiencia social para resolver ese momento diario: "¿qué me pongo?".
              </p>
            </div>
            <div className="mt-12 flex flex-wrap gap-3">
              {useCases.map(item => <Pill key={item}>{item}</Pill>)}
            </div>
          </div>
        </section>

        {/* ── SCROLL STORY ── */}
        <ScrollStory />

        {/* ── FEATURES ── */}
        <section id="features" className="relative px-6 py-28 lg:px-8" style={{ background: BRAND.white }}>
          <div className="relative z-10 mx-auto max-w-7xl">
            <div className="mb-14 max-w-3xl">
              <SectionLabel>Producto</SectionLabel>
              <h2 className="font-title leading-[0.95] tracking-[-0.04em] text-black"
                style={{ fontSize: "clamp(38px,6vw,72px)" }}>
                Una app de moda con cerebro tech.
              </h2>
              <p className="font-body mt-6 leading-8 text-black/60"
                style={{ fontSize: "clamp(15px,1.5vw,18px)", maxWidth: 540 }}>
                Diseñada para que el usuario pase de la duda a la decisión: escanear, combinar, probar, compartir y comprar mejor.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" data-testid="features-grid">
              {features.map(f => <FeatureCard key={f.title} {...f} />)}
            </div>
          </div>
        </section>

        {/* ── EXPERIENCE (dark) ── */}
        <section className="relative overflow-hidden px-6 py-28 text-white lg:px-8" style={{ background: BRAND.black }}>
          <div className="absolute left-0 top-0 h-96 w-96 rounded-full blur-[100px]" style={{ background: `${BRAND.mint}18` }} />
          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full blur-[100px]" style={{ background: `${BRAND.coral}18` }} />
          <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionLabel dark>Experiencia</SectionLabel>
              <h2 className="font-title leading-[0.95] tracking-[-0.04em] text-white"
                style={{ fontSize: "clamp(38px,6vw,72px)", maxWidth: "14ch" }}>
                De inspiración a decisión en segundos.
              </h2>
              <p className="font-body mt-6 leading-9 text-white/[0.58]"
                style={{ fontSize: "clamp(15px,1.5vw,18px)", maxWidth: 440 }}>
                Vroche no quiere ser otra carpeta de inspiración. Quiere ser el sistema operativo de tu estilo.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { icon: ZapIcon,         title: "Fast styling",   text: "Looks generados al momento con criterios reales." },
                { icon: ShoppingBagIcon, title: "Smart shopping", text: "Compra menos por impulso, más por encaje." },
                { icon: CloudSunIcon,    title: "Weather-aware",  text: "Outfits adaptados al clima y al plan del día." },
                { icon: SocialIcon,      title: "Social proof",   text: "Feedback y comunidad para validar tus looks." },
              ].map(({ icon: Ic, title, text }) => (
                <div key={title} className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl transition hover:-translate-y-1">
                  <Ic className="mb-4 h-5 w-5" style={{ color: BRAND.mint }} />
                  <h3 className="font-subtitle mb-2 text-lg font-bold">{title}</h3>
                  <p className="font-body text-sm leading-7 text-white/[0.55]">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SOCIAL ── */}
        <SocialSection />

        {/* ── VISION ── */}
        <section id="vision" className="relative overflow-hidden px-6 py-28 lg:px-8" style={{ background: BRAND.mint }}>
          <div className="absolute -right-20 top-0 h-80 w-80 rounded-full bg-white/30 blur-[80px]" />
          <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full blur-[80px]" style={{ background: `${BRAND.coral}28` }} />
          <div className="relative z-10 mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <p className="font-subtitle mb-5 text-xs font-extrabold uppercase tracking-[0.3em]" style={{ color: "rgba(4,8,6,0.55)" }}>Visión Vroche</p>
              <h2 className="font-title leading-[0.95] tracking-[-0.05em] text-black"
                style={{ fontSize: "clamp(38px,6vw,72px)" }}>
                La nueva capa entre tu armario, tu identidad y la compra online.
              </h2>
            </div>
            <div className="rounded-[2.5rem] p-8 text-white shadow-[0_30px_90px_rgba(4,8,6,0.28)]" style={{ background: BRAND.black }}>
              <p className="font-body leading-9 text-white/70"
                style={{ fontSize: "clamp(15px,1.5vw,18px)", marginBottom: 28 }}>
                Vroche nace para una generación que decide en móvil, se inspira en redes y espera experiencias visuales inmediatas. La oportunidad está en unir utilidad diaria, AI personalizada y moda digital con una marca aspiracional.
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                {[["Daily","uso recurrente"],["Visual","decisión rápida"],["Social","viralidad natural"]].map(([t, d]) => (
                  <div key={t} className="rounded-3xl border border-white/10 bg-white/[0.06] p-4">
                    <p className="font-subtitle text-lg font-extrabold" style={{ color: BRAND.mint }}>{t}</p>
                    <p className="font-body mt-1 text-xs text-white/50">{d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── WAITLIST ── */}
        <section id="waitlist" className="relative overflow-hidden px-6 py-28 text-white lg:px-8" style={{ background: BRAND.black }}>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute left-1/2 top-0 h-[480px] w-[480px] -translate-x-1/2 rounded-full blur-[120px]" style={{ background: `${BRAND.mint}20` }} />
          </div>
          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <Badge className="mx-auto">
              <span className="h-2 w-2 rounded-full" style={{ background: BRAND.coral }} />
              Early Access
            </Badge>

            <h2 className="font-title mt-8 leading-[0.92] tracking-[-0.05em]"
              style={{ fontSize: "clamp(42px,7vw,88px)" }}>
              Be one of the first to wear the future.
            </h2>

            <p className="font-body mx-auto mt-7 leading-9 text-white/[0.60]"
              style={{ fontSize: "clamp(15px,1.5vw,18px)", maxWidth: 520 }}>
              Descarga la app y sé de los primeros en probar el futuro de tu armario. Disponible en App Store y Google Play.
            </p>

            {/* Primary: App store buttons */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <StoreButton store="apple" />
              <StoreButton store="google" />
            </div>

            {/* Secondary: Waitlist form */}
            <div className="mt-8">
              <p className="font-body mb-4 text-sm text-white/40">O únete a la waitlist para acceso anticipado:</p>
              <form onSubmit={handleSubmit} className="mx-auto flex max-w-lg flex-col gap-3 rounded-[2rem] border border-white/10 bg-white/[0.06] p-3 backdrop-blur-xl sm:flex-row">
                <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="tuemail@ejemplo.com"
                  className="font-body min-h-13 flex-1 rounded-full border border-white/10 bg-white px-5 text-sm text-black outline-none placeholder:text-black/35"
                  style={{ height: 48 }} data-testid="waitlist-email" />
                <button type="submit"
                  className="font-subtitle inline-flex items-center justify-center gap-2 rounded-full px-6 text-xs font-extrabold uppercase tracking-[0.14em] text-white transition hover:scale-[1.02]"
                  style={{ background: BRAND.coral, height: 48, minWidth: 120 }} data-testid="waitlist-submit">
                  Apuntarme <ArrowRightIcon className="h-4 w-4" />
                </button>
              </form>
              {submittedEmail
                ? <p className="font-body mt-5 text-sm" style={{ color: BRAND.mint }} role="status">Gracias. {submittedEmail} ya está en la waitlist de Vroche.</p>
                : <p className="font-body mt-5 text-xs text-white/[0.35]">Sin spam. Solo acceso, novedades clave y oportunidades para probar el producto antes del lanzamiento.</p>
              }
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="relative px-6 pb-10 text-white lg:px-8" style={{ background: BRAND.black }}>
          <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <HeaderLogo />
            </div>
            <p className="font-body text-sm text-white/[0.38]">AI fashion app · Virtual try-on · Smart closet · Social styling</p>
            <nav aria-label="Legal" className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {[["Aviso Legal","legal"],["Privacidad","privacy"],["Términos","terms"],["Cookies","cookies"]].map(([label, page]) => (
                <button key={page} onClick={() => setLegalPage(page)}
                  className="font-body text-xs text-white/[0.35] transition hover:text-white/70"
                  style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                  {label}
                </button>
              ))}
            </nav>
          </div>
          <div className="relative z-10 mx-auto mt-6 max-w-7xl border-t border-white/[0.06] pt-5">
            <p className="font-body text-center text-[11px] text-white/[0.22]">
              © {new Date().getFullYear()} VROCHE APP S.L. · CIF B22761977 · Calle Don Abraham Quintanilla, 12, Madrid, España ·{" "}
              <a href={`mailto:${LEGAL.email}`} style={{ color: "rgba(252,255,254,0.28)", textDecoration: "none" }}>{LEGAL.email}</a>
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
