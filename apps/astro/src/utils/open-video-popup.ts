export const openVideoPopup = (
  howVideoBtn: HTMLElement,
  playbackId: string,
  name: string,
  aspectRatio: string,
  maxWidth: number
) => {
  howVideoBtn.addEventListener('click', () => {
    function closeVideo(videoContainer: HTMLElement, playerContainer: HTMLElement) {
      videoContainer.classList.remove('is-visible');
      playerContainer.innerHTML = '';
      playerContainer.style.animation = '';
      document.body.removeChild(videoContainer);
    }

    const videoContainer = document.createElement('div');
    videoContainer.className = 'video-popup';
    videoContainer.innerHTML = `
          <div class="video-popup__overlay"></div>
          <div class="video-popup__player"></div>
        `;
    document.body.appendChild(videoContainer);

    const playerContainer = videoContainer.querySelector('.video-popup__player')! as HTMLElement;
    const overlay = videoContainer.querySelector('.video-popup__overlay')! as HTMLElement;

    const player = document.createElement('mux-player');
    player.setAttribute('playback-id', playbackId);
    player.setAttribute('autoplay', 'true');
    player.setAttribute('metadata-video-title', `Filmik z opinią - ${name}`);
    playerContainer.style.aspectRatio = aspectRatio;
    playerContainer.style.maxWidth = `${maxWidth}px`;
    playerContainer.style.animation = 'fadeInPlayer 1400ms var(--easing)';
    playerContainer.innerHTML = `
          <button class="video-popup__close" aria-label="Zamknij filmik">            
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5 5 15M5 5l10 10"/>
            </svg>
          </button>
        `;
    playerContainer.appendChild(player);
    videoContainer.classList.add('is-visible');

    playerContainer.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (!target.hasAttribute('playback-id')) {
        closeVideo(videoContainer, playerContainer);
      }
    });
    overlay.addEventListener('click', () => closeVideo(videoContainer, playerContainer));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeVideo(videoContainer, playerContainer);
    });
  });
};
