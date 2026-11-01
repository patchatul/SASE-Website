"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { animate, motion, useInView, useMotionValue, useReducedMotion } from "motion/react";


/* PopIn: any box pops up (fade + rise + grow) when scrolled into view.
   <PopIn delay={0.1}>...</PopIn>*/
export function PopIn({
  children,
  delay = 0,
  className = "h-full",
}: {
  children: ReactNode;
  /** seconds, use to stagger boxes in a row */
  delay?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* CountUp: counts from 0 to a number when scrolled into view.
   <CountUp value="2,123+" />  ->  0 ... 2,123+
   Keeps any commas and the + / suffix from the text. */
export function CountUp({
  value,
  duration = 2,
}: {
  value: string;
  /** seconds */
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const match = value.match(/^([\d,]+)(.*)$/);
  const target = match ? Number(match[1].replace(/,/g, "")) : 0;
  const suffix = match ? match[2] : "";
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView || !match) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(target);
      return;
    }
    const controls = animate(0, target, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setShown(Math.round(v)),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, target, duration]);

  if (!match) return <span>{value}</span>;
  return (
    <span ref={ref} className="tabular-nums">
      {shown.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}

type MotionCardRowProps<T> = {
  items: T[];
  getKey: (item: T, index: number) => string;
  renderItem: (item: T, index: number) => ReactNode;
  /** ms between auto-advances */
  interval?: number;
  className?: string;
  /** MAX cards visible at once on laptop (default 4). Fewer are shown when the row is narrow. */
  columns?: number;
  /** laptop: smallest card width in px; decides how many cards fit (default 280) */
  minCardWidth?: number;
  /** true = stop autoscroll when the OS "reduce motion" setting is on (default false) */
  respectReducedMotion?: boolean;
  /** below this screen width (px) it is ALWAYS a 1-card carousel (default 768 = Tailwind md) */
  carouselBelow?: number;
  /** laptop: with MORE cards than this it becomes a 1-row carousel,
      otherwise all cards sit in one static row (default 3) */
  scrollAbove?: number;
};

const glide = { type: "tween", duration: 0.9, ease: [0.4, 0, 0.2, 1] } as const;

const arrowBtn =
  "absolute top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border-2 border-(--color-primary) bg-(--color-secondary) text-(--color-primary) shadow-[2px_2px_0_0_var(--color-primary)] transition hover:scale-110";

/**
 * - phone (< carouselBelow): ALWAYS 1 card at a time, draggable, auto-advance, arrows, dots
 * - laptop, cards <= scrollAbove: every card in ONE static row
 * - laptop, cards  > scrollAbove: ONE row showing `columns` cards, auto-scroll,
 *   arrows, dots, drag, and it pauses while the mouse is over it
 * - lazy: nothing renders until the row is near the viewport
 */
export default function MotionCardRow<T>({
  items,
  getKey,
  renderItem,
  interval = 5000,
  className = "",
  columns = 4,
  minCardWidth = 280,
  respectReducedMotion = false,
  carouselBelow = 768,
  scrollAbove = 3,
}: MotionCardRowProps<T>) {
  const rootRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { margin: "200px" });

  const [ready, setReady] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
  const [width, setWidth] = useState(0);
  const [index, setIndex] = useState(0);

  const [rootWidth, setRootWidth] = useState(0);

  // Laptop: as many cards as fit (each at least minCardWidth wide), never more than `columns`.
  // Side gutters (arrow buttons) take 2 x 48px, each card slot adds 24px of gap.
  const maxCols = Math.max(1, columns);
  const fit =
    rootWidth > 0
      ? Math.floor((rootWidth - 96) / (minCardWidth + 24))
      : maxCols;
  // Carousel (buttons + autoscroll) only on phone or with MORE than `scrollAbove` cards.
  // Otherwise every card is shown in one static row, no buttons.
  const carousel = isPhone || items.length > scrollAbove;
  const perView = isPhone
    ? 1
    : carousel
      ? Math.max(1, Math.min(maxCols, fit))
      : Math.max(1, Math.min(maxCols, items.length));
  const maxIndex = Math.max(0, items.length - perView);

  const widthRef = useRef(0);
  const indexRef = useRef(0);
  const perViewRef = useRef(perView);
  const maxIndexRef = useRef(maxIndex);
  const pausedUntil = useRef(0);
  const hovering = useRef(false);
  const focused = useRef(false);
  const x = useMotionValue(0);

  perViewRef.current = perView;
  maxIndexRef.current = maxIndex;

  // Lazy: mark ready the first time the row gets near the screen
  useEffect(() => {
    if (inView) setReady(true);
  }, [inView]);

  // Measure the whole row so the card count can follow the available width
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new ResizeObserver(() => setRootWidth(el.clientWidth));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Track phone vs laptop
  useEffect(() => {
    const query = window.matchMedia(`(max-width: ${carouselBelow - 1}px)`);
    const update = () => setIsPhone(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [carouselBelow]);

  // Measure the carousel width (keeps the current position aligned on resize)
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const observer = new ResizeObserver(() => {
      widthRef.current = el.clientWidth;
      setWidth(el.clientWidth);
      x.set((-indexRef.current * el.clientWidth) / perViewRef.current);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [carousel, ready, x]);

  // If cards-per-view or card count changes, keep the index in range
  useEffect(() => {
    const clamped = Math.min(indexRef.current, maxIndex);
    indexRef.current = clamped;
    setIndex(clamped);
    x.set((-clamped * widthRef.current) / perView);
  }, [perView, maxIndex, x]);

  function snap(next: number) {
    const clamped = Math.max(0, Math.min(maxIndexRef.current, next));
    indexRef.current = clamped;
    setIndex(clamped);
    animate(x, (-clamped * widthRef.current) / perViewRef.current, glide);
  }

  function goNext() {
    snap(indexRef.current >= maxIndexRef.current ? 0 : indexRef.current + 1);
  }

  function goPrev() {
    snap(indexRef.current <= 0 ? maxIndexRef.current : indexRef.current - 1);
  }

  function pause() {
    pausedUntil.current = Date.now() + 8000;
  }

  // Auto-advance: only while visible, not hovered (mouse), not keyboard-focused,
  // and not recently touched. It runs even if the OS has "reduce motion" on,
  // unless you pass respectReducedMotion.
  useEffect(() => {
    if (!ready || !carousel || maxIndex < 1) return;
    if (
      respectReducedMotion &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    const id = window.setInterval(() => {
      if (
        !inView ||
        document.hidden ||
        hovering.current ||
        focused.current ||
        Date.now() < pausedUntil.current
      )
        return;
      goNext();
    }, interval);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, carousel, inView, maxIndex, interval, respectReducedMotion]);

  const slotWidth = `${100 / perView}%`;

  return (
    <div
      ref={rootRef}
      className={`w-full ${className}`}
      // mouse hover pauses (touch taps don't, so a phone can never get stuck paused)
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") hovering.current = true;
      }}
      onPointerLeave={() => (hovering.current = false)}
      // keyboard focus pauses; clicking a button with the mouse does not
      onFocusCapture={(e) => {
        focused.current = e.target.matches(":focus-visible");
      }}
      onBlurCapture={() => (focused.current = false)}
    >
      {!ready ? (
        // Placeholder so the page doesn't jump before cards load
        <div
          className="grid gap-6"
          style={{
            gridTemplateColumns: `repeat(${carousel ? perView : Math.min(items.length, perView)}, minmax(0, 1fr))`,
          }}
        >
          {items
            .slice(0, carousel ? perView : items.length)
            .map((item, i) => (
              <div
                key={getKey(item, i)}
                className="h-64 animate-pulse rounded-2xl bg-white/50"
              />
            ))}
        </div>
      ) : carousel ? (
        <>
          {/* side padding = a gutter just for the arrow buttons, so they never cover a card */}
          <div className="relative px-11 md:px-12">
            <div ref={viewportRef} className="overflow-hidden">
              <motion.div
                className="flex cursor-grab active:cursor-grabbing"
                style={{ x, touchAction: "pan-y" }}
                drag={maxIndex > 0 ? "x" : false}
                dragConstraints={{
                  left: (-maxIndex * width) / perView,
                  right: 0,
                }}
                dragElastic={0.15}
                onDragStart={pause}
                onDragEnd={(_, info) => {
                  const swipe = info.offset.x + info.velocity.x * 0.2;
                  let next = indexRef.current;
                  if (swipe < -60) next += 1;
                  else if (swipe > 60) next -= 1;
                  snap(next);
                }}
              >
                {items.map((item, i) => (
                  <div
                    key={getKey(item, i)}
                    className="shrink-0 px-2 py-3 md:px-3"
                    style={{ width: slotWidth }}
                  >
                    {renderItem(item, i)}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Back / next buttons */}
            {maxIndex > 0 && (
              <>
                <button
                  type="button"
                  aria-label="Previous card"
                  onClick={() => {
                    pause();
                    goPrev();
                  }}
                  className={`${arrowBtn} left-0`}
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
                    goNext();
                  }}
                  className={`${arrowBtn} right-0`}
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Dots: one per position */}
          {maxIndex > 0 && (
            <div className="mt-3 flex justify-center gap-2">
              {Array.from({ length: maxIndex + 1 }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to position ${i + 1}`}
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
          )}
        </>
      ) : (
        // Laptop, few cards: everything in one static row
        <div
          className="grid gap-6 px-2 py-3"
          style={{
            gridTemplateColumns: `repeat(${Math.min(items.length, perView)}, minmax(0, 1fr))`,
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


/* panda that keeps floating up and down */
export function Float({
  children,
  distance = 10,
  duration = 2.5,
  className = "",
}: {
  children: ReactNode;
  /** px it moves up */
  distance?: number;
  /** seconds for one up-and-down loop */
  duration?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      animate={reduceMotion ? undefined : { y: [0, -distance, 0] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}