import React from "react";
import { Eyebrow } from "../components/UI";

export default function Manifest() {
  return (
    <section id="manifest" className="relative bg-[#FCFFFE] text-[#040806] py-24 md:py-36 grain">
      <div className="relative z-10 mx-auto max-w-[1440px] px-5 md:px-9">

        {/* Header row */}
        <div className="reveal flex items-center justify-between mb-14">
          <Eyebrow num="02" color="#040806">Manifest · Why Vroche</Eyebrow>
          <span className="hidden font-sans text-[10.5px] tracking-[0.28em] uppercase text-[#040806]/40 md:block">Read 1 min</span>
        </div>

        {/* Editorial pull-quote */}
        <div className="reveal grid items-end gap-12 lg:grid-cols-[1fr_0.55fr]">
          <h2 className="section-display text-[#040806]">
            We have <span className="line-through opacity-30">closets</span> full of clothes
            <br />
            and still ask <span className="font-instrument italic text-[#FF5733]">"what do I wear?"</span>
          </h2>
          <div className="border-l border-[#040806]/15 pl-7 max-w-md">
            <p className="font-body text-base leading-[1.65] text-[#040806]/65">
              Cada mañana, millones de personas abren su armario, se pierden en Pinterest,
              repiten outfits, se sienten desconectadas de su propio estilo — y acaban
              comprando ropa que ya tenían.
            </p>
            <p className="font-body mt-4 text-base leading-[1.65] text-[#040806]/65">
              Vroche no es otra red social. Es una capa nueva entre tu armario,
              tu identidad y la decisión diaria de vestirte.
            </p>
          </div>
        </div>

        {/* Stats grid */}
        <div className="mt-20 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { num: "73%", label: "no usa más del 30% de su armario", delay: 0 },
            { num: "9 min", label: "de media decidiendo qué ponerse", delay: 1 },
            { num: "+40%", label: "compras impulsivas se devuelven", delay: 2 },
            { num: "1×", label: "app que une todo: AI, closet, social", delay: 3 },
          ].map((s) => (
            <div key={s.num} className={`reveal reveal-delay-${s.delay} border-t border-[#040806]/15 pt-6`}>
              <p className="giant-num text-[#040806] leading-none">{s.num}</p>
              <p className="font-body mt-3 max-w-[180px] text-sm leading-snug text-[#040806]/55">
                {s.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
