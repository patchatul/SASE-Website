"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { animate, motion, useInView, useMotionValue } from "motion/react";
 
type MotionCardRowProps<T> = {
  items: T[];
  getKey: (item: T, index: number) => string;
  renderItem: (item: T, index: number) => ReactNode;
  /** ms between auto-advances on phone */
  interval?: number;
  className?: string;
  /** columns on laptop (default 3) */
  columns?: number;
  /** below this screen width (px) it becomes the auto-scroll carousel (default 768) */
  carouselBelow?: number;
};
 
const glide = { type: "tween", duration: 0.9, ease: [0.4, 0, 0.2, 1] } as const;
 
/**
 * - md+: 3 columns in one row, cards fade/slide in when they load
 * - phone: one card per screen, draggable, springy auto-advance, dots
 * - lazy: nothing renders until the row is near the viewport
 */
export default function MotionCardRow<T>({
  items,
  getKey,
  renderItem,
  interval = 5000,
  className = "",
  columns = 3,
  carouselBelow = 768,
}: MotionCardRowProps<T>) {
  const rootRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { margin: "200px" });
 
  const [ready, setReady] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
  const [width, setWidth] = useState(0);
  const [index, setIndex] = useState(0);
 
  const widthRef = useRef(0);
  const indexRef = useRef(0);
  const pausedUntil = useRef(0);
  const x = useMotionValue(0);
 
  // Lazy: mark ready the first time the row gets near the screen
  useEffect(() => {
    if (inView) setReady(true);
  }, [inView]);
 
  // Track phone vs laptop
  useEffect(() => {
    const query = window.matchMedia(`(max-width: ${carouselBelow - 1}px)`);
    const update = () => setIsPhone(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [carouselBelow]);
 
  // Measure the carousel width (keeps the current card aligned on resize)
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const observer = new ResizeObserver(() => {
      widthRef.current = el.clientWidth;
      setWidth(el.clientWidth);
      x.set(-indexRef.current * el.clientWidth);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [isPhone, ready, x]);
 
  function snap(next: number) {
    indexRef.current = next;
    setIndex(next);
    animate(x, -next * widthRef.current, glide);
  }
 
  function pause() {
    pausedUntil.current = Date.now() + 8000;
  }
 
  // Auto-advance (phone only, only while visible, respects reduced motion)
  useEffect(() => {
    if (!ready || !isPhone || items.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
 
    const id = window.setInterval(() => {
      if (!inView || document.hidden || Date.now() < pausedUntil.current)
        return;
      snap((indexRef.current + 1) % items.length);
    }, interval);
    return () => window.clearInterval(id);
    
  }, [ready, isPhone, inView, items.length, interval]);
 
  return (
    <div ref={rootRef} className={`w-full ${className}`}>
      {!ready ? (
        // Placeholder so the page doesn't jump before cards load
        <div
          className="grid gap-6"
          style={{
            gridTemplateColumns: isPhone
              ? "minmax(0, 1fr)"
              : `repeat(${columns}, minmax(0, 1fr))`,
          }}
        >
          {(isPhone ? items.slice(0, 1) : items).map((item, i) => (
            <div
              key={getKey(item, i)}
              className="h-64 animate-pulse rounded-2xl bg-white/50"
            />
          ))}
        </div>
      ) : isPhone ? (
        <>
          <div className="relative">
          <div ref={viewportRef} className="overflow-hidden">
            <motion.div
              className="flex cursor-grab active:cursor-grabbing"
              style={{ x, touchAction: "pan-y" }}
              drag="x"
              dragConstraints={{
                left: -(items.length - 1) * width,
                right: 0,
              }}
              dragElastic={0.15}
              onDragStart={pause}
              onDragEnd={(_, info) => {
                const swipe = info.offset.x + info.velocity.x * 0.2;
                let next = indexRef.current;
                if (swipe < -60) next += 1;
                else if (swipe > 60) next -= 1;
                snap(Math.max(0, Math.min(items.length - 1, next)));
              }}
            >
              {items.map((item, i) => (
                <div key={getKey(item, i)} className="w-full shrink-0 p-2">
                  {renderItem(item, i)}
                </div>
              ))}
            </motion.div>
          </div>
 
          {/* Back / next buttons */}
          {items.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous card"
                onClick={() => {
                  pause();
                  snap((indexRef.current - 1 + items.length) % items.length);
                }}
                className="absolute top-1/2 left-0 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border-2 border-(--color-primary) bg-(--color-secondary) text-(--color-primary) shadow-[2px_2px_0_0_var(--color-primary)] transition hover:scale-110"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M15 5l-7 7 7 7" />
                </svg>
              </button>
              <button
                type="button"
                aria-label="Next card"
                onClick={() => {
                  pause();
                  snap((indexRef.current + 1) % items.length);
                }}
                className="absolute top-1/2 right-0 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border-2 border-(--color-primary) bg-(--color-secondary) text-(--color-primary) shadow-[2px_2px_0_0_var(--color-primary)] transition hover:scale-110"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
          </div>
 
          <div className="mt-3 flex justify-center gap-2">
            {items.map((item, i) => (
              <button
                key={getKey(item, i)}
                type="button"
                aria-label={`Go to card ${i + 1}`}
                onClick={() => {
                  pause();
                  snap(i);
                }}
                className={`h-2.5 rounded-full border border-current transition-all ${
                  i === index ? "w-6 bg-current" : "w-2.5"
                }`}
              />
            ))}
          </div>
        </>
      ) : (
        <div
          className="grid gap-6"
          style={{
            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          }}
        >
          {items.map((item, i) => (
            <motion.div
              key={getKey(item, i)}
              className="h-full"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: "easeOut" }}
            >
              {renderItem(item, i)}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
