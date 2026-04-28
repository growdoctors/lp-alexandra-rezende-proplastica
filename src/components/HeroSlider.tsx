// src/components/HeroSlider.tsx
// Componente opcional — ativo quando client.ts define heroSlides[]
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useCallback, useEffect, useState } from 'react';
import { CLIENT } from '@/config/client';
import HeroForm from './HeroForm';

type HeroSlide = { image: string; headingLines: string[]; ctaText: string };

const slides: HeroSlide[] = (CLIENT as Record<string, unknown>).heroSlides as HeroSlide[] ?? [];

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
