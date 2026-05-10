import React, { useRef } from "react";
import { useSectionScrollProgress } from "../hooks";
import { Eyebrow } from "../components/UI";
import {
  TankTop, ShoulderBag, Necklace, Sunglasses, Shorts, Pants, Hoodie, Belt, Cap, Sneaker, Bracelet,
} from "../components/Garments";

/* ─────────────────────────────────────────────────────────────
   Scroll Story
   The wardrobe gets composed item by item as you scroll.
   Sticky stage on the left, text steps on the right.
   ───────────────────────────────────────────────────────────── */

const STEPS = [
  {
    num: "01",
    eyebrow: "Step 01 · Scan",
    title: "Escanea tu armario",
    subtitle: "Digital closet",
    text: "Sube prendas desde una foto, un enlace o tus capturas. La AI las identifica, las recorta y las clasifica automáticamente en tu armario digital.",
    accent: "mint",
  },
  {
    num: "02",
    eyebrow: "Step 02 · Style",
    title: "AI Stylist personal",
    subtitle: "Your taste, learned",
    text: "Vroche aprende tu estilo y compone outfits con tus prendas: según el plan, el clima, la ocasión y tu identidad visual.",
    accent: "coral",
  },
  {
    num: "03",
    eyebrow: "Step 03 · Try",
    title: "Virtual Try-On",
    subtitle: "Powered by Gemini",
    text: "Visualiza cualquier look sobre tu propia foto antes de salir o de comprar. Decide con criterio, no por impulso.",
    accent: "mint",
  },
  {
    num: "04",
    eyebrow: "Step 04 · Plan",
    title: "Planifica la semana",
    subtitle: "Outfit calendar",
    text: "Universidad, trabajo, citas, viajes, eventos. Cada día tiene su outfit pensado — y se ajusta al clima en tiempo real.",
    accent: "coral",
  },
  {
    num: "05",
    eyebrow: "Step 05 · Share",
    title: "Inspiración real",
    subtitle: "Social fashion feed",
    text: "Comparte tus looks, recibe likes y descubre estilo real de otros usuarios. Una capa social hecha por y para quien viste con intención.",
    accent: "mint",
  },
  {
    num: "06",
    eyebrow: "Step 06 · Buy",
    title: "Compra mejor",
    subtitle: "Smart shopping",
    text: "Antes de comprar, prueba cómo combina con lo que ya tienes. Menos compras impulsivas. Más prendas que sí encajan.",
    accent: "coral",
  },
];

/* Helper: calculate stage progress for each item.
   Items appear progressively across the scroll. */
function itemAppear(progress, start, end = 1) {
  // returns 0..1 mapping to opacity / scale
  if (progress <= start) return 0;
  if (progress >= end) return 1;
  return (progress - start) / (end - start);
}

function easeOut(t) {
  return 1 - Math.pow(1 - t, 3);
}

function FlatLayStage({ progress }) {
  // Each item has a "start" point in the [0..1] scroll range
  // Items appear with translation+fade, persist after.
  const items = [
    { key: "top", start: 0.02, end: 0.16, x: 24, y: 16, rot: -4, scale: 0.62, comp: <TankTop tone="pink" className="h-auto w-full drop-shadow-[0_22px_30px_rgba(247,184,210,0.22)]" /> },
    { key: "shorts", start: 0.10, end: 0.22, x: 28, y: 56, rot: 3, scale: 0.46, comp: <Shorts tone="ivory" className="h-auto w-full" /> },
    { key: "necklace", start: 0.18, end: 0.28, x: 64, y: 14, rot: 6, scale: 0.36, comp: <Necklace tone="ivory" className="h-auto w-full" /> },
    { key: "sunglasses", start: 0.24, end: 0.34, x: 72, y: 42, rot: -10, scale: 0.32, comp: <Sunglasses tone="black" className="h-auto w-full" /> },
    { key: "bag", start: 0.32, end: 0.44, x: 60, y: 60, rot: -6, scale: 0.5, comp: <ShoulderBag tone="pink" className="h-auto w-full drop-shadow-[0_22px_30px_rgba(247,184,210,0.18)]" /> },
    { key: "belt", start: 0.42, end: 0.54, x: 18, y: 78, rot: -2, scale: 0.46, comp: <Belt tone="black" className="h-auto w-full" /> },
    { key: "bracelet", start: 0.52, end: 0.64, x: 76, y: 78, rot: 0, scale: 0.18, comp: <Bracelet className="h-auto w-full opacity-80" /> },
    { key: "cap", start: 0.62, end: 0.74, x: 72, y: 8, rot: -4, scale: 0.36, comp: <Cap tone="mint" className="h-auto w-full" /> },
    { key: "sneaker", start: 0.74, end: 0.86, x: 8, y: 64, rot: -8, scale: 0.4, comp: <Sneaker tone="ivory" className="h-auto w-full" /> },
  ];

  return (
    <div className="relative h-full w-full">
      {/* gradient atmosphere */}
      <div
        className="absolute inset-6 rounded-[36px] overflow-hidden"
        style={{
          background: "radial-gradient(ellipse at 30% 30%, rgba(99,215,177,0.18) 0%, rgba(4,8,6,0) 60%), radial-gradient(ellipse at 70% 80%, rgba(255,87,51,0.12) 0%, rgba(4,8,6,0) 55%), linear-gradient(180deg, #0c1310 0%, #040806 100%)",
        }}
      >
        {/* grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #FCFFFE 1px, transparent 1px), linear-gradient(to bottom, #FCFFFE 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* progress meter at top of stage */}
        <div className="absolute left-6 right-6 top-6 flex items-center gap-3">
          <span className="font-sans text-[10px] tracking-[0.28em] text-white/55 uppercase">Composing look</span>
          <div className="relative flex-1 h-[2px] bg-white/12 rounded-full overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full bg-[#63D7B1] transition-all duration-200"
              style={{ width: `${Math.round(progress * 100)}%` }}
            />
          </div>
          <span className="font-sans text-[10px] tracking-[0.18em] text-[#63D7B1]">{Math.round(progress * 100)}%</span>
        </div>

        {/* corner labels */}
        <div className="absolute left-6 bottom-6 flex flex-col gap-1">
          <span className="font-sans text-[10px] tracking-[0.28em] text-white/45 uppercase">Outfit · Spring 2026</span>
          <span className="font-display italic text-2xl text-white/85">Look No. 03</span>
        </div>
        <div className="absolute right-6 bottom-6 text-right">
          <span className="font-sans text-[10px] tracking-[0.28em] text-[#63D7B1] uppercase">Built by AI</span>
          <p className="font-sans text-[10px] tracking-[0.18em] text-white/40 mt-1">22° · Madrid</p>
        </div>

        {/* Floating items */}
        {items.map((it) => {
          const a = easeOut(itemAppear(progress, it.start, it.end));
          if (a <= 0) return null;
          return (
            <div
              key={it.key}
              className="absolute"
              style={{
                left: `${it.x}%`,
                top: `${it.y}%`,
                width: `${it.scale * 100}%`,
                transform: `translate(-50%, -50%) rotate(${it.rot}deg) scale(${0.85 + 0.15 * a})`,
                opacity: a,
                transition: "opacity 0.45s ease, transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
                filter: `drop-shadow(0 18px 28px rgba(0,0,0,${0.25 * a}))`,
              }}
            >
              {it.comp}
            </div>
          );
        })}

        {/* center watermark */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none">
          <span
            className="font-display italic text-white/[0.025]"
            style={{ fontSize: "min(28vw, 280px)", letterSpacing: "-0.05em", lineHeight: 1 }}
          >
            vroche
          </span>
        </div>
      </div>
    </div>
  );
}

export default function ScrollStory() {
  const sectionRef = useRef(null);
  const progress = useSectionScrollProgress(sectionRef);

  // Determine "active" step based on progress
  const stepProgress = progress * STEPS.length;
  const activeIdx = Math.min(STEPS.length - 1, Math.floor(stepProgress));

  return (
    <section
      id="scrollstory"
      ref={sectionRef}
      className="relative bg-[#040806] text-[#FCFFFE] grain"
      style={{ height: `${STEPS.length * 80}vh` }}
    >
      {/* Sticky stage */}
      <div className="scroll-story-sticky">
        <div className="mx-auto grid h-full max-w-[1440px] grid-cols-1 gap-0 px-0 md:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-10 lg:px-9">

          {/* Left: visual stage */}
          <div className="relative h-full flex items-stretch py-10 md:py-16 lg:py-20">
            <FlatLayStage progress={progress} />
          </div>

          {/* Right: text panel */}
          <div className="relative flex h-full flex-col justify-center px-5 md:px-0 pb-10 lg:pb-0">
            <div className="mb-8 flex items-center justify-between">
              <Eyebrow num="03" color="#63D7B1">How it works</Eyebrow>
              <span className="font-sans text-[10.5px] tracking-[0.3em] text-white/45 uppercase">
                {String(activeIdx + 1).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")}
              </span>
            </div>

            <h2 className="section-display text-white mb-2">
              The look,
              <br />
              <span className="font-instrument italic text-[#63D7B1]">composed.</span>
            </h2>
            <p className="font-body text-sm md:text-base text-white/55 mb-10 max-w-md leading-[1.7]">
              Vroche te acompaña paso a paso. Aquí va el flujo real, mientras desplazas:
            </p>

            {/* Step list */}
            <ol className="space-y-1">
              {STEPS.map((s, i) => {
                const active = i === activeIdx;
                const past = i < activeIdx;
                return (
                  <li key={s.num} className="border-t border-white/10">
                    <div
                      className="flex items-start gap-5 py-5 transition-all duration-500"
                      style={{ opacity: active ? 1 : past ? 0.45 : 0.32 }}
                    >
                      <span
                        className={`font-sans text-[11px] tracking-[0.3em] uppercase transition-colors duration-500 ${
                          active ? "text-[#63D7B1]" : "text-white/40"
                        }`}
                        style={{ width: 32 }}
                      >
                        {s.num}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-baseline justify-between gap-3">
                          <h3
                            className={`font-display italic text-2xl md:text-3xl transition-colors duration-500 ${
                              active ? "text-white" : "text-white/55"
                            }`}
                          >
                            {s.title}
                          </h3>
                          <span className="font-sans text-[10px] tracking-[0.22em] uppercase text-white/30 hidden md:block">
                            {s.subtitle}
                          </span>
                        </div>
                        <div
                          className="grid transition-all duration-500"
                          style={{ gridTemplateRows: active ? "1fr" : "0fr" }}
                        >
                          <div className="overflow-hidden">
                            <p className="font-body text-sm leading-[1.7] text-white/55 pt-3 max-w-md">
                              {s.text}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
              <li className="border-t border-white/10" />
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
