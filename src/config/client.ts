// ============================================================
// src/config/client.ts
// PREENCHA ESTE ARQUIVO AO INICIAR UM NOVO PROJETO
//
// Todos os textos, dados e configurações do cliente ficam aqui.
// Os componentes lêem deste arquivo — não edite os componentes
// a não ser que seja necessária uma mudança estrutural.
// ============================================================

export const CLIENT = {
  // ----------------------------------------------------------
  // IDENTIDADE
  // ----------------------------------------------------------
  name: 'NOME DA CLÍNICA',
  logo: '/images/logo.svg',
  favicon: '/images/favicon.png',

  // ----------------------------------------------------------
  // SEO
  // siteUrl: domínio final do site sem barra no final
  // og.image: imagem de compartilhamento — idealmente 1200×630 px
  // schema: dados estruturados para rich results no Google
  // ----------------------------------------------------------
  siteUrl: 'https://DOMINIO-DO-SITE.com.br',

  seo: {
    title: 'TÍTULO DA PÁGINA — NOME DA CLÍNICA',
    description: 'DESCRIÇÃO CURTA DA PÁGINA (até 160 caracteres).',
  },

  og: {
    image: '/images/og.jpg', // 1200×630 px
  },

  schema: {
    type: 'Physician',
    streetAddress: 'RUA, NÚMERO — BAIRRO',
    addressLocality: 'CIDADE',
    addressRegion: 'UF',
    postalCode: '00000-000',
    sameAs: [] as string[],
  },

  // ----------------------------------------------------------
  // FONTES (Google Fonts URL — ajustar por cliente)
  // Padrão: Cormorant Garamond (display) + Montserrat (corpo)
  // fontsUrl: URL completa do Google Fonts
  // fonts.display: nome exato da família de títulos
  // fonts.body: nome exato da família de corpo de texto
  // ----------------------------------------------------------
  fontsUrl:
    'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Montserrat:wght@400;500;600;700&display=swap',
  fonts: {
    display: 'Cormorant Garamond',
    body: 'Montserrat',
  },

  // ----------------------------------------------------------
  // INTEGRAÇÕES
  // ----------------------------------------------------------
  gtmId: 'GTM-XXXXXXX',
  webhookUrl: 'https://webhooks02.manager01.growdoc.com.br/webhook/redirect-global',
  captureUrl: 'https://lswmkiyqznvuedbuyrkt.supabase.co/functions/v1/capture-lead',

  // ----------------------------------------------------------
  // LOCALIZAÇÃO
  // ----------------------------------------------------------
  location: 'CIDADE · UF',

  // ----------------------------------------------------------
  // HERO
  // bg-hero.png       → imagem desktop (em public/images/)
  // bg-hero-mobile.webp → imagem mobile (em public/images/)
  // ----------------------------------------------------------
  hero: {
    eyebrow: 'ESPECIALIDADE · CIDADE, UF',
    // headingLines: cada item vira uma linha do H1. A última entra em itálico dourado.
    // Não há número mínimo/máximo — use quantas linhas a copy pedir.
    headingLines: ['LINHA 1', 'LINHA 2', 'palavra em itálico'],
    credentials: [
      'Dr. NOME SOBRENOME · CRM XXXXX-XXX | RQE XXXXX',
    ],
    formTitle: 'Agende sua consulta',
    ctaText: 'Ir para o WhatsApp!',
    // photo: usado pelo HeroSplit — foto do médico sem fundo (recortada ou estúdio)
    // photo: '/images/dr-nome-hero.webp',
  },

  // ----------------------------------------------------------
  // SEÇÃO "DESEJOS"
  // ----------------------------------------------------------
  desires: {
    eyebrow: 'Você se identifica?',
    heading: 'Se você deseja…',
    items: [
      { num: '01', text: 'Descrição do desejo 1.' },
      { num: '02', text: 'Descrição do desejo 2.' },
      { num: '03', text: 'Descrição do desejo 3.' },
    ],
    ctaSubtext: 'O atendimento de [NOME DO MÉDICO] foi feito para você!',
  },

  // ----------------------------------------------------------
  // SERVIÇOS / PROCEDIMENTOS
  // ----------------------------------------------------------
  services: {
    eyebrow: 'Procedimentos',
    heading: 'HEADLINE DA SEÇÃO DE SERVIÇOS',
    headingEm: 'palavra em itálico',
    items: [
      { num: '01', title: 'SERVIÇO 1', description: 'Descrição do serviço 1.' },
      { num: '02', title: 'SERVIÇO 2', description: 'Descrição do serviço 2.' },
      { num: '03', title: 'SERVIÇO 3', description: 'Descrição do serviço 3.' },
      { num: '04', title: 'SERVIÇO 4', description: 'Descrição do serviço 4.' },
      { num: '05', title: 'SERVIÇO 5', description: 'Descrição do serviço 5.' },
      { num: '06', title: 'SERVIÇO 6', description: 'Descrição do serviço 6.' },
    ],
  },

  // ----------------------------------------------------------
  // DEPOIMENTOS
  // ----------------------------------------------------------
  testimonials: [
    { title: '"Depoimento!"', body: '"Texto do depoimento."', author: 'Nome do Paciente' },
    { title: '"Outro!"', body: '"Texto do depoimento."', author: 'Nome do Paciente' },
    { title: '"Mais um!"', body: '"Texto do depoimento."', author: 'Nome do Paciente' },
    { title: '"E mais!"', body: '"Texto do depoimento."', author: 'Nome do Paciente' },
    { title: '"Último!"', body: '"Texto do depoimento."', author: 'Nome do Paciente' },
  ],

  // ----------------------------------------------------------
  // COMO FUNCIONA / PROCESSO
  // Componente: ProcessSection — timeline numerada vertical
  // ----------------------------------------------------------
  process: {
    eyebrow: 'Como Funciona',
    heading: 'Do primeiro contato ao resultado',
    headingEm: 'final',
    steps: [
      { num: '01', title: 'AGENDAMENTO', description: 'Descreva como o paciente agenda e o que acontece antes da consulta.' },
      { num: '02', title: 'CONSULTA', description: 'Descreva como é a primeira consulta e o que o médico avalia.' },
      { num: '03', title: 'PROCEDIMENTO', description: 'Descreva como o procedimento é realizado e cuidados envolvidos.' },
      { num: '04', title: 'RESULTADO', description: 'Descreva o resultado esperado e o acompanhamento pós-procedimento.' },
    ],
  },

  // ----------------------------------------------------------
  // ANTES E DEPOIS
  // Componente: BeforeAfterSection — grid de cards lado a lado
  // disclaimer: texto de rodapé legal (opcional, mas recomendado)
  // ----------------------------------------------------------
  beforeAfter: {
    eyebrow: 'Resultados Reais',
    heading: 'Transformações que',
    headingEm: 'falam por si',
    disclaimer: 'Resultados podem variar de acordo com cada organismo. Imagens de casos reais de pacientes que autorizaram o uso.',
    items: [
      { label: 'CASO 01 — DESCRIÇÃO', beforeSrc: '/images/antes-01.webp', afterSrc: '/images/depois-01.webp' },
      { label: 'CASO 02 — DESCRIÇÃO', beforeSrc: '/images/antes-02.webp', afterSrc: '/images/depois-02.webp' },
      { label: 'CASO 03 — DESCRIÇÃO', beforeSrc: '/images/antes-03.webp', afterSrc: '/images/depois-03.webp' },
    ],
  },

  // ----------------------------------------------------------
  // FAQ — Perguntas Frequentes
  // Componente: FaqSection — accordion com <details>/<summary> (zero JS)
  // ----------------------------------------------------------
  faq: {
    eyebrow: 'Dúvidas Frequentes',
    heading: 'Perguntas que os pacientes mais fazem',
    items: [
      { question: 'PERGUNTA 1?', answer: 'Resposta completa e detalhada para a pergunta 1.' },
      { question: 'PERGUNTA 2?', answer: 'Resposta completa e detalhada para a pergunta 2.' },
      { question: 'PERGUNTA 3?', answer: 'Resposta completa e detalhada para a pergunta 3.' },
      { question: 'PERGUNTA 4?', answer: 'Resposta completa e detalhada para a pergunta 4.' },
      { question: 'PERGUNTA 5?', answer: 'Resposta completa e detalhada para a pergunta 5.' },
    ],
  },

  // ----------------------------------------------------------
  // MAPA / LOCALIZAÇÃO
  // Componente: MapSection — info de endereço + iframe do Google Maps
  // mapsEmbed: URL de incorporação do Maps (Compartilhar → Incorporar)
  // mapsUrl: URL normal do Maps para abrir no app
  // ----------------------------------------------------------
  mapSection: {
    eyebrow: 'Localização',
    heading: 'Venha nos conhecer',
    address: 'Rua, Número — Bairro, Cidade/UF',
    complement: 'Referência de localização ou complemento',
    schedule: 'Seg–Sex: 8h–18h | Sáb: 8h–12h',
    phone: '(00) 0 0000-0000',
    mapsUrl: 'https://maps.google.com/?q=endereço',
    mapsEmbed: 'https://www.google.com/maps/embed?pb=COLE_AQUI',
  },

  // ----------------------------------------------------------
  // SEÇÃO CLÍNICA / LOCALIZAÇÃO
  // Componente: ClinicaSection — info da clínica + carrossel de fotos
  // stats: até 4 diferenciais rápidos (value + label) — opcional
  // ----------------------------------------------------------
  locationSection: {
    eyebrow: 'Nossa Estrutura',
    heading: 'Conheça o NOME DA CLÍNICA',
    locations: [
      {
        city: 'CIDADE, UF',
        name: 'NOME DA CLÍNICA',
        address: 'Rua, Número — Bairro, Cidade/UF',
        description: 'Descrição do espaço físico, ambiente e proposta da clínica.',
      },
    ],
    stats: [
      { value: 'DIFERENCIAL 1', label: 'Descrição curta do diferencial' },
      { value: 'DIFERENCIAL 2', label: 'Descrição curta do diferencial' },
      { value: 'DIFERENCIAL 3', label: 'Descrição curta do diferencial' },
      { value: 'DIFERENCIAL 4', label: 'Descrição curta do diferencial' },
    ],
  },

  // ----------------------------------------------------------
  // GALERIA
  // ----------------------------------------------------------
  gallery: {
    eyebrow: 'Estrutura',
    heading: 'Conheça o NOME DA CLÍNICA',
    description: 'Descrição da estrutura da clínica, ambiente e diferenciais.',
    images: [
      { src: '/images/gallery-1.webp', alt: 'Descrição 1' },
      { src: '/images/gallery-2.webp', alt: 'Descrição 2' },
      { src: '/images/gallery-3.webp', alt: 'Descrição 3' },
      { src: '/images/gallery-4.webp', alt: 'Descrição 4' },
      { src: '/images/gallery-5.webp', alt: 'Descrição 5' },
      { src: '/images/gallery-6.webp', alt: 'Descrição 6' },
      { src: '/images/gallery-7.webp', alt: 'Descrição 7' },
      { src: '/images/gallery-8.webp', alt: 'Descrição 8' },
    ],
  },

  // ----------------------------------------------------------
  // MÉDICOS
  // bio: parágrafos de apresentação do médico (opcional, mas recomendado)
  // ----------------------------------------------------------
  doctors: [
    {
      crm: 'CRM XXXXX-XXX | RQE XXXXX',
      name: 'Dr. NOME SOBRENOME',
      specialty: 'Especialidade e título do médico.',
      bio: [
        'Parágrafo 1 de apresentação do médico — formação, missão ou proposta de valor.',
        'Parágrafo 2 — abordagem clínica, técnicas ou diferenciais.',
        'Parágrafo 3 — compromisso com o paciente e resultados esperados.',
      ],
      credentials: [
        'Graduado em medicina pela UNIVERSIDADE',
        'Residência em ESPECIALIDADE pelo HOSPITAL',
        'Membro de SOCIEDADE',
      ],
      photo: '/images/dr-nome.webp',
    },
  ],

  // ----------------------------------------------------------
  // LINKS ÚTEIS — subpágina em /links-uteis/
  // Cada item vira um botão na página de link-in-bio.
  // Deixe items vazio se não for usar.
  // ----------------------------------------------------------
  linksUteis: {
    items: [
      // { label: 'Instagram', href: 'https://instagram.com/clinica' },
      // { label: 'Agendar consulta', href: 'https://doctoralia.com.br/...' },
      // { label: 'Site', href: 'https://clinica.com.br' },
    ] as { label: string; href: string }[],
  },

  // ----------------------------------------------------------
  // FOOTER
  // ----------------------------------------------------------
  footer: {
    year: new Date().getFullYear(),
    copyright: 'Dr. NOME SOBRENOME · Todos os direitos reservados',
  },
  // ──────────────────────────────────────────────────────────────
  // OPCIONAL: HeroSlider — ativo quando definido, substitui HeroSection estático
  // Cada slide tem: image (caminho em /images/), headingLines[], ctaText
  // Exemplo:
  // heroSlides: [
  //   { image: '/images/slide-1.jpg', headingLines: ['Rinoplastia', 'Natural'], ctaText: 'Agendar' },
  //   { image: '/images/slide-2.jpg', headingLines: ['Resultado', 'Definitivo'], ctaText: 'Agendar' },
  // ],
  // ──────────────────────────────────────────────────────────────
} as const
