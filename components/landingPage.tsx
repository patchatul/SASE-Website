"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import Link from "next/link";

const memberImages = [
  { src: "/members/workshop.jpeg", alt: "SASE USF Workshop" },
  { src: "/members/big_little1.jpeg", alt: "SASE USF Big Little event" },
  { src: "/members/big_little.jpeg", alt: "SASE USF Big Little event" },
  { src: "/members/karaoke.jpeg", alt: "SASE USF Karaoke event" },
  { src: "/members/project_team1.jpeg", alt: "SASE USF Project team" },
  { src: "/members/project_team.jpeg", alt: "SASE USF Project team" },
];

export default function LandingPage() {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveImage(
        (currentImage) => (currentImage + 1) % memberImages.length,
      );
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, []);
  return (
    <div className="w-full bg-linear-to-t from-(--color-secondary) to-(--color-primary)">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-5 py-10 sm:px-8 sm:py-14 lg:grid-cols-2 lg:gap-12 lg:px-12 lg:py-20">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl text-white md:text-6xl">
            Society of Asian Scientists and Engineers
          </h1>
          <p className="text-3xl text-(--color-primary) md:text-4xl">
            University of South Florida
          </p>
          <div className="mt-2 flex flex-wrap gap-3">
            <Link
              href="https://bullsconnect.usf.edu/SASE/club_signup"
              className="text-md rounded-full border-2 bg-(--color-secondary) px-6 py-3 transition hover:scale-110 hover:border-white"
            >
              Join us
            </Link>
            <Link
              href="/events"
              className="text-md rounded-full border-2 bg-(--color-secondary) px-6 py-3 transition hover:scale-110 hover:border-white"
            >
              See events
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4">
          <div className="relative aspect-4/3 w-full overflow-hidden rounded-3xl border-2 border-white/30 bg-black/20 shadow-2xl">
            <AnimatePresence initial={false}>
              <motion.div
                key={memberImages[activeImage].src}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  opacity: { duration: 1 },
                  scale: { duration: 5, ease: "linear" },
                }}
              >
                <Image
                  src={memberImages[activeImage].src}
                  alt={memberImages[activeImage].alt}
                  fill
                  priority={activeImage === 0}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex gap-2">
            {memberImages.map((image, index) => (
              <button
                key={image.src}
                type="button"
                aria-label={`Show photo ${index + 1}`}
                onClick={() => setActiveImage(index)}
                className={`h-2.5 rounded-full transition-all ${
                  index === activeImage
                    ? "w-8 bg-white"
                    : "w-2.5 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      <section className="w-full bg-linear-to-r from-(--color-secondary) to-(--color-primary)">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 px-5 py-10 text-center sm:px-8 sm:py-14">
          <p className="text-lg text-white">
            USF SASE offers a variety of programs and initiatives, ranging from
            professional development through events, connections to
            professionals in the field, and leadership positions to develop
            interpersonal skills and build industry-sought qualities.
          </p>
          <Link href="/about" className="text-md rounded-full border-2 bg-(--color-secondary) px-6 py-3 transition hover:scale-110 hover:border-white"
            >
            Learn more about us
          </Link>
        </div>
      </section>
    </div>
  );
}
