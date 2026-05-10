# Vroche — Landing Page (v2)

Landing editorial fashion-tech para Vroche. Premium, joven, AI-first.
React + Vite + Tailwind + animaciones nativas (sin librerías pesadas).

## Estructura

```
src/
├─ App.jsx                  # composición principal
├─ main.jsx                 # entry point
├─ constants.js             # brand, logos, datos legales
├─ hooks.js                 # useReveal, useMousePosition, useSectionScrollProgress
├─ index.css                # estilos globales + animaciones + tipografía editorial
│
├─ components/
│  ├─ NavBar.jsx            # nav fija + menú móvil
│  ├─ Footer.jsx            # footer + marquee
│  ├─ CookieBanner.jsx      # consent RGPD
│  ├─ icons.jsx             # iconos SVG inline (sin lucide ni libs)
│  ├─ Garments.jsx          # SVGs de prendas (top, pants, bag, etc.)
│  └─ UI.jsx                # Eyebrow, Tag, Badge, ScrollProgressBar
│
├─ sections/
│  ├─ Hero.jsx              # 01 · hero con cursor-reveal de logos
│  ├─ Manifest.jsx          # 02 · problema (claro)
│  ├─ ScrollStory.jsx       # 03 · sticky flat-lay editorial ⭐
│  ├─ Product.jsx           # 04 · grid de features (claro)
│  ├─ Community.jsx         # 05 · feed social (oscuro)
│  ├─ Vision.jsx            # 06 · vision statement (cream)
│  └─ Download.jsx          # 07 · CTA final (oscuro)
│
└─ legal/
   └─ LegalModal.jsx        # privacy, terms, legal notice, cookies
```

## Run local

```bash
npm install
npm run dev
```

## Build producción

```bash
npm run build
```

Genera la carpeta `dist/`. Deploy directo en Vercel, Netlify, Cloudflare Pages.

## Notas técnicas

- **Sin librerías de iconos**: todos los iconos son SVGs inline para evitar dependencias.
- **Sin imágenes externas más allá de los logos**: las prendas son SVGs custom.
- **Animaciones nativas**: solo CSS keyframes + Intersection Observer + useScrollProgress.
- **framer-motion** está incluido pero sin uso obligatorio (puedes usarlo si extiendes la web).
- **A11y**: respeta `prefers-reduced-motion`, focus rings, alt en logos, aria-labels.
- **Mobile-first**: clamp() en displays, breakpoint sm/md/lg, menú móvil overlay.
