import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const LOGO_MARK = "https://i.postimg.cc/7ZnpbB79/vroche-Blanco.png";
const LOGO_TEXT = "https://i.postimg.cc/0Qn4yrwr/vroche-Blanco-Texto.png";

const BRAND = {
  mint: "#63D7B1",
  coral: "#FF5733",
  white: "#FCFFFE",
  black: "#040806",
};

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function smoothstep(edge0, edge1, x) {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

function isValidWaitlistEmail(value) {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function createLogoFieldItems(count = 118, seed = 91) {
  let current = seed;
  function random() {
    current = (current * 1664525 + 1013904223) % 4294967296;
    return current / 4294967296;
  }

  return Array.from({ length: count }, (_, index) => ({
    id: `vroche-bg-logo-${index}`,
    size: 12 + random() * 22,
    left: 1 + random() * 98,
    top: 1 + random() * 98,
    rotate: -38 + random() * 76,
    opacity: 0.035 + random() * 0.055,
    driftX: -8 + random() * 16,
    driftY: -8 + random() * 16,
    duration: 13 + random() * 10,
    delay: random() * 8,
  }));
}

const LOGO_FIELD = createLogoFieldItems();

const featureSteps = [
  {
    kicker: "01 · Smart Closet",
    title: "Tu armario empieza a pensar contigo.",
    body: "Sube prendas, organízalas por categoría, color, temporada y ocasión. Vroche convierte tu ropa en datos visuales útiles para crear looks reales.",
    stats: ["128 prendas", "14 categorías", "0 caos"],
  },
  {
    kicker: "02 · AI Stylist",
    title: "La IA propone looks con contexto real.",
    body: "No recomienda por recomendar: entiende tu estilo, la ocasión, el clima y lo que tienes disponible para componer outfits con sentido.",
    stats: ["weather-aware", "event-ready", "personal fit"],
  },
  {
    kicker: "03 · Virtual Try-On",
    title: "Ves el look antes de decidir.",
    body: "La experiencia de try-on ayuda a visualizar prendas y combinaciones para reducir dudas, compras impulsivas y cambios innecesarios.",
    stats: ["preview", "mix & match", "decision layer"],
  },
  {
    kicker: "04 · Social Styling",
    title: "La moda vuelve a ser conversación.",
    body: "Comparte outfits, valida ideas, descubre inspiración real y crea una comunidad alrededor del estilo personal, no solo del consumo.",
    stats: ["feed", "votes", "community"],
  },
];

const productCards = [
  {
    title: "Virtual try-on sobre tu foto",
    text: "Prueba prendas y looks visualmente antes de ponértelos o comprarlos.",
    icon: "camera",
  },
  {
    title: "AI Stylist personal",
    text: "Recomendaciones según estilo, ocasión, clima y armario real.",
    icon: "spark",
    accent: "coral",
  },
  {
    title: "Armario digital inteligente",
    text: "Digitaliza prendas y conviértelas en piezas combinables y accionables.",
    icon: "shirt",
  },
  {
    title: "Planificación de outfits",
    text: "Organiza looks para planes, eventos, viajes y días concretos.",
    icon: "calendar",
    accent: "coral",
  },
  {
    title: "Social styling",
    text: "Comparte, vota, inspira y descubre combinaciones reales.",
    icon: "social",
  },
  {
    title: "Compra con más criterio",
    text: "Encuentra piezas que encajan con tu armario y reduce compras impulsivas.",
    icon: "bag",
    accent: "coral",
  },
];

function Icon({ type, className = "" }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className,
    "aria-hidden": true,
  };

  const paths = {
    camera: [
      <path key="1" d="M4 7h3l2-2h6l2 2h3a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z" />,
      <circle key="2" cx="12" cy="13" r="4" />,
    ],
    spark: [
      <path key="1" d="M12 2l1.7 5.1L19 9l-5.3 1.9L12 16l-1.7-5.1L5 9l5.3-1.9L12 2z" />,
      <path key="2" d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14z" />,
    ],
    shirt: [<path key="1" d="M9 4l3 2 3-2 4 3-2 4-2-1v10H9V10l-2 1-2-4 4-3z" />],
    calendar: [
      <path key="1" d="M7 2v4" />,
      <path key="2" d="M17 2v4" />,
      <rect key="3" x="3" y="5" width="18" height="16" rx="2" />,
      <path key="4" d="M3 10h18" />,
    ],
    social: [
      <circle key="1" cx="6.5" cy="12" r="2.2" />,
      <circle key="2" cx="17.5" cy="7" r="2.2" />,
      <circle key="3" cx="17.5" cy="17" r="2.2" />,
      <path key="4" d="M8.6 11l6.6-3" />,
      <path key="5" d="M8.6 13l6.6 3" />,
    ],
    bag: [
      <path key="1" d="M6 8h12l-1 12H7L6 8z" />,
      <path key="2" d="M9 8a3 3 0 0 1 6 0" />,
    ],
    arrow: [
      <path key="1" d="M5 12h14" />,
      <path key="2" d="M13 6l6 6-6 6" />,
    ],
    check: [<path key="1" d="M20 6L9 17l-5-5" />],
  };

  return <svg {...common}>{paths[type] || paths.spark}</svg>;
}

function LogoImage({ text = false, className = "", alt = "Vroche" }) {
  const [error, setError] = useState(false);
  const src = text ? LOGO_TEXT : LOGO_MARK;

  if (error) {
    return (
      <div className={`fallback-logo ${className}`} aria-label={alt}>
        V
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      draggable="false"
      referrerPolicy="no-referrer"
      onError={() => setError(true)}
    />
  );
}

function CursorLogoField() {
  const fieldRef = useRef(null);
  const rafRef = useRef(0);
  const pointerRef = useRef({ x: -9999, y: -9999, active: false });

  useEffect(() => {
    function apply() {
      rafRef.current = 0;
      const node = fieldRef.current;
      if (!node) return;
      node.style.setProperty("--reveal-x", `${pointerRef.current.x}px`);
      node.style.setProperty("--reveal-y", `${pointerRef.current.y}px`);
      node.style.setProperty("--reveal-opacity", pointerRef.current.active ? "1" : "0");
    }

    function schedule() {
      if (!rafRef.current) rafRef.current = window.requestAnimationFrame(apply);
    }

    function move(event) {
      pointerRef.current = { x: event.clientX, y: event.clientY, active: true };
      schedule();
    }

    function leave() {
      pointerRef.current.active = false;
      schedule();
    }

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerleave", leave);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const renderItem = (item, reveal) => (
    <div
      key={`${reveal ? "reveal" : "base"}-${item.id}`}
      className="noise-logo-wrap"
      style={{
        left: `${item.left}vw`,
        top: `${item.top}vh`,
        height: `${reveal ? item.size + 3 : item.size}px`,
        opacity: reveal ? 1 : item.opacity,
        "--rotation": `${item.rotate}deg`,
        "--drift-x": `${item.driftX}px`,
        "--drift-y": `${item.driftY}px`,
        "--drift-duration": `${item.duration}s`,
        "--drift-delay": `${item.delay}s`,
      }}
    >
      <img
        src={LOGO_MARK}
        alt=""
        aria-hidden="true"
        draggable="false"
        referrerPolicy="no-referrer"
        className={reveal ? "noise-logo-img noise-logo-img-reveal" : "noise-logo-img noise-logo-img-base"}
      />
    </div>
  );

  return (
    <div ref={fieldRef} className="cursor-logo-field" aria-hidden="true">
      <div className="noise-logo-layer">{LOGO_FIELD.map((item) => renderItem(item, false))}</div>
      <div className="noise-logo-layer noise-logo-layer-reveal">{LOGO_FIELD.map((item) => renderItem(item, true))}</div>
    </div>
  );
}

function Header() {
  return (
    <header className="site-header">
      <a href="#top" className="brand-link" aria-label="Vroche home">
        <LogoImage text className="brand-logo" />
      </a>
      <nav className="main-nav" aria-label="Navegación principal">
        <a href="#product">Producto</a>
        <a href="#story">Cómo funciona</a>
        <a href="#vision">Visión</a>
        <a href="#waitlist">Beta</a>
      </nav>
      <a href="#waitlist" className="header-cta">Beta</a>
    </header>
  );
}

function Badge({ children, variant = "dark" }) {
  return <span className={`badge badge-${variant}`}>{children}</span>;
}

function HeroScene() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function submit(event) {
    event.preventDefault();
    if (!isValidWaitlistEmail(email)) return;
    setSubmitted(true);
  }

  return (
    <section id="top" className="hero-section">
      <div className="hero-bg-orb hero-bg-orb-a" />
      <div className="hero-bg-orb hero-bg-orb-b" />
      <div className="hero-grid-pattern" />

      <Header />

      <div className="hero-inner">
        <div className="hero-copy reveal-up">
          <Badge>
            <span className="badge-dot" /> AI FASHION · VIRTUAL TRY-ON · SMART CLOSET · SOCIAL
          </Badge>

          <h1>
            Your wardrobe,
            <span>upgraded by AI.</span>
          </h1>

          <p className="hero-lead">
            Vroche transforma tu armario en una experiencia inteligente: prueba looks sobre tu foto,
            recibe recomendaciones de estilo, comparte outfits y planifica qué ponerte para cada momento.
          </p>

          <form className="waitlist-form" onSubmit={submit}>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              placeholder="Introduce tu correo"
              aria-label="Correo electrónico"
            />
            <button type="submit">
              Acceso beta <Icon type="arrow" className="button-icon" />
            </button>
          </form>

          <p className={`form-status ${submitted ? "form-status-visible" : ""}`}>
            {submitted ? `Perfecto. ${email.trim()} está apuntado a la beta de Vroche.` : "Sin spam. Solo acceso, novedades clave y pruebas del producto."}
          </p>

          <div className="hero-mini-cards">
            <div><strong>AI</strong><span>Stylist</span></div>
            <div><strong>VTO</strong><span>Try-on</span></div>
            <div><strong>Closet</strong><span>Digital</span></div>
            <div><strong>Social</strong><span>Community</span></div>
          </div>
        </div>

        <div className="hero-visual reveal-up reveal-delay">
          <div className="logo-hero-orbit">
            <div className="orbit-ring orbit-ring-a" />
            <div className="orbit-ring orbit-ring-b" />
            <LogoImage className="hero-mark" />
          </div>
          <PhoneMockup />
        </div>
      </div>
    </section>
  );
}

function PhoneMockup() {
  return (
    <div className="phone-shell" aria-label="Mockup de la app Vroche">
      <div className="phone-glow" />
      <div className="phone-frame">
        <div className="phone-notch" />
        <div className="phone-screen">
          <div className="phone-topbar">
            <LogoImage className="phone-logo" />
            <div>
              <strong>Vroche</strong>
              <span>AI styling experience</span>
            </div>
          </div>

          <div className="phone-look-card">
            <div className="look-card-head">
              <span>Try-on</span>
              <small>Today</small>
            </div>
            <div className="look-preview">
              <div className="look-model-mini" />
            </div>
            <div className="look-swatches">
              <span />
              <span />
              <span />
            </div>
          </div>

          <div className="phone-metrics">
            <div><small>Closet</small><strong>128</strong><span>items</span></div>
            <div><small>Social</small><strong>+84%</strong><span>engagement</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionIntro() {
  const useCases = [
    "No sé qué ponerme hoy",
    "Quiero comprar mejor",
    "Tengo un evento y necesito ideas",
    "Quiero aprovechar más mi armario",
    "Voy de viaje y necesito outfits",
    "Quiero validar un look antes de salir",
  ];

  return (
    <section className="intro-section section-light">
      <div className="container intro-grid">
        <div>
          <SectionLabel>El problema</SectionLabel>
          <h2>Tenemos más ropa que nunca, pero decidimos peor.</h2>
        </div>
        <p>
          El usuario compra por impulso, repite outfits, olvida prendas que ya tiene y necesita inspiración visual
          inmediata. Vroche une moda, inteligencia artificial y experiencia social para resolver ese momento diario:
          “¿qué me pongo?”.
        </p>
      </div>
      <div className="container pill-row">
        {useCases.map((item) => <span key={item}>{item}</span>)}
      </div>
    </section>
  );
}

function SectionLabel({ children, dark = false }) {
  return (
    <div className={dark ? "section-label section-label-dark" : "section-label"}>
      <span />
      <p>{children}</p>
    </div>
  );
}

function ProductGrid() {
  return (
    <section id="product" className="product-section section-light">
      <div className="container narrow">
        <SectionLabel>Producto</SectionLabel>
        <h2>Una app de moda con cerebro tech.</h2>
        <p>
          Diseñada para que el usuario pase de la duda a la decisión: escanear, combinar, probar,
          compartir y comprar mejor.
        </p>
      </div>

      <div className="container product-grid">
        {productCards.map((card) => (
          <article key={card.title} className="product-card">
            <div className={card.accent === "coral" ? "product-icon coral" : "product-icon"}>
              <Icon type={card.icon} />
            </div>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function FashionScrollStory() {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    function update() {
      raf = 0;
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const total = rect.height - viewport;
      const raw = total > 0 ? -rect.top / total : 0;
      setProgress(clamp(raw, 0, 1));
    }
    function schedule() {
      if (!raf) raf = window.requestAnimationFrame(update);
    }
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  const stage = Math.min(featureSteps.length - 1, Math.floor(progress * featureSteps.length));
  const activeStep = featureSteps[stage];

  const garmentOpacity = {
    base: 1,
    top: smoothstep(0.08, 0.22, progress),
    skirt: smoothstep(0.25, 0.42, progress),
    jacket: smoothstep(0.45, 0.62, progress),
    bag: smoothstep(0.66, 0.8, progress),
    social: smoothstep(0.78, 0.94, progress),
  };

  return (
    <section id="story" className="story-section" ref={sectionRef}>
      <div className="story-sticky">
        <div className="story-left">
          <SectionLabel dark>Scroll experience</SectionLabel>
          <h2>Ves cómo Vroche viste una idea, capa a capa.</h2>
          <p>
            Según bajas, el look se construye: armario, IA, try-on y comunidad. La web no solo explica Vroche;
            lo enseña como una experiencia viva.
          </p>
          <div className="scroll-meter" aria-hidden="true">
            <span style={{ height: `${progress * 100}%` }} />
          </div>
        </div>

        <div className="fashion-stage" aria-label="Demo visual de Vroche vistiendo un look con el scroll">
          <div className="stage-halo" />
          <div className="wardrobe-rail rail-left">
            <span style={{ transform: `translateY(${lerp(60, -60, progress)}px)` }} />
            <span style={{ transform: `translateY(${lerp(90, -30, progress)}px)` }} />
            <span style={{ transform: `translateY(${lerp(130, 0, progress)}px)` }} />
          </div>
          <div className="wardrobe-rail rail-right">
            <span style={{ transform: `translateY(${lerp(-40, 70, progress)}px)` }} />
            <span style={{ transform: `translateY(${lerp(-20, 90, progress)}px)` }} />
            <span style={{ transform: `translateY(${lerp(10, 110, progress)}px)` }} />
          </div>

          <FashionModel opacity={garmentOpacity} />

          <div className="ai-bubble ai-bubble-a" style={{ opacity: smoothstep(0.1, 0.28, progress), transform: `translate3d(${lerp(-20, 0, smoothstep(0.1, 0.28, progress))}px, 0, 0)` }}>
            AI match · 94%
          </div>
          <div className="ai-bubble ai-bubble-b" style={{ opacity: smoothstep(0.48, 0.7, progress), transform: `translate3d(${lerp(20, 0, smoothstep(0.48, 0.7, progress))}px, 0, 0)` }}>
            Weather ready
          </div>
          <div className="social-proof" style={{ opacity: garmentOpacity.social }}>
            <span>♥ 248</span><span>Looks great</span><span>Try boots</span>
          </div>
        </div>

        <div className="story-right">
          <div className="step-counter">{String(stage + 1).padStart(2, "0")} / 04</div>
          <div className="story-card">
            <p className="story-kicker">{activeStep.kicker}</p>
            <h3>{activeStep.title}</h3>
            <p>{activeStep.body}</p>
            <div className="story-tags">
              {activeStep.stats.map((stat) => <span key={stat}>{stat}</span>)}
            </div>
          </div>
        </div>
      </div>

      <div className="story-mobile-fallback container">
        {featureSteps.map((step, index) => (
          <article key={step.title} className="story-mobile-card">
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function FashionModel({ opacity }) {
  return (
    <div className="fashion-model">
      <div className="model-shadow" />
      <div className="model-body">
        <div className="model-head" />
        <div className="model-hair" />
        <div className="model-neck" />
        <div className="model-torso" />
        <div className="model-arm model-arm-left" />
        <div className="model-arm model-arm-right" />
        <div className="model-leg model-leg-left" />
        <div className="model-leg model-leg-right" />
      </div>

      <div className="garment garment-top" style={{ opacity: opacity.top, transform: `translate(-50%, ${lerp(-20, 0, opacity.top)}px) scale(${lerp(0.92, 1, opacity.top)})` }} />
      <div className="garment garment-skirt" style={{ opacity: opacity.skirt, transform: `translate(-50%, ${lerp(18, 0, opacity.skirt)}px) scale(${lerp(0.95, 1, opacity.skirt)})` }} />
      <div className="garment garment-jacket" style={{ opacity: opacity.jacket, transform: `translate(-50%, ${lerp(-12, 0, opacity.jacket)}px) rotate(${lerp(-8, 0, opacity.jacket)}deg)` }} />
      <div className="garment garment-bag" style={{ opacity: opacity.bag, transform: `translate(${lerp(18, 0, opacity.bag)}px, ${lerp(-4, 0, opacity.bag)}px)` }} />
      <div className="garment garment-shoe garment-shoe-left" style={{ opacity: opacity.bag }} />
      <div className="garment garment-shoe garment-shoe-right" style={{ opacity: opacity.bag }} />
    </div>
  );
}

function ExperienceSection() {
  return (
    <section className="experience-section section-dark">
      <div className="container experience-grid">
        <div>
          <SectionLabel dark>Experiencia</SectionLabel>
          <h2>De inspiración a decisión en segundos.</h2>
          <p>
            Vroche no quiere ser otra carpeta de inspiración. Quiere ser el sistema operativo de tu estilo:
            contexto, armario, recomendaciones y visualización en una misma experiencia.
          </p>
        </div>

        <div className="experience-cards">
          {[
            ["Fast styling", "Looks generados al momento con criterios reales.", "spark"],
            ["Smart shopping", "Compra menos por impulso y más por encaje.", "bag"],
            ["Weather-aware", "Outfits adaptados al clima y al plan.", "calendar"],
            ["Social proof", "Feedback y comunidad para validar tus looks.", "social"],
          ].map(([title, text, icon]) => (
            <article key={title}>
              <Icon type={icon} />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function VisionSection() {
  return (
    <section id="vision" className="vision-section">
      <div className="container vision-grid">
        <div>
          <p className="vision-label">Visión Vroche</p>
          <h2>La nueva capa entre tu armario, tu identidad y la compra online.</h2>
        </div>
        <div className="vision-card">
          <p>
            Vroche nace para una generación que decide en móvil, se inspira en redes y espera experiencias visuales
            inmediatas. La oportunidad está en unir utilidad diaria, AI personalizada y moda digital con una marca aspiracional.
          </p>
          <div>
            <span><strong>Daily</strong><small>uso recurrente</small></span>
            <span><strong>Visual</strong><small>decisión rápida</small></span>
            <span><strong>Social</strong><small>viralidad natural</small></span>
          </div>
        </div>
      </div>
    </section>
  );
}

function WaitlistSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function submit(event) {
    event.preventDefault();
    if (!isValidWaitlistEmail(email)) return;
    setSubmitted(true);
  }

  return (
    <section id="waitlist" className="waitlist-section">
      <div className="waitlist-orb" />
      <div className="container waitlist-inner">
        <Badge><span className="badge-dot coral" /> EARLY ACCESS</Badge>
        <h2>Be one of the first to wear the future.</h2>
        <p>
          Estamos preparando los primeros testers de Vroche. Queremos usuarios con criterio, feedback honesto
          y ganas de construir una experiencia de moda realmente útil.
        </p>
        <form className="waitlist-form waitlist-form-bottom" onSubmit={submit}>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            placeholder="tuemail@ejemplo.com"
            aria-label="Correo electrónico"
          />
          <button type="submit">Join waitlist <Icon type="arrow" className="button-icon" /></button>
        </form>
        <p className="form-status bottom-status">
          {submitted ? `Gracias. ${email.trim()} está apuntado a la waitlist de Vroche.` : "Sin spam. Solo acceso, novedades clave y oportunidades para probar el producto antes del lanzamiento."}
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <LogoImage text className="footer-logo" />
        <p>AI fashion app · Virtual try-on · Smart closet · Social styling</p>
      </div>
    </footer>
  );
}

function App() {
  return (
    <main>
      <CursorLogoField />
      <HeroScene />
      <SectionIntro />
      <ProductGrid />
      <FashionScrollStory />
      <ExperienceSection />
      <VisionSection />
      <WaitlistSection />
      <Footer />
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);

export const __tests__ = {
  "isValidWaitlistEmail accepts valid email": () => isValidWaitlistEmail("test@vroche.app") === true,
  "isValidWaitlistEmail rejects invalid email": () => isValidWaitlistEmail("not-an-email") === false,
  "createLogoFieldItems returns requested number": () => createLogoFieldItems(12, 1).length === 12,
  "createLogoFieldItems keeps bounded positions": () => createLogoFieldItems(20, 7).every((item) => item.left >= 0 && item.left <= 100 && item.top >= 0 && item.top <= 100 && item.size > 0),
  "calculateLogoRotation returns neutral values when centered": () => {
    const rect = { left: 100, top: 100, width: 200, height: 200 };
    const result = calculateLogoRotation(200, 200, rect, 1200, 800);
    return Math.abs(result.rotateX) < 0.001 && Math.abs(result.rotateY) < 0.001;
  },
};
