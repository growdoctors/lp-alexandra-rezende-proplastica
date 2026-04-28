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

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '48px' }}>
          <button onClick={() => emblaApi?.scrollPrev()} aria-label="Anterior"
            style={{ background: 'transparent', border: '1px solid rgba(196,163,110,0.4)', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', color: 'var(--lp-gold)', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>←</button>
          {scrollSnaps.map((_, i) => (
            <button key={i} onClick={() => emblaApi?.scrollTo(i)} aria-label={`Imagem ${i + 1}`}
              style={{ width: i === selectedIndex ? '24px' : '8px', height: '8px', borderRadius: '4px', background: i === selectedIndex ? 'var(--lp-gold)' : 'rgba(196,163,110,0.3)', border: 'none', cursor: 'pointer', padding: 0, transition: 'width 300ms ease, background 300ms ease' }} />
          ))}
          <button onClick={() => emblaApi?.scrollNext()} aria-label="Próximo"
            style={{ background: 'transparent', border: '1px solid rgba(196,163,110,0.4)', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', color: 'var(--lp-gold)', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>→</button>
        </div>

        <div style={{ textAlign: 'center' }}>
          <a href="#utmCaptureForm" className="btn-cta" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            {WA_ICON} AGENDAR CONSULTA
          </a>
        </div>
      </div>

      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, cursor: 'pointer', padding: '24px' }}
        >
          <img src={lightbox} alt="Galeria ampliada" style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain', borderRadius: '8px' }} onClick={e => e.stopPropagation()} />
          <button onClick={() => setLightbox(null)} aria-label="Fechar"
            style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', color: '#fff', fontSize: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
        </div>
      )}
    </section>
  );
}
