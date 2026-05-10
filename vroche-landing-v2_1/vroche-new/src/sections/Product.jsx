import React from "react";
import { Eyebrow } from "../components/UI";
import {
  Camera, Hanger, Calendar, Heart, Sparkles, ShoppingBag, Cloud, Lock,
} from "../components/icons";

const FEATURES = [
  {
    num: "01",
    icon: Sparkles,
    title: "AI Stylist",
    sub: "Tu estilista 24/7",
    text: "Looks generados en segundos a partir de tu armario, tu identidad visual, el plan del día y el clima real.",
    accent: "mint",
    big: true,
  },
  {
    num: "02",
    icon: Hanger,
    title: "Digital Closet",
    sub: "Wardrobe inteligente",
    text: "Sube prendas con foto o link. La AI las identifica, las recorta y las clasifica por tipo, color y estilo.",
    accent: "default",
  },
  {
    num: "03",
    icon: Camera,
    title: "Virtual Try-On",
    sub: "Powered by Gemini",
    text: "Pruébate cualquier outfit sobre tu propia foto. Decide antes de salir o de comprar.",
    accent: "coral",
  },
  {
    num: "04",
    icon: Calendar,
    title: "Outfit Planner",
    sub: "Tu calendario de looks",
    text: "Planifica tu semana — universidad, eventos, viajes — con outfits adaptados al contexto.",
    accent: "default",
  },
  {
    num: "05",
    icon: Heart,
    title: "Social Feed",
    sub: "Inspiración real",
    text: "Comparte looks, recibe likes y descubre estilo de personas reales. Una capa social hecha para vestir con criterio.",
    accent: "default",
  },
  {
    num: "06",
    icon: ShoppingBag,
    title: "Smart Shopping",
    sub: "Compra mejor",
    text: "Antes de comprar, prueba cómo combina con lo que ya tienes. Menos devoluciones, más prendas que sí encajan.",
    accent: "mint",
  },
  {
    num: "07",
    icon: Cloud,
    title: "Weather-aware",
    sub: "Outfit + clima",
    text: "Vroche cruza tu armario con el tiempo en tu ciudad para que nada falle.",
    accent: "default",
  },
  {
    num: "08",
    icon: Lock,
    title: "Privacy first",
    sub: "Tus prendas, tu data",
    text: "Tus fotos, tu armario y tus preferencias nunca se venden. Privacidad por diseño.",
    accent: "coral",
  },
];

function FeatureCard({ f, idx }) {
  const Icon = f.icon;
  const isMint = f.accent === "mint";
  const isCoral = f.accent === "coral";

  return (
    <article
      className={`reveal reveal-delay-${(idx % 4) + 1} group relative flex flex-col justify-between rounded-3xl border border-[#040806]/10 bg-white/40 p-7 md:p-8 backdrop-blur-md lift-on-hover ${
        f.big ? "md:col-span-2 md:row-span-2" : ""
      }`}
      style={{
        background:
          isMint
            ? "linear-gradient(165deg, #63D7B1 0%, #4FBF99 100%)"
            : isCoral
            ? "linear-gradient(165deg, #FF5733 0%, #E84823 100%)"
            : "#F2EEE7",
        color: isMint || isCoral ? "#040806" : "#040806",
        minHeight: f.big ? 360 : 240,
      }}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="font-sans text-[11px] tracking-[0.3em] uppercase opacity-60">{f.num}</span>
          <span className="h-[1px] w-6 bg-current opacity-30" />
        </div>
        <span
          className="flex h-11 w-11 items-center justify-center rounded-full border border-current/20"
          style={{ background: isMint || isCoral ? "rgba(4,8,6,0.06)" : "rgba(4,8,6,0.04)" }}
        >
          <Icon className="h-5 w-5" />
        </span>
      </div>

      <div className={`mt-${f.big ? "16" : "8"}`}>
        <h3 className={`font-display italic ${f.big ? "text-5xl md:text-6xl" : "text-3xl md:text-4xl"} leading-[0.95] tracking-tight`}>
          {f.title}
        </h3>
        <p className="font-sans mt-3 text-[10.5px] tracking-[0.28em] uppercase opacity-55">{f.sub}</p>
        <p className={`font-body mt-5 ${f.big ? "max-w-md text-base" : "text-sm"} leading-[1.65] opacity-75`}>
          {f.text}
        </p>
      </div>

      {/* corner deco for big card */}
      {f.big && (
        <div className="pointer-events-none absolute right-7 top-7 opacity-25">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="38" stroke="currentColor" strokeWidth="1" />
            <circle cx="40" cy="40" r="28" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 3" />
          </svg>
        </div>
      )}
    </article>
  );
}

export default function Product() {
  return (
    <section id="product" className="relative bg-[#FCFFFE] text-[#040806] py-24 md:py-32 grain">
      <div className="relative z-10 mx-auto max-w-[1440px] px-5 md:px-9">

        {/* Header */}
        <div className="reveal mb-14 grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div>
            <Eyebrow num="04" color="#040806">Product · The toolkit</Eyebrow>
            <h2 className="section-display mt-7">
              <span className="font-instrument italic text-[#FF5733]">Eight</span> tools.
              <br />
              One operating system for style.
            </h2>
          </div>
          <p className="font-body text-base leading-[1.7] text-[#040806]/60 max-w-md justify-self-end">
            Cada función de Vroche existe por una razón concreta: convertir el momento "no sé qué ponerme"
            en una decisión rápida, visual y tuya.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.num} f={f} idx={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
