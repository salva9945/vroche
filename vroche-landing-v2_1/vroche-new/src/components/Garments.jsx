import React from "react";

/* ─────────────────────────────────────────────────────────────
   Editorial flat-lay garment SVGs
   Diseñados para parecer prendas en composición editorial,
   estilo similar al de la app (flat-lay sobre fondo).
   Cada uno acepta `tone` para variar paletas.
   ───────────────────────────────────────────────────────────── */

const TONES = {
  pink: { fill: "#F7B8D2", stroke: "#9B5077", accent: "#3D1B2A" },
  ivory: { fill: "#F4EFE5", stroke: "#A09C92", accent: "#65615A" },
  black: { fill: "#1D1D1D", stroke: "#000", accent: "#444" },
  charcoal: { fill: "#2A2A2A", stroke: "#0a0a0a", accent: "#5A5A5A" },
  mint: { fill: "#63D7B1", stroke: "#2D8A6C", accent: "#0E2A22" },
  coral: { fill: "#FF5733", stroke: "#A52F18", accent: "#4D1306" },
  cream: { fill: "#ECE6DA", stroke: "#A8A294", accent: "#5A5448" },
  denim: { fill: "#3B4F66", stroke: "#1A2434", accent: "#6E7E94" },
  bone: { fill: "#F2EEE7", stroke: "#8E8B82", accent: "#4D4942" },
};

function getTone(t) { return TONES[t] || TONES.ivory; }

// Tank top (similar to app's pink cross top)
export function TankTop({ tone = "pink", className = "", style }) {
  const c = getTone(tone);
  return (
    <svg viewBox="0 0 200 240" className={className} style={style} aria-hidden="true">
      <defs>
        <linearGradient id={`tt-${tone}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={c.fill} stopOpacity="1" />
          <stop offset="1" stopColor={c.fill} stopOpacity="0.85" />
        </linearGradient>
      </defs>
      <path
        d="M55 30 Q60 18 75 22 L80 35 Q100 45 120 35 L125 22 Q140 18 145 30 L155 60 Q145 70 135 65 L135 200 Q135 220 115 222 L85 222 Q65 220 65 200 L65 65 Q55 70 45 60 Z"
        fill={`url(#tt-${tone})`}
        stroke={c.stroke}
        strokeWidth="1.2"
      />
      {/* graphic detail on chest */}
      <g opacity="0.75" fill={c.accent}>
        <path d="M95 90 L102 80 L109 90 L106 92 L102 88 L98 92 Z" />
        <path d="M90 100 Q100 92 110 100 Q108 115 100 120 Q92 115 90 100 Z" opacity="0.5" />
        <rect x="93" y="125" width="14" height="2" />
        <rect x="91" y="135" width="18" height="1.4" />
      </g>
    </svg>
  );
}

// Wide / loose pants (like app's black jeans flat-lay)
export function Pants({ tone = "denim", className = "", style }) {
  const c = getTone(tone);
  return (
    <svg viewBox="0 0 200 320" className={className} style={style} aria-hidden="true">
      <defs>
        <linearGradient id={`pn-${tone}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={c.fill} stopOpacity="1" />
          <stop offset="1" stopColor={c.fill} stopOpacity="0.92" />
        </linearGradient>
      </defs>
      <path
        d="M50 10 L150 10 L155 30 Q158 55 156 90 L150 200 Q148 240 145 300 L120 305 L108 200 Q105 160 100 160 Q95 160 92 200 L80 305 L55 300 Q52 240 50 200 L44 90 Q42 55 45 30 Z"
        fill={`url(#pn-${tone})`}
        stroke={c.stroke}
        strokeWidth="1.3"
      />
      <line x1="100" y1="20" x2="100" y2="158" stroke={c.accent} strokeWidth="0.8" opacity="0.45" strokeDasharray="2 3" />
      <rect x="48" y="22" width="104" height="3" fill={c.stroke} opacity="0.6" />
    </svg>
  );
}

// Lace shorts (like app's white shorts)
export function Shorts({ tone = "ivory", className = "", style }) {
  const c = getTone(tone);
  return (
    <svg viewBox="0 0 200 180" className={className} style={style} aria-hidden="true">
      <defs>
        <linearGradient id={`sh-${tone}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={c.fill} stopOpacity="1" />
          <stop offset="1" stopColor={c.fill} stopOpacity="0.88" />
        </linearGradient>
      </defs>
      <path
        d="M40 15 L160 15 L165 35 Q166 70 162 110 Q158 145 150 160 L120 162 L110 110 Q105 95 100 95 Q95 95 90 110 L80 162 L50 160 Q42 145 38 110 Q34 70 35 35 Z"
        fill={`url(#sh-${tone})`}
        stroke={c.stroke}
        strokeWidth="1.2"
      />
      {/* drawstring */}
      <path d="M85 30 Q92 38 87 50 M115 30 Q108 38 113 50" fill="none" stroke={c.stroke} strokeWidth="1" />
      {/* lace detail */}
      <path d="M50 158 Q54 155 58 158 Q62 161 66 158 Q70 155 74 158 Q78 161 82 158" fill="none" stroke={c.stroke} strokeWidth="0.8" opacity="0.6" />
      <path d="M118 158 Q122 155 126 158 Q130 161 134 158 Q138 155 142 158 Q146 161 150 158" fill="none" stroke={c.stroke} strokeWidth="0.8" opacity="0.6" />
    </svg>
  );
}

// Hoodie (zip-up like app screenshot)
export function Hoodie({ tone = "black", className = "", style }) {
  const c = getTone(tone);
  return (
    <svg viewBox="0 0 220 240" className={className} style={style} aria-hidden="true">
      <defs>
        <linearGradient id={`hd-${tone}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={c.fill} stopOpacity="1" />
          <stop offset="1" stopColor={c.fill} stopOpacity="0.92" />
        </linearGradient>
      </defs>
      {/* hood */}
      <path
        d="M70 35 Q75 12 110 12 Q145 12 150 35 L165 50 L195 80 L195 200 Q195 220 175 222 L45 222 Q25 220 25 200 L25 80 L55 50 Z"
        fill={`url(#hd-${tone})`}
        stroke={c.stroke}
        strokeWidth="1.3"
      />
      {/* hood opening */}
      <path d="M85 30 Q110 22 135 30 L142 50 Q110 38 78 50 Z" fill={c.accent} opacity="0.5" />
      {/* zipper line */}
      <line x1="110" y1="50" x2="110" y2="222" stroke={c.accent} strokeWidth="1.2" opacity="0.7" />
      <circle cx="110" cy="55" r="2" fill={c.accent} />
      {/* pocket */}
      <path d="M55 145 Q85 152 110 152 Q135 152 165 145 L160 175 Q110 168 60 175 Z" fill="none" stroke={c.stroke} strokeWidth="1" opacity="0.55" />
      {/* drawstrings */}
      <path d="M97 40 Q95 70 95 90 M123 40 Q125 70 125 90" fill="none" stroke={c.accent} strokeWidth="0.9" opacity="0.6" />
    </svg>
  );
}

// Long sleeve tee
export function LongTee({ tone = "ivory", className = "", style }) {
  const c = getTone(tone);
  return (
    <svg viewBox="0 0 220 220" className={className} style={style} aria-hidden="true">
      <defs>
        <linearGradient id={`lt-${tone}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={c.fill} stopOpacity="1" />
          <stop offset="1" stopColor={c.fill} stopOpacity="0.92" />
        </linearGradient>
      </defs>
      <path
        d="M70 25 Q85 15 110 18 Q135 15 150 25 L185 50 L200 90 L185 105 L170 95 L170 200 Q168 215 150 215 L70 215 Q52 215 50 200 L50 95 L35 105 L20 90 L35 50 Z"
        fill={`url(#lt-${tone})`}
        stroke={c.stroke}
        strokeWidth="1.2"
      />
      {/* neckline */}
      <ellipse cx="110" cy="22" rx="22" ry="6" fill={c.accent} opacity="0.4" />
    </svg>
  );
}

// Mini skirt
export function Skirt({ tone = "pink", className = "", style }) {
  const c = getTone(tone);
  return (
    <svg viewBox="0 0 200 180" className={className} style={style} aria-hidden="true">
      <defs>
        <linearGradient id={`sk-${tone}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={c.fill} stopOpacity="1" />
          <stop offset="1" stopColor={c.fill} stopOpacity="0.85" />
        </linearGradient>
      </defs>
      <path
        d="M55 15 L145 15 L150 30 L165 90 L175 160 L25 160 L35 90 L50 30 Z"
        fill={`url(#sk-${tone})`}
        stroke={c.stroke}
        strokeWidth="1.3"
      />
      <line x1="55" y1="22" x2="145" y2="22" stroke={c.accent} strokeWidth="1.2" opacity="0.7" />
      {/* pleats */}
      <line x1="80" y1="30" x2="70" y2="160" stroke={c.accent} strokeWidth="0.5" opacity="0.4" />
      <line x1="100" y1="30" x2="100" y2="160" stroke={c.accent} strokeWidth="0.5" opacity="0.4" />
      <line x1="120" y1="30" x2="130" y2="160" stroke={c.accent} strokeWidth="0.5" opacity="0.4" />
    </svg>
  );
}

// Belt
export function Belt({ tone = "black", className = "", style }) {
  const c = getTone(tone);
  return (
    <svg viewBox="0 0 280 50" className={className} style={style} aria-hidden="true">
      <defs>
        <linearGradient id={`bl-${tone}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={c.fill} stopOpacity="1" />
          <stop offset="1" stopColor={c.fill} stopOpacity="0.85" />
        </linearGradient>
      </defs>
      <rect x="10" y="20" width="260" height="12" rx="2" fill={`url(#bl-${tone})`} stroke={c.stroke} strokeWidth="0.8" />
      <rect x="100" y="14" width="22" height="24" rx="2" fill="none" stroke="#999" strokeWidth="1.5" />
      <rect x="106" y="14" width="2" height="24" fill="#999" />
    </svg>
  );
}

// Sunglasses
export function Sunglasses({ tone = "black", className = "", style }) {
  const c = getTone(tone);
  return (
    <svg viewBox="0 0 200 80" className={className} style={style} aria-hidden="true">
      <defs>
        <radialGradient id={`sg-${tone}`}>
          <stop offset="0" stopColor={c.fill} stopOpacity="0.95" />
          <stop offset="1" stopColor={c.fill} stopOpacity="1" />
        </radialGradient>
      </defs>
      <path d="M20 40 Q22 25 40 25 L75 25 Q90 25 92 38 L100 38 Q102 25 117 25 L160 25 Q178 25 180 40 L180 50 Q178 62 160 62 L120 62 Q102 62 100 50 L92 50 Q90 62 75 62 L40 62 Q22 62 20 50 Z" fill={`url(#sg-${tone})`} stroke={c.accent} strokeWidth="0.8" />
      <path d="M28 32 Q44 28 70 32 Q86 38 86 44" fill="none" stroke="#fff" opacity="0.32" strokeWidth="1.4" />
      <path d="M114 32 Q130 28 156 32 Q172 38 172 44" fill="none" stroke="#fff" opacity="0.22" strokeWidth="1.2" />
    </svg>
  );
}

// Cross necklace (like app's cross necklaces)
export function Necklace({ tone = "ivory", className = "", style }) {
  const c = getTone(tone);
  return (
    <svg viewBox="0 0 200 220" className={className} style={style} aria-hidden="true">
      <path d="M40 25 Q100 80 160 25" fill="none" stroke="#cfcfcf" strokeWidth="1.2" />
      <path d="M50 30 Q100 75 150 30" fill="none" stroke="#a8a8a8" strokeWidth="1" />
      {/* beads */}
      {[35, 50, 70, 100, 130, 150, 165].map((x, i) => (
        <circle key={i} cx={x} cy={32 + Math.abs(x - 100) * 0.18} r="2.4" fill="#999" stroke="#666" strokeWidth="0.5" />
      ))}
      {/* cross pendant */}
      <g transform="translate(95, 95)">
        <rect x="-2" y="0" width="4" height="60" fill="#bfbfbf" stroke="#666" strokeWidth="0.8" />
        <rect x="-12" y="14" width="24" height="4" fill="#bfbfbf" stroke="#666" strokeWidth="0.8" />
        <circle cx="0" cy="-8" r="3" fill="none" stroke="#999" strokeWidth="1" />
      </g>
    </svg>
  );
}

// Shoulder bag (like app's pink stud bag)
export function ShoulderBag({ tone = "pink", className = "", style }) {
  const c = getTone(tone);
  return (
    <svg viewBox="0 0 220 180" className={className} style={style} aria-hidden="true">
      <defs>
        <linearGradient id={`bg-${tone}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={c.fill} stopOpacity="1" />
          <stop offset="1" stopColor={c.fill} stopOpacity="0.85" />
        </linearGradient>
      </defs>
      {/* strap */}
      <path d="M50 30 Q100 -10 175 35" fill="none" stroke={c.stroke} strokeWidth="2" />
      <path d="M55 35 Q100 0 170 40" fill="none" stroke={c.accent} strokeWidth="1" opacity="0.6" />
      {/* body */}
      <path
        d="M30 65 Q30 55 45 55 L185 55 Q200 55 200 65 L195 145 Q193 160 178 162 L42 162 Q27 160 25 145 Z"
        fill={`url(#bg-${tone})`}
        stroke={c.stroke}
        strokeWidth="1.3"
      />
      {/* studs / sparkle pattern */}
      {[[60, 80], [80, 95], [100, 75], [120, 100], [140, 80], [160, 105], [70, 115], [110, 125], [150, 130], [90, 130], [130, 90]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.2" fill={c.accent} opacity="0.7" />
      ))}
      {/* buckle */}
      <rect x="95" y="100" width="32" height="14" rx="2" fill="none" stroke="#aaa" strokeWidth="1.4" />
      <line x1="106" y1="100" x2="106" y2="114" stroke="#aaa" strokeWidth="1.2" />
    </svg>
  );
}

// Cap (Mallee Motel style green cap)
export function Cap({ tone = "mint", className = "", style }) {
  const c = getTone(tone);
  return (
    <svg viewBox="0 0 220 140" className={className} style={style} aria-hidden="true">
      <defs>
        <linearGradient id={`cp-${tone}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={c.fill} stopOpacity="1" />
          <stop offset="1" stopColor={c.fill} stopOpacity="0.85" />
        </linearGradient>
      </defs>
      <path d="M40 75 Q40 30 110 30 Q180 30 180 75 L180 80 L195 80 L200 100 L25 100 L20 80 L40 80 Z" fill={`url(#cp-${tone})`} stroke={c.stroke} strokeWidth="1.3" />
      <path d="M40 75 Q40 30 110 30 Q180 30 180 75" fill="none" stroke={c.accent} strokeWidth="0.8" opacity="0.4" />
      {/* logo on cap */}
      <text x="110" y="68" textAnchor="middle" fill={c.accent} opacity="0.85" fontFamily="DM Sans, sans-serif" fontSize="9" fontWeight="700">VROCHE</text>
      <line x1="80" y1="76" x2="140" y2="76" stroke={c.accent} strokeWidth="0.6" opacity="0.4" />
    </svg>
  );
}

// Sneaker (low profile)
export function Sneaker({ tone = "ivory", className = "", style }) {
  const c = getTone(tone);
  return (
    <svg viewBox="0 0 220 110" className={className} style={style} aria-hidden="true">
      <defs>
        <linearGradient id={`sn-${tone}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={c.fill} stopOpacity="1" />
          <stop offset="1" stopColor={c.fill} stopOpacity="0.86" />
        </linearGradient>
      </defs>
      <path d="M20 75 Q20 50 60 50 L120 35 Q170 35 195 60 Q205 75 200 90 L20 92 Q15 85 20 75 Z" fill={`url(#sn-${tone})`} stroke={c.stroke} strokeWidth="1.2" />
      <line x1="20" y1="92" x2="200" y2="92" stroke={c.accent} strokeWidth="2" />
      {/* laces */}
      <path d="M75 50 L82 60 M85 48 L92 58 M95 46 L102 56 M105 44 L112 54" stroke={c.accent} strokeWidth="0.8" />
      {/* swoosh */}
      <path d="M115 75 Q145 55 170 65" fill="none" stroke={c.accent} strokeWidth="2" />
    </svg>
  );
}

// Trench / coat
export function Coat({ tone = "cream", className = "", style }) {
  const c = getTone(tone);
  return (
    <svg viewBox="0 0 220 280" className={className} style={style} aria-hidden="true">
      <defs>
        <linearGradient id={`co-${tone}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={c.fill} stopOpacity="1" />
          <stop offset="1" stopColor={c.fill} stopOpacity="0.88" />
        </linearGradient>
      </defs>
      <path
        d="M70 25 Q85 12 110 15 Q135 12 150 25 L195 55 L210 105 L195 115 L185 100 L185 255 Q183 270 165 270 L55 270 Q37 270 35 255 L35 100 L25 115 L10 105 L25 55 Z"
        fill={`url(#co-${tone})`}
        stroke={c.stroke}
        strokeWidth="1.2"
      />
      {/* lapels */}
      <path d="M85 30 L110 50 L135 30" fill="none" stroke={c.accent} strokeWidth="1.4" opacity="0.7" />
      <line x1="110" y1="50" x2="110" y2="270" stroke={c.accent} strokeWidth="1" opacity="0.45" />
      {/* buttons */}
      {[80, 130, 180, 230].map((y, i) => (
        <circle key={i} cx="98" cy={y} r="2.5" fill={c.accent} opacity="0.7" />
      ))}
      {/* belt */}
      <rect x="35" y="160" width="150" height="6" fill={c.accent} opacity="0.55" />
    </svg>
  );
}

// Bracelet (decorative accessory)
export function Bracelet({ className = "", style }) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={style} aria-hidden="true">
      <circle cx="50" cy="50" r="32" fill="none" stroke="#bdbdbd" strokeWidth="3" />
      <circle cx="50" cy="50" r="32" fill="none" stroke="#888" strokeWidth="0.6" strokeDasharray="2 2" />
      {[0, 60, 120, 180, 240, 300].map((d, i) => (
        <circle
          key={i}
          cx={50 + 32 * Math.cos((d * Math.PI) / 180)}
          cy={50 + 32 * Math.sin((d * Math.PI) / 180)}
          r="3.5"
          fill="#cfcfcf"
          stroke="#666"
          strokeWidth="0.6"
        />
      ))}
    </svg>
  );
}

// Watch
export function Watch({ className = "", style }) {
  return (
    <svg viewBox="0 0 120 180" className={className} style={style} aria-hidden="true">
      <rect x="40" y="10" width="40" height="30" fill="#888" />
      <rect x="40" y="140" width="40" height="30" fill="#888" />
      <rect x="30" y="40" width="60" height="100" rx="8" fill="#1a1a1a" stroke="#666" strokeWidth="1.5" />
      <circle cx="60" cy="90" r="32" fill="#0a0a0a" stroke="#FCFFFE" strokeWidth="1" opacity="0.85" />
      <line x1="60" y1="90" x2="60" y2="68" stroke="#FCFFFE" strokeWidth="1.5" />
      <line x1="60" y1="90" x2="78" y2="90" stroke="#63D7B1" strokeWidth="1.2" />
      <circle cx="60" cy="90" r="2" fill="#63D7B1" />
    </svg>
  );
}
