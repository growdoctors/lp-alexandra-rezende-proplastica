import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useCallback, useEffect, useState } from 'react';

type Props = {
  heading: string;
  paragraphs: readonly string[];
  images: readonly string[];
  bullets: readonly string[];
  ctaHref: string;
  ctaText: string;
};

export default function TransplanteGallery({
  heading,
  paragraphs,
  images,
  bullets,
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
    <section className="tc-hospital">
      <div className="tc-shell tc-shell--wide tc-hospital-layout">
        <div className="reveal tc-hospital-copy">
          <h2 className="tc-heading">{heading}</h2>
          <div className="tc-rich-copy">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="reveal tc-hospital-media">
          <div className="tc-gallery-viewport" ref={emblaRef}>
            <div className="tc-gallery-track">
              {images.map((image, index) => (
                <div className="tc-gallery-slide" key={index}>
                  <img src={image} alt="" loading={index === 0 ? 'eager' : 'lazy'} />
                </div>
              ))}
            </div>
          </div>

          <div className="tc-carousel-dots tc-carousel-dots--gallery" aria-label="Paginação da galeria">
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

        <div className="reveal tc-hospital-bullets">
          {bullets.map((bullet, index) => (
            <div className="tc-bullet" key={index}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              <p>{bullet}</p>
            </div>
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
