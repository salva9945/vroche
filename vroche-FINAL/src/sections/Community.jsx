import React from "react";
import { Eyebrow, Tag } from "../components/UI";
import { Heart, ChevronRight } from "../components/icons";
import { TankTop, ShoulderBag, Hoodie, Pants, Sunglasses, Shorts, Cap, Coat, Skirt, Necklace } from "../components/Garments";

// Mini outfit cards (vertical, like app's "Para Ti" feed)
const FEED = [
  {
    user: "@valeria",
    caption: "Siempre Divas 💅 esta noche en Madrid",
    likes: "24K",
    saves: "1.3K",
    bg: "linear-gradient(180deg, #6610B5 0%, #2B0666 100%)",
    items: [
      { comp: <TankTop tone="pink" />, x: 30, y: 40, w: 38, rot: -2 },
      { comp: <Shorts tone="ivory" />, x: 30, y: 75, w: 32, rot: 2 },
      { comp: <ShoulderBag tone="pink" />, x: 70, y: 65, w: 38, rot: -4 },
      { comp: <Necklace tone="ivory" />, x: 75, y: 25, w: 22, rot: 4 },
    ],
  },
  {
    user: "@rodiigb",
    caption: "Fit del finde · concierto noche",
    likes: "45K",
    saves: "2K",
    bg: "linear-gradient(180deg, #2B2B2B 0%, #060606 100%)",
    items: [
      { comp: <Hoodie tone="black" />, x: 70, y: 30, w: 40, rot: -4 },
      { comp: <Pants tone="charcoal" />, x: 30, y: 65, w: 32, rot: 0 },
      { comp: <Sunglasses tone="black" />, x: 75, y: 60, w: 30, rot: -8 },
    ],
  },
  {
    user: "@kapi",
    caption: "Casual ✨ café & studio day",
    likes: "12K",
    saves: "856",
    bg: "linear-gradient(180deg, #4FBF99 0%, #126649 100%)",
    items: [
      { comp: <Coat tone="cream" />, x: 30, y: 45, w: 42, rot: -3 },
      { comp: <Pants tone="cream" />, x: 70, y: 60, w: 30, rot: 2 },
      { comp: <Cap tone="mint" />, x: 70, y: 22, w: 30, rot: -6 },
    ],
  },
  {
    user: "@miaroma",
    caption: "Outfit para presentación 🤍",
    likes: "8.4K",
    saves: "412",
    bg: "linear-gradient(180deg, #C28A52 0%, #5E3F22 100%)",
    items: [
      { comp: <TankTop tone="cream" />, x: 30, y: 40, w: 38, rot: -2 },
      { comp: <Skirt tone="black" />, x: 30, y: 75, w: 36, rot: 0 },
      { comp: <ShoulderBag tone="black" />, x: 70, y: 60, w: 38, rot: -4 },
    ],
  },
];

function FeedCard({ post }) {
  return (
    <article className="reveal relative w-[280px] flex-shrink-0 md:w-[320px]">
      <div
        className="relative h-[480px] w-full overflow-hidden rounded-[28px]"
        style={{ background: post.bg }}
      >
        {/* Light beams effect */}
        <div className="absolute inset-0 opacity-25 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-full"
            style={{
              background:
                "conic-gradient(from 200deg at 50% 100%, transparent 0deg, rgba(255,255,255,0.3) 30deg, transparent 60deg, transparent 180deg, rgba(255,255,255,0.2) 200deg, transparent 240deg)",
            }}
          />
        </div>

        {/* Floating items */}
        {post.items.map((it, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${it.x}%`,
              top: `${it.y}%`,
              width: `${it.w}%`,
              transform: `translate(-50%, -50%) rotate(${it.rot}deg)`,
              filter: "drop-shadow(0 14px 22px rgba(0,0,0,0.35))",
            }}
          >
            {it.comp}
          </div>
        ))}

        {/* Right side stats column */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col items-center gap-5 z-10">
          <div className="flex flex-col items-center gap-1">
            <Heart className="h-6 w-6 text-[#FF5733]" strokeWidth={2} />
            <span className="font-sans text-[10px] font-bold text-white">{post.likes}</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-white" aria-hidden="true">
              <path d="M5 3v18l7-4 7 4V3z" />
            </svg>
            <span className="font-sans text-[10px] font-bold text-white">{post.saves}</span>
          </div>
        </div>

        {/* Bottom watermark "AREA 19" style */}
        <div className="absolute left-1/2 bottom-8 -translate-x-1/2 select-none pointer-events-none">
          <p
            className="font-display-up not-italic text-white/15"
            style={{ fontSize: 28, letterSpacing: "0.06em", fontWeight: 700 }}
          >
            AREA 19
          </p>
        </div>
      </div>

      {/* Footer caption */}
      <div className="mt-3 flex items-center gap-3 px-1">
        <div className="h-9 w-9 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-[10px] font-bold text-white/70">
          {post.user[1].toUpperCase()}
        </div>
        <div className="min-w-0">
          <p className="font-sans text-[12px] font-semibold text-white truncate">{post.user}</p>
          <p className="font-body text-[11px] text-white/55 truncate">{post.caption}</p>
        </div>
      </div>
    </article>
  );
}

export default function Community() {
  return (
    <section id="community" className="relative bg-[#040806] text-[#FCFFFE] py-24 md:py-32 grain">
      {/* glow */}
      <div className="glow-blob" style={{ width: 600, height: 600, top: "20%", left: -200, background: "rgba(102,16,181,0.18)" }} />
      <div className="glow-blob" style={{ width: 500, height: 500, bottom: "10%", right: -160, background: "rgba(99,215,177,0.12)" }} />

      <div className="relative z-10">
        {/* Header */}
        <div className="mx-auto max-w-[1440px] px-5 md:px-9">
          <div className="reveal mb-14 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <Eyebrow num="05" color="#63D7B1">Community · Social fashion</Eyebrow>
              <h2 className="section-display mt-7 text-white">
                Real outfits.
                <br />
                <span className="font-instrument italic text-[#63D7B1]">Real people.</span>
              </h2>
            </div>
            <p className="font-body text-base leading-[1.7] text-white/55 max-w-md justify-self-end">
              Vroche también es comunidad. Sigue a creadores con tu mismo estilo,
              guarda looks que te inspiren y comparte los tuyos. Sin filtros forzados.
              Solo moda real.
            </p>
          </div>

          {/* Tag row */}
          <div className="reveal mb-10 flex flex-wrap gap-2.5">
            {["Y2K", "Minimal", "Streetwear", "Editorial", "Vintage", "Quiet luxury", "Old money", "Coquette", "Techwear"].map((t) => (
              <Tag key={t} color="#FCFFFE" className="opacity-70 hover:opacity-100 transition-opacity">{t}</Tag>
            ))}
          </div>
        </div>

        {/* Horizontal scrolling gallery */}
        <div className="reveal relative">
          <div className="flex gap-5 overflow-x-auto pl-5 md:pl-9 pr-5 pb-4 no-scrollbar">
            {FEED.map((post, i) => (
              <FeedCard key={i} post={post} />
            ))}
            {/* Final CTA card */}
            <div className="w-[280px] md:w-[320px] flex-shrink-0">
              <div className="relative h-[480px] w-full overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] flex flex-col items-center justify-center text-center px-7">
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15">
                  <ChevronRight className="h-5 w-5 text-[#63D7B1]" />
                </div>
                <p className="font-display italic text-3xl text-white leading-tight">
                  And thousands more inside the app.
                </p>
                <p className="font-body mt-4 text-sm text-white/50">Únete a la beta para descubrirlas.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stat strip below */}
        <div className="mx-auto mt-14 max-w-[1440px] px-5 md:px-9">
          <div className="grid gap-x-6 gap-y-8 sm:grid-cols-3 border-t border-white/10 pt-10">
            {[
              ["1.2M+", "outfits compartidos esperando descubrirse"],
              ["20K+", "creadores reales subiendo looks diarios"],
              ["98%", "de los usuarios encuentra inspiración real"],
            ].map(([n, t], i) => (
              <div key={n} className={`reveal reveal-delay-${i + 1}`}>
                <p className="font-display italic text-5xl md:text-6xl text-[#63D7B1]">{n}</p>
                <p className="font-body mt-3 text-sm text-white/55 max-w-[260px]">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
