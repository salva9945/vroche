import React, { useState } from "react";
import { isValidWaitlistEmail, APP_STORE_URL, PLAY_STORE_URL, VROCHE_LOGO_ICON } from "../constants";
import { ArrowRight, AppleLogo, GoogleLogo, ArrowUpRight } from "../components/icons";
import { Eyebrow, Badge } from "../components/UI";

export default function Download() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e) {
    e.preventDefault();
    if (!isValidWaitlistEmail(email)) return;
    setSubmitted(true);
  }

  return (
    <section
      id="download"
      className="relative overflow-hidden bg-[#040806] text-[#FCFFFE] py-24 md:py-36 grain grain-strong"
    >
      {/* big glow */}
      <div className="glow-blob" style={{ width: 700, height: 700, top: "-20%", left: "50%", transform: "translateX(-50%)", background: "rgba(99,215,177,0.22)" }} />
      <div className="glow-blob" style={{ width: 500, height: 500, bottom: "-10%", right: "-10%", background: "rgba(255,87,51,0.12)" }} />

      {/* watermark */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none z-0">
        <img
          src={VROCHE_LOGO_ICON}
          alt=""
          style={{ width: "min(70vw, 720px)", height: "auto", objectFit: "contain", opacity: 0.04, filter: "brightness(2)" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 md:px-9 text-center">
        <div className="reveal mx-auto mb-7 flex justify-center">
          <Badge dot="coral">Closed beta · Spring 2026</Badge>
        </div>

        <div className="reveal mb-3">
          <Eyebrow num="07" color="#63D7B1">Beta access</Eyebrow>
        </div>

        <h2 className="reveal section-display mt-7 mx-auto max-w-5xl">
          Be one of the first
          <br />
          <span className="font-instrument italic text-[#63D7B1]">to wear the future.</span>
        </h2>

        <p className="reveal font-body mt-7 mx-auto max-w-2xl text-base md:text-lg leading-[1.7] text-white/55">
          Estamos preparando los primeros testers de Vroche. Queremos usuarios con criterio,
          feedback honesto y ganas de construir el futuro de la moda.
        </p>

        {/* Waitlist */}
        <form onSubmit={onSubmit} className="reveal mx-auto mt-10 flex max-w-xl flex-col items-stretch gap-2 sm:flex-row" data-testid="cta-waitlist">
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
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#63D7B1] px-7 py-4 text-[12px] font-bold uppercase tracking-[0.18em] text-[#040806] transition-all hover:bg-white"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            Join the waitlist
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
        {submitted ? (
          <p className="font-sans mt-5 text-[12px] tracking-[0.18em] uppercase text-[#63D7B1]" role="status">
            ✓ Bienvenida a la beta.
          </p>
        ) : (
          <p className="font-body mt-5 text-[11px] text-white/35">
            Sin spam. Solo acceso anticipado y novedades clave.
          </p>
        )}

        {/* OR divider */}
        <div className="reveal mx-auto mt-14 flex max-w-xl items-center gap-5">
          <span className="h-px flex-1 bg-white/12" />
          <span className="font-sans text-[10.5px] tracking-[0.3em] uppercase text-white/35">Or download now</span>
          <span className="h-px flex-1 bg-white/12" />
        </div>

        {/* Store buttons big */}
        <div className="reveal mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex w-full max-w-xs items-center justify-between gap-4 rounded-full bg-white px-7 py-4 text-[#040806] transition-all hover:scale-[1.02]"
          >
            <span className="flex items-center gap-3">
              <AppleLogo className="h-7 w-7" />
              <span className="text-left">
                <span className="block font-sans text-[10px] uppercase tracking-[0.2em] opacity-50">Download on the</span>
                <span className="block font-sans text-base font-bold">App Store</span>
              </span>
            </span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
          </a>
          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex w-full max-w-xs items-center justify-between gap-4 rounded-full bg-white px-7 py-4 text-[#040806] transition-all hover:scale-[1.02]"
          >
            <span className="flex items-center gap-3">
              <GoogleLogo className="h-7 w-7" />
              <span className="text-left">
                <span className="block font-sans text-[10px] uppercase tracking-[0.2em] opacity-50">Get it on</span>
                <span className="block font-sans text-base font-bold">Google Play</span>
              </span>
            </span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
          </a>
        </div>
      </div>
    </section>
  );
}
