import { useEffect, useRef } from 'preact/hooks';
import styles from './ReadMore.module.scss';
export default function ReadMore() {
  const readMoreRef = useRef<HTMLDivElement>(null);
  const wasHoveringOnMount = useRef(false);

  useEffect(() => {
    const readMore = readMoreRef.current;
    if (!readMore) return;

    const containerRef = readMore.closest('.container') as HTMLElement;
    if (!containerRef) return;
    const rect = containerRef.getBoundingClientRect();
    const mouseX = (event as MouseEvent)?.clientX ?? 0;
    const mouseY = (event as MouseEvent)?.clientY ?? 0;
    wasHoveringOnMount.current =
      mouseX >= rect.left && mouseX <= rect.right && mouseY >= rect.top && mouseY <= rect.bottom;

    let firstMove = false;
    let animationFrameId: number;

    const updatePosition = (e: MouseEvent) => {
      const rect = containerRef.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const offsetX = readMore.offsetWidth / 2;
      const offsetY = readMore.offsetHeight / 2;

      readMore.style.transform = `translate(${x - offsetX}px, ${y - offsetY}px)`;
      readMore.style.transition = firstMove
        ? 'transform 300ms cubic-bezier(0.19, 1, 0.22, 1), opacity 100ms ease-out'
        : 'opacity 100ms ease-out';
      firstMove = true;
    };

    const handleMouseEnter = () => {
      if (!wasHoveringOnMount.current) {
        readMore.style.opacity = '1';
        containerRef.style.cursor = 'none';
        firstMove = false;
      }
    };

    const handleMouseLeave = () => {
      readMore.style.opacity = '0';
      containerRef.style.cursor = 'pointer';
      wasHoveringOnMount.current = false;
      cancelAnimationFrame(animationFrameId);
    };

    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => updatePosition(e));
    };

    containerRef.addEventListener('mouseenter', handleMouseEnter);
    containerRef.addEventListener('mouseleave', handleMouseLeave);
    containerRef.addEventListener('mousemove', handleMouseMove);

    return () => {
      containerRef.removeEventListener('mouseenter', handleMouseEnter);
      containerRef.removeEventListener('mouseleave', handleMouseLeave);
      containerRef.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      containerRef.style.cursor = 'pointer';
    };
  }, []);

  return (
    <div ref={readMoreRef} className={styles.readMore}>
      Przeczytaj
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none">
        <path
          stroke="#5F6D62"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.25"
          d="M2 6h8m0 0L7 3m3 3L7 9"
        />
      </svg>
    </div>
  );
}
