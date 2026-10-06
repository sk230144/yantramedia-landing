"use client";

import { FormEvent, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useInView, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export function Reveal({ children, className = "", delay = 0, x = 0, y = 28 }: { children: ReactNode; className?: string; delay?: number; x?: number; y?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/** Image cropped inside a fixed box, mirroring a Figma image-fill crop (percentages of the box). */
export function Crop({ src, className = "", alt = "", crop }: { src: string; className?: string; alt?: string; crop: { w: string; h: string; l: string; t: string } }) {
  return (
    <div className={`crop ${className}`}>
      <img src={src} alt={alt} style={{ width: crop.w, height: crop.h, left: crop.l, top: crop.t }} />
    </div>
  );
}

export function NavButton({ dir, disabled, onClick, label }: { dir: "prev" | "next"; disabled?: boolean; onClick: () => void; label: string }) {
  return (
    <motion.button type="button" className={`nav-btn nav-btn--${dir}`} onClick={onClick} disabled={disabled} aria-label={label} whileTap={disabled ? undefined : { scale: 0.92 }}>
      <span aria-hidden="true">&gt;</span>
    </motion.button>
  );
}

export function Dots({ count, active, onSelect, label }: { count: number; active: number; onSelect: (index: number) => void; label: string }) {
  return (
    <div className="dots" role="tablist" aria-label={label}>
      {Array.from({ length: count }, (_, index) => (
        <button key={index} type="button" role="tab" aria-selected={index === active} aria-label={`Slide ${index + 1}`} className={index === active ? "is-active" : ""} onClick={() => onSelect(index)} />
      ))}
    </div>
  );
}

/** Horizontal scroll-snap carousel state: tracks the visible slide and scrolls to a given one. */
export function useSnapCarousel(count: number) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const slides = () => Array.from(trackRef.current?.children ?? []) as HTMLElement[];

  const onScroll = useCallback(() => {
    const track = trackRef.current;
    const items = slides();
    if (!track || !items.length) return;
    const base = items[0].offsetLeft;
    let nearest = 0;
    items.forEach((item, i) => {
      if (Math.abs(item.offsetLeft - base - track.scrollLeft) < Math.abs(items[nearest].offsetLeft - base - track.scrollLeft)) nearest = i;
    });
    setIndex(nearest);
  }, []);

  const goTo = useCallback((target: number) => {
    const track = trackRef.current;
    const items = slides();
    const clamped = Math.max(0, Math.min(count - 1, target));
    if (!track || !items[clamped]) return;
    track.scrollTo({ left: items[clamped].offsetLeft - items[0].offsetLeft, behavior: "smooth" });
    setIndex(clamped);
  }, [count]);

  return { trackRef, index, onScroll, goTo };
}

export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, { duration: reduceMotion ? 0 : 1.6, ease, onUpdate: (latest) => setValue(Math.round(latest)) });
    return () => controls.stop();
  }, [inView, reduceMotion, to]);

  return <span ref={ref}>{value}{suffix}</span>;
}

export function EnquirySheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = previous; window.removeEventListener("keydown", onKey); };
  }, [open, onClose]);

  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSent(true); }

  return (
    <AnimatePresence onExitComplete={() => setSent(false)}>
      {open && (
        <motion.div className="sheet-backdrop" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div
            className="sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-title"
            onClick={(event) => event.stopPropagation()}
            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            drag="y" dragConstraints={{ top: 0, bottom: 0 }} dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={(_, info) => { if (info.offset.y > 120) onClose(); }}
          >
            <span className="sheet-grip" aria-hidden="true" />
            <button type="button" className="sheet-close" onClick={onClose} aria-label="Close">×</button>
            {sent ? (
              <div className="sheet-done">
                <h2 id="sheet-title">Thank you!</h2>
                <p>Our team will call you back shortly.</p>
                <button type="button" className="sheet-submit" onClick={onClose}>Done</button>
              </div>
            ) : (
              <form onSubmit={submit}>
                <h2 id="sheet-title">Get a Call Back</h2>
                <p>Tell us a little about your project.</p>
                <label><span className="sr-only">Your name</span><input name="name" placeholder="Your name" autoComplete="name" required /></label>
                <label><span className="sr-only">Phone number</span><input name="phone" type="tel" placeholder="Phone number" autoComplete="tel" required /></label>
                <label><span className="sr-only">Your requirement</span><textarea name="message" placeholder="Your requirement" rows={3} /></label>
                <button type="submit" className="sheet-submit">Enquire Now</button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
