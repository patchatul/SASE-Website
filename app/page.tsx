"use client";
import Image from "next/image";
import MenuBar from "@/components/menubar";
import Footer from "@/components/footer";
import About from "@/app/about/page";
import Contacts from "@/app/contacts/page";
import Eboard from "@/app/eBoard/page";
import Events from "@/app/events/page";
import Programs from "@/app/programs/page";
import ProjectTeam from "@/components/projectTeam";
import BigLittle from "@/components/bigLittle";
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

export default function Home() {
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
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <nav className="">
        <MenuBar />
      </nav>
      <main className="relative flex w-full items-center justify-center overflow-hidden bg-linear-to-t from-(--color-secondary) to-(--color-primary) min-h-150">
      
        <div className="relative flex flex-col justify-center items-cneter min-h-100 w-full overflow-hidden transition-transform duration-500 ease-out">
          
          <AnimatePresence>
            <motion.div
              key={memberImages[activeImage].src}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                opacity: { duration: 1.2 },
                scale: { duration: 5 },
              }}
            >
              <Image
                src={memberImages[activeImage].src}
                alt={memberImages[activeImage].alt}
                fill
                priority={activeImage === 0}
                loading={activeImage === 0 ? "eager" : "lazy"}
                sizes="(min-width: 2048px) 66vw, 100vw"
                className="object-cover opacity-25"
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col justify-center p-5 sm:p-8 lg:p-12">
            <h1 className="text-4xl text-white drop-shadow-lg md:text-5xl">
              Society of Asian Scientists and Engineers
            </h1>
            <p className="text-2xl text-(--color-secondary) drop-shadow-lg md:text-3xl">
              University of South Florida
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="https://bullsconnect.usf.edu/SASE/club_signup"
                className="text-md rounded-full border-2 bg-(--color-secondary) px-6 py-3 transition hover:scale-105 hover:border-white"
              >
                Join us
              </Link>
              <Link
                href="/events"
                className="text-md rounded-full border-2 bg-(--color-secondary) px-6 py-3 transition hover:scale-105 hover:border-white"
              >
                See events
              </Link>
            </div>
          </div>
        </div>
      </main>

      <div className="flex w-full flex-col items-center justify-center px-5 text-center md:px-20">
        <div className="bg-linear-to-r from-(--color-secondary) to-(--color-primary) text-(--color-primary)">
          <p></p>
        </div>
        <About />
        <Events />
        <Programs />
        <BigLittle />
        <ProjectTeam />
        <Eboard />
        <Contacts />
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
