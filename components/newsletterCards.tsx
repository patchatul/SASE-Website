"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/* ============================================================
   Types (match the shape of /data/newsletter.json)
   ============================================================ */
export type Media = {
  type: "image" | "video";
  /** path inside /public, e.g. "/newsletter/karaoke/1.jpg" */
  src: string;
  alt?: string;
};

export type NewsletterEvent = {
  id: string;
  title: string;
  date: string;
  /** short line shown on the card */
  summary: string;
  /** longer text shown when the card is opened */
  description: string;
  /** optional card photo; if empty, the first image in `media` is used */
  cover?: string;
  media: Media[];
};

/* ============================================================
   Shared styles (from the SASE UI design kit)
   ============================================================ */
const card = "rounded-2xl border-2 border-[#141b4d] shadow-[5px_5px_0_0_#141b4d]";
const dateChip =
  "inline-block rounded-full bg-[#bfe0a1] px-3 py-1 text-lg text-[#141b4d]";

function Placeholder({ label }: { label: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-[#d0d0ce] text-xl text-[#3f4444]">
      {label}
    </div>
  );
}

/* ============================================================
   Modal: description + horizontally scrollable gallery
   ============================================================ */
function EventModal({
  event,
  onClose,
}: {
  event: NewsletterEvent;
  onClose: () => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  // close on Escape, stop the page behind from scrolling
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  const slide = (direction: 1 | -1) =>
    trackRef.current?.scrollBy({ left: direction * 440, behavior: "smooth" });

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 md:p-8"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={event.title}
        onClick={(e) => e.stopPropagation()}
        className={`${card} relative max-h-[92vh] w-full max-w-5xl overflow-y-auto bg-[#e9e8e8] p-6 md:p-10`}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-2 cursor-pointer text-5xl leading-none"
        >
          ×
        </button>

        <span className={dateChip}>{event.date}</span>
        <h2 className="mt-3 pr-10 text-4xl font-medium md:text-6xl">
          {event.title}
        </h2>
        <div className="my-5 h-1.5 w-20 rounded-full bg-[#84ca44]" />
        <p className="mb-8 max-w-3xl text-2xl leading-relaxed text-[#3f4444]">
          {event.description}
        </p>

        {/* GALLERY */}
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-3xl">Gallery</h3>
          {event.media.length > 1 && (
            <div className="flex gap-2">
              <button
                onClick={() => slide(-1)}
                aria-label="Scroll gallery left"
                className="h-12 w-12 cursor-pointer rounded-full border-2 border-[#141b4d] text-2xl transition hover:bg-[#141b4d] hover:text-[#e9e8e8]"
              >
                ←
              </button>
              <button
                onClick={() => slide(1)}
                aria-label="Scroll gallery right"
                className="h-12 w-12 cursor-pointer rounded-full border-2 border-[#141b4d] text-2xl transition hover:bg-[#141b4d] hover:text-[#e9e8e8]"
              >
                →
              </button>
            </div>
          )}
        </div>

        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4"
        >
          {event.media.map((item, i) => (
            <div
              key={`${item.src}-${i}`}
              className="relative h-64 w-80 shrink-0 snap-center overflow-hidden rounded-xl border-2 border-[#141b4d] bg-[#d0d0ce] md:h-80 md:w-md"
            >
              {!item.src ? (
                <Placeholder
                  label={item.type === "video" ? "[VIDEO]" : "[PHOTO]"}
                />
              ) : item.type === "video" ? (
                <video
                  src={item.src}
                  controls
                  preload="metadata"
                  className="h-full w-full bg-black object-contain"
                />
              ) : (
                <Image
                  src={item.src}
                  alt={item.alt || event.title}
                  fill
                  sizes="(min-width: 768px) 448px, 320px"
                  className="object-cover"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   Card grid
   ============================================================ */
export default function NewsletterCards({
  events,
}: {
  events: NewsletterEvent[];
}) {
  const [selected, setSelected] = useState<NewsletterEvent | null>(null);

  return (
    <>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => {
          const cover =
            event.cover ||
            event.media.find((m) => m.type === "image" && m.src)?.src ||
            "";

          return (
            <button
              key={event.id}
              onClick={() => setSelected(event)}
              className={`${card} flex cursor-pointer flex-col overflow-hidden bg-white text-left transition hover:-translate-y-2 focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-[#84ca44]`}
            >
              <div className="relative aspect-[4/3] w-full border-b-2 border-[#141b4d]">
                {cover ? (
                  <Image
                    src={cover}
                    alt={event.title}
                    fill
                    sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                ) : (
                  <Placeholder label="[EVENT PHOTO]" />
                )}
              </div>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <span className={`${dateChip} self-start`}>{event.date}</span>
                <h2 className="text-3xl font-medium">{event.title}</h2>
                <p className="text-xl text-[#3f4444]">{event.summary}</p>
                <span className="mt-auto pt-2 text-xl underline decoration-[#84ca44] decoration-4 underline-offset-4">
                  See recap and photos
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {selected && (
        <EventModal event={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}