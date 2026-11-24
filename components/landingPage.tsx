"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import Link from "next/link";
import PandaEE from "@/public/panda_stickers/pandaEE.png";
import PandaAir from "@/public/panda_stickers/air.png";
import { CountUp, Float, PopIn } from "@/components/motionCardRow";
import { InfoCard, CardBox, CardList } from "@/components/cards";
import {
  memberImages,
  siteStats,
  mission,
  offers,
  projectTeams,
  bigLittle,
  eboard,
  photos,
  eventTypes,
} from "@/data/membersInfo";
import PolaroidCard from "@/components/cards";

import NewsletterCards, {
  type NewsletterEvent,
} from "@/components/newsletterCards";
import events from "@/data/newsletter.json";

const sorted = [...(events as NewsletterEvent[])].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);
const latestOne = sorted.slice(0, 1);
const latestThree = sorted.slice(0, 3);

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 260, damping: 20 },
  },
};
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
      <main className="relative isolate flex min-h-160 w-full flex-col justify-end overflow-hidden bg-(--color-primary) md:min-h-175 md:h-[90dvh] md:px-10 md:pt-20 lg:px-16">
        {/*slideshow images */}
        <div className="absolute inset-0 overflow-hidden md:inset-x-10 md:top-20 md:bottom-0 md:rounded-t-3xl md:shadow-2xl lg:inset-x-16">
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
        <div className="relative z-10 mt-auto flex flex-col justify-center  gap-2 px-5 pt-5 pb-0 p-5 sm:p-8 lg:p-12">
          <h1 className="text-5xl text-white md:text-7xl">
            Society of Asian Scientists and Engineers
          </h1>
          <h2 className="text-3xl text-(--color-primary) md:text-5xl">
            University of South Florida
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="https://bullsconnect.usf.edu/SASE/club_signup"
              className="text-xl rounded-full border-2  bg-(--light-blue) px-6 py-3"
            >
              Join us
            </Link>
            <Link
              href="/events"
              className="text-xl rounded-full border-2 bg-(--light-blue) px-6 py-3"
            >
              See events
            </Link>
          </div>
        </div>
      </main>

      <div>
        {/*who we are */}
        <section className="w-full bg-linear-to-b from-(--color-secondary) via-white to-(--color-secondary) text-(--color-primary)">
          <div className="mx-auto flex w-full flex-col items-center gap-5  md:py-12 py-5 text-center">
            {/*grid*/}
            <div className="mx-auto w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 items-center px-4 py-8 gap-4 md:gap-5">
              <div className="flex max-w-3xl flex-col text-center col-span-2 ">
                <h2 className="text-3xl md:text-5xl pb-5">Who we are</h2>
                <h3 className="font-bebas text-3xl md:text-4xl text-left">
                  USF SASE is a student chapter of the Society of Asian
                  Scientists and Engineers at University of South Florida
                  (Tampa, Florida).
                </h3>
              </div>
              {/*panda sticker on the right */}
              <div className="flex flex-col items-center gap-3 col-span-1">
                <div
                  className="group relative flex flex-col items-center"
                  tabIndex={0}
                >
                  {" "}
                  <Float className="">
                    <Image
                      src={PandaEE}
                      alt="USF SASE Panda Sticker"
                      width={120}
                    />
                  </Float>
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
                    className="text-xl rounded-full border-2 bg-(--light-blue) px-6 py-3"
                  >
                    Learn more about us
                  </Link>
                </div>
              </div>
            </div>
            {/*a line for stat */}
            {/* Stats: navy box that pops up, numbers count from 0 */}
            <div className="w-full bg-(--color-primary) py-10 md:py-20">
              <PopIn className="mx-auto w-full max-w-6xl px-4">
                <div className="grid grid-cols-2 gap-y-6 md:grid-cols-4 md:divide-x md:divide-white/20">
                  {siteStats.map((stat) => (
                    <div
                      key={stat.label}
                      className="flex flex-col items-center gap-1 px-2"
                    >
                      <span className="text-4xl text-white md:text-6xl">
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
              <h4 className="text-3xl md:text-5xl">Our Mission</h4>
              <CardList
                mode="grid"
                items={mission}
                getKey={(item) => item.title}
                renderItem={(item, index) => (
                  <InfoCard index={index} {...item} />
                )}
              />
              <h4 className="text-3xl md:text-5xl ">What we offer</h4>
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
        <section className="w-full bg-(--color-primary) text-(--color-secondary) md:py-12 px-5 py-8">
          {/*projects*/}
          <h3 className="text-3xl md:text-5xl  text-center pt-10">
            Our Programs
          </h3>
          <div className="gap-5">
            <div className="mx-auto max-w-none flex w-full flex-col items-center gap-10 px-4 py-2 sm:px-6 sm:py-6 lg:px-10 lg:py-8 2xl:px-16">
              <h4 className="text-4xl underline">
                <Link href="/programs">Project Teams</Link>
              </h4>
              <div className="grid grid-cols-2 mx-auto max-w-4xl px-8">
                <p className="text-xl text-white md:text-2xl text-left">
                  USF SASE provides the opportunity to work on real-world
                  projects, collaborate with peers, and develop technical and
                  professional skills.
                </p>
                <p className="text-right text-2xl">
                  <span className="text-white text-4xl">
                    {projectTeams.length}{" "}
                  </span>
                  projects
                  <br /> <span className="text-white text-4xl"> 45 </span>{" "}
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
                href="/projects"
                className="text-(--color-primary) text-xl rounded-full border-2 border-white bg-(--light-blue) px-6 py-3"
              >
                View all Project Teams
              </Link>
            </div>
            <div className="h-1 bg-white/60 m-10"></div>
            {/*big-little */}
            <div className="bg-mx-auto max-w-none flex w-full flex-col items-center gap-10 px-4 py-4 sm:px-6 sm:py-8 lg:px-10 lg:py-10 2xl:px-16">
              <h4 className="text-3xl md:text-4xl underline">
                {" "}
                <Link href="/programs">Big-Little Program</Link>
              </h4>
              <div className="mx-auto max-w-none grid grid-cols-1 md:grid-cols-3 ">
                <div className="flex flex-col items-center gap-4">
                  <p className="text-left text-white text-xl md:text-2xl">
                    USF SASE offers mentorship program where the experienced
                    STEM upperclassmen are paired with mentees for 1-1 support.
                  </p>
                  <Float className="hidden lg:block">
                    <Image
                      src={PandaAir}
                      alt="USF SASE air panda sticker"
                      width={200}
                    />
                  </Float>
                </div>
                {/*pull image cards from program page */}
                <CardList
                  className="col-span-2"
                  columns={3}
                  carouselBelow={1024}
                  items={bigLittle}
                  getKey={(item) => item.name}
                  renderItem={(item, index) => (
                    <CardBox index={index} {...item} />
                  )}
                />
              </div>
              <Link
                href="/biglittle"
                className="text-(--color-primary) text-xl rounded-full border-2 border-white bg-(--light-blue) px-6 py-3"
              >
                View all Big-Little Members
              </Link>
            </div>
          </div>
        </section>
        {/* e-board */}
        <section className="w-ful  bg-linear-to-b from-(--color-secondary) via-white to-(--color-secondary)  text-(--color-primary) md:py-12 px-5 py-8">
          <div className="mx-auto flex w-full max-w-none flex-col items-center gap-10 px-4 py-10 sm:px-6 lg:px-10 lg:py-14 2xl:px-16">
            <h3 className="text-3xl md:text-5xl">
              <Link href="/eBoard">Meet the E-board</Link>
            </h3>
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
              columns={4}
              className="object-cover object-[50%] "
              minCardWidth={220}
              carouselBelow={1024}
              items={eboard}
              getKey={(member) => member.name}
              renderItem={(member, index) => (
                <PolaroidCard
                  index={index}
                  member={member}
                  photo={photos[member.name]}
                />
              )}
            />
            <Link
              href="/eBoard"
              className="text-xl rounded-full border-2 border-white bg-(--color-primary) text-(--color-secondary) px-6 py-3"
            >
              View all E-Board Members
            </Link>
          </div>
        </section>

        {/* events */}
        <section className="bg-(--color-primary) w-full md:py-12 px-5">
          <div className="mx-auto flex w-full max-w-none flex-col items-center gap-10 px-4 py-10 sm:px-6 lg:px-10 lg:py-14 2xl:px-16">
            <h3 className="text-3xl md:text-5xl  text-white">
              <Link href="/events">Events</Link>
            </h3>
            <motion.ul
              variants={listVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="mx-auto grid w-full max-w-6xl grid-cols-2 justify-items-center gap-x-4 gap-y-6 lg:grid-cols-5"
            >
              {eventTypes.map((eventType, index) => (
                <motion.li
                  key={eventType}
                  variants={itemVariants}
                  className="flex min-h-24 w-full max-w-56 flex-col items-center justify-center gap-1 border-l-4 border-[#84ca44] px-3 text-center text-white"
                >
                  <span className="text-sm tracking-widest text-[#84ca44] md:text-base">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-2xl md:text-3xl">{eventType}</span>
                </motion.li>
              ))}
            </motion.ul>
            <div className="flex gap-5 ">
              <Link
                href="/events"
                className="text-xl rounded-full border-2 bg-(--light-green) px-6 py-3"
              >
                view upcoming event
              </Link>

              <Link
                href="https://bullsconnect.usf.edu/SASE/club_signup"
                className="text-xl rounded-full border-2  bg-(--light-blue) px-6 py-3"
              >
                Join BullsConnect
              </Link>
            </div>
          </div>
        </section>
        {/* newsletter */}
        <section className="w-ful  bg-linear-to-b from-(--color-secondary) via-white to-(--color-secondary)  text-(--color-primary) md:py-12 px-5 py-8">
          <div className="mx-auto flex w-full max-w-none flex-col items-center gap-10 px-4 py-10 sm:px-6 lg:px-10 lg:py-14 2xl:px-16">
            <h3 className="text-3xl md:text-5xl  text-(--color-primary)">
              <Link href="/newsletter">Newsletter</Link>
            </h3>
            <div className="w-full mx-auto max-w-5xl m-5">
              <div className="w-full md:hidden mx-auto max-w-xs">
                <NewsletterCards events={latestOne} />
              </div>

              {/* md and up: the 3 newest events */}
              <div className="hidden w-full md:block ">
                <NewsletterCards events={latestThree} />
              </div>
            </div>
            <div>
              <Link
                href="/newsletter"
                className="text-xl rounded-full border-2 bg-(--light-green) px-6 py-3"
              >
                View our past events and newsletters
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
