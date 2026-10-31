"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

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
    lead: "Engagement Director",
  },
  {
    title: "Interns Program",
    text: "Interns shadow the eBoard during the Spring semester to learn how the club runs and how to lead.",
    lead: "Engagement Director",
  },
  {
    title: "Projects Teams",
    text: "Hands-on technical projects with peers, where members build real skills. Members can apply to join.",
    lead: "Operations and Technical Projects Directors",
  },
  {
    title: "Workshops",
    text: "Technical trainings, resume critiques, interview and elevator-pitch practice, and research workshops.",
    lead: "Technical Projects Director",
  },
  {
    title: "Professional Events",
    text: "Industry-based events and panels that connect members with professionals in the field.",
    lead: "Professional Development Event Director",
  },
  {
    title: "Cultural Events",
    text: "Celebrations of culture and community socials, such as our Lunar New Year festival.",
    lead: "Cultural Event Director",
  },
  {
    title: "Community Service",
    text: "Volunteer opportunities that let members give back locally and earn service hours.",
    lead: "Service Chair",
  },
  {
    title: "Conferences",
    text: "SASE national and regional conferences, where members have found internships and job offers.",
    lead: "Conference and PR Chair",
  },
];

// end = number to count up to. text = shown as is (placeholders).
const stats = [
  { end: 772, suffix: "+", label: "MEMBERS" },
  { end: 191, suffix: "+", label: "EVENTS" },
  { text: "[00]", label: "[SPONSORS]" },
  { text: "2015", label: "FOUNDED" },
];

// ---- SHARED STYLES ----
const card = "rounded-2xl border-2 border-[#141b4d] shadow-[3px_3px_0_#141b4d]";
const pad = "px-8 py-12 md:px-20";
const button =
  "inline-block rounded-full border-2 border-[#141b4d] px-7 py-3 text-xl transition hover:-translate-y-0.5 hover:bg-[#bfe0a1]";
const body = "text-2xl leading-relaxed tracking-wide";
const heading = "mb-6 text-4xl font-semibold md:text-5xl";

// ---- COUNT-UP NUMBER: counts from 0 when scrolled into view ----
function CountUp({ end, suffix = "" }: { end: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const duration = 1600;
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          setN(Math.round(eased * end));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end]);

  return (
    <span ref={ref}>
      {n.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function About() {
  const [active, setActive] = useState(0);

  return (
    <div className="bg-linear-to-b from-[#cfdcf5] to-[#f3f6fd] text-[#141b4d]">
      <style>{`@keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }`}</style>

      {/* HERO */}
      <section className={`${pad} grid items-center gap-10 md:grid-cols-2`}>
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
            <a
              href={JOIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`${button} bg-[#84ca44]`}
            >
              JOIN US
            </a>
            <a href="#mission" className={button}>
              OUR MISSION
            </a>
          </div>
        </div>
        <div
          className={`${card} flex aspect-[16/9] items-center justify-center bg-[#d0d0ce] text-xl text-[#3f4444]`}
        >
          [HERO PHOTO]
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className={`${pad} grid items-center gap-10 md:grid-cols-2`}>
        <div
          className={`${card} flex aspect-[16/9] items-center justify-center bg-[#d0d0ce] text-xl text-[#3f4444]`}
        >
          [PHOTO - CLUB MEETING]
        </div>
        <div>
          <h2 className={heading}>WHO WE ARE</h2>
          <p className={`${body} mb-4`}>
            USF SASE offers programs and initiatives ranging from professional
            development events and connections to professionals in the field, to
            leadership positions that build interpersonal skills and industry-sought
            qualities.
          </p>
          <p className={`${body} mb-4`}>
            <span className="font-semibold">Where we come from:</span> SASE is a national
            non-profit (501(c)(3)) established in November 2007, with initial support
            from Procter &amp; Gamble, dedicated to the advancement of Asian heritage
            scientists and engineers in education and employment.
          </p>
          <p className={`${body} mb-7`}>
            <span className="font-semibold">Our chapter:</span> founded in 2015 at the
            University of South Florida in Tampa. We welcome students of all backgrounds.
          </p>
          <Link href="/eBoard" className={`${button} bg-white`}>
            MEET THE EBOARD
          </Link>
        </div>
      </section>

      {/* MISSION */}
      <section id="mission" className="bg-[#89abe3] px-8 py-12 text-center md:px-20">
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

      {/* BY THE NUMBERS, with Zuzu peeking over the top */}
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

        <section className="relative z-10 bg-[#141b4d] px-8 py-12 text-white md:px-20">
          <h2 className="mb-8 text-center text-4xl font-semibold md:text-5xl">
            USF SASE BY THE NUMBERS
          </h2>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border-2 border-[#89abe3] p-6 text-center"
              >
                <p className="text-6xl text-[#84ca44]">
                  {"end" in s && s.end !== undefined ? (
                    <CountUp end={s.end} suffix={s.suffix} />
                  ) : (
                    s.text
                  )}
                </p>
                <p className="mt-2 text-2xl tracking-wide">{s.label}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* BENEFITS: one card with a checklist */}
      <section className={pad}>
        <h2 className={heading}>WHAT MEMBERS GET</h2>
        <div className={`${card} bg-white p-6 md:p-8`}>
          <ul className="grid gap-x-12 gap-y-5 md:grid-cols-2">
            {benefits.map((b) => (
              <li key={b.title} className="flex items-start gap-3">
                <span className="mt-3 h-3 w-3 shrink-0 rounded-full bg-[#84ca44]" />
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
              className={`cursor-pointer rounded-full border-2 border-[#141b4d] px-6 py-2 text-xl transition hover:-translate-y-0.5 ${
                active === i ? "bg-[#84ca44]" : "bg-white hover:bg-[#bfe0a1]"
              }`}
            >
              {p.title.toUpperCase()}
            </button>
          ))}
        </div>
        <div
          key={active}
          style={{ animation: "fadeUp 0.35s ease" }}
          className={`${card} bg-[#e3ebf9] p-6 md:p-8`}
        >
          <h3 className="mb-3 text-4xl font-semibold">{programs[active].title}</h3>
          <p className="mb-5 text-2xl leading-relaxed tracking-wide md:text-3xl">
            {programs[active].text}
          </p>
        </div>
      </section>

      {/* JOIN */}
      <section className="px-8 pb-16 pt-6 text-center md:px-20">
        <p className="mb-5 text-3xl tracking-wide md:text-4xl">LET’S BUILD SOMETHING TOGETHER</p>
        <a
          href={JOIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`${button} bg-[#84ca44]`}
        >
          JOIN SASE
        </a>
      </section>
    </div>
  );
}