import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useCallback, useEffect, useState } from 'react';

type Testimonial = {
  title: string;
  body: string;
  author: string;
};

type Props = {
  eyebrow: string;
  heading: string;
  items: readonly Testimonial[];
  ctaHref: string;
  ctaText: string;
};

export default function TransplanteTestimonials({
  eyebrow,
  heading,
  items,
  ctaHref,
  ctaText,
}: Props) {
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
    <section className="tc-testimonials">
      <div className="tc-shell tc-shell--wide">
        <div className="reveal tc-testimonials-intro">
          <p className="tc-eyebrow">{eyebrow}</p>
          <h2 className="tc-heading">{heading}</h2>
        </div>

        <div className="tc-testimonials-carousel">
          <button
            type="button"
            className="tc-carousel-arrow tc-carousel-arrow--prev"
            aria-label="Depoimento anterior"
            onClick={() => emblaApi?.scrollPrev()}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15 6 9 12l6 6" />
            </svg>
          </button>

          <div className="tc-testimonials-viewport" ref={emblaRef}>
            <div className="tc-testimonials-track">
              {items.map((item, index) => (
                <article className="tc-testimonial-card" key={`${item.author}-${index}`}>
                  <div className="tc-testimonial-quote" aria-hidden="true">”</div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  <span className="tc-testimonial-author">{item.author}</span>
                </article>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="tc-carousel-arrow tc-carousel-arrow--next"
            aria-label="Próximo depoimento"
            onClick={() => emblaApi?.scrollNext()}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m9 6 6 6-6 6" />
            </svg>
          </button>
        </div>

        <div className="tc-carousel-dots" aria-label="Paginação de depoimentos">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Ir para depoimento ${index + 1}`}
              className={index === selectedIndex ? 'is-active' : ''}
              onClick={() => emblaApi?.scrollTo(index)}
            />
          ))}
        </div>

        <div className="reveal tc-cta-wrap">
          <a href={ctaHref} target="_blank" rel="noopener" className="tc-button">
            {ctaText}
          </a>
        </div>
      </div>
    </section>
  );
}
