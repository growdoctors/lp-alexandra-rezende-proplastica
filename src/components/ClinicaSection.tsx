import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useCallback, useEffect, useState } from 'react';
import { CLIENT } from '@/config/client';

const { gallery } = CLIENT;
const locationSection = (CLIENT as any).locationSection as {
  eyebrow: string;
  heading: string;
  locations: { city: string; name: string; address: string; description: string }[];
  stats?: { value: string; label: string }[];
};
const images = gallery.images;

const WA_ICON = (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const PinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const ChevronLeft = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRight = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export default function ClinicaSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 30 },
    [Autoplay({ delay: 4500, stopOnInteraction: true })]
  );
  const [thumbRef, thumbApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const idx = emblaApi.selectedScrollSnap();
    setSelectedIndex(idx);
    thumbApi?.scrollTo(idx);
  }, [emblaApi, thumbApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    onSelect();
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi, onSelect]);

  const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const loc = locationSection.locations[0];
  const stats = locationSection.stats ?? [];

  return (
    <section style={{ backgroundColor: 'var(--lp-dark)', paddingBlock: 'var(--lp-section-py, 6rem)', overflow: 'hidden' }}>
      <div className="lp-section-inner">

        {/* Cabeçalho */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '52px' }}>
          <span className="lp-eyebrow">{locationSection.eyebrow}</span>
          <h2
            className="lp-section-heading"
            style={{ fontSize: 'clamp(28px,3.5vw,44px)', color: '#fff', textAlign: 'center', marginTop: '8px' }}
          >
            {locationSection.heading}
          </h2>
          <div className="lp-gold-rule" style={{ marginTop: '20px' }} />
        </div>

        {/* Layout split: info | carrossel */}
        <div className="clinica-layout">

          {/* Coluna de informação */}
          <div className="reveal" style={{ display: 'flex', flexDirection: 'column' }}>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <span style={{ color: 'var(--lp-gold)' }}><PinIcon /></span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: 'var(--lp-gold)' }}>
                {loc.city}
              </span>
            </div>

            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(26px,2.8vw,36px)', fontWeight: 600, color: '#fff', margin: '0 0 12px', lineHeight: 1.15 }}>
              {loc.name}
            </h3>

            <div style={{ width: '40px', height: '2px', background: 'var(--lp-gold)', opacity: 0.6, marginBottom: '18px', borderRadius: '2px' }} />

            <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'rgba(255,255,255,0.40)', margin: '0 0 20px', lineHeight: 1.55, display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
              <PinIcon />
              {loc.address}
            </p>

            <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', color: 'rgba(255,255,255,0.68)', lineHeight: 1.8, margin: '0 0 32px' }}>
              {loc.description}
            </p>

            {/* Stats rápidos — configuráveis em client.ts */}
            {stats.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '36px' }}>
                {stats.map((stat, idx) => (
                  <div key={idx} style={{ padding: '14px 16px', background: 'rgba(196,163,110,0.05)', border: '1px solid rgba(196,163,110,0.15)', borderRadius: '10px' }}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '15px', fontWeight: 600, color: 'var(--lp-gold)', marginBottom: '3px' }}>{stat.value}</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.4 }}>{stat.label}</div>
                  </div>
                ))}
              </div>
            )}

            <a
              href="#utmCaptureForm"
              className="btn-cta"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '12px', padding: '14px 24px', alignSelf: 'flex-start' }}
            >
              {WA_ICON}
              AGENDAR CONSULTA
            </a>

          </div>

          {/* Carrossel com thumbnails */}
          <div className="reveal">

            {/* Viewport principal */}
            <div style={{ position: 'relative' }}>
              <div ref={emblaRef} style={{ overflow: 'hidden', borderRadius: '20px', boxShadow: '0 32px 80px rgba(0,0,0,0.45)' }}>
                <div style={{ display: 'flex' }}>
                  {images.map((img, i) => (
                    <div key={i} style={{ flex: '0 0 100%', position: 'relative', lineHeight: 0, overflow: 'hidden' }}>
                      <img
                        src={img.src}
                        alt={img.alt}
                        loading={i === 0 ? 'eager' : 'lazy'}
                        decoding="async"
                        style={{
                          width: '100%',
                          height: 'clamp(340px, 44vw, 520px)',
                          objectFit: 'cover',
                          objectPosition: 'center center',
                          display: 'block',
                          transition: 'transform 6s ease',
                          transform: i === selectedIndex ? 'scale(1.05)' : 'scale(1)',
                        }}
                      />
                      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(20,16,12,0.65) 0%, transparent 52%)', pointerEvents: 'none' }} />
                      <div style={{ position: 'absolute', bottom: '16px', left: '18px', right: '72px', fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 500, color: 'rgba(255,255,255,0.75)', letterSpacing: '0.03em', lineHeight: 1.3 }}>
                        {img.alt}
                      </div>
                      <div style={{ position: 'absolute', top: '14px', right: '14px', background: 'rgba(26,22,18,0.85)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderRadius: '8px', padding: '5px 12px', fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,0.85)', letterSpacing: '0.12em', border: '1px solid rgba(196,163,110,0.2)' }}>
                        {String(i + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Botões de navegação */}
              {[
                { label: 'Foto anterior', fn: prev, side: { left: '-20px' } },
                { label: 'Próxima foto', fn: next, side: { right: '-20px' } },
              ].map(({ label, fn, side }) => (
                <button
                  key={label}
                  onClick={fn}
                  aria-label={label}
                  style={{
                    position: 'absolute', top: '50%', ...side,
                    transform: 'translateY(-50%)',
                    background: 'var(--lp-dark)',
                    border: '1px solid rgba(196,163,110,0.3)',
                    borderRadius: '50%', width: '46px', height: '46px',
                    cursor: 'pointer', color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'background 0.2s, border-color 0.2s',
                    zIndex: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                  }}
                  onMouseEnter={e => {
                    const b = e.currentTarget as HTMLButtonElement;
                    b.style.background = 'var(--lp-gold)';
                    b.style.borderColor = 'var(--lp-gold)';
                    b.style.color = 'var(--lp-dark)';
                  }}
                  onMouseLeave={e => {
                    const b = e.currentTarget as HTMLButtonElement;
                    b.style.background = 'var(--lp-dark)';
                    b.style.borderColor = 'rgba(196,163,110,0.3)';
                    b.style.color = '#fff';
                  }}
                >
                  {label.includes('anterior') ? <ChevronLeft /> : <ChevronRight />}
                </button>
              ))}
            </div>

            {/* Thumbnails */}
            <div style={{ marginTop: '12px', overflow: 'hidden' }} ref={thumbRef}>
              <div style={{ display: 'flex', gap: '8px' }}>
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => emblaApi?.scrollTo(i)}
                    aria-label={`Ver foto ${i + 1}`}
                    style={{
                      flex: '0 0 calc(14.28% - 7px)',
                      aspectRatio: '1',
                      borderRadius: '8px', overflow: 'hidden',
                      padding: 0,
                      border: i === selectedIndex ? '2px solid var(--lp-gold)' : '2px solid transparent',
                      cursor: 'pointer',
                      opacity: i === selectedIndex ? 1 : 0.4,
                      transition: 'opacity 0.25s ease, border-color 0.25s ease',
                      background: 'none',
                    }}
                  >
                    <img src={img.src} alt="" aria-hidden="true" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </button>
                ))}
              </div>
            </div>

            {/* Dots */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', marginTop: '14px' }}>
              {scrollSnaps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => emblaApi?.scrollTo(i)}
                  aria-label={`Foto ${i + 1}`}
                  style={{
                    width: i === selectedIndex ? '24px' : '6px',
                    height: '6px', borderRadius: '3px',
                    background: i === selectedIndex ? 'var(--lp-gold)' : 'rgba(196,163,110,0.2)',
                    border: 'none', cursor: 'pointer', padding: 0,
                    transition: 'width 300ms ease, background 300ms ease',
                  }}
                />
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
