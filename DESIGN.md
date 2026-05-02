---
name: "Hospital Dia ProPlástica"
description: "Landing page clínica de conversão para WhatsApp com elegância contida e autoridade médica."
colors:
  clinical-brown: "#422106"
  soft-gold: "#d0b186"
  graphite-deep: "#262626"
  graphite-soft: "#353535"
  conversion-green: "#31c450"
  porcelain: "#ffffff"
  charcoal-text: "#222222"
  quiet-gray: "#6f6f6f"
  cloud-panel: "#f5f5f5"
typography:
  display:
    fontFamily: "Poppins, sans-serif"
    fontSize: "clamp(2.45rem, 3.65vw, 3.5rem)"
    fontWeight: 500
    lineHeight: 1.14
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Luxury, Georgia, serif"
    fontSize: "clamp(2.35rem, 3.8vw, 3.4rem)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Poppins, sans-serif"
    fontSize: "clamp(2rem, 4vw, 3.2rem)"
    fontWeight: 700
    lineHeight: 1.08
  body:
    fontFamily: "Poppins, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: "Poppins, sans-serif"
    fontSize: "0.92rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.01em"
rounded:
  pill: "999px"
  sm: "12px"
  md: "14px"
  lg: "16px"
  xl: "22px"
  hero: "28px"
spacing:
  xs: "0.5rem"
  sm: "1rem"
  md: "1.5rem"
  lg: "2rem"
  xl: "4rem"
  section: "clamp(4rem, 7vw, 6rem)"
components:
  button-primary:
    backgroundColor: "{colors.conversion-green}"
    textColor: "{colors.porcelain}"
    rounded: "{rounded.pill}"
    padding: "0.9rem 1.6rem"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.conversion-green}"
    textColor: "{colors.porcelain}"
    rounded: "{rounded.pill}"
  button-hero:
    backgroundColor: "{colors.conversion-green}"
    textColor: "{colors.porcelain}"
    rounded: "{rounded.pill}"
    padding: "0.9rem 1.8rem"
    height: "56px"
  card-dark:
    backgroundColor: "{colors.graphite-soft}"
    textColor: "{colors.porcelain}"
    rounded: "{rounded.sm}"
    padding: "2rem 2rem 4rem"
  panel-cta:
    backgroundColor: "{colors.cloud-panel}"
    textColor: "{colors.charcoal-text}"
    rounded: "{rounded.sm}"
    padding: "2rem"
---

# Design System: Hospital Dia ProPlástica

## Overview

**Creative North Star: "Elegância Clínica"**

Este sistema visual existe para converter com confiança médica, não com apelo promocional. A base é clara, limpa e silenciosa. O peso institucional entra por blocos marrons profundos, grafites suaves e títulos com presença controlada. O resultado deve parecer uma clínica segura e experiente, nunca uma operação varejista de saúde.

A atmosfera é precisa e confiável. A página trabalha com contraste entre fundos claros e superfícies escuras para marcar autoridade, enquanto o dourado aquece pontos de ênfase e o verde fica restrito ao gesto funcional de conversão. A profundidade é baixa e deliberada: quase tudo repousa plano, e o relevo aparece apenas quando a interface precisa sinalizar ação.

O sistema rejeita explicitamente qualquer leitura de página de farmácia. Isso significa proibir aparência promocional, excesso de estímulos cromáticos, linguagem de oferta, grids genéricos de varejo e qualquer composição que troque sofisticação clínica por ruído comercial.

**Key Characteristics:**
- Base clara e silenciosa com contraste institucional escuro.
- Autoridade transmitida por contenção, não por exuberância.
- Conversão concentrada no CTA verde, não espalhada pela página.
- Tipografia sem ruído, com uma única voz ornamental de apoio.
- Profundidade leve, usada só para ação e foco.

## Colors

A paleta combina um eixo institucional marrom-grafite com um dourado suave de sofisticação e um verde funcional reservado para conversão.

### Primary
- **Marrom Clínico** (`#422106`): cor de autoridade estrutural. Aparece em faixas institucionais, barras de localização e blocos de confiança onde a marca precisa parecer sólida e segura.

### Secondary
- **Dourado Suave** (`#d0b186`): cor de ênfase nobre. Deve destacar números, microdestaques e sinais de valor percebido. Nunca deve dominar superfícies inteiras.

### Tertiary
- **Verde de Conversão** (`#31c450`): cor funcional, não identitária. Serve exclusivamente ao CTA principal e a sinais de ação positiva. Sua força vem da raridade.

### Neutral
- **Porcelana Clínica** (`#ffffff`): fundo principal e respiro dominante da página.
- **Grafite Profundo** (`#262626`): base escura para contraste máximo em áreas de hero mobile e sobreposições.
- **Grafite Suave** (`#353535`): cor padrão de cards escuros e painéis de conteúdo.
- **Carvão de Leitura** (`#222222`): texto principal em superfícies claras.
- **Cinza Quieto** (`#6f6f6f`): corpo secundário, descrições e texto de apoio.
- **Nuvem Fosca** (`#f5f5f5`): painel claro de apoio para CTAs ou resumos que pedem separação sem virar card pesado.

**The Conversion Reserve Rule.** O verde de conversão é usado com disciplina. Fora de CTA primário e pequenos sinais positivos, ele é proibido.

**The Pharmacy Rejection Rule.** Não espalhe verde, branco e cinza claro como linguagem dominante da página. Se a composição começar a lembrar varejo farmacêutico, ela falhou.

## Typography

**Display Font:** Poppins (fallback `sans-serif`)
**Body Font:** Poppins (fallback `sans-serif`)
**Label/Mono Font:** Poppins (fallback `sans-serif`)

**Character:** a voz principal é limpa, direta e contemporânea. O sistema evita excesso de contraste tipográfico e usa a família `Luxury` apenas como sotaque editorial em headings específicos, nunca como base do fluxo de leitura.

### Hierarchy
- **Display** (`500`, `clamp(2.45rem, 3.65vw, 3.5rem)`, `1.14`): título principal do hero. Deve carregar autoridade com densidade controlada e largura curta.
- **Headline** (`400`, `clamp(2.35rem, 3.8vw, 3.4rem)`, `1.02`): títulos especiais com `Luxury`, usados em blocos de prova social e momentos de maior sofisticação.
- **Title** (`700`, `clamp(2rem, 4vw, 3.2rem)`, `1.08`): headings de seção em Poppins, firmes e objetivos.
- **Body** (`400`, `1rem`, `1.75`): texto corrido e descrições. Manter entre `65ch` e `75ch` quando houver blocos longos.
- **Label** (`700`, `0.92rem`, `0.01em`, uppercase quando aplicado): CTA, etiquetas e microinterface com presença funcional.

**The One Ornament Rule.** A tipografia ornamental existe em um único sotaque. Se mais de uma camada tentar parecer luxuosa ao mesmo tempo, a página perde seriedade.

## Elevation

Este sistema usa profundidade leve, só para CTA e foco. O padrão é plano, com separação construída principalmente por contraste de superfície, raio e blocos de cor. Quando surge sombra, ela deve parecer um reforço de intenção, não decoração.

### Shadow Vocabulary
- **CTA Ambient Lift** (`0 18px 35px rgba(49, 196, 80, 0.2)`): sombra padrão do botão primário em repouso. Difusa e macia, nunca escura.
- **CTA Active Lift** (`0 22px 42px rgba(49, 196, 80, 0.3)`): hover do CTA, combinado com leve elevação vertical.
- **Hero CTA Inner Edge** (`inset 0 -5px 0 rgba(0, 0, 0, 0.16), 0 10px 26px rgba(49, 196, 80, 0.28)`): versão reforçada do CTA acima da dobra, adicionando peso tátil sem virar botão chamativo demais.

**The Flat-Until-Action Rule.** Superfícies ficam planas em repouso. Relevo só aparece quando a interface precisa pedir clique, foco ou prioridade imediata.

## Components

### Buttons
- **Shape:** pílula total (`999px`), sem cantos parciais ou cortes angulares.
- **Primary:** verde de conversão (`#31c450`) com texto branco, peso `700`, uppercase e padding `0.9rem 1.6rem`.
- **Hover / Focus:** leve subida (`translateY(-2px)`) e ampliação da sombra. O efeito precisa ser rápido e preciso, não saltitante.
- **Hero Variant:** altura `56px`, largura mínima ampla, sombra composta com base interna para mais presença acima da dobra.

### Cards / Containers
- **Dark Content Cards:** grafite suave (`#353535`), texto branco, raio `12px`, padding generoso. São blocos de confiança e processo, não cards de catálogo.
- **Institutional Frames:** marrom clínico (`#422106`) com raio maior (`16px` a `22px`) para abraçar conteúdo de prova, localização e confiança.
- **Light Support Panel:** fundo nuvem fosca (`#f5f5f5`), raio `12px`, centralização e respiro amplo para chamadas secundárias.

### Media Surfaces
- **Hero Frame:** raio heroico (`28px` desktop, `22px` mobile), imagem fotográfica com gradientes escuros integrados. O overlay é parte da legibilidade, não efeito decorativo.
- **Gallery / Video Surfaces:** raio `14px`, recorte limpo e sem molduras desnecessárias.

### Indicators
- **Carousel Dots:** círculos pequenos (`9px`) em estado neutro com expansão para `24px` no ativo. Devem parecer discretos e técnicos.
- **Accent Numbers:** dourado suave para numeradores de desejo, processo e destaques estatísticos.

### Signature Component
- **Location Banner:** faixa institucional marrom com ícone circular branco e tipografia em caixa alta espaçada. Deve soar como credencial física, não como box promocional.

## Do's and Don'ts

### Do:
- **Do** manter o branco como espaço dominante e deixar o marrom institucional assumir os blocos de autoridade.
- **Do** reservar o verde para conversão e sinais positivos específicos.
- **Do** usar dourado suave para numeradores, microdestaques e ênfases de prestígio.
- **Do** preservar a sensação de precisão e confiança com raios consistentes entre `12px` e `28px`.
- **Do** tratar os blocos escuros como superfícies institucionais, não como cards genéricos repetidos.

### Don't:
- **Don't** fazer a página parecer uma página de farmácia.
- **Don't** espalhar verde como cor de marca dominante.
- **Don't** transformar blocos de conteúdo em grade promocional de varejo.
- **Don't** usar sombras pesadas, brilho gratuito ou efeitos vistosos para simular sofisticação.
- **Don't** competir com a copy existente usando excesso de ornamento visual.
