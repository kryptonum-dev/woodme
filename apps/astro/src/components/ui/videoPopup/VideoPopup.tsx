import MuxPlayer from '@mux/mux-player-react';
import { createPortal } from 'preact/compat';
import { useEffect, useState } from 'preact/hooks';
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

  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsVideoOpen(false);
    };

    if (isVideoOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isVideoOpen]);

  return (
    <div
      className={`${styles.VideoThumbnail} ${forceAspectRatio ? styles.forceAspectRatio : ''} ${shadow ? styles.shadow : ''}`}
      style={{
        aspectRatio: forceAspectRatio ? `${aspectRatio.split(':')[0]}/${aspectRatio.split(':')[1]}` : 'auto',
      }}
    >
      {children}
      <button className={styles.showVideo} onClick={() => setIsVideoOpen(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none">
          <path
            fill="#9E9781"
            d="M2.5 2.495c0-.486 0-.729.101-.862a.5.5 0 0 1 .37-.198c.167-.01.369.125.773.394l5.258 3.505c.333.223.5.334.558.474a.5.5 0 0 1 0 .383c-.058.14-.225.252-.558.475L3.744 10.17c-.404.27-.606.404-.774.394a.5.5 0 0 1-.369-.198c-.101-.134-.101-.376-.101-.862v-7.01Z"
          />
        </svg>
        <span>{buttonText}</span>
      </button>
      {isVideoOpen && (
        <div className={`video-popup is-visible`}>
          <div className="video-popup__overlay" onClick={() => setIsVideoOpen(false)} />
          <div
            className="video-popup__player"
            style={{
              aspectRatio: `${aspectRatio.split(':')[0]}/${aspectRatio.split(':')[1]}`,
              maxWidth: `${maxWidth}px`,
              animation: 'fadeInPlayer 1400ms var(--easing)',
            }}
            onClick={(e) => {
              const target = e.target as HTMLElement;
              if (!target.hasAttribute('playback-id')) {
                setIsVideoOpen(false);
              }
            }}
          >
            <button className="video-popup__close" aria-label="Zamknij filmik" onClick={() => setIsVideoOpen(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 5 5 15M5 5l10 10"
                />
              </svg>
            </button>
            <MuxPlayer playbackId={playbackId} autoPlay="true" metadata-video-title={`Filmik z opinią - ${name}`} />
          </div>
        </div>
      )}
    </div>
  );
}
