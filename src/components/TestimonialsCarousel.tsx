import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useCallback, useEffect, useState } from 'react';
import { CLIENT } from '@/config/client';

const STAR_IMAGE = '/images/referencia-proplastica/stars.png';

export default function TestimonialsCarousel() {
  const items = CLIENT.trustTestimonials.items;
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay({ delay: 5000, stopOnInteraction: true })]
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
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="lp-trust-section">
      <div className="lp-section-inner lp-section-inner--wide">
        <div className="lp-trust-frame">
          <div className="reveal lp-trust-heading-wrap">
            <h2 className="lp-section-heading lp-trust-heading">{CLIENT.trustTestimonials.heading}</h2>
          </div>

          <div className="lp-trust-nav" aria-label="Navegação de depoimentos">
            <button
              type="button"
              className="lp-trust-arrow lp-trust-arrow--prev"
              aria-label="Depoimento anterior"
              onClick={() => emblaApi?.scrollPrev()}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M15 6 9 12l6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              className="lp-trust-arrow lp-trust-arrow--next"
              aria-label="Próximo depoimento"
              onClick={() => emblaApi?.scrollNext()}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="m9 6 6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <div className="lp-trust-viewport" ref={emblaRef}>
            <div className="lp-trust-track">
              {items.map((item, index) => (
                <article key={`${item.name}-${index}`} className="lp-trust-card">
                  <div className="lp-trust-person">
                    <img src={item.avatar} alt={item.name} loading="lazy" decoding="async" className="lp-trust-avatar" />
                    <h3>{item.name}</h3>
                  </div>
                  <p>{item.body}</p>
                  <img src={STAR_IMAGE} alt="" aria-hidden="true" className="lp-trust-stars" />
                </article>
              ))}
            </div>
          </div>

          <div className="lp-trust-dots" aria-label="Paginação de depoimentos">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Ir para depoimento ${index + 1}`}
                onClick={() => emblaApi?.scrollTo(index)}
                className={index === selectedIndex ? 'is-active' : ''}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
