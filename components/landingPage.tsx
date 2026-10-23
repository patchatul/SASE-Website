"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import Link from "next/link";
import PandaEE from "@/public/panda_stickers/pandaEE.png";

const memberImages = [
  { src: "/members/workshop.jpeg", alt: "SASE USF Workshop" },
  { src: "/members/big_little1.jpeg", alt: "SASE USF Big Little event" },
  { src: "/members/big_little.jpeg", alt: "SASE USF Big Little event" },
  { src: "/members/karaoke.jpeg", alt: "SASE USF Karaoke event" },
  { src: "/members/project_team1.jpeg", alt: "SASE USF Project team" },
  { src: "/members/project_team.jpeg", alt: "SASE USF Project team" },
];

const goals = [
  {
    title: "Professional Development",
    text: "Prepare Asian heritage scientists and engineers for success in the global business world",
  },
  {
    title: "Diversity",
    text: "Celebrate diversity on campus and in the workplace",
  },
  {
    title: "Service",
    text: "Give members ways to contribute to their local communities",
  },
];

const offers = [
  {
    title: "Events",
    text: "Workshops and professional development events throughout the year",
  },
  {
    title: "Connections",
    text: "Meet and learn from professionals working in the field",
  },
  {
    title: "Leadership",
    text: "Leadership positions to build interpersonal skills and industry-sought qualities",
  },
];

const cardTones = [
  {
    box: "bg-(--color-secondary)",
    num: "text-[#97edfc]",
  },
  { box: "bg-[#c9e7b0]", num:"text-[#84ca44]"  },
  { box: "bg-[#9faffc]", num:"text-[#6a6efc]" },
];

function InfoCard({
  index,
  title,
  text,
}: {
  index: number;
  title: string;
  text: string;
}) {
  const tone = cardTones[index % cardTones.length];
  return (
    <div
      className={`flex flex-col gap-2 rounded-2xl border-2 border-(--color-primary) p-3 text-left shadow-[5px_5px_0_0_var(--color-primary)] m-3 md:m-1 ${tone.box} hover:scale-105`}
    >
      <span className={`text-xl ${tone.num}`}>
        {String(index + 1).padStart(2, "0")}
      </span>
      <h4 className="text-2xl">{title}</h4>
      <p className="text-base">{text}</p>
    </div>
  );
}

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
    <div className="w-full">
      <main className="relative isolate flex md:h-[80dvh] min-h-120 w-full flex-col justify-end overflow-hidden bg-(--color-primary) md:px-10 md:pt-12 lg:px-16 lg:pt-16">
        <div className="absolute inset-0 overflow-hidden md:inset-x-10 md:top-12 md:bottom-0 md:rounded-t-3xl md:shadow-2xl lg:inset-x-16 lg:top-16">
          <AnimatePresence initial={false}>
            <motion.div
              key={memberImages[activeImage].src}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 1.2 },
                scale: { duration: 5, ease: "linear" },
              }}
            >
              <Image
                src={memberImages[activeImage].src}
                alt={memberImages[activeImage].alt}
                fill
                priority={activeImage === 0}
                loading={activeImage === 0 ? "eager" : "lazy"}
                sizes="100vw"
                className="object-cover opacity-35"
              />
            </motion.div>
          </AnimatePresence>
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-(--color-secondary) via-white/10 to-transparent" />
        </div>
        <div className="relative z-10 mt-auto flex flex-col justify-center p-5 sm:p-8 lg:p-12">
          <h1 className="text-4xl text-white md:text-6xl">
            Society of Asian Scientists and Engineers
          </h1>
          <p className="text-3xl text-(--color-primary) md:text-4xl">
            University of South Florida
          </p>
          <div className="flex flex-wrap gap-3">
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
      </main>

      <div>
        <section className="w-full bg-linear-to-b from-(--color-secondary) via-white to-(--color-secondary) text-(--color-primary)">
          <div className="mx-auto flex w-full flex-col items-center gap-12 px-4 py-10 text-center sm:px-6 sm:py-12 lg:py-16">
            <div className="flex max-w-5xl flex-col text-left">
              <h2 className="text-3xl md:text-4xl">Who we are</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 place-items-center">
                <p className="text-xl md:text-2xl text-left">
                  SASE USF is a student chapter of the Society of Asian
                  Scientists and Engineers at University of South Florida
                  (Tampa, Florida).
                  <h2 className="text-3xl md:text-4xl">Our mission</h2>
                  to help Asian heritage scientists and engineers reach their
                  full potential in the global work force, to promote diversity
                  on campus and in the workplace, and to provide community
                  service.
                </p>

                <div className="flex flex-col items-center">
                  <Image
                    src={PandaEE}
                    alt="SASE USF Panda Sticker"
                    width={120}
                  />
                  <Link
                    href="/about"
                    className="text-md rounded-full border-2 bg-(--color-secondary) px-6 py-3 transition hover:scale-110 hover:border-white"
                  >
                    Learn more about us
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex w-full flex-col gap-5 max-w-5xl">
              <h3 className="text-3xl md:text-4xl">Our goals</h3>
              <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-3 md:gap-6 place-content-center">
                {goals.map((item, index) => (
                  <InfoCard key={item.title} index={index} {...item} />
                ))}
              </div>
              <h3 className="text-3xl md:text-4xl">What we offer</h3>
              <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-3 md:gap-6 place-content-center">
                {offers.map((item, index) => (
                  <InfoCard key={item.title} index={index} {...item} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
