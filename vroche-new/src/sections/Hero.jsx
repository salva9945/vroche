import React, { useMemo, useRef, useEffect, useState } from "react";
import { VROCHE_LOGO_ICON, isValidWaitlistEmail } from "../constants";
import { ArrowDown, ArrowRight, Sparkles, AppleLogo, GoogleLogo } from "../components/icons";
import { Eyebrow, Badge } from "../components/UI";
import { useMousePosition } from "../hooks";
import { TankTop, ShoulderBag, Necklace, Sunglasses, Shorts } from "../components/Garments";

// Seeded random for stable scattered logos
function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

function buildLogoField(count = 80, seed = 7) {
  const rand = seededRandom(seed);
  return Array.from({ length: count }, (_, i) => ({
    id: `logo-${i}`,
    size: 14 + rand() * 26,
    left: 1 + rand() * 98,
    top: 2 + rand() * 96,
    rotate: -32 + rand() * 64,
    opacity: 0.04 + rand() * 0.06,
  }));
}

function LogoField({ pos }) {
  const items = useMemo(() => buildLogoField(80, 7), []);
  const fieldRef = useRef(null);

  useEffect(() => {
    if (!fieldRef.current) return;
    fieldRef.current.style.setProperty("--reveal-x", `${pos.x}px`);
    fieldRef.current.style.setProperty("--reveal-y", `${pos.y}px`);
    fieldRef.current.style.setProperty("--reveal-opacity", pos.x < 0 ? "0" : "1");
  }, [pos]);

  return (
    <div ref={fieldRef} className="logo-field" aria-hidden="true">
      {/* Base layer (white, very faint) */}
      <div className="logo-field-base">
        {items.map((it) => (
          <div
            key={it.id}
            style={{
              position: "absolute",
              left: `${it.left}%`,
              top: `${it.top}%`,
              width: it.size,
              height: it.size,
              transform: `translate(-50%, -50%) rotate(${it.rotate}deg)`,
              opacity: it.opacity,
            }}
          >
            <img src={VROCHE_LOGO_ICON} alt="" style={{ width: "100%", height: "100%", objectFit: "contain", filter: "brightness(2)" }} />
          </div>
        ))}
      </div>
      {/* Reveal layer (mint tint where cursor is) */}
      <div className="logo-field-reveal">
        {items.map((it) => (
          <div
            key={it.id + "r"}
            style={{
              position: "absolute",
              left: `${it.left}%`,
              top: `${it.top}%`,
              width: it.size,
              height: it.size,
              transform: `translate(-50%, -50%) rotate(${it.rotate}deg)`,
              opacity: 1,
            }}
          >
            <img
              src={VROCHE_LOGO_ICON}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                filter: "brightness(0) saturate(100%) invert(78%) sepia(35%) saturate(497%) hue-rotate(108deg) brightness(91%) contrast(86%)",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// Floating editorial garment composition
function FloatingFlatLay() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
      {/* tank top - top right */}
      <div className="absolute right-[8%] top-[12%] w-[170px] float-anim" style={{ "--rot": "-8deg", animationDelay: "0s" }}>
        <TankTop tone="pink" className="h-auto w-full drop-shadow-[0_30px_40px_rgba(247,184,210,0.18)]" />
      </div>
      {/* necklace - mid right floating */}
      <div className="absolute right-[18%] top-[44%] w-[110px] float-anim" style={{ "--rot": "6deg", animationDelay: "1s" }}>
        <Necklace tone="ivory" className="h-auto w-full opacity-70" />
      </div>
      {/* sunglasses - top left */}
      <div className="absolute left-[10%] top-[18%] w-[130px] float-anim" style={{ "--rot": "12deg", animationDelay: "0.5s" }}>
        <Sunglasses tone="black" className="h-auto w-full" />
      </div>
      {/* bag - bottom left */}
      <div className="absolute bottom-[12%] left-[4%] w-[180px] float-anim" style={{ "--rot": "-4deg", animationDelay: "1.5s" }}>
        <ShoulderBag tone="pink" className="h-auto w-full drop-shadow-[0_30px_40px_rgba(247,184,210,0.2)]" />
      </div>
      {/* shorts - bottom right */}
      <div className="absolute bottom-[18%] right-[5%] w-[140px] float-anim" style={{ "--rot": "5deg", animationDelay: "2s" }}>
        <Shorts tone="ivory" className="h-auto w-full opacity-90" />
      </div>
    </div>
  );
}

export default function HeroSection() {
  const pos = useMousePosition();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e) {
    e.preventDefault();
    if (!isValidWaitlistEmail(email)) return;
    setSubmitted(true);
  }

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-[#040806] text-[#FCFFFE] grain"
      style={{ minHeight: "100vh" }}
    >
      {/* Logo field background with cursor reveal */}
      <LogoField pos={pos} />

      {/* Mint glow blob top-left */}
      <div className="glow-blob" style={{ width: 600, height: 600, top: -200, left: -180, background: "rgba(99,215,177,0.18)" }} />
      {/* Coral glow bottom-right */}
      <div className="glow-blob" style={{ width: 500, height: 500, bottom: -220, right: -140, background: "rgba(255,87,51,0.14)" }} />

      <FloatingFlatLay />

      {/* Top meta row */}
      <div className="relative z-20 mx-auto flex max-w-[1440px] items-center justify-between px-5 pt-28 md:px-9 md:pt-32">
        <Badge dot="mint">Closed beta · Spring 2026</Badge>
        <div className="hidden items-center gap-3 md:flex">
          <span className="font-sans text-[11px] tracking-[0.3em] text-white/35 uppercase">Issue 01 — Madrid</span>
        </div>
      </div>

      {/* Main hero content */}
      <div className="relative z-20 mx-auto max-w-[1440px] px-5 pt-12 md:px-9 md:pt-20">
        <div className="grid items-end gap-12 lg:grid-cols-[1.4fr_1fr]">
          {/* Display headline */}
          <div>
            <Eyebrow num="01" color="#63D7B1">Fashion · AI · Identity</Eyebrow>

            <h1 className="mt-7 hero-display text-white">
              Your <span className="text-[#63D7B1]">wardrobe</span>,
              <br />
              <span className="font-display-up not-italic">UPGRADED</span>
              <span className="font-instrument italic"> by AI.</span>
            </h1>

            <p className="font-body mt-8 max-w-xl text-base leading-[1.65] text-white/65 md:text-lg">
              Vroche convierte tu armario en una experiencia inteligente, visual y social.
              <span className="text-white"> AI Stylist</span>, virtual try-on, planner y feed de moda real
              en una sola app — para que dejes de pensar "no sé qué ponerme".
            </p>

            {/* Waitlist input + store */}
            <div className="mt-10 flex flex-col gap-4 max-w-xl">
              <form onSubmit={onSubmit} className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center" data-testid="hero-waitlist">
                <div className="relative flex flex-1 items-center overflow-hidden rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-md focus-within:border-[#63D7B1]/60">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tuemail@dominio.com"
                    className="flex-1 bg-transparent px-5 py-4 text-sm text-white placeholder-white/35 outline-none"
                    style={{ fontFamily: "DM Sans, sans-serif" }}
                    aria-label="Email para acceso beta"
                  />
                  <button
                    type="submit"
                    className="m-1 inline-flex items-center gap-1.5 rounded-full bg-[#63D7B1] px-5 py-3 text-[12px] font-bold uppercase tracking-[0.18em] text-[#040806] transition-all hover:bg-white"
                    style={{ fontFamily: "DM Sans, sans-serif" }}
                  >
                    Join beta
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </form>
              {submitted ? (
                <p className="font-sans text-[12px] tracking-[0.18em] uppercase text-[#63D7B1]" role="status">
                  ✓ Listo. Te avisaremos.
                </p>
              ) : (
                <p className="font-body text-[11px] text-white/35 leading-snug">
                  Sin spam. Acceso anticipado, novedades y la posibilidad de testear funciones antes que nadie.
                </p>
              )}

              {/* Stores */}
              <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#download"
                  className="group flex items-center justify-between gap-3 rounded-full border border-white/15 bg-white/[0.03] px-5 py-3 text-white transition-all hover:bg-white hover:text-[#040806]"
                >
                  <span className="flex items-center gap-3">
                    <AppleLogo className="h-5 w-5" />
                    <span>
                      <span className="block font-sans text-[10px] uppercase tracking-[0.2em] opacity-50">Download on the</span>
                      <span className="block font-sans text-sm font-bold">App Store</span>
                    </span>
                  </span>
                </a>
                <a
                  href="#download"
                  className="group flex items-center justify-between gap-3 rounded-full border border-white/15 bg-white/[0.03] px-5 py-3 text-white transition-all hover:bg-white hover:text-[#040806]"
                >
                  <span className="flex items-center gap-3">
                    <GoogleLogo className="h-5 w-5" />
                    <span>
                      <span className="block font-sans text-[10px] uppercase tracking-[0.2em] opacity-50">Get it on</span>
                      <span className="block font-sans text-sm font-bold">Google Play</span>
                    </span>
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: editorial caption stack */}
          <aside className="hidden lg:block">
            <div className="space-y-6">
              <div className="rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6 backdrop-blur-md">
                <p className="font-sans text-[10.5px] tracking-[0.3em] text-[#63D7B1] uppercase">An app for</p>
                <p className="font-display italic text-3xl mt-2 leading-tight text-white">
                  the generation that decides on phone.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  ["AI", "Stylist"],
                  ["VTO", "Try-on"],
                  ["Closet", "Digital"],
                  ["Social", "Feed"],
                ].map(([t, s]) => (
                  <div key={t} className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 backdrop-blur-md">
                    <p className="font-display-up text-2xl text-white not-italic">{t}</p>
                    <p className="font-sans mt-1 text-[10px] tracking-[0.22em] uppercase text-white/40">{s}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Bottom credits row */}
      <div className="relative z-20 mx-auto mt-20 flex max-w-[1440px] flex-col items-start gap-4 border-t border-white/10 px-5 py-5 md:flex-row md:items-center md:justify-between md:px-9">
        <div className="flex items-center gap-5 text-white/45">
          <span className="font-sans text-[10.5px] tracking-[0.28em] uppercase">Index 01 — 06</span>
          <span className="hidden h-3 w-px bg-white/20 md:block" />
          <span className="hidden font-sans text-[10.5px] tracking-[0.28em] uppercase md:inline">Issue · Spring/Summer</span>
        </div>
        <a href="#manifest" className="group flex items-center gap-3 text-white/60 hover:text-[#63D7B1] transition-colors">
          <span className="font-sans text-[10.5px] tracking-[0.28em] uppercase">Scroll to read</span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-current">
            <ArrowDown className="h-3.5 w-3.5" />
          </span>
        </a>
      </div>

      {/* Big sliding type ticker at very bottom */}
      <div className="relative z-10 mt-2 overflow-hidden border-y border-white/10 py-5">
        <div className="marquee-track">
          {Array.from({ length: 4 }).map((_, k) => (
            <div key={k} className="flex flex-shrink-0 items-center gap-12 pr-12">
              {[
                "AI STYLIST",
                "VIRTUAL TRY-ON",
                "DIGITAL CLOSET",
                "SOCIAL FASHION",
                "OUTFIT PLANNER",
                "SMART SHOPPING",
              ].map((t, i) => (
                <React.Fragment key={i}>
                  <span className="font-display italic text-5xl text-white/85 md:text-7xl whitespace-nowrap">{t}</span>
                  <span className="text-[#63D7B1] text-3xl">✦</span>
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
