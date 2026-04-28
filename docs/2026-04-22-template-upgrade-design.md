# Template Upgrade — Carrosséis, Animações e Visual Refresh

**Data:** 2026-04-22
**Status:** Aprovado

## Objetivo

Elevar o lp-template-astro de um template funcional para um sistema de componentes premium, capaz de gerar LPs com visual de tirar o fôlego e PageSpeed ≥ 95.

---

## Restrições inegociáveis

- PageSpeed mobile ≥ 95 (Lighthouse performance)
- Zero layout shift (CLS = 0)
- Nada animado above-the-fold (protege LCP)
- Carrosséis só carregam após página interativa (`client:idle`)
- Sem dependências JS pesadas (Swiper, GSAP completo, etc.)

---

## 1. Biblioteca de carrossel: Embla Carousel

**Por quê Embla:** 3.5KB gzipped, zero dependências, touch/drag nativo, API simples. Usada como React island com `client:idle`.

Instalar: `npm install embla-carousel-react embla-carousel-autoplay`

---

## 2. Componentes atualizados/criados

### 2a. TestimonialsCarousel.tsx (substitui TestimonialsSection.astro)

- Embla com `client:idle`
- Autoplay 4s, pause on hover
- Dots de navegação clicáveis
- Drag/swipe no mobile
- Dados de `client.ts > testimonials[]`
- Fade-in sequencial dos dots via CSS

### 2b. GalleryCarousel.tsx (substitui GallerySection.astro)

- Embla com `client:idle`
- Slides full-width com imagem + overlay escuro sutil + caption opcional
- Lightbox ao clicar: imagem ampliada com fundo escurecido, fechar por ESC ou clique fora
- Navegação por setas e dots
- Dados de `client.ts > gallery.images[]`

### 2c. HeroSlider.tsx (novo — opcional)

- Hero com múltiplos slides: cada slide tem `bg-image` + overlay gradiente + headline + CTA
- Autoplay 6s (mais lento — hero é âncora visual, não deve distrair)
- Transição fade entre slides (não slide lateral — mais elegante)
- `client:load` (above-the-fold, deve estar pronto imediatamente)
- Dados de `client.ts > heroSlides[]` (novo campo opcional)
- Fallback: se `heroSlides` não existir, renderiza HeroSection estático normal

### 2d. ServicesSection.astro (atualizado)

- Desktop: grid 2×3 ou 3×2 (sem mudança)
- Mobile: scroll horizontal com CSS scroll-snap (zero JS)
- Indicador visual "arraste →" só no mobile, some após primeiro scroll

---

## 3. Sistema de animações

### Scroll reveal global

Script inline em `Layout.astro` (~15 linhas, sem dependência):

```js
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('reveal--visible');
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
```

CSS em `global.css`:
```css
.reveal {
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.reveal--visible { opacity: 1; transform: none; }

/* Escalonamento automático em listas */
.reveal-list > *:nth-child(1) { transition-delay: 0ms; }
.reveal-list > *:nth-child(2) { transition-delay: 100ms; }
.reveal-list > *:nth-child(3) { transition-delay: 200ms; }
.reveal-list > *:nth-child(4) { transition-delay: 300ms; }
.reveal-list > *:nth-child(5) { transition-delay: 400ms; }
```

Cada componente adiciona `.reveal` nos elementos que devem animar. **Nunca em elementos above-the-fold.**

### Micro-animações (CSS puro)

| Elemento | CSS |
|---|---|
| Cards hover | `transform: translateY(-4px)` + `box-shadow` — 250ms ease |
| CTA button hover | `scale(1.02)` + brilho no background |
| CTA button pulse | `@keyframes pulse-ring` — anel dourado pulsa a cada 3s |
| Foto do médico hover | `scale(1.03)` suave — 300ms ease |
| Linha dourada heading | `::before` com `width: 0 → 3rem` quando `.reveal--visible` — 600ms ease |

### Gradiente hero animado

```css
@keyframes hero-drift {
  0%, 100% { background-position: 50% 50%; }
  50%       { background-position: 52% 48%; }
}
.lp-hero-section {
  animation: hero-drift 30s ease-in-out infinite;
}
```
30s cycle — imperceptível, dá sensação de vivo.

---

## 4. Visual refresh (CSS only)

### Tipografia
```css
.lp-eyebrow {
  letter-spacing: 0.15em;
  text-transform: uppercase;
  font-size: 0.75rem;
}
.lp-section-heading {
  line-height: 1.1;  /* era ~1.4 */
}
.lp-body-text {
  max-width: 65ch;
}
```

### Espaçamentos responsivos
```css
:root {
  --lp-section-py: clamp(5rem, 10vw, 9rem);
  --lp-gap: clamp(1.5rem, 3vw, 2.5rem);
}
```

### Overlay gradiente no hero
```css
.lp-hero-section::after {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%);
  pointer-events: none;
}
```

### Linha dourada decorativa
```css
.lp-section-heading::before {
  content: '';
  display: block;
  width: 0;
  height: 2px;
  background: var(--lp-gold);
  margin-bottom: 1rem;
  transition: width 0.6s ease;
}
.reveal--visible .lp-section-heading::before { width: 3rem; }
```

### Cards
```css
.lp-card-lift {
  border: 1px solid rgba(var(--lp-gold-rgb), 0.2);
  transition: transform 250ms ease, box-shadow 250ms ease;
}
.lp-card-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0,0,0,0.12);
}
```

---

## 5. Atualização do client.ts

Adicionar campo opcional para HeroSlider:

```ts
// Opcional — se definido, ativa HeroSlider em vez de HeroSection estático
heroSlides?: {
  image: string;        // /images/slide-1.jpg
  headingLines: string[];
  ctaText: string;
}[];
```

---

## 6. Atualização do AGENTS.md

Documentar os novos componentes disponíveis para que o agente LP Builder saiba quando usar cada um.

---

## O que NÃO muda

- HeroForm.tsx — lógica de captura intocada
- CookieBanner.tsx — intocado
- Estrutura de pastas e convenção de nomes
- CSS variables existentes (só adições)
- `output: 'static'` no astro.config.mjs
