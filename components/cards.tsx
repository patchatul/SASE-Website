"use client";
import Image from "next/image";
import type { ReactNode } from "react";
import MotionCardRow, { PopIn } from "@/components/motionCardRow";
 
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
   CardList: lays cards out as a normal grid OR the motion carousel
   ============================================================ */
// Tailwind needs full class names, so list them out
const lgCols: Record<number, string> = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
  6: "lg:grid-cols-6",
};
 
type CardListProps<T> = {
  items: T[];
  getKey: (item: T, index: number) => string;
  renderItem: (item: T, index: number) => ReactNode;
  /** "grid" = normal responsive grid, "carousel" = auto-scrolling MotionCardRow */
  mode?: "grid" | "carousel";
  /** with MORE cards than this (default 5) it becomes the auto-scroll carousel on every
      screen, laptop too, and shows 4 at a time. Use Infinity to turn this off. */
  scrollAbove?: number;
  /** cards per row on laptop (default: number of items, max 6) */
  columns?: number;
  /** carousel only: below this width (px) it is the carousel. 768 phone, 1024 tablet, 99999 always */
  carouselBelow?: number;
  /** carousel only: ms between auto-advances */
  interval?: number;
  /** extra classes, e.g. "max-w-6xl" so a few cards don't stretch too wide */
  className?: string;
};
 
export function CardList<T>({
  items,
  getKey,
  renderItem,
  mode = "grid",
  columns,
  carouselBelow = 1024,
  interval,
  scrollAbove = 5,
  className = "",
}: CardListProps<T>) {
  
  const tooMany = items.length > scrollAbove;
  const cols = Math.max(
    1,
    Math.min(columns ?? (tooMany ? 4 : items.length), 6),
  );
  return (
    <div className={`mx-auto w-full ${className}`}>
      {mode === "carousel" || tooMany ? (
        <MotionCardRow
          items={items}
          getKey={getKey}
          renderItem={renderItem}
          columns={cols}
          carouselBelow={carouselBelow}
          scrollAbove={scrollAbove}
          interval={interval}
        />
      ) : (
        <CardGrid
          items={items}
          getKey={getKey}
          renderItem={renderItem}
          columns={cols}
        />
      )}
    </div>
  );
}
 
/** Normal grid: 1 column on phone, 2 on small screens, `columns` on laptop. */
export function CardGrid<T>({
  items,
  getKey,
  renderItem,
  columns,
}: {
  items: T[];
  getKey: (item: T, index: number) => string;
  renderItem: (item: T, index: number) => ReactNode;
  columns: number;
}) {
  return (
    <div
      className={`grid w-full grid-cols-1 gap-6 p-2 sm:grid-cols-2 ${lgCols[columns]}`}
    >
      {items.map((item, i) => (
        // PopIn keeps every box the same height and pops it up on scroll
        <PopIn key={getKey(item, i)} delay={(i % columns) * 0.1}>
          {renderItem(item, i)}
        </PopIn>
      ))}
    </div>
  );
}
 