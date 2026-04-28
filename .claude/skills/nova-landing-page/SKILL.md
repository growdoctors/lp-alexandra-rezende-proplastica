---
name: nova-landing-page
description: "Cria ou adapta landing pages GrowDoc seguindo o padrão do template oficial. Cenário A: novo projeto a partir de briefing. Cenário B: site já codado para migrar ao padrão."
---

# Skill: nova-landing-page

Cria ou adapta landing pages GrowDoc seguindo o padrão do template oficial.
Lida com dois cenários: (A) novo projeto a partir de briefing/cópia, ou (B) site já codado que precisa ser migrado para o padrão.

Template oficial (Astro): **github.com/growdoctors/lp-template-astro**
Template legado (Next.js): **github.com/growdoctors/lp-template**

---

## Como invocar

```
/nova-landing-page
```

O Claude detecta automaticamente o cenário pelo contexto da conversa ou pergunta ao usuário.

---

## Detecção de cenário

Antes de qualquer ação, identifique em qual situação você está:

**Cenário A — Novo projeto a partir de briefing**
- O usuário está começando do zero
- Forneceu cópia (textos), identidade visual, logo, fotos
- Ainda não existe código
→ Use o template **Astro** (`lp-template-astro`)

**Cenário B — Site já codado para adaptar**
- Existe um projeto Next.js ou HTML/CSS já desenvolvido
- O usuário quer migrar esse código para seguir o padrão GrowDoc LP
- O CWD provavelmente já é o projeto existente
→ Adapte o projeto existente ao padrão GrowDoc

Se não estiver claro, pergunte: "Você está criando do zero ou quer adaptar um site já existente?"

---

## Por que Astro?

O template Astro entrega performance superior:
- **Zero JS por padrão** — todos os componentes `.astro` são HTML puro
- **Apenas 2 React islands** — `HeroForm` (`client:load`) e `CookieBanner` (`client:idle`)
- **LCP mobile < 2s**, Lighthouse ≥ 95 out-of-the-box
- **Build leve** — `dist/` com ~20KB de JS total vs ~150KB no Next.js
- **RAM dev ~80MB** vs 500MB+ do Next.js com Turbopack

---

## CENÁRIO A: Novo projeto a partir de briefing

### A1. Coletar materiais do usuário

Antes de escrever qualquer código, você precisa de:

**Identidade e integração (obrigatório):**
- Nome da clínica
- Slug do projeto (ex: `aurium`, `trindade`) — para pasta e repo
- ID do GTM (ex: `GTM-XXXXXXX`)
- URL do webhook (padrão: `https://webhooks02.manager01.growdoc.com.br/webhook/redirect-global`)
- Subdomínio Cloudflare Pages (ex: `aurium.grow.growdoc.com.br`)

**Identidade visual:**
- Paleta de cores (primária, secundária, background, texto) — pedir hex
- Tipografia — URL do Google Fonts desejada, ou usar padrão (Cormorant Garamond + Montserrat)
- Logo: pedir que o usuário coloque em `public/images/logo.svg` (ou `.png`)
- Estilo geral: clínico/premium/jovem/sofisticado/etc.

**Cópia e conteúdo:**
- Especialidade médica e foco da LP
- Nome(s), CRM(s) e RQE(s) do(s) médico(s)
- Headline principal (ou sugerir baseado na especialidade)
- "Desejos" do paciente (3 dores/objetivos)
- Serviços/procedimentos (4–8 itens com título e descrição)
- Depoimentos de pacientes (mínimo 3, ideal 5)
- Descrição da estrutura da clínica (para a galeria)
- Credenciais/formação dos médicos

**Assets visuais:**
- Pedir que o usuário coloque as imagens em `public/images/`
- Ou URLs para download (vai para `scripts/download-assets.mjs`)

Se o usuário fornecer um documento de cópia (arquivo .md, .txt), leia-o completamente antes de continuar.

---

### A2. Criar o projeto a partir do template Astro

**Com `gh` CLI (preferido):**
```bash
gh repo create growdoctors/lp-[SLUG] --template growdoctors/lp-template-astro --private --clone
cd lp-[SLUG]
npm install
```

**Sem `gh` CLI:**
```bash
git clone git@github.com:growdoctors/lp-template-astro.git lp-[SLUG]
cd lp-[SLUG]
rm -rf .git
git init
git add .
git commit -m "feat: initial setup lp-[SLUG]"
```
Depois crie o repo manualmente em github.com/growdoctors e conecte:
```bash
git remote add origin git@github.com:growdoctors/lp-[SLUG].git
git push -u origin main
```

Atualize o `"name"` no `package.json` para `"lp-[slug]"`.

---

### A3. Adaptar a identidade visual

**Variáveis CSS em `src/styles/global.css`:**
- `--lp-gold` → cor de destaque do cliente
- `--lp-dark` → cor escura principal
- `--lp-cream` → fundo claro das seções claras
- `--lp-olive` → cor de texto auxiliar
- `--font-display` → família da fonte de títulos (ex: `'Playfair Display', Georgia, serif`)
- `--font-body` → família da fonte de corpo (ex: `'Montserrat', sans-serif`)

**Fontes:**
Atualize `fontsUrl` em `src/config/client.ts` com a URL do Google Fonts do cliente.
Se trocar as famílias de fonte, também atualize `--font-display` e `--font-body` no CSS.

**Mapeie todas as cores hardcoded antes de substituir:**
```bash
grep -r "#C4A36E\|#1a1612\|#f7f4ef" src/
```

---

### A4. Planejar as seções

Analise a cópia fornecida e decida:

1. **Quais seções do template usar** (todas são opcionais exceto Hero + Footer):
   - `HeroSection.astro` — sempre (inclui `HeroForm` como `client:load`)
   - `LocationBar.astro` — se tiver endereço relevante
   - `DesiresSection.astro` — se houver dores/objetivos claros do paciente
   - `ServicesSection.astro` — se houver lista de procedimentos
   - `TestimonialsSection.astro` — se houver depoimentos
   - `GallerySection.astro` — se houver fotos da clínica
   - `DoctorsSection.astro` — se houver 1+ médico com credenciais
   - `Footer.astro` — sempre

2. **Quais novas seções criar** se a cópia exigir algo que o template não cobre.
   Crie novos arquivos `.astro` em `src/components/` seguindo o padrão do template.
   Se a seção precisar de interatividade (animações, tabs, acordeão), crie como `.tsx` com `client:idle`.

3. Atualize `src/pages/index.astro` com as seções na ordem correta.

---

### A5. Perguntar sobre página de Links Úteis

Antes de finalizar o setup, pergunte ao usuário:

> "Você vai querer uma página de Links Úteis para esse cliente? É uma subpágina em `/links-uteis/` estilo link-in-bio — útil para compartilhar no Instagram, por exemplo."

Se sim, colete os links:

> "Me passa os links que devem aparecer. Para cada um, me diga o **rótulo do botão** e a **URL**. Por exemplo: 'Agendar consulta → /#utmCaptureForm', 'Instagram → https://instagram.com/...', etc."

Esses dados vão para `client.ts > linksUteis.items`. Se não quiser, deixe `items: []` — a rota `/links-uteis/` existe no template mas renderiza vazia.

---

### A5b. Perguntar sobre tags e pixels adicionais

Antes de finalizar o setup, pergunte ao usuário:

> "Você quer adicionar alguma tag de rastreamento além do GTM? Por exemplo:
> - Meta Pixel (Facebook/Instagram Ads)
> - Pixel do TikTok
> - Microsoft Clarity
> - Google Analytics (GA4) direto
> - Outro pixel ou script de terceiros?"

No Astro, scripts de terceiros vão em `src/layouts/Layout.astro` usando `<script is:inline>` com `setTimeout(..., 2000)` para não bloquear o render. **Nunca adicionar scripts diretamente no `<head>` sem delay.**

Exemplo de padrão:
```astro
<script is:inline>
  window.addEventListener('load', function() {
    setTimeout(function() {
      // seu script aqui
    }, 2000);
  });
</script>
```

---

### A6. Preencher `src/config/client.ts`

Preencha o arquivo completamente com todos os dados coletados no A1.
Não deixe nenhum placeholder `[...]` ou `NOME_` no arquivo final.

Campos do `client.ts`:
- `name` — nome da clínica
- `logo` — caminho do logo (`/images/logo.svg`)
- `favicon` — caminho do favicon (`/images/favicon.png`)
- `siteUrl` — domínio final sem barra (ex: `https://lp.medico.com.br`)
- `seo.title` / `seo.description` — meta tags
- `og.image` — caminho da imagem OG 1200×630 (`/images/og.jpg`)
- `schema` — type, streetAddress, addressLocality, addressRegion, postalCode, sameAs[]
- `fontsUrl` — URL completa do Google Fonts
- `gtmId` — ID do GTM (`GTM-XXXXXXX`)
- `webhookUrl` / `captureUrl` — URLs de integração (usar padrões GrowDoc)
- `location` — texto da barra de localização
- `hero` — eyebrow, headingLines[], credentials[], formTitle, ctaText
- `desires` — eyebrow, heading, items[], ctaSubtext
- `services` — eyebrow, heading, headingEm, items[]
- `testimonials` — array de { title, body, author }
- `gallery` — eyebrow, heading, description, images[]
- `doctors` — array de { crm, name, specialty, credentials[], photo }
- `footer` — year (automático), copyright

Se a cópia tiver mais ou menos itens do que o template espera, ajuste os arrays — os componentes aceitam qualquer quantidade.

---

### A7. Configurar assets

Edite `scripts/download-assets.mjs` com as URLs dos assets e rode:
```bash
node scripts/download-assets.mjs
```

Se os arquivos foram colocados manualmente em `public/images/`, verifique se os nomes batem com o que está em `client.ts`.

---

### A8. Testar e buildar

```bash
npm run dev    # testar em http://localhost:4321
npm run build  # confirmar que gera dist/ sem erros
```

**O que validar:**
- Hero: logo, headline, credenciais do médico, formulário funcionando
- Formulário: campo nome + telefone, validação, checkbox de privacidade, botão desabilitado antes do check
- Cookie banner: aparece após ~1.8s, bloqueia scroll, botões funcionam, não reaparece após escolha
- Todas as seções com conteúdo correto
- Responsivo mobile (390px)
- Cores e tipografia do cliente

---

### A9. Git e deploy

```bash
git add .
git commit -m "feat: setup lp-[slug] — [nome da clínica]"
git push
```

Instruções Cloudflare Pages (o usuário faz manualmente no painel):
- **Build command:** `npm run build`
- **Output directory:** `dist`
- **Node version:** 20
- **Custom domain:** o subdomínio combinado com o cliente

---

## CENÁRIO B: Adaptar site já codado

### B1. Analisar o projeto existente

Leia o projeto completo antes de qualquer modificação:
```bash
find src/ -type f | sort
```

Mapeie:
1. **Framework e versão** — é Next.js? Qual versão? Tem `output: "export"`?
2. **Estrutura de componentes** — quais seções existem e o que cada uma contém
3. **Onde estão os dados do cliente** — hardcoded nos componentes ou em arquivos separados?
4. **Formulário de captura** — existe? Está integrado com o webhook GrowDoc? Captura UTMs?
5. **CSS** — usa Tailwind? CSS Modules? CSS puro?
6. **GTM** — está implementado? Com qual estratégia de carregamento?
7. **Performance** — `next dev` usa Turbopack? (causa uso excessivo de RAM no Next.js 16)

---

### B2. Planejar a migração

Após a análise, defina:

**O que manter:** estrutura visual, conteúdo, imagens que já estão boas
**O que substituir:** formulário (se não for o padrão GrowDoc), GTM (se não usar delay)
**O que adicionar:** `src/config/client.ts`, `CLAUDE.md`, `AGENTS.md`
**O que remover:** código morto, dependências desnecessárias

Explique o plano para o usuário antes de executar. Peça confirmação se a migração envolver mudanças estruturais grandes.

---

### B3. Executar a migração

**Ordem recomendada:**

1. **Adicionar `src/config/client.ts`** com os dados extraídos do código existente
2. **Substituir o formulário** pelo `HeroForm.tsx` padrão (se necessário)
3. **Migrar dados hardcoded** dos componentes para `client.ts`
4. **Ajustar GTM** com estratégia de delay de 2s após load
5. **Adicionar `CookieBanner.tsx`** e importar no layout
6. **Perguntar sobre tags adicionais** (ver passo A5b)
7. **Perguntar sobre Links Úteis** (ver passo A5) — mesma lógica do Cenário A
8. **Criar `CLAUDE.md` e `AGENTS.md`** baseados no template
9. **Verificar config de build** — `output: "export"` + `images: { unoptimized: true }` no Next.js
10. **Fix de memória (Next.js 16):** alterar script `dev` para `next dev --webpack` e adicionar `".next"` e `"out"` ao `exclude` do `tsconfig.json`

---

### B4. Validar após migração

```bash
npm run build
```

Se houver erros de TypeScript, corrija antes de continuar. Teste visualmente como no A8.

---

### B5. Git e deploy

```bash
git add .
git commit -m "refactor: migrate to GrowDoc LP standard"
git push
```

Cloudflare Pages para Next.js legado:
- **Build command:** `npm run build`
- **Output directory:** `out`
- **Node version:** 20

---

## Regras gerais (ambos os cenários)

### Formulário — NUNCA modificar a lógica de captura

O `HeroForm.tsx` foi validado em produção.
**Não altere nada na lógica de funcionamento:**

- A **ordem exata**: `initUTMCapture()` → `fetch(captureUrl, { keepalive: true })` → `window.location.href = webhookUrl`
- O `keepalive: true` no fetch — garante que o request complete mesmo após o redirect
- O localStorage como fallback de UTM entre sessões (`utm_utm_source`, etc.)
- O `id="utmCaptureForm"` no `<form>` — todos os botões CTA da página fazem scroll anchor para esse ID
- Os campos hidden de UTM no HTML do form
- A lógica de máscara de telefone e validação

Você **pode** mudar apenas textos e CSS — nunca a lógica.

### Banner LGPD — já incluído no template

O `CookieBanner.tsx` usa as variáveis CSS `--lp-gold` e `--lp-dark` para se adaptar automaticamente.
Comportamento fixo (não alterar):
- Aparece após 1.8s da primeira visita
- Bloqueia scroll + escurece a página enquanto visível
- Persiste a escolha em `localStorage('cookie_consent')`
- Link sempre aponta para `https://privacidade.growdoc.com.br/`
- No Astro: importado no `Layout.astro` como `<CookieBanner client:idle />`

### Performance — manter as otimizações

- GTM com delay de 2s após `load` — nunca no `<head>` diretamente
- `<link rel="preload">` para a imagem hero mobile
- `<link rel="preconnect">` para GTM, Facebook, Clarity
- Imagens de galeria em WebP qualidade 75–80
- **Astro:** `output: 'static'` no `astro.config.mjs`, output em `dist/`
- **Next.js legado:** `output: "export"` + `images: { unoptimized: true }` no `next.config.ts`

### SEO — configurar sempre

Todo projeto novo deve ter configurado em `client.ts`:
- `siteUrl` — domínio final sem barra
- `og.image` — imagem de compartilhamento 1200×630 px (usar hero se não tiver)
- `schema` — dados para JSON-LD (type, address, sameAs)

O `layout.tsx` / `Layout.astro` já gera automaticamente:
- Open Graph completo (og:title, og:description, og:image, og:url, og:type, og:locale)
- Twitter card `summary_large_image`
- JSON-LD schema (Physician/LocalBusiness)
- `robots.txt` e `sitemap.xml` em `public/`

Lembrar de atualizar `public/robots.txt` e `public/sitemap.xml` com o domínio real.

### Seções novas — seguir o padrão visual

Ao criar seções que não existem no template:
- Use as mesmas CSS variables (`--lp-gold`, `--lp-dark`, `--lp-cream`, etc.)
- Use as classes compartilhadas (`lp-eyebrow`, `lp-section-heading`, `lp-gold-rule`, `lp-card-lift`, `lp-section-pad`, `lp-section-inner`)
- Adicione os dados da nova seção no `client.ts`
- Inclua pelo menos um CTA `.btn-cta` linkando para `#utmCaptureForm`
- **Astro:** componentes estáticos como `.astro`; só use React (`.tsx` com `client:idle`) se precisar de interatividade

### Página /links-uteis — link-in-bio opcional

Ambos os templates incluem uma subpágina standalone em `/links-uteis/` estilo link-in-bio:
- Foto do médico em círculo, nome, especialidade, CRM
- Lista de botões configurada em `client.ts > linksUteis.items`
- Fundo escuro com botões de borda dourada sutil
- `noindex` — não aparece no Google
- **Não é obrigatória.** Se `items` estiver vazio, a rota existe mas fica em branco

Para habilitar, basta popular os itens em `client.ts`:
```ts
linksUteis: {
  items: [
    { label: 'Agende sua consulta', href: '/#utmCaptureForm' },
    { label: 'Instagram', href: 'https://instagram.com/...' },
  ],
},
```

**Não perguntar sobre isso a menos que o usuário confirme que quer** (ver passo A5).

### UTM Propagator — já incluído nos templates

Ambos os templates incluem automaticamente o script UTM Propagator no layout. Ele:
- Lê os UTMs da URL atual (`utm_source`, `utm_medium`, etc.)
- Propaga esses parâmetros para qualquer link clicado na página
- É um no-op para tráfego orgânico (sem UTMs na URL)
- Pula links do Instagram, Google Maps, Waze e política de privacidade
- **Não precisa de configuração.** Já está no `Layout.astro` e no `layout.tsx`.

---

### Cloudflare Pages — subdomínio por projeto

Cada projeto tem seu próprio projeto no Cloudflare Pages e seu próprio subdomínio.
Nunca compartilhar um projeto Cloudflare Pages entre dois clientes.
Os templates (`lp-template-astro`, `lp-template`) **nunca** devem ser conectados ao Cloudflare Pages.
