import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useRef, useState } from 'preact/hooks';
import type { ClientGalleryListProps } from '../index.astro';
import styles from './slider.module.scss';

type SliderProps = {
  galleryList: ClientGalleryListProps[];
  index: number;
};

export default function Slider({ galleryList, index }: SliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    skipSnaps: false,
  });
  const [currentGalleryOpen, setCurrentGalleryOpen] = useState(0);
  const [alreadySwitched, setAlreadySwitched] = useState(false);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const animationTimeouts = useRef<number[]>([]);

  useEffect(() => {
    if (!alreadySwitched) return;
    if (emblaApi) {
      emblaApi.scrollTo(0, true);

      emblaApi.reInit({
        align: 'start',
        skipSnaps: false,
      });
    }
    setAlreadySwitched(true);
  }, [currentGalleryOpen, emblaApi, alreadySwitched]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    emblaApi.on('select', onSelect);
    // Initial check
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  const handleGallerySwitch = (index: number) => {
    animationTimeouts.current.forEach((timeout) => clearTimeout(timeout));
    animationTimeouts.current = [];

    const viewport = emblaApi?.containerNode();
    const container = emblaApi?.slideNodes()[0]?.parentElement;

    if (viewport && container) {
      viewport.style.transition = 'opacity 0ms';
      viewport.style.opacity = '0';
      container.style.transition = 'opacity 0ms';
      container.style.opacity = '0';
      setCurrentGalleryOpen(index);

      const timeout1 = setTimeout(() => {
        viewport.style.opacity = '1';
        viewport.style.transition = 'none';

        emblaApi?.scrollTo(0, true);

        const newSlides = emblaApi?.slideNodes();
        if (newSlides) {
          newSlides.forEach((slide) => {
            slide.style.opacity = '0';
            slide.style.transform = 'translateY(2rem)';
            slide.style.transition = 'none';
          });
        }

        const timeout2 = setTimeout(() => {
          container.style.opacity = '1';

          newSlides?.forEach((slide, i) => {
            const timeout3 = setTimeout(() => {
              slide.style.transition = 'transform 1000ms cubic-bezier(0.19, 1, 0.22, 1), opacity 800ms';
              slide.style.opacity = '1';
              slide.style.transform = 'translateY(0)';

              const timeout4 = setTimeout(() => {
                slide.style.transition = 'none';
              }, 800);

              animationTimeouts.current.push(timeout4 as unknown as number);
            }, i * 80);

            animationTimeouts.current.push(timeout3 as unknown as number);
          });
        }, 50);

        animationTimeouts.current.push(timeout2 as unknown as number);
      }, 100);

      animationTimeouts.current.push(timeout1 as unknown as number);
    } else {
      setCurrentGalleryOpen(index);
    }
  };

  useEffect(() => {
    return () => {
      animationTimeouts.current.forEach((timeout) => clearTimeout(timeout));
    };
  }, []);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <>
      <div className={styles.gallerySelect}>
        {galleryList.map((gallery, i) => (
          <button
            aria-selected={currentGalleryOpen === i}
            onClick={() => handleGallerySwitch(i)}
            className={styles.tab}
          >
            {gallery.heading}
          </button>
        ))}
      </div>
      <div className={styles.embla}>
        <div className={styles.embla__viewport} ref={emblaRef}>
          <ul className={styles.embla__container}>
            {galleryList[currentGalleryOpen].images.map((image, i) => (
              <li className={styles.embla__slide}>
                <img
                  src={image.src}
                  srcSet={image.srcSet.attribute}
                  alt={galleryList[currentGalleryOpen].alts[i] || ''}
                  fetchPriority={index === 0 && i === 0 ? 'high' : 'auto'}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  sizes="(max-width: 42.375rem) 288px, (max-width: 48px) 43vw, 326px"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.controls}>
        <button
          className={`${styles.button} ${styles.button__prev}`}
          type="button"
          aria-label="Poprzednie zdjęcie"
          onClick={scrollPrev}
          disabled={!canScrollPrev}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
            <path
              d="M20 12H4m0 0 6 6m-6-6 6-6"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
            <path
              d="M20 12H4m0 0 6 6m-6-6 6-6"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
        <button
          className={`${styles.button} ${styles.button__next}`}
          type="button"
          aria-label="Następne zdjęcie"
          onClick={scrollNext}
          disabled={!canScrollNext}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 12H20M20 12L14 6M20 12L14 18"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 12H20M20 12L14 6M20 12L14 18"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </>
  );
}
