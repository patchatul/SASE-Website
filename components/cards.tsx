"use client";
import Image from "next/image";
import type { ReactNode } from "react";
import MotionCardRow from "@/components/motionCardRow";

/* ============================================================
   Types
   ============================================================ */
export type InfoItem = { title: string; text: string };

export type CardItem = {
  /** big title: team name, person name, program name... */
  name: string;
  /** optional small line under the title, e.g. "President" */
  subtitle?: string;
  description: string;
  /** path in /public, e.g. "/eboard/president.jpeg". Leave out for a placeholder. */
  image?: string;
};

/* ============================================================
   Shared colors
   ============================================================ */
const tones = [
  { box: "bg-(--color-secondary)", num: "text-[#97edfc]" },
  { box: "bg-[#c9e7b0]", num: "text-[#84ca44]" },
  { box: "bg-[#9faffc]", num: "text-[#6a6efc]" },
];

/* ============================================================
   InfoCard: numbered text box (mission / what we offer)
   ============================================================ */
export function InfoCard({
  index,
  title,
  text,
}: InfoItem & { index: number }) {
  const tone = tones[index % tones.length];
  return (
    <div
      className={`flex h-full flex-col gap-2 rounded-2xl border-2 border-(--color-primary) p-3 text-left shadow-[5px_5px_0_0_var(--color-primary)] ${tone.box} hover:scale-105`}
    >
      <span className={`text-xl ${tone.num}`}>
        {String(index + 1).padStart(2, "0")}
      </span>
      <h4 className="text-2xl">{title}</h4>
      <p className="text-base">{text}</p>
    </div>
  );
}

/* ============================================================
   CardBox: picture on top, name + info at the bottom
   ============================================================ */
// "light" outline for dark sections, "dark" outline for light sections
const outlines = {
  light: "border-white shadow-[5px_5px_0_0_white]",
  dark: "border-(--color-primary) shadow-[5px_5px_0_0_var(--color-primary)]",
};

export function CardBox({
  index,
  name,
  subtitle,
  description,
  image,
  showNumber = false,
  outline = "light",
  placeholder = "USF SASE",
}: CardItem & {
  index: number;
  /** show 1, 2, 3... before the title */
  showNumber?: boolean;
  outline?: keyof typeof outlines;
  /** text shown when there is no image yet */
  placeholder?: string;
}) {
  const tone = tones[index % tones.length];
  return (
    <div
      className={`mx-auto flex h-full w-full max-w-80 flex-col overflow-hidden rounded-2xl border-2 text-left text-(--color-primary) transition hover:scale-105 lg:max-w-none ${outlines[outline]} ${tone.box}`}
    >
      <div className="relative aspect-4/3 w-full border-b-2 border-(--color-primary)">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            sizes="(min-width: 1024px) 25vw, 90vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-(--color-primary)">
            {placeholder}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-3">
        <h4 className="text-2xl">
          {showNumber && <span className={tone.num}>{index + 1} </span>}
          {name}
        </h4>
        {subtitle && (
          <p className="text-sm tracking-wide uppercase opacity-70">
            {subtitle}
          </p>
        )}
        <p className="text-base">{description}</p>
      </div>
    </div>
  );
}

/* ============================================================
   CardList: always ONE row.
   - phone (below md): 1 card at a time, motion carousel (any card count)
   - laptop, <= scrollAbove cards: all cards in one static row
   - laptop, >  scrollAbove cards: one row, `columns` visible at a time,
     auto-scroll + next/prev buttons, pauses on hover
   ============================================================ */
type CardListProps<T> = {
  items: T[];
  getKey: (item: T, index: number) => string;
  renderItem: (item: T, index: number) => ReactNode;
  /** "carousel" forces the laptop carousel even for few cards */
  mode?: "grid" | "carousel";
  /** laptop: with MORE cards than this it becomes the carousel (default 3).
      Set higher to keep more cards in a static row. */
  scrollAbove?: number;
  /** MAX cards per row on laptop (default 4 for carousel, item count otherwise, max 6).
      Fewer are shown automatically when the row is narrow, e.g. columns={3}. */
  columns?: number;
  /** smallest card width in px on laptop, decides how many fit (default 280) */
  minCardWidth?: number;
  /** below this width (px) it is always the 1-card carousel (default 768 = md) */
  carouselBelow?: number;
  /** ms between auto-advances */
  interval?: number;
  /** true = stop autoscroll when the OS "reduce motion" setting is on (default false) */
  respectReducedMotion?: boolean;
  /** extra classes, e.g. "max-w-6xl" so a few cards don't stretch too wide */
  className?: string;
};

export function CardList<T>({
  items,
  getKey,
  renderItem,
  mode = "grid",
  columns,
  minCardWidth,
  carouselBelow = 768,
  interval,
  respectReducedMotion,
  scrollAbove = 3,
  className = "",
}: CardListProps<T>) {
  const threshold = mode === "carousel" ? 0 : scrollAbove;
  const scrolls = items.length > threshold;
  const cols = Math.max(
    1,
    Math.min(columns ?? (scrolls ? 4 : items.length), 6),
  );
  return (
    <div className={`mx-auto w-full ${className}`}>
      <MotionCardRow
        items={items}
        getKey={getKey}
        renderItem={renderItem}
        columns={cols}
        minCardWidth={minCardWidth}
        carouselBelow={carouselBelow}
        scrollAbove={threshold}
        interval={interval}
        respectReducedMotion={respectReducedMotion}
      />
    </div>
  );
}
import type { Member } from "@/data/membersInfo";

/* PolaroidCard: the tilted polaroid from the E-Board page.
   Use inside CardList so it scrolls like the other card rows. */
export default function PolaroidCard({
  member,
  photo,
  index,
}: {
  member: Member;
  photo?: string;
  index: number;
}) {
  return (
    // pt-4 leaves room for the tape so the carousel doesn't clip it
    <div className="h-full pt-4">
      <div
        className={`relative flex h-full flex-col mx-auto w-full max-w-60 rounded-2xl border-2 border-[#141b4d] bg-white p-3 pb-4 text-left shadow-[4px_4px_0_#141b4d] transition duration-300 hover:-translate-y-2 hover:rotate-0 ${
          index % 2 === 0 ? "-rotate-2" : "rotate-2"
        }`}
      >
        {/* green tape */}
        <div className="absolute -top-3 left-1/2 h-5 w-20 -translate-x-1/2 -rotate-3 bg-[#bfe0a1]/80" />

        {/* photo */}
        <div className="relative flex aspect-5/4 w-full items-center justify-center overflow-hidden rounded-lg bg-[#d0d0ce] text-lg text-[#3f4444]">
          {photo ? (
            <Image
              src={photo}
              alt={member.name}
              fill
              sizes="(min-width: 1024px) 25vw, 90vw"
              className="object-cover object-top"
            />
          ) : (
            "[PHOTO]"
          )}
        </div>

        {/* caption strip */}
        <div className="flex flex-1 flex-col pt-3 text-center">
          <h3 className="text-xl font-semibold text-[#141b4d]">
            {member.name}
          </h3>
          <p className="mt-1 text-base text-[#3f4444]">{member.role.trim()}</p>
        </div>
      </div>
    </div>
  );
}