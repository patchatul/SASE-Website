"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CountUp, PopIn } from "@/components/motionCardRow";

// ---- LINKS ----
const JOIN_URL = "https://bullsconnect.usf.edu/SASE/club_signup";

// ---- DATA ----
const goals = [
  {
    num: "01",
    title: "Professional Development",
    text: "Prepare Asian heritage scientists and engineers for success in the global business world.",
    bg: "bg-[#89abe3]",
  },
  {
    num: "02",
    title: "Diversity",
    text: "Celebrate diversity on campus and in the workplace.",
    bg: "bg-[#bfe0a1]",
  },
  {
    num: "03",
    title: "Service",
    text: "Provide opportunities for members to make contributions to their local communities.",
    bg: "bg-[#a1abf9]",
  },
];

const benefits = [
  { title: "Welcoming community", text: "a diverse community at USF and beyond" },
  { title: "Free workshops", text: "career readiness, software and hardware projects, lab techniques" },
  { title: "Networking", text: "meet highly esteemed companies in STEM fields" },
  { title: "Internships & jobs", text: "easier, sometimes member-exclusive, access" },
  { title: "Mentorship", text: "academic, professional and personal, from upperclassmen" },
  { title: "Service hours", text: "volunteering and community service, with hours provided" },
  { title: "The SASE family", text: "a close community on campus and nationwide" },
];

const programs = [
  {
    title: "Big-Little Mentorship",
    text: "Pairs newer members with experienced upperclassmen for academic, professional and personal guidance. It is free, open to anyone, and runs in the Fall.",
  },
  {
    title: "Interns Program",
    text: "Interns shadow the eBoard during the Spring semester to learn how the club runs and how to lead.",
  },
  {
    title: "Project Teams",
    text: "Hands-on technical projects with peers, where members build real skills. Members can apply to join.",
  },
  {
    title: "Workshops & Professional Events",
    text: "Technical trainings, resume critiques, interview and elevator-pitch practice, and research workshops, plus industry-based events and panels that connect members with professionals in the field.",
  },
  {
    title: "Cultural Events",
    text: "Celebrations of culture and community socials, such as our Lunar New Year festival.",
  },
  {
    title: "Community Service",
    text: "Volunteer opportunities that let members give back locally and earn service hours.",
  },
  {
    title: "Conferences",
    text: "SASE national and regional conferences, where members have found internships and job offers.",
  },
];

// Numbers band. href = makes the whole number clickable. plain = no count-up.
type Stat = { value: string; label: string; href?: string; plain?: boolean };

const stats: Stat[] = [
  { value: "772+", label: "Members" },
  { value: "191+", label: "Events", href: "/events" },
  { value: "2015", label: "Founded", plain: true },
];

// ---- SHARED STYLES ----
const card = "rounded-2xl border-2 border-[#141b4d] shadow-[3px_3px_0_#141b4d]";
const pad = "px-8 py-12 md:px-20";
// EXACT same classes as the landing page buttons
const button = "inline-block text-xl rounded-full border-2 bg-(--light-blue) px-6 py-3";
const body = "text-2xl leading-relaxed tracking-wide";
const heading = "mb-6 text-4xl font-semibold md:text-5xl";

export default function About() {
  const [active, setActive] = useState(0);
  const program = programs[active];

  return (
    <div className="bg-linear-to-b from-[#cfdcf5] to-[#f3f6fd] text-[#141b4d]">
      <style>{`@keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }`}</style>

      {/* HERO */}
      <section className={`${pad} grid items-center gap-10 pt-24 md:grid-cols-2`}>
        <div>
          <p className="mb-2 text-xl tracking-widest text-[#3f4444]">ABOUT THE CLUB</p>
          <h1 className="mb-5 text-5xl font-semibold md:text-7xl">
            Asian heritage scientists and engineers, growing together at USF
          </h1>
          <p className={`${body} mb-7`}>
            USF SASE is the University of South Florida chapter of the Society of Asian
            Scientists and Engineers. We help students in STEM build their careers,
            celebrate diversity, and give back. Everyone is welcome, whatever their
            background.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href={JOIN_URL} className={button}>
              Join us
            </Link>
            <Link href="#mission" className={button}>
              Our mission
            </Link>
          </div>
        </div>
        <div className={`${card} relative aspect-[2/1] overflow-hidden bg-[#d0d0ce]`}>
          <Image
            src="/members/eboard.JPG"
            alt="The USF SASE eBoard"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            priority
            className="object-cover object-[50%_20%]"
          />
        </div>
      </section>

      {/* WHO WE ARE: centered next to the photo, like the hero */}
      <section className={`${pad} grid items-center gap-10 md:grid-cols-2`}>
        {/* same size as the hero photo; the whole group photo is shown */}
        <div className={`${card} relative aspect-[2/1] overflow-hidden bg-[#d0d0ce]`}>
          <Image
            src="/members.jpg"
            alt=""
            aria-hidden="true"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="scale-110 object-cover blur-xl"
          />
          <Image
            src="/members.jpg"
            alt="USF SASE members at a club meeting"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-contain"
          />
        </div>
        <div>
          <h2 className={heading}>WHO WE ARE</h2>
          <p className="mb-4 text-xl leading-relaxed tracking-wide lg:text-2xl">
            USF SASE offers professional development events, connections to
            professionals in the field, and leadership positions that build
            interpersonal skills and industry-sought qualities.
          </p>
          <p className="mb-6 text-xl leading-relaxed tracking-wide lg:text-2xl">
            <span className="font-semibold">Where we come from:</span> SASE is a national
            non-profit (501(c)(3)) established in November 2007, with initial support
            from Procter &amp; Gamble, dedicated to advancing Asian heritage scientists
            and engineers in education and employment.
          </p>
          <Link href="/eBoard" className={button}>
            Meet the eBoard
          </Link>
        </div>
      </section>

      {/* MISSION */}
      <section id="mission" className="scroll-mt-16 bg-[#89abe3] px-8 py-12 text-center md:px-20">
        <h2 className="mb-4 text-4xl font-semibold md:text-5xl">OUR MISSION</h2>
        <p className="mx-auto max-w-4xl text-2xl leading-relaxed tracking-wide md:text-3xl">
          To help Asian heritage scientists and engineers reach their full potential in
          the global work force, to promote diversity on campus and in the workplace,
          and to provide community service.
        </p>
      </section>

      {/* GOALS */}
      <section className={pad}>
        <h2 className={heading}>OUR GOALS</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {goals.map((g) => (
            <div key={g.num} className={`${card} ${g.bg} p-6`}>
              <p className="text-2xl text-[#3f4444]">{g.num}</p>
              <h3 className="mb-2 text-3xl font-semibold">{g.title}</h3>
              <p className={body}>{g.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* NUMBERS: same band and animation as the landing page, Zuzu peeking over the top */}
      <div className="relative mt-24">
        <div className="pointer-events-none absolute bottom-full right-6 z-0 translate-y-[50%] md:right-24">
          <Image
            src="/panda_stickers/pandaSitting.png"
            alt="Zuzu the panda"
            width={500}
            height={500}
            className="h-auto w-44 md:w-72"
          />
        </div>

        <section className="relative z-10 bg-(--color-primary) px-4 py-8 md:py-12">
          <h2 className="mb-6 text-center text-4xl text-white md:mb-8 md:text-5xl">
            USF SASE
          </h2>
          <PopIn className="mx-auto w-full max-w-6xl px-4">
            <div className="grid grid-cols-3 divide-x divide-white/20">
              {stats.map((s) => {
                const inner = (
                  <>
                    <span className="text-4xl text-white sm:text-5xl md:text-7xl">
                      {s.plain ? s.value : <CountUp value={s.value} />}
                    </span>
                    <span className="text-sm uppercase tracking-widest text-(--color-secondary) sm:text-lg md:text-2xl">
                      {s.label}
                    </span>
                  </>
                );
                return s.href ? (
                  <Link
                    key={s.label}
                    href={s.href}
                    className="flex flex-col items-center gap-1 px-2 transition hover:-translate-y-1"
                  >
                    {inner}
                  </Link>
                ) : (
                  <div key={s.label} className="flex flex-col items-center gap-1 px-2">
                    {inner}
                  </div>
                );
              })}
            </div>
          </PopIn>
        </section>
      </div>

      {/* BENEFITS: one card with a checklist */}
      <section className={pad}>
        <h2 className={heading}>WHAT MEMBERS GET</h2>
        <div className={`${card} bg-white p-6 md:p-8`}>
          <ul className="grid gap-x-12 gap-y-5 md:grid-cols-2">
            {benefits.map((b) => (
              <li key={b.title} className="flex items-start gap-3">
                <span className="mt-3 h-3 w-3 shrink-0 rounded-full bg-(--color-primary)" />
                <p className={body}>
                  <span className="font-semibold">{b.title}:</span> {b.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* WHAT WE RUN: click a tab */}
      <section className={pad}>
        <h2 className={heading}>WHAT WE RUN AT USF</h2>
        <div className="mb-6 flex flex-wrap gap-3">
          {programs.map((p, i) => (
            <button
              key={p.title}
              onClick={() => setActive(i)}
              className={`cursor-pointer rounded-full border-2 px-6 py-3 text-xl transition ${
                active === i
                  ? "border-white bg-(--color-primary) text-(--color-secondary)"
                  : "bg-(--light-blue) hover:border-white hover:bg-(--color-primary) hover:text-(--color-secondary)"
              }`}
            >
              {p.title}
            </button>
          ))}
        </div>

        <div
          key={active}
          style={{ animation: "fadeUp 0.35s ease" }}
          className={`${card} bg-[#e3ebf9] p-6 md:p-8`}
        >
          <h3 className="mb-3 text-4xl font-semibold">{program.title}</h3>
          <p className="text-2xl leading-relaxed tracking-wide md:text-3xl">
            {program.text}
          </p>
        </div>
      </section>

      {/* JOIN */}
      <section className="px-8 pb-16 pt-6 text-center md:px-20">
        <p className="mb-5 text-3xl tracking-wide md:text-4xl">LET’S BUILD SOMETHING TOGETHER</p>
        <Link href={JOIN_URL} className={button}>
          Join SASE
        </Link>
      </section>
    </div>
  );
}