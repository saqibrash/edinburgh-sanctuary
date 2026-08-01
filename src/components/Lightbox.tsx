import { useCallback,useEffect,useRef } from "react";

const Lightbox = ({
  items,
  index,
  onClose,
  onIndex,
}: {
  items: { src: string; alt: string }[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
}) => {
  const touchX = useRef<number | null>(null);
  const open = index !== null;

  const go = useCallback(
    (dir: number) => {
      if (index === null) return;
      onIndex((index + dir + items.length) % items.length);
    },
    [index,items.length,onIndex]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown",onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown",onKey);
      document.body.style.overflow = prev;
    };
  },[open,go,onClose]);

  if (index === null) return null;
  const item = items[index];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.alt}
      onClick={onClose}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/90 backdrop-blur-sm p-4 md:p-10 animate-in fade-in"
    >
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        aria-label="Close image viewer"
        className="absolute top-4 right-4 md:top-6 md:right-6 w-12 h-12 rounded-full border border-cream/40 text-cream text-2xl leading-none flex items-center justify-center hover:bg-cream/15 transition-colors"
      >
        ×
      </button>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); go(-1); }}
        aria-label="Previous image"
        className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-cream/40 text-cream flex items-center justify-center hover:bg-cream/15 transition-colors"
      >
        ‹
      </button>
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); go(1); }}
        aria-label="Next image"
        className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-cream/40 text-cream flex items-center justify-center hover:bg-cream/15 transition-colors"
      >
        ›
      </button>

      <figure className="max-w-[92vw] max-h-[86vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
        <img
          src={item.src}
          alt={item.alt}
          className="max-w-[92vw] max-h-[76vh] w-auto h-auto object-contain rounded-md shadow-2xl"
        />
      </figure>
    </div>
  );
};

export default Lightbox;
