"use client";

import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";

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
