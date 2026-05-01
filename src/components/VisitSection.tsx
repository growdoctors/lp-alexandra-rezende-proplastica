import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useCallback, useEffect, useState } from 'react';
import { CLIENT } from '@/config/client';

export default function VisitSection() {
  const { visitSection } = CLIENT;
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
    return () => emblaApi.off('select', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="lp-section-pad lp-visit-section">
      <div className="lp-section-inner lp-section-inner--wide lp-visit-layout">
        <div className="reveal lp-visit-copy">
          <div className="lp-visit-copy-shell">
            <h2 className="lp-section-heading lp-visit-heading">{visitSection.heading}</h2>
            <p>{visitSection.body}</p>
            <p className="lp-visit-support">{visitSection.supporting}</p>
            <a href={CLIENT.whatsappUrl} target="_blank" rel="noopener" className="btn-cta">
              AGENDAR CONSULTA
            </a>
          </div>
        </div>

        <div className="reveal lp-visit-media">
          <div className="lp-visit-viewport" ref={emblaRef}>
            <div className="lp-visit-track">
              {visitSection.images.map((image, index) => (
                <div className="lp-visit-slide" key={`${image.alt}-${index}`}>
                  <img src={image.src} alt={image.alt} loading={index === 0 ? 'eager' : 'lazy'} decoding="async" />
                </div>
              ))}
            </div>
          </div>
          <div className="lp-visit-dots">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Ir para imagem ${index + 1}`}
                className={index === selectedIndex ? 'is-active' : ''}
                onClick={() => emblaApi?.scrollTo(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
