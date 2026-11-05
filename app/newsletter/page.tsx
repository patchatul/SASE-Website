import type { Metadata } from "next";
import Image from "next/image";
import NewsletterCards, {
  type NewsletterEvent,
} from "@/components/newsletterCards";
import events from "@/data/newsletter.json";

export const metadata: Metadata = {
  title: "Newsletter | USF SASE",
  description: "Recaps and photos from USF SASE events, starting Fall 2026.",
};

/* Stickers at the top of the page. Files live in /public/panda_stickers.
   Swap the file names here to use different pandas. */
const stickerLeft = "/panda_stickers/pandaSitting.png";
const stickerRight = "/panda_stickers/pandaEE.png";

export default function NewsletterPage() {
  return (
    <main className="bg-linear-to-b from-[#89abe3] via-[#f4f7fc] via-30% to-[#d6e2f6] text-[#141b4d]">
      {/* HERO: same blue-to-off-white fade as the E-board page */}
      <section className="relative overflow-hidden px-8 pb-16 pt-24 text-center md:px-20">
        {/* panda stickers flanking the title (decorative) */}
        <Image
          src={stickerLeft}
          alt=""
          aria-hidden="true"
          width={300}
          height={300}
          className="pointer-events-none absolute left-2 top-4 h-auto w-24 -rotate-6 md:left-16 md:top-8 md:w-44"
        />
        <Image
          src={stickerRight}
          alt=""
          aria-hidden="true"
          width={300}
          height={300}
          className="pointer-events-none absolute right-2 top-4 h-auto w-24 rotate-6 md:right-16 md:top-8 md:w-44"
        />

        <h1 className="relative text-5xl font-semibold md:text-8xl">
          SASE NEWSLETTER
        </h1>
        <div className="mx-auto mt-6 h-2 w-36 rounded-full bg-[#84ca44]" />
        <p className="relative mx-auto mt-8 max-w-3xl text-2xl tracking-wide text-[#3f4444] md:text-3xl">
          See what we have been up to this year. Click an event to read about it
          and browse the photos.
        </p>
      </section>

      {/* EVENT CARDS (data comes from /data/newsletter.json) */}
      <section className="mx-auto max-w-300 px-8 pb-24 pt-8">
        <NewsletterCards events={events as NewsletterEvent[]} />
      </section>
    </main>
  );
}