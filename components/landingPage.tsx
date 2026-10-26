"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import Link from "next/link";
import PandaEE from "@/public/panda_stickers/pandaEE.png";
import MotionCardRow from "./motionCardRow";

const memberImages = [
  { src: "/members/workshop.jpeg", alt: "SASE USF Workshop" },
  { src: "/members/big_little1.jpeg", alt: "SASE USF Big Little event" },
  { src: "/members/big_little.jpeg", alt: "SASE USF Big Little event" },
  { src: "/members/karaoke.jpeg", alt: "SASE USF Karaoke event" },
  { src: "/members/project_team1.jpeg", alt: "SASE USF Project team" },
  { src: "/members/project_team.jpeg", alt: "SASE USF Project team" },
];
/*project team img*/
{
  /*about section*/
}
const mission = [
  {
    title: "Professional Development",
    text: "To prepare Asian heritage scientists and engineers for success in the global business world",
  },
  {
    title: "Diversity",
    text: "To promote and celebrate diversity on campus and in the workplace",
  },
  {
    title: "Service",
    text: "To provide members ways to contribute to their local communities",
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
  { box: "bg-(--color-secondary)", num: "text-[#97edfc]" },
  { box: "bg-[#c9e7b0]", num: "text-[#84ca44]" },
  { box: "bg-[#9faffc]", num: "text-[#6a6efc]" },
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

{
  /*programs section -project team info*/
}
export type ProjectTeam = {
  name: string;
  description: string;
  /** path in /public, e.g. "/projects/web.jpeg". Leave out to show a placeholder. */
  image?: string;
};

// Replace with your real teams
const projectTeams: ProjectTeam[] = [
  { name: "AI for Brain Tumor Detection", description: "One sentence long description of what the project is about." },
  { name: "Team Name 2", description: "What this project is about." },
  { name: "Team Name 3", description: "What this project is about." },
  { name: "Team Name 4", description: "What this project is about." },
  { name: "Team Name 5", description: "What this project is about." },
];

function ProjectCard({
  index,
  name,
  description,
  image,
}: ProjectTeam & { index: number }) {
  const tone = cardTones[index % cardTones.length];
  return (
    <div
      className={`mx-auto w-full flex h-full flex-col overflow-hidden max-w-80 lg:max-w-none transition hover:scale-105
     rounded-2xl border-2 border-white text-left text-(--color-primary) shadow-[5px_5px_0_0_white] ${tone.box}`}
    >
      {/* Picture */}
      <div className="relative aspect-4/3 w-full border-b-2 border-(--color-primary)">
        {image ? (
          <Image
            src={image}
            alt={`${name} project`}
            fill
            sizes="(min-width: 1024px) 20vw, 90vw"
            className="object-cover"
          />
        ) : ( //delete after project team pics
          <div className="flex h-full items-center justify-center text-(--color-primary)">
            USF SASE Project Teams
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-3">
        <h4 className="text-2xl"><span className={`text-2xl ${tone.num}`}>
        {String(index + 1).padStart(1)}
      </span> {name}</h4>
        <p className="text-md">{description}</p>
      </div>
    </div>
  );
}

{
  /*main landing page */
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
        <section className="w-full bg-linear-to-b from-(--color-secondary) via-white to-(--color-secondary) text-(--color-primary)">
          <div className="mx-auto flex w-full flex-col items-center gap-5 px-4 py-8 text-center">
            {/*grid*/}
            <div className="mx-auto w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 items-center gap-4 md:gap-5">
              <div className="flex max-w-3xl flex-col text-center col-span-2 ">
                <h2 className="text-3xl md:text-4xl">Who we are</h2>
                <p className="text-2xl md:text-3xl text-left">
                  USF SASE is a student chapter of the Society of Asian
                  Scientists and Engineers at University of South Florida
                  (Tampa, Florida).
                </p>
                <p className="text-white text-lg md:text-2xl">
                  772+ members | 2,123+ IG Followers | 1,258+ LinkedIn Followers
                  | 191+ events
                </p>
              </div>

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
                    Hi, this is <span className="text-(--color-secondary)">ZUZU</span>.<br />
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

            <div className="flex w-full flex-col gap-5 max-w-6xl">
              <h3 className="text-3xl md:text-4xl">Our Mission</h3>
              <div className="grid w-full grid-cols-1 sm:grid-cols-3 md:gap-6 place-content-center">
                {mission.map((item, index) => (
                  <InfoCard key={item.title} index={index} {...item} />
                ))}
              </div>
              <h3 className="text-3xl md:text-4xl">What we offer</h3>
              <div className="grid w-full grid-cols-1 sm:grid-cols-3 md:gap-6 place-content-center">
                {offers.map((item, index) => (
                  <InfoCard key={item.title} index={index} {...item} />
                ))}
              </div>
            </div>
          </div>
        </section>
        {/* programs */}
        <section className="w-full bg-(--color-primary) text-(--color-secondary) ">
          {/*projects*/}
          <div className="mx-auto max-w-none flex w-full flex-col items-center gap-12 px-4 py-10 sm:px-6 sm:py-12 lg:px-10 lg:py-16 2xl:px-16">
            <h3 className="text-3xl md:text-4xl text-center">Our Programs</h3>
            <h4 className="text-3xl md:text-4xl underline">Project Teams</h4>
            <div className="grid grid-cols-2 mx-auto max-w-3xl">
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
              <MotionCardRow
                items={projectTeams}
                columns={5}
                carouselBelow={1024}
                getKey={(team) => team.name}
                renderItem={(team, index) => (
                  <ProjectCard index={index} {...team} />
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
          <div></div>
        </section>
        {/* e-board */}
        <section>
          <div></div>
        </section>
        {/* events */}
        <section>
          <div></div>
        </section>
        {/* contacts */}
        <section></section>
      </div>
    </div>
  );
}
