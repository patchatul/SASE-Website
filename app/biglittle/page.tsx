"use client";

import Image from "next/image";
import { useState } from "react";
import biglit from "@/public/big_lit_pics/big_lit.png";

type Member = {
  name: string;
  major: string;
  year: string;
  role: "Big" | "Little";
  // Add a local image path later, e.g. "/members/headshots/arsh-patel.jpg".
  pic?: string;
  contact: string;
};

type Family = {
  name: "Water" | "Fire" | "Earth" | "Air";
  color: string;
  background: string;
  members: Member[];
};

const families: Family[] = [
  {
    name: "Water",
    color: "#668CB9",
    background: "#EBF3FB",
    members: [
      { name: "Katarina Jenarine", role: "Big", major: "Cell/Molecular Biology", year: "Sophomore", pic: "/eboard_pics/kat.jpg", contact: "https://www.linkedin.com/in/katarina-jenarine-b23901395/"},
      { name: "Anish Punukollu", role: "Big", major: "Biomedical Science", year: "Junior", pic: "/big_lit_pics/Anish_Punukollu.jpg", contact: "x"},
      { name: "Felicity Liu", role: "Big", major: "Chemistry", year: "Sophomore", pic: "/eboard_pics/felicity.jpg", contact: "https://www.linkedin.com/in/feliucity/"},
      { name: "Hai Phan Tri", role: "Little", major: "Biomedical Science", year: "Sophomore", pic: "/big_lit_pics/Hai_Phan_Tri.jpg", contact: "x"},
      { name: "Raina Zheng", role: "Little", major: "Biology", year: "Sophomore", pic: "/big_lit_pics/Raina_Zheng.jpg", contact: "rainazheng@usf.edu"},
      { name: "Shania", role: "Little", major: "To be confirmed", year: "To be confirmed", pic: "/big_lit_pics/Shania.jpg", contact: "x"},
      { name: "Le Thanh Phuong Vo", role: "Little", major: "Molecular Biology", year: "Freshman", pic: "/big_lit_pics/Le_Thanh_Phuong_Vo.jpg", contact: "x"},
      { name: "Huong Pham", role: "Little", major: "Chemistry", year: "Freshman", pic: "/big_lit_pics/Huong_Pham.jpg", contact: "x" },
    ],
  },
  {
    name: "Fire",
    color: "#BF6D68",
    background: "#FCECE9",
    members: [
      { name: "Daksh Kumar", role: "Big", major: "To be confirmed", year: "To be confirmed", pic: "/big_lit_pics/Daksh_Kumar.jpeg", contact: "https://www.linkedin.com/in/daksh-kumar07" },
      { name: "Arsh Patel", role: "Big", major: "Computer Science", year: "Sophomore", pic: "/big_lit_pics/Arsh_Patel.jpg", contact: "x" },
      { name: "Sofia Mitsuyuki de Menezes", role: "Big", major: "Computer Engineering", year: "Senior", pic: "/big_lit_pics/Sofia_Mitsuyuki_de_Menezes.jpg", contact: "x" },
      { name: "Emma Nguyen", role: "Little", major: "Computer Science", year: "Freshman", pic: "/big_lit_pics/Emma_Nguyen.jpg", contact: "x" },
      { name: "Linh Nguyen", role: "Little", major: "Computer Science", year: "Freshman", pic: "/big_lit_pics/Linh_Nguyen.jpg", contact: "x" },
      { name: "Maahi Upadhyaya", role: "Little", major: "Computer Science", year: "Junior", pic: "/big_lit_pics/Maahi_Up.jpeg", contact: "https://www.linkedin.com/in/maahi-upadhyaya-7b7133333" },
      { name: "Ashita Agrawal", role: "Little", major: "Computer Science", year: "Freshman", pic: "/big_lit_pics/Ashita_Agrawal.jpg", contact: "x" },
      { name: "Gnana Harshitha Banala", role: "Little", major: "Cybersecurity", year: "Sophomore", pic: "/big_lit_pics/Gnana_Harshitha_Banala.jpg", contact: "x" },
      { name: "Rithva Menon", role: "Little", major: "Computer Engineering", year: "Freshman", pic: "/big_lit_pics/Rithva_Menon.jpg", contact: "x" },
      { name: "Elizabeth Nguyen", role: "Little", major: "Software Engineering (exploring)", year: "Junior", pic: "/big_lit_pics/Elizabeth_Nguyen.jpg", contact: "x" },
    ],
  },
  {
    name: "Earth",
    color: "#819D7D",
    background: "#ECF2E9",
    members: [
      { name: "Michael Vincent Pilapil", role: "Big", major: "Medical Engineering (Master's Student)", year: "Senior", pic: "/big_lit_pics/Vincent_Pilapil.png", contact: "https://www.linkedin.com/in/michaelvpilapil22/" },
      { name: "Nishanth Baddigam", role: "Big", major: "Business Analytics & Info Systems", year: "Junior", pic: "/eboard_pics/nishanth.jpg", contact: "https://www.linkedin.com/in/nishanthbaddigam06/" },
      { name: "Nguyen Le", role: "Little", major: "Civil Engineering", year: "Sophomore", pic: "/big_lit_pics/Nguyen_Le.jpeg", contact: "https://www.linkedin.com/in/nguyen-le11" },
      { name: "Tam Vo", role: "Little", major: "Mechanical Engineering", year: "Junior", pic: "/big_lit_pics/Tam_Vo.jpg", contact: "x" },
      { name: "Demille Francis", role: "Little", major: "Mechanical Engineering", year: "Freshman", pic: "/big_lit_pics/Demille_Francis.jpg", contact: "x" },
      { name: "Aron Diaz", role: "Little", major: "Mechanical Engineering", year: "Freshman", pic: "/big_lit_pics/Aron_Diaz.jpg", contact: "arondiaz@usf.edu" },
      { name: "Camila Saume", role: "Little", major: "Mechanical / Biomedical Engineering", year: "Freshman", pic: "/big_lit_pics/Camila_Saume.jpg", contact: "x" },
      { name: "An Bui", role: "Little", major: "Biomedical Engineering", year: "Freshman", pic: "/big_lit_pics/An_Bui.jpg", contact: "x" },
      { name: "Joleen Hathaway", role: "Little", major: "Aerospace Engineering", year: "Freshman", pic: "/big_lit_pics/Joleen_Hathaway.jpg", contact: "x" },
      { name: "Lillian Duong", role: "Little", major: "Mechanical Engineering", year: "Freshman", pic: "/big_lit_pics/Lillian_Duong.jpg", contact: "x" },
      { name: "Shreekar Saidu", role: "Little", major: "Mechanical Engineering", year: "Freshman", pic: "/big_lit_pics/Shreekar_Saidu.jpg", contact: "x" },
      { name: "Sophie Jennings", role: "Little", major: "Chemical Engineering", year: "Freshman", pic: "/big_lit_pics/Sophie_Jennings.jpg", contact: "x" },
    ],
  },
  {
    name: "Air",
    color: "#8D89B5",
    background: "#F0EFF9",
    members: [
      { name: "Adhyayan Tiwari", role: "Big", major: "Electrical Engineering", year: "Sophomore", pic: "/eboard_pics/Adhyayan.png", contact: "https://www.linkedin.com/in/adhyayan-tiwari-at/" },
      { name: "Sriharsha Manthena", role: "Big", major: "Computer Engineering", year: "Junior", pic: "/eboard_pics/harsha.jpg", contact: "https://www.linkedin.com/in/sriharsha-manthena/" },
      { name: "Sean Vu", role: "Little", major: "Electrical Engineering", year: "Sophomore", pic: "/big_lit_pics/Sean_Vu.jpg", contact: "x" },
      { name: "Mohid Rasool", role: "Little", major: "Electrical Engineering", year: "Freshman", pic: "/big_lit_pics/Mohid_Rasool.jpg", contact: "x" },
      { name: "Mai Gia Tue Nguyen", role: "Little", major: "Electrical Engineering", year: "Freshman", pic: "/big_lit_pics/Mai_Gia_Tue_Nguyen.jpg", contact: "x" },
      { name: "Khanh Linh Tran", role: "Little", major: "Electrical Engineering", year: "Sophomore", pic: "/big_lit_pics/Khanh_Linh_Tran.jpg", contact: "x" },
      { name: "Alexander Bruneau", role: "Little", major: "Electrical Engineering", year: "Freshman", pic: "/big_lit_pics/Alexander_Bruneau.jpg", contact: "LinkedIn.com/in/abruneau1" },
      { name: "Rushil Kamarajugadda", role: "Little", major: "Electrical Engineering", year: "Sophomore", pic: "/big_lit_pics/Rushil_Kamarajugadda.jpg", contact: "x" },
      { name: "Alisha Imam", role: "Little", major: "Civil Engineering", year: "Freshman", pic: "/big_lit_pics/Alisha_Imam.jpeg", contact: "aimam@usf.edu " },
      { name: "Khoa Nguyen", role: "Little", major: "Mechanical Engineering", year: "Freshman", pic: "/big_lit_pics/Khoa_Nguyen.jpg", contact: "x" },
      { name: "Cristian Golkar", role: "Little", major: "Chemical Engineering", year: "Sophomore", pic: "/big_lit_pics/Cristian_Golkar.jpg", contact: "x" },
    ],
  },
];

const FALLBACK_PIC = "/panda_stickers/pandaEE.png";

function contactHref(contact: string): string | null {
  const c = contact.trim();
  if (!c || c.toLowerCase() === "x") return null;
  if (c.startsWith("http")) return c;
  if (c.includes("@")) return `mailto:${c}`;
  return null;
}

/* PolaroidCard: tilted polaroid (same look as the E-Board polaroid),
   showing the full Big–Little member info. */
function PolaroidCard({
  member,
  family,
  index,
}: {
  member: Member;
  family: Family;
  index: number;
}) {
  const href = contactHref(member.contact);
  // fall back to the panda if there's no pic or the file fails to load
  const [picFailed, setPicFailed] = useState(false);
  const hasPic = Boolean(member.pic) && !picFailed;

  return (
    // pt-4 leaves room for the tape
    <div className="h-full pt-4">
      <article
        className={`relative mx-auto flex h-full w-full max-w-64 flex-col rounded-2xl border-2 border-[#141b4d] bg-white p-3 pb-4 text-left shadow-[4px_4px_0_#141b4d] transition duration-300 hover:-translate-y-2 hover:rotate-0 ${
          index % 2 === 0 ? "-rotate-2" : "rotate-2"
        }`}
      >
        {/* tape in the family color */}
        <div
          className="absolute -top-3 left-1/2 h-5 w-20 -translate-x-1/2 -rotate-3 opacity-80"
          style={{ backgroundColor: family.color }}
        />

        {/* photo */}
        <div className="relative aspect-5/4 w-full overflow-hidden rounded-lg bg-[#d0d0ce]">
          <Image
            src={hasPic ? member.pic! : FALLBACK_PIC}
            alt={hasPic ? `${member.name} headshot` : "SASE panda placeholder"}
            onError={() => setPicFailed(true)}
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 25vw"
            className={hasPic ? "object-cover" : "object-contain p-4"}
          />
        </div>

        {/* caption strip */}
        <div className="flex flex-1 flex-col items-center pt-3 text-center">
          <span
            className="inline-block rounded-full px-2 py-1 text-xs"
            style={{
              color: member.role === "Big" ? "#FFFFFF" : "#141B4D",
              backgroundColor:
                member.role === "Big" ? "#141B4D" : family.background,
            }}
          >
            {member.role} · {family.name}
          </span>
          <h4 className="mt-2 text-xl font-semibold text-[#141b4d]">
            {member.name}
          </h4>
          <p className="mt-1 text-base text-[#3f4444]">{member.major}</p>
          <p className="text-sm text-gray-600">{member.year}</p>
          {href && (
            <a
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="mt-2 text-sm text-[#141b4d] underline underline-offset-2 hover:opacity-70"
            >
              {href.startsWith("mailto:") ? "Email" : "LinkedIn"}
            </a>
          )}
        </div>
      </article>
    </div>
  );
}
{/* main area */}
export default function BigLittle() {
  const total = families.reduce(
    (sum, family) => sum + family.members.length, 0 );

  return (
    <section className="w-full pt-20 text-(--color-primary) bg-linear-to-b from-white via-(--color-secondary) to-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 grid-cols-1 md:gap-5">
          <header className="mb-10">
            <h2 className="text-4xl sm:text-5xl">BIG–LITTLE PROGRAM</h2>
            <p className="text-lg ">
              Building connections, one friendship at a time.
            </p>
            <p className="max-w-4xl text-base text-gray-600">
              The SASE Big–Little Program pairs members to encourage friendship,
              mentorship, and a strong sense of community at USF. Bigs help
              Littles navigate campus life, share their experiences, and feel
              welcome in the SASE family.
            </p>
          </header>

          <div className="mb-12 flex flex-col items-center rotate-2 justify-center rounded-2xl bg-(--color-primary) px-6 md:max-w-md md:px-10 w-auto">
            <Image
              src={biglit}
              alt="SASE Big–Little Family Photo"
              className="object-cover"
            />
          </div>
        </div>
        <section
          className="mb-14 rounded-2xl bg-(--color-secondary) p-5 sm:p-8">
          <h3 className="mb-6 text-center text-3xl">
            HOW IT WORKS
          </h3>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["01", "CONNECT", "Join the program and get to know SASE."],
              [
                "02",
                "GET MATCHED",
                "Meet your Big or Little in the community.",
              ],
              [
                "03",
                "GROW TOGETHER",
                "Build skills, confidence, and lasting friendships.",
              ],
            ].map(([number, title, description]) => (
              <div
                key={number}
                className="rounded-xl bg-white p-5"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl text-(--color-secondary)">{number}</span>
                  <h4 className="text-3xl">{title}</h4>
                </div>
                <p className="mt-2 text-md">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <div className="mb-8">
          <h3 className="text-4xl text-[#141B4D]">
            MEET OUR BIG–LITTLE FAMILIES
          </h3>
          <p className="mt-1 text-sm  text-gray-600">
            Four element families · Bigs & Littles · {total} members
          </p>
          <nav
            aria-label="Jump to family"
            className="mt-5 flex flex-wrap gap-3"
          >
            {families.map((family) => (
              <a
                key={family.name}
                href={`#big-little-${family.name.toLowerCase()}`}
                className="rounded-lg border border-[#141B4D] bg-white px-5 py-2 transition-colors hover:bg-(--color-primary) hover:text-white"
              >
                {family.name}
              </a>
            ))}
          </nav>
        </div>

        <div className="space-y-12">
          {families.map((family) => {
            const bigCount = family.members.filter(
              (member) => member.role === "Big",
            ).length;
            return (
              <section
                key={family.name}
                id={`big-little-${family.name.toLowerCase()}`}
                aria-labelledby={`family-heading-${family.name}`}
                className="scroll-mt-10 overflow-hidden rounded-2xl border border-[#D0D0CE] bg-[#F7F7F9] shadow-sm"
              >
                <div
                  className="border-l-8 px-5 py-6 sm:px-8"
                  style={{ borderColor: family.color }}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4
                      id={`family-heading-${family.name}`}
                      className="text-4xl  sm:text-5xl"
                    >
                      {family.name.toUpperCase()} FAMILY
                    </h4>
                  </div>
                  <p className="mt-2 text-sm  text-gray-600">
                    {family.members.length} members · {bigCount} Bigs ·{" "}
                    {family.members.length - bigCount} Littles
                  </p>
                  <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {family.members.map((member, index) => (
                      <PolaroidCard
                        key={member.name}
                        index={index}
                        member={member}
                        family={family}
                      />
                    ))}
                  </div>
                </div>
              </section>
            );
          })}
        </div>

       
      </div>
    </section>
  );
}
