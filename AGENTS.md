# GrowDoc LP Template — Astro

Este projeto é um template de landing page médica de alta performance baseado em **Astro**.

## Arquitetura

- **Zero JS por padrão**: todos os componentes `.astro` são HTML puro
- **React islands**: apenas `HeroForm` e `CookieBanner` carregam JavaScript
  - `HeroForm` usa `client:load` (above the fold, precisa ser imediato)
  - `CookieBanner` usa `client:idle` (below the fold, adiado)
- **Single source of truth**: todos os dados do cliente ficam em `src/config/client.ts`
- **Output estático**: `output: 'static'` para deploy no Cloudflare Pages

## Estrutura

```
src/
  config/
    client.ts        ← ÚNICO arquivo que você edita para um novo cliente
  components/
    HeroSection.astro
    HeroForm.tsx      ← React island (client:load)
    CookieBanner.tsx  ← React island (client:idle)
    LocationBar.astro
    DesiresSection.astro
    ServicesSection.astro
    TestimonialsSection.astro
    GallerySection.astro
    DoctorsSection.astro
    Footer.astro
  layouts/
    Layout.astro     ← GTM, fonts, meta tags
  pages/
    index.astro      ← Composição das seções
  styles/
    global.css       ← CSS variables + utm-form + btn-cta
public/
  images/            ← Imagens do cliente (logo, hero, galeria, médicos)
scripts/
  download-assets.mjs ← Helper para baixar assets remotos
```

## Iniciar novo projeto a partir deste template

1. Copie a pasta para `lps-clientes/<nome-cliente>/`
2. Edite **somente** `src/config/client.ts`
3. Adicione imagens em `public/images/`
4. `npm install && npm run build`

## CSS Variables (definidas em `global.css`)

| Variável       | Descrição                          |
|----------------|------------------------------------|
| `--lp-dark`    | Fundo escuro (seções dark)         |
| `--lp-gold`    | Cor de destaque dourada            |
| `--lp-cream`   | Fundo claro (seções light)         |
| `--lp-olive`   | Texto auxiliar                     |
| `--font-display` | Fonte de títulos (Cormorant Garamond por padrão) |
| `--font-body`  | Fonte de corpo (Montserrat por padrão) |

Para trocar fontes, basta alterar `fontsUrl` em `client.ts`. As variáveis `--font-display` e `--font-body` em `global.css` devem refletir as novas famílias.

## Deploy (Cloudflare Pages)

- Build command: `npm run build`
- Build output: `dist/`
- Node version: 18+

## Componentes disponíveis — carrosséis e interativos

| Componente | Como usar | Quando usar |
|---|---|---|
### Variantes de hero — escolha UMA por projeto

| Componente | Como usar | Quando usar |
|---|---|---|
| `HeroSection.astro` | `<HeroSection />` | Padrão — texto à esquerda + foto de fundo (`bg-hero.png`) |
| `HeroSplit.astro` | `<HeroSplit />` | Foto do médico de estúdio — 2 colunas: texto + foto recortada; requer `hero.photo` em client.ts |
| `HeroCentered.astro` | `<HeroCentered />` | Copy curta e impactante — tudo centralizado, fundo escuro sólido, sem foto de fundo |
| `HeroSlider.tsx` | `<HeroSlider client:load />` | Multi-slide com fade — requer `heroSlides[]` em client.ts |

### Seções de procedimentos — escolha UMA

| Componente | Como usar | Quando usar |
|---|---|---|
| `ServicesSection.astro` | `<ServicesSection />` | Cards em grid — visual premium com números; mobile scroll-snap |
| `ServicesTimeline.astro` | `<ServicesTimeline />` | Lista editorial com número grande e linha divisória — fundo escuro, visual mais minimalista |

### Seção de desejos/dores — escolha UMA

| Componente | Como usar | Quando usar |
|---|---|---|
| `DesiresSection.astro` | `<DesiresSection />` | Cards com numeração — padrão |
| `DesiresIcons.astro` | `<DesiresIcons />` | Cards com ícone SVG no topo — mais visual; campo `icon` opcional por item (SVG inline string) |

### Componentes de carrossel e interativos

| Componente | Como usar | Quando usar |
|---|---|---|
| `TestimonialsCarousel.tsx` | `<TestimonialsCarousel client:idle />` | Substitui `TestimonialsSection.astro` — autoplay 4s, dots, drag touch |
| `GalleryCarousel.tsx` | `<GalleryCarousel client:idle />` | Substitui `GallerySection.astro` — carrossel com lightbox, setas, dots |
| `ClinicaSection.tsx` | `<ClinicaSection client:idle />` | Seção da clínica — split layout info + carrossel de fotos com thumbnails; lê `locationSection` + `gallery.images` do client.ts |
| `HeroSlider.tsx` | `<HeroSlider client:load />` | Opcional — ativo quando `client.ts` define `heroSlides[]`; hero multi-slide com fade |
| `ServicesSection.astro` | `<ServicesSection />` | Desktop grid, mobile scroll-snap horizontal automático (zero JS) |
| `ProcessSection.astro` | `<ProcessSection />` | Timeline vertical numerada "Como Funciona" — lê `process` do client.ts |
| `BeforeAfterSection.astro` | `<BeforeAfterSection />` | Grid antes/depois com divisor dourado — lê `beforeAfter` do client.ts |
| `FaqSection.astro` | `<FaqSection />` | Accordion de perguntas frequentes com `<details>/<summary>` — zero JS — lê `faq` do client.ts |
| `MapSection.astro` | `<MapSection />` | Endereço + iframe do Google Maps — lê `mapSection` do client.ts |

### Campos obrigatórios em client.ts por componente

**ProcessSection** — requer `process`:
```ts
process: {
  eyebrow: string, heading: string, headingEm?: string,
  steps: [{ num: string, title: string, description: string }]
}
```

**BeforeAfterSection** — requer `beforeAfter`:
```ts
beforeAfter: {
  eyebrow: string, heading: string, headingEm?: string, disclaimer?: string,
  items: [{ label: string, beforeSrc: string, afterSrc: string, beforeAlt?: string, afterAlt?: string }]
}
```

**FaqSection** — requer `faq`:
```ts
faq: { eyebrow: string, heading: string, items: [{ question: string, answer: string }] }
```

**MapSection** — requer `mapSection`:
```ts
mapSection: {
  eyebrow: string, heading: string, address: string, complement?: string,
  schedule?: string, phone?: string,
  mapsUrl: string,    // link para abrir no app Maps
  mapsEmbed: string,  // src do iframe (Compartilhar → Incorporar no Google Maps)
}
```

**ClinicaSection** — requer `locationSection`:
```ts
locationSection: {
  eyebrow: string,       // ex: 'Nossa Estrutura'
  heading: string,       // ex: 'Conheça a Clínica Neviani'
  locations: [{
    city: string,        // ex: 'Goiânia, GO'
    name: string,        // nome da clínica
    address: string,     // endereço completo
    description: string, // texto livre sobre o espaço
  }],
  stats?: [{ value: string, label: string }], // até 4 diferenciais rápidos
}
```

## Sistema de animações de scroll

Adicione `.reveal` a qualquer elemento para fade-in ao entrar na viewport. **Nunca usar above-the-fold.**

```astro
<div class="reveal">conteúdo que anima</div>
```

Para animar filhos em sequência (stagger de 100ms):
```astro
<div class="reveal-list">
  <div>item 1</div>
  <div>item 2</div>
  <div>item 3</div>
</div>
```

Micro-animações já incluídas automaticamente:
- `.lp-card-lift` — hover lift 4px
- `.btn-cta` — pulse dourado 3s
- `.doctor-photo-wrap` — hover scale 1.03 na foto
