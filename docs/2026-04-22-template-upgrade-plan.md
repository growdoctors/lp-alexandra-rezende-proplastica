# Template Upgrade — Carrosséis, Animações e Visual Refresh

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Elevar o lp-template-astro com carrosséis (Embla), scroll reveal elegante, micro-animações CSS e visual refresh — mantendo PageSpeed ≥ 95.

**Architecture:** Carrosséis como React islands com `client:idle` (nunca bloqueiam render). Animações via IntersectionObserver inline + CSS puro. Nenhum JS above-the-fold. Visual refresh apenas em CSS — sem novas imagens nem fontes.

**Tech Stack:** Astro 5, React 19, Embla Carousel + embla-carousel-autoplay, CSS custom properties, IntersectionObserver API.

---

> **⚠️ Nunca alterar:**
> - `HeroForm.tsx` — lógica de captura
> - `CookieBanner.tsx`
> - Scripts GTM/UTM/scroll em `Layout.astro`
> - Estrutura de `client.ts` existente (só adicionar campo opcional)

---

### Task 1: Instalar Embla Carousel

**Files:**
- Modify: `package.json`

**Step 1: Instalar dependências**

```bash
cd /Users/paulo/Documents/PROGRAMAS/growdoc/lp-template-astro
npm install embla-carousel-react embla-carousel-autoplay
```

Expected: sem erros, `package.json` atualizado com as duas dependências.

**Step 2: Verificar build**

```bash
npm run build
```

Expected: `dist/` gerado sem erros.

**Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install embla-carousel-react and embla-carousel-autoplay"
```

---

### Task 2: Sistema de scroll reveal — global.css + Layout.astro

**Files:**
- Modify: `src/styles/global.css`
- Modify: `src/layouts/Layout.astro`

**Step 1: Adicionar ao `global.css`** — após o bloco `/* KEYFRAMES */`, antes do bloco UTM FORM:

```css
/* ============================================================
   SCROLL REVEAL
   Adicione .reveal em qualquer elemento para animação de entrada.
   NUNCA usar em elementos above-the-fold.
   ============================================================ */
.reveal {
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.6s ease, transform 0.6s ease;
  will-change: opacity, transform;
}
.reveal--visible {
  opacity: 1;
  transform: none;
}

/* Escalonamento automático em listas filhas */
.reveal-list > *       { opacity: 0; transform: translateY(18px); transition: opacity 0.6s ease, transform 0.6s ease; }
.reveal-list--visible > *:nth-child(1) { opacity: 1; transform: none; transition-delay: 0ms; }
.reveal-list--visible > *:nth-child(2) { opacity: 1; transform: none; transition-delay: 100ms; }
.reveal-list--visible > *:nth-child(3) { opacity: 1; transform: none; transition-delay: 200ms; }
.reveal-list--visible > *:nth-child(4) { opacity: 1; transform: none; transition-delay: 300ms; }
.reveal-list--visible > *:nth-child(5) { opacity: 1; transform: none; transition-delay: 400ms; }
.reveal-list--visible > *:nth-child(n+6) { opacity: 1; transform: none; transition-delay: 500ms; }

/* ============================================================
   MICRO-ANIMAÇÕES
   ============================================================ */

/* Cards hover lift */
.lp-card-lift {
  transition: transform 250ms ease, box-shadow 250ms ease;
}
.lp-card-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(0,0,0,0.12);
}

/* CTA button pulse */
@keyframes cta-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(196,163,110,0.4); }
  50%       { box-shadow: 0 0 0 10px rgba(196,163,110,0); }
}
.btn-cta {
  animation: cta-pulse 3s ease-in-out infinite;
}
.btn-cta:hover {
  transform: scale(1.02);
  animation: none;
}

/* Linha dourada animada em headings */
@keyframes gold-line-grow {
  from { width: 0; }
  to   { width: 3rem; }
}
.lp-gold-rule-animated {
  display: block;
  height: 2px;
  background: var(--lp-gold);
  width: 0;
  margin: 1rem auto 0;
  transition: width 0.6s ease 0.3s;
}
.reveal--visible .lp-gold-rule-animated,
.reveal-list--visible .lp-gold-rule-animated {
  width: 3rem;
}

/* Hero bg drift — muito sutil, 30s cycle */
@keyframes hero-drift {
  0%, 100% { background-position: 50% 50%; }
  50%       { background-position: 52% 48%; }
}
```

**Step 2: Adicionar IntersectionObserver ao `Layout.astro`**

Localizar o comentário `<!-- UTM Propagator -->` em `Layout.astro`. Adicionar o script ANTES dele:

```astro
<!-- Scroll reveal -->
<script is:inline>
  (function(){
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(!e.isIntersecting)return;
        var el=e.target;
        el.classList.add('reveal--visible');
        if(el.classList.contains('reveal-list'))el.classList.add('reveal-list--visible');
        io.unobserve(el);
      });
    },{threshold:0.12,rootMargin:'0px 0px -40px 0px'});
    function init(){
      document.querySelectorAll('.reveal,.reveal-list').forEach(function(el){io.observe(el);});
    }
    if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',init);}
    else{init();}
  })();
</script>
```

**Step 3: Build para confirmar sem erros**

```bash
npm run build
```

Expected: sem erros, `dist/` gerado.

**Step 4: Commit**

```bash
git add src/styles/global.css src/layouts/Layout.astro
git commit -m "feat: add scroll reveal system and micro-animations CSS"
```

---

### Task 3: Visual refresh — tipografia, espaçamentos, cards

**Files:**
- Modify: `src/styles/global.css`

**Step 1: Adicionar ao `global.css`** — ao final do arquivo, antes de qualquer `/* UTM */` que venha depois:

```css
/* ============================================================
   VISUAL REFRESH
   ============================================================ */

/* Tipografia */
.lp-eyebrow {
  letter-spacing: 0.15em !important;
  font-size: 0.72rem !important;
  text-transform: uppercase;
}

.lp-section-heading {
  line-height: 1.1 !important;
}

/* Espaçamentos responsivos */
:root {
  --lp-section-py: clamp(5rem, 10vw, 9rem);
  --lp-gap: clamp(1.5rem, 3vw, 2.5rem);
}

.lp-section-pad {
  padding-block: var(--lp-section-py) !important;
}

/* Hero overlay para legibilidade sobre qualquer foto */
.lp-hero-section {
  position: relative;
  animation: hero-drift 30s ease-in-out infinite;
}
.lp-hero-section::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%);
  pointer-events: none;
  z-index: 1;
}
.lp-hero-section > * {
  position: relative;
  z-index: 2;
}

/* Cards border refinado */
.lp-card-lift {
  border: 1px solid rgba(196,163,110,0.2) !important;
}

/* Foto do médico hover */
.doctor-photo-wrap {
  overflow: hidden;
  border-radius: 12px;
}
.doctor-photo-wrap img {
  transition: transform 300ms ease;
}
.doctor-photo-wrap:hover img {
  transform: scale(1.03);
}
```

**Step 2: Build**

```bash
npm run build
```

Expected: sem erros.

**Step 3: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: visual refresh — typography, spacing, hero overlay, card hover"
```

---

### Task 4: TestimonialsCarousel.tsx

**Files:**
- Create: `src/components/TestimonialsCarousel.tsx`
- (TestimonialsSection.astro permanece — é substituído no index.astro na Task 9)

**Step 1: Criar o componente**

```tsx
// src/components/TestimonialsCarousel.tsx
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useCallback, useEffect, useState } from 'react';
import { CLIENT } from '@/config/client';

const WA_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function TestimonialsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay({ delay: 4000, stopOnInteraction: true })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    onSelect();
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi, onSelect]);

  return (
    <section style={{ backgroundColor: 'var(--lp-dark)', paddingBlock: 'var(--lp-section-py, 6rem)' }}>
      <div className="lp-section-inner">
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="lp-eyebrow" style={{ color: 'var(--lp-gold)' }}>Depoimentos</span>
          <h2 className="lp-section-heading" style={{ fontSize: 'clamp(28px,3.5vw,42px)', color: '#fff', textAlign: 'center', marginTop: '8px' }}>
            O que nossos pacientes dizem
          </h2>
          <div className="lp-gold-rule-animated" />
        </div>

        <div style={{ overflow: 'hidden', marginBottom: '32px' }} ref={emblaRef}>
          <div style={{ display: 'flex', gap: '20px' }}>
            {CLIENT.testimonials.map((t, i) => (
              <div
                key={i}
                style={{
                  flex: '0 0 calc(33.333% - 14px)',
                  minWidth: '280px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(196,163,110,0.15)',
                  borderRadius: '20px',
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <div style={{ color: 'var(--lp-gold)', fontSize: '14px', letterSpacing: '2px' }}>★★★★★</div>
                <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#fff', margin: 0 }}>{t.title}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, margin: 0, flex: 1 }}>{t.body}</p>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: 'var(--lp-gold)' }}>{t.author}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '48px' }}>
          {scrollSnaps.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Depoimento ${i + 1}`}
              style={{
                width: i === selectedIndex ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: i === selectedIndex ? 'var(--lp-gold)' : 'rgba(196,163,110,0.3)',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'width 300ms ease, background 300ms ease',
              }}
            />
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <a href="#utmCaptureForm" className="btn-cta" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            {WA_ICON} AGENDAR CONSULTA
          </a>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Build**

```bash
npm run build
```

Expected: sem erros TypeScript.

**Step 3: Commit**

```bash
git add src/components/TestimonialsCarousel.tsx
git commit -m "feat: add TestimonialsCarousel with Embla, autoplay and dot navigation"
```

---

### Task 5: GalleryCarousel.tsx

**Files:**
- Create: `src/components/GalleryCarousel.tsx`

**Step 1: Criar o componente**

```tsx
// src/components/GalleryCarousel.tsx
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useCallback, useEffect, useState } from 'react';
import { CLIENT } from '@/config/client';

const { gallery } = CLIENT;

const WA_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function GalleryCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay({ delay: 5000, stopOnInteraction: true })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [lightbox, setLightbox] = useState<string | null>(null);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    onSelect();
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLightbox(null); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <section style={{ backgroundColor: 'var(--lp-cream)', paddingBlock: 'var(--lp-section-py, 6rem)' }}>
      <div className="lp-section-inner">
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span className="lp-eyebrow" style={{ color: 'var(--lp-olive)' }}>{gallery.eyebrow}</span>
          <h2 className="lp-section-heading" style={{ fontSize: 'clamp(28px,3.5vw,42px)', color: 'var(--lp-dark)', textAlign: 'center', marginTop: '8px' }}>
            {gallery.heading}
          </h2>
          {gallery.description && (
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: 'var(--lp-olive)', textAlign: 'center', maxWidth: '600px', margin: '16px auto 0', lineHeight: 1.7 }}>
              {gallery.description}
            </p>
          )}
          <div className="lp-gold-rule-animated" />
        </div>

        <div style={{ overflow: 'hidden', marginBottom: '32px', borderRadius: '16px' }} ref={emblaRef}>
          <div style={{ display: 'flex', gap: '12px' }}>
            {gallery.images.map((img, i) => (
              <div
                key={i}
                style={{ flex: '0 0 calc(33.333% - 8px)', minWidth: '240px', position: 'relative', cursor: 'pointer', borderRadius: '12px', overflow: 'hidden' }}
                onClick={() => setLightbox(img.src)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  decoding="async"
                  style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block', transition: 'transform 400ms ease' }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 60%)', pointerEvents: 'none' }} />
              </div>
            ))}
          </div>
        </div>

        {/* Setas + dots */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '48px' }}>
          <button onClick={() => emblaApi?.scrollPrev()} aria-label="Anterior" style={{ background: 'transparent', border: '1px solid rgba(196,163,110,0.4)', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', color: 'var(--lp-gold)', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>←</button>
          {scrollSnaps.map((_, i) => (
            <button key={i} onClick={() => emblaApi?.scrollTo(i)} aria-label={`Imagem ${i + 1}`}
              style={{ width: i === selectedIndex ? '24px' : '8px', height: '8px', borderRadius: '4px', background: i === selectedIndex ? 'var(--lp-gold)' : 'rgba(196,163,110,0.3)', border: 'none', cursor: 'pointer', padding: 0, transition: 'width 300ms ease, background 300ms ease' }} />
          ))}
          <button onClick={() => emblaApi?.scrollNext()} aria-label="Próximo" style={{ background: 'transparent', border: '1px solid rgba(196,163,110,0.4)', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', color: 'var(--lp-gold)', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>→</button>
        </div>

        <div style={{ textAlign: 'center' }}>
          <a href="#utmCaptureForm" className="btn-cta" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            {WA_ICON} AGENDAR CONSULTA
          </a>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, cursor: 'pointer', padding: '24px' }}
        >
          <img src={lightbox} alt="Galeria ampliada" style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain', borderRadius: '8px' }} onClick={e => e.stopPropagation()} />
          <button onClick={() => setLightbox(null)} aria-label="Fechar" style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', color: '#fff', fontSize: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
        </div>
      )}
    </section>
  );
}
```

**Step 2: Build**

```bash
npm run build
```

Expected: sem erros.

**Step 3: Commit**

```bash
git add src/components/GalleryCarousel.tsx
git commit -m "feat: add GalleryCarousel with Embla, lightbox and arrow navigation"
```

---

### Task 6: HeroSlider.tsx (componente opcional)

**Files:**
- Create: `src/components/HeroSlider.tsx`

**Step 1: Criar o componente**

```tsx
// src/components/HeroSlider.tsx
// Componente opcional — ativo quando client.ts define heroSlides[]
// Substitui HeroSection.astro quando múltiplos slides são necessários
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useCallback, useEffect, useState } from 'react';
import { CLIENT } from '@/config/client';
import HeroForm from './HeroForm';

type HeroSlide = { image: string; headingLines: string[]; ctaText: string };

const slides: HeroSlide[] = (CLIENT as any).heroSlides ?? [];

export default function HeroSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 6000, stopOnInteraction: true })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (emblaApi) setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi, onSelect]);

  if (!slides.length) return null;

  return (
    <section id="hero" style={{ position: 'relative', minHeight: '100svh', overflow: 'hidden' }}>
      {/* Slides de fundo */}
      <div style={{ position: 'absolute', inset: 0 }} ref={emblaRef}>
        <div style={{ display: 'flex', height: '100%' }}>
          {slides.map((slide, i) => (
            <div
              key={i}
              style={{
                flex: '0 0 100%',
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: i === selectedIndex ? 1 : 0,
                transition: 'opacity 1s ease',
                position: 'absolute',
                inset: 0,
              }}
            />
          ))}
        </div>
      </div>

      {/* Overlay */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)', zIndex: 1 }} />

      {/* Conteúdo */}
      <div className="lp-section-inner" style={{ position: 'relative', zIndex: 2, minHeight: '100svh', display: 'flex', alignItems: 'center', paddingBlock: '6rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center', width: '100%' }}>
          <div>
            {slides[selectedIndex]?.headingLines.map((line, i) => (
              <h1 key={i} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#fff', lineHeight: 1.1, margin: 0 }}>
                {line}
              </h1>
            ))}
            {CLIENT.doctors[0]?.credentials?.slice(0, 1).map((c, i) => (
              <p key={i} style={{ color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-body)', fontSize: '14px', marginTop: '1.5rem' }}>{c}</p>
            ))}
            {/* Dots */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '2rem' }}>
              {slides.map((_, i) => (
                <button key={i} onClick={() => emblaApi?.scrollTo(i)} aria-label={`Slide ${i + 1}`}
                  style={{ width: i === selectedIndex ? '24px' : '8px', height: '8px', borderRadius: '4px', background: i === selectedIndex ? 'var(--lp-gold)' : 'rgba(255,255,255,0.4)', border: 'none', cursor: 'pointer', padding: 0, transition: 'width 300ms ease, background 300ms ease' }} />
              ))}
            </div>
          </div>
          <div>
            <HeroForm />
          </div>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Build**

```bash
npm run build
```

Expected: sem erros.

**Step 3: Commit**

```bash
git add src/components/HeroSlider.tsx
git commit -m "feat: add optional HeroSlider component for multi-slide heroes"
```

---

### Task 7: ServicesSection.astro — mobile scroll-snap

**Files:**
- Modify: `src/components/ServicesSection.astro`

**Step 1: Adicionar `.services-scroll-mobile` ao markup**

Substituir `<div class="lp-grid-3" style="margin-bottom:48px">` por:

```astro
<div class="services-scroll-mobile lp-grid-3 reveal-list" style="margin-bottom:48px">
```

**Step 2: Adicionar CSS no `<style>` do componente**

```css
@media (max-width: 768px) {
  .services-scroll-mobile {
    display: flex !important;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    gap: 16px;
    padding-bottom: 16px;
    /* scrollbar invisível mas funcional */
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  .services-scroll-mobile::-webkit-scrollbar { display: none; }
  .services-scroll-mobile .service-card {
    flex: 0 0 80%;
    scroll-snap-align: start;
  }
}
```

**Step 3: Adicionar `.reveal` ao header da seção**

```astro
<div class="reveal" style="text-align:center;margin-bottom:48px">
```

**Step 4: Build**

```bash
npm run build
```

Expected: sem erros.

**Step 5: Commit**

```bash
git add src/components/ServicesSection.astro
git commit -m "feat: services mobile horizontal scroll-snap and reveal animation"
```

---

### Task 8: Adicionar .reveal aos componentes existentes

**Files:**
- Modify: `src/components/DesiresSection.astro`
- Modify: `src/components/DoctorsSection.astro`
- Modify: `src/components/TestimonialsSection.astro`

Para cada componente, adicionar a classe `reveal` no wrapper do heading e `reveal-list` no grid de cards:

**DesiresSection.astro:**
- Header div: adicionar `class="reveal"`
- Grid de items: adicionar `class="... reveal-list"`

**DoctorsSection.astro:**
- Header div: adicionar `class="reveal"`
- Grid de médicos: adicionar `class="... reveal-list"`

**TestimonialsSection.astro:**
- Header div: adicionar `class="reveal"`
- Grid de cards: adicionar `class="... reveal-list"`

**Step: Build e commit**

```bash
npm run build
git add src/components/DesiresSection.astro src/components/DoctorsSection.astro src/components/TestimonialsSection.astro
git commit -m "feat: add scroll reveal classes to section components"
```

---

### Task 9: Atualizar index.astro para usar novos componentes

**Files:**
- Modify: `src/pages/index.astro`

**Step 1: Substituir imports**

```astro
---
import TestimonialsCarousel from '@/components/TestimonialsCarousel';
import GalleryCarousel from '@/components/GalleryCarousel';
// remover: import TestimonialsSection from '@/components/TestimonialsSection.astro';
// remover: import GallerySection from '@/components/GallerySection.astro';
---
```

**Step 2: No template, substituir**

- `<TestimonialsSection />` → `<TestimonialsCarousel client:idle />`
- `<GallerySection />` → `<GalleryCarousel client:idle />`

**Step 3: Build**

```bash
npm run build
```

Expected: sem erros, `dist/` gerado com os novos componentes.

**Step 4: Testar visualmente em dev**

```bash
npm run dev
```

Acessar `http://localhost:4321` e verificar:
- [ ] Depoimentos: carrossel funciona, autoplay a cada 4s, dots clicáveis
- [ ] Galeria: carrossel funciona, lightbox abre ao clicar, fecha com ESC
- [ ] Serviços mobile: scroll horizontal suave
- [ ] Animações reveal: elementos below-the-fold aparecem ao rolar
- [ ] Hero: overlay gradiente visível, drift muito sutil
- [ ] CTA buttons: pulse dourado sutil
- [ ] Cards hover: lift de 4px suave

**Step 5: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: use TestimonialsCarousel and GalleryCarousel in index.astro"
```

---

### Task 10: Atualizar client.ts com tipo heroSlides

**Files:**
- Modify: `src/config/client.ts`

**Step 1: Adicionar campo opcional ao final do objeto CLIENT** (antes do `} as const`):

```ts
  // Opcional — se definido, ativa HeroSlider em vez de HeroSection estático
  // heroSlides: [
  //   { image: '/images/slide-1.jpg', headingLines: ['Linha 1', 'Linha 2'], ctaText: 'Agendar' },
  // ],
```

**Step 2: Commit**

```bash
git add src/config/client.ts
git commit -m "docs: add heroSlides comment to client.ts for HeroSlider usage"
```

---

### Task 11: Atualizar AGENTS.md com novos componentes

**Files:**
- Modify: `AGENTS.md`

**Step 1: Adicionar seção de novos componentes**

Adicionar após a seção de estrutura existente:

```markdown
## Componentes disponíveis (carrosséis e interativos)

| Componente | Tipo | Uso |
|---|---|---|
| `TestimonialsCarousel.tsx` | React island `client:idle` | Substitui TestimonialsSection quando há depoimentos — autoplay 4s, dots, drag |
| `GalleryCarousel.tsx` | React island `client:idle` | Substitui GallerySection — carrossel com lightbox ao clicar |
| `HeroSlider.tsx` | React island `client:load` | Opcional — ativa quando `client.ts` define `heroSlides[]`; hero multi-slide com fade |
| `ServicesSection.astro` | Estático | Desktop grid, mobile scroll-snap horizontal automático |

## Sistema de animações

- Adicione `.reveal` a qualquer elemento para fade-in ao entrar na viewport (nunca above-the-fold)
- Adicione `.reveal-list` a um container para fade-in escalonado dos filhos
- Micro-animações já incluídas: hover lift em `.lp-card-lift`, pulse em `.btn-cta`, drift no hero
```

**Step 2: Build final**

```bash
npm run build
```

Expected: build limpo.

**Step 3: Push**

```bash
git add AGENTS.md
git commit -m "docs: update AGENTS.md with carousel components and animation system"
git push origin main
```

---

## Validação de PageSpeed

Após deploy, rodar PageSpeed Insights na URL do Pages:

- Performance mobile ≥ 95
- LCP < 2.5s
- CLS = 0
- TBT < 200ms

Se performance cair abaixo de 95:
1. Verificar se algum carrossel está com `client:load` em vez de `client:idle`
2. Verificar se alguma animação está aplicada em elementos above-the-fold
3. Verificar tamanho do bundle JS: `du -sh dist/_astro/*.js`
