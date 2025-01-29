import VideoPopup from '@/src/components/ui/videoPopup/VideoPopup';
import { formatDate } from '@/src/utils/format-date';
import { renderStars } from '@/src/utils/render-stars';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect } from 'preact/hooks';
import type { ClientTestimonialProps } from '../index.astro';
import styles from './slider.module.scss';

type SliderProps = {
  children: React.ReactNode;
  testimonials: ClientTestimonialProps[];
  index: number;
  googleData?: {
    rating: number;
    user_ratings_total: number;
  };
};

export default function Slider({ children, testimonials, googleData, index }: SliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    skipSnaps: false,
  });

  const countReviews = (number: number = 0) => {
    if (number >= 5) {
      return `${number} opinii`;
    } else if ([2, 3, 4].includes(number)) {
      return `${number} opinie`;
    } else if (number === 1) {
      return `${number} opinia`;
    } else {
      return 'Brak opinii';
    }
  };

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const setupIndicator = () => {
      const indicator = document.querySelector(`.${styles.indicator}`) as HTMLElement;
      const track = document.querySelector(`.${styles.embla__track}`) as HTMLElement;

      if (!indicator || !track) return;

      const updateIndicator = () => {
        const currentIndex = emblaApi.selectedScrollSnap();
        const slideCount = emblaApi.scrollSnapList().length;
        const slideWidth = 100 / slideCount;

        indicator.style.transform = `translateX(${currentIndex * 100}%)`;
        indicator.style.width = `${slideWidth}%`;
      };

      const handleTrackClick = (e: MouseEvent) => {
        const rect = track.getBoundingClientRect();
        const clickPosition = e.clientX - rect.left;
        const trackWidth = rect.width;

        const slideCount = emblaApi.scrollSnapList().length;
        const clickPercentage = clickPosition / trackWidth;
        const slideIndex = Math.floor(clickPercentage * slideCount);

        emblaApi.scrollTo(slideIndex);
      };

      track.addEventListener('click', handleTrackClick);
      emblaApi.on('select', updateIndicator);
      emblaApi.on('reInit', updateIndicator);
      updateIndicator();

      return () => {
        track.removeEventListener('click', handleTrackClick);
        emblaApi.off('select', updateIndicator);
        emblaApi.off('reInit', updateIndicator);
      };
    };

    return setupIndicator();
  }, [emblaApi]);

  return (
    <>
      <header className={styles.header}>
        {children}
        <div className={styles.controls}>
          <button
            className={`${styles.button} ${styles.button__prev}`}
            type="button"
            aria-label="Poprzednia opinia"
            onClick={scrollPrev}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none">
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M20.5 12.5h-16m0 0 6 6m-6-6 6-6"
              ></path>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none">
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M20.5 12.5h-16m0 0 6 6m-6-6 6-6"
              ></path>
            </svg>
          </button>
          <button
            className={`${styles.button} ${styles.button__next}`}
            type="button"
            aria-label="Następna opinia"
            onClick={scrollNext}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none">
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M4.5 12.5h16m0 0-6-6m6 6-6 6"
              ></path>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none">
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M4.5 12.5h16m0 0-6-6m6 6-6 6"
              ></path>
            </svg>
          </button>
        </div>
      </header>
      <div className={styles.embla}>
        <div className={styles.embla__viewport} ref={emblaRef}>
          <ul className={styles.embla__container}>
            {testimonials?.map(({ image, date, name, service, review, video }, i) => (
              <li
                className={styles.embla__slide}
                data-video={!!video}
                data-aspect-ratio={!!video ? video.asset.data.aspect_ratio : null}
                data-max-width={!!video ? video.asset.data.tracks[0].max_width.toString() : null}
                data-playback-id={!!video ? video.asset.playbackId : null}
              >
                {i === 0 && !!googleData && (
                  <div className={styles.rating}>
                    <div
                      className={styles.stars}
                      dangerouslySetInnerHTML={{ __html: renderStars(googleData.rating) }}
                    ></div>
                    <div className={styles.rating__text}>
                      <span>{googleData.rating.toFixed(1)}</span>
                      <span>{countReviews(googleData.user_ratings_total)}</span>
                    </div>
                  </div>
                )}
                {!!video ? (
                  <>
                    <VideoPopup
                      name={`${name} - filmik z opinii`}
                      aspectRatio={video.asset.data.aspect_ratio}
                      maxWidth={video.asset.data.tracks[0].max_width}
                      playbackId={video.asset.playbackId}
                      buttonText="Zobacz opinie"
                    >
                      <img
                        src={`https://image.mux.com/${video.asset.playbackId}/thumbnail.jpg`}
                        loading={index === 0 ? 'eager' : 'lazy'}
                        fetchPriority={index === 0 && i === 0 ? 'high' : 'auto'}
                        alt={`${name} - minitaruka opinii`}
                      />
                    </VideoPopup>
                    <div className={styles.info}>
                      <p className={styles.name}>{name}</p>
                      <p className={styles.service}>{service}</p>
                    </div>
                  </>
                ) : (
                  <>
                    {image && (
                      <img
                        src={image.src}
                        srcSet={image.srcSet.attribute}
                        alt={''}
                        loading={index === 0 ? 'eager' : 'lazy'}
                        fetchPriority={index === 0 && i === 0 ? 'high' : 'auto'}
                        sizes="44px"
                      />
                    )}
                    <p className={styles.name}>{name}</p>
                    <p className={styles.service}>{service}</p>
                    <div className={styles.review} dangerouslySetInnerHTML={{ __html: review }} />
                    <time className={styles.date}>{formatDate(new Date(date))}</time>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
        <button tabIndex={-1} aria-label="Przewiń do następnej opinii" className={styles.embla__track}>
          <div className={styles.line}>
            <div className={styles.indicator}></div>
          </div>
        </button>
      </div>
    </>
  );
}
