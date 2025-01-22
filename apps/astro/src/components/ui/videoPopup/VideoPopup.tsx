import { useEffect, useRef, useState } from 'preact/hooks';
import styles from './VideoPopup.module.scss';

type VideoPopupProps = {
  playbackId: string;
  children: React.ReactNode;
  buttonText?: string;
  name: string;
  aspectRatio: string;
  maxWidth: number;
  forceAspectRatio?: boolean;
  shadow?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export default function VideoPopup({
  playbackId,
  children,
  buttonText = 'Zobacz wideo',
  name,
  aspectRatio,
  maxWidth,
  forceAspectRatio = false,
  shadow = false,
}: VideoPopupProps) {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const openButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsVideoOpen(false);
        openButtonRef.current?.focus();
      }
    };

    if (isVideoOpen) {
      document.addEventListener('keydown', handleEscapeKey);

      const popupContainer = document.createElement('div');
      popupContainer.className = 'video-popup is-visible';

      const [width, height] = aspectRatio.split(':').map(Number);
      const aspectHeight = (maxWidth * height) / width;

      popupContainer.innerHTML = `
        <div class="video-popup__overlay"></div>
        <div class="video-popup__player" style="
          aspect-ratio: ${aspectRatio}; 
          max-width: ${maxWidth}px; 
          width: 100%;
          height: ${aspectHeight}px;
          animation: fadeInPlayer 1400ms var(--easing);
        ">
          <button class="video-popup__close" aria-label="Zamknij filmik">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5 5 15M5 5l10 10"/>
            </svg>
          </button>
          <mux-player 
            playback-id="${playbackId}" 
            autoplay="true" 
            metadata-video-title="Filmik z opinią - ${name}"
            style="width: 100%; height: 100%;"
          ></mux-player>
        </div>
      `;

      const overlay = popupContainer.querySelector('.video-popup__overlay');
      const closeButton = popupContainer.querySelector('.video-popup__close');
      const player = popupContainer.querySelector('.video-popup__player');

      const closePopup = () => {
        setIsVideoOpen(false);
        document.body.removeChild(popupContainer);
        openButtonRef.current?.focus();
      };

      overlay?.addEventListener('click', closePopup);
      closeButton?.addEventListener('click', closePopup);
      player?.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        if (!target.hasAttribute('playback-id')) {
          closePopup();
        }
      });

      document.body.appendChild(popupContainer);

      if (closeButton instanceof HTMLElement) {
        closeButton.focus();
      }

      return () => {
        document.removeEventListener('keydown', handleEscapeKey);
        if (document.body.contains(popupContainer)) {
          document.body.removeChild(popupContainer);
        }
      };
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isVideoOpen, playbackId, name, aspectRatio, maxWidth]);

  return (
    <div
      className={`${styles.VideoThumbnail} ${forceAspectRatio ? styles.forceAspectRatio : ''} ${shadow ? styles.shadow : ''}`}
      style={{
        aspectRatio: forceAspectRatio ? `${aspectRatio.split(':')[0]}/${aspectRatio.split(':')[1]}` : 'auto',
      }}
    >
      {children}
      <button ref={openButtonRef} className={styles.showVideo} onClick={() => setIsVideoOpen(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none">
          <path
            fill="#9E9781"
            d="M2.5 2.495c0-.486 0-.729.101-.862a.5.5 0 0 1 .37-.198c.167-.01.369.125.773.394l5.258 3.505c.333.223.5.334.558.474a.5.5 0 0 1 0 .383c-.058.14-.225.252-.558.475L3.744 10.17c-.404.27-.606.404-.774.394a.5.5 0 0 1-.369-.198c-.101-.134-.101-.376-.101-.862v-7.01Z"
          />
        </svg>
        <span>{buttonText}</span>
      </button>
    </div>
  );
}
