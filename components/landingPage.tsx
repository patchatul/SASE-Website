"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import Link from "next/link";
import PandaEE from "@/public/panda_stickers/pandaEE.png";
import { CountUp, PopIn } from "@/components/motionCardRow";
import { InfoCard, CardBox, CardList } from "@/components/cards";
import {
  memberImages,
  siteStats,
  mission,
  offers,
  projectTeams,
  bigLittle,
  eboard,
} from "@/data/membersInfo";

/*main landing page */

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
        {/*slideshow images */}
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
        {/*words on top of slideshow images */}
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
              className="text-md rounded-full border-2  bg-(--light-blue) px-6 py-3 transition hover:scale-110 hover:border-white"
            >
              Join us
            </Link>
            <Link
              href="/events"
              className="text-md rounded-full border-2 bg-(--light-blue) px-6 py-3 transition hover:scale-110 hover:border-white"
            >
              See events
            </Link>
          </div>
        </div>
      </main>

      <div>
        {/*who we are */}
        <section className="w-full bg-linear-to-b from-(--color-secondary) via-white to-(--color-secondary) text-(--color-primary)">
          <div className="mx-auto flex w-full flex-col items-center gap-5  text-center">
            {/*grid*/}
            <div className="mx-auto w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 items-center px-4 py-8 gap-4 md:gap-5">
              <div className="flex max-w-3xl flex-col text-center col-span-2 ">
                <h2 className="text-2xl md:text-3xl">Who we are</h2>
                <p className="text-3xl md:text-4xl text-left">
                  USF SASE is a student chapter of the Society of Asian
                  Scientists and Engineers at University of South Florida
                  (Tampa, Florida).
                </p>
              </div>
              {/*panda sticker on the right */}
              <div className="flex flex-col items-center gap-3 col-span-1">
                <div
                  className="group relative flex flex-col items-center"
                  tabIndex={0}
                >
                  <Image
                    src={PandaEE}
                    alt="USF SASE Panda Sticker"
                    width={120}
                  />
                  <div
                    role="tooltip"
                    className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-max max-w-56 -translate-x-1/2 translate-y-1 rounded-xl border-2 border-(--color-primary) bg-white px-3 py-2 text-center text-base text-(--color-primary) opacity-0 shadow-[3px_3px_0_0_var(--color-primary)] transition duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100"
                  >
                    Hi, this is{" "}
                    <span className="text-(--color-secondary)">ZUZU</span>.
                    <br />
                    USF SASE's Panda Mascot.
                  </div>
                  <Link
                    href="/about"
                    className="text-md rounded-full border-2 bg-(--light-blue) px-6 py-3 transition hover:scale-110 hover:border-white"
                  >
                    Learn more about us
                  </Link>
                </div>
              </div>
            </div>
            {/*a line for stat */}
            {/* Stats: navy box that pops up, numbers count from 0 */}
            <div className="w-full bg-(--color-primary) py-6 md:py-8">
              <PopIn className="mx-auto w-full max-w-6xl px-4">
                <div className="grid grid-cols-2 gap-y-6 md:grid-cols-4 md:divide-x md:divide-white/20">
                  {siteStats.map((stat) => (
                    <div
                      key={stat.label}
                      className="flex flex-col items-center gap-1 px-2"
                    >
                      <span className="text-4xl text-white md:text-5xl">
                        <CountUp value={stat.value} />
                      </span>
                      <span className="text-sm tracking-widest text-(--color-secondary) uppercase md:text-lg">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </PopIn>
            </div>
            {/*3 boxes for mission and what we offer */}
            <div className="flex w-full flex-col gap-8 max-w-6xl px-4 py-8">
              <h3 className="text-2xl md:text-3xl">Our Mission</h3>
              <CardList
                mode="grid"
                items={mission}
                getKey={(item) => item.title}
                renderItem={(item, index) => (
                  <InfoCard index={index} {...item} />
                )}
              />
              <h3 className="text-2xl md:text-3xl">What we offer</h3>
              <CardList
                mode="grid"
                items={offers}
                getKey={(item) => item.title}
                renderItem={(item, index) => (
                  <InfoCard index={index} {...item} />
                )}
              />
            </div>
          </div>
        </section>
        {/* programs */}
        <section className="w-full bg-(--color-primary) text-(--color-secondary) p-5">
          {/*projects*/}
          <h3 className="text-2xl md:text-3xl text-center pt-10">
            Our Programs
          </h3>
          <div className="mx-auto max-w-none flex w-full flex-col items-center gap-10 px-4 py-2 sm:px-6 sm:py-6 lg:px-10 lg:py-8 2xl:px-16">
            <h4 className="text-3xl md:text-4xl underline">Project Teams</h4>
            <div className="grid grid-cols-2 mx-auto max-w-4xl px-8">
              <p className="text-xl text-white md:text-2xl text-left">
                USF SASE provides the opportunity to work on real-world
                projects, collaborate with peers, and develop technical and
                professional skills.
              </p>
              <p className="text-right text-2xl">
                <span className="text-white text-4xl">5 </span>projects
                <br /> <span className="text-white text-4xl"> 30 </span>{" "}
                students
              </p>
            </div>
            <div className="w-full">
              {/*pull image cards from program page */}
              <CardList
                mode="carousel"
                carouselBelow={1024}
                items={projectTeams}
                getKey={(team) => team.name}
                renderItem={(team, index) => (
                  <CardBox index={index} showNumber {...team} />
                )}
              />
            </div>
            <Link
              href="/programs"
              className="text-(--color-primary) text-md rounded-full border-2 border-white bg-(--light-blue) px-6 py-3 transition hover:scale-110 hover:border-white"
            >
              View all Project Teams
            </Link>
          </div>
          {/*big-little */}
          <div className="bg-mx-auto max-w-none flex w-full flex-col items-center gap-10 px-4 py-4 sm:px-6 sm:py-8 lg:px-10 lg:py-10 2xl:px-16">
            <h4 className="text-3xl md:text-4xl underline">
              Big-Little Program
            </h4>
            <div className="mx-auto max-w-none grid grid-cols-1 md:grid-cols-3 ">
              <p className="text-left text-white text-xl md:text-2xl">
                USF SASE offers mentorship program where the experienced STEM
                upperclassmen are paired with mentees for 1-1 support.
              </p>
              {/*pull image cards from program page */}
              <CardList
              className="col-span-2"
                mode="carousel"
                carouselBelow={1024}
                items={bigLittle}
                getKey={(item) => item.name}
                renderItem={(item, index) => (
                  <CardBox index={index} {...item} />
                )}
              />
            </div>
            <Link
              href="/programs"
              className="text-(--color-primary) text-md rounded-full border-2 border-white bg-(--light-blue) px-6 py-3 transition hover:scale-110 hover:border-white"
            >
              View all Big-Little Members
            </Link>
          </div>
        </section>
        {/* e-board */}
        <section className="w-full bg-(--white) text-(--color-primary)">
          <div className="mx-auto flex w-full max-w-none flex-col items-center gap-10 px-4 py-10 sm:px-6 lg:px-10 lg:py-14 2xl:px-16">
            <h4 className="text-2xl md:text-3xl">Meet the E-boards</h4>
            <div className="grid grid-cols-2 mx-auto max-w-4xl px-8">
              <p className="text-xl md:text-2xl text-left">
                Our executive board leads USF SASE: planning events, running our
                programs, and supporting members all year long.
              </p>
              <p className="text-right text-2xl">
                <span className="text-4xl">{eboard.length} </span>
                officers
              </p>
            </div>
            <CardList
              mode="carousel"
              carouselBelow={1024}
              items={eboard}
              getKey={(member, i) => `${member.subtitle}-${i}`}
              renderItem={(member, index) => (
                <CardBox
                  index={index}
                  outline="dark"
                  placeholder="Photo"
                  {...member}
                />
              )}
            />
            <Link
              href="/eBoard"
              className="text-md rounded-full border-2 border-white bg-(--color-primary) text-(--color-secondary) px-6 py-3 transition hover:scale-110"
            >
              View all E-Board Members
            </Link>
          </div>
        </section>
        {/* events */}
        <section className="bg-(--color-secondary) w-full">
          <div className="mx-auto flex w-full max-w-none flex-col items-center gap-10 px-4 py-10 sm:px-6 lg:px-10 lg:py-14 2xl:px-16">
             <h4 className="text-2xl md:text-3xl">Events</h4>
            <div className="mx-auto max-w-4xl px-8">
              <p className="text-xl md:text-2xl text-left">
                Join our BullsConnect
              </p>
            </div>
            <Link
              href="https://bullsconnect.usf.edu/SASE/club_signup"
              className="text-md rounded-full border-2  bg-(--light-blue) px-6 py-3 transition hover:scale-110 hover:border-white"
            >
              Join our BullsConnect
            </Link>
          </div>
        </section>
        {/* add later contacts = footer ? */}
        {/*<section>

        </section>*/}
      </div>
    </div>
  );
}
