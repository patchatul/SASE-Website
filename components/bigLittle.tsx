"use client";

import Image from "next/image";
import type { CSSProperties } from "react";

type Member = {
  name: string;
  major: string;
  year: string;
  role: "Big" | "Little";
  // Add a local image path later, e.g. "/members/headshots/arsh-patel.jpg".
  photo?: string;
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
      { name: "Katarina Jenarine", role: "Big", major: "Cell/Molecular Biology", year: "Sophomore" },
      { name: "Anish Punukollu", role: "Big", major: "Biomedical Science", year: "Junior" },
      { name: "Felicity Liu", role: "Big", major: "Chemistry", year: "Sophomore" },
      { name: "Hai Phan Tri", role: "Little", major: "Biomedical Science", year: "Sophomore" },
      { name: "Raina Zheng", role: "Little", major: "Biology", year: "Sophomore" },
      { name: "Shania", role: "Little", major: "To be confirmed", year: "To be confirmed" },
      { name: "Le Thanh Phuong Vo", role: "Little", major: "Molecular Biology", year: "Freshman" },
      { name: "Huong Pham", role: "Little", major: "Chemistry", year: "Freshman" },
    ],
  },
  {
    name: "Fire",
    color: "#BF6D68",
    background: "#FCECE9",
    members: [
      { name: "Daksh Kumar", role: "Big", major: "To be confirmed", year: "To be confirmed" },
      { name: "Arsh Patel", role: "Big", major: "Computer Science", year: "Sophomore" },
      { name: "Sofia Mitsuyuki de Menezes", role: "Big", major: "Computer Engineering", year: "Senior" },
      { name: "Emma Nguyen", role: "Little", major: "Computer Science", year: "Freshman" },
      { name: "Linh Nguyen", role: "Little", major: "Computer Science", year: "Freshman" },
      { name: "Maahi Upadhyaya", role: "Little", major: "Computer Science", year: "Junior" },
      { name: "Ashita Agrawal", role: "Little", major: "Computer Science", year: "Freshman" },
      { name: "Gnana Harshitha Banala", role: "Little", major: "Cybersecurity", year: "Sophomore" },
      { name: "Rithva Menon", role: "Little", major: "Computer Engineering", year: "Freshman" },
      { name: "Elizabeth Nguyen", role: "Little", major: "Software Engineering (exploring)", year: "Junior" },
    ],
  },
  {
    name: "Earth",
    color: "#819D7D",
    background: "#ECF2E9",
    members: [
      { name: "Michael Vincent Pilapil", role: "Big", major: "Medical Engineering (Master's Student)", year: "Senior" },
      { name: "Nishanth Baddigam", role: "Big", major: "Business Analytics & Info Systems", year: "Junior" },
      { name: "Nguyen Le", role: "Little", major: "Civil Engineering", year: "Sophomore" },
      { name: "Tam Vo", role: "Little", major: "Mechanical Engineering", year: "Junior" },
      { name: "Demille Francis", role: "Little", major: "Mechanical Engineering", year: "Freshman" },
      { name: "Aron Diaz", role: "Little", major: "Mechanical Engineering", year: "Freshman" },
      { name: "Camila Saume", role: "Little", major: "Mechanical / Biomedical Engineering", year: "Freshman" },
      { name: "An Bui", role: "Little", major: "Biomedical Engineering", year: "Freshman" },
      { name: "Joleen Hathaway", role: "Little", major: "Aerospace Engineering", year: "Freshman" },
      { name: "Lillian Duong", role: "Little", major: "Mechanical Engineering", year: "Freshman" },
      { name: "Shreekar Saidu", role: "Little", major: "Mechanical Engineering", year: "Freshman" },
      { name: "Sophie Jennings", role: "Little", major: "Chemical Engineering", year: "Freshman" },
    ],
  },
  {
    name: "Air",
    color: "#8D89B5",
    background: "#F0EFF9",
    members: [
      { name: "Adhyayan", role: "Big", major: "Electrical Engineering", year: "Sophomore" },
      { name: "Sriharsha Manthena", role: "Big", major: "Computer Engineering", year: "Junior" },
      { name: "Sean Vu", role: "Little", major: "Electrical Engineering", year: "Sophomore" },
      { name: "Mohid Rasool", role: "Little", major: "Electrical Engineering", year: "Freshman" },
      { name: "Mai Gia Tue Nguyen", role: "Little", major: "Electrical Engineering", year: "Freshman" },
      { name: "Khanh Linh Tran", role: "Little", major: "Electrical Engineering", year: "Sophomore" },
      { name: "Alexander Bruneau", role: "Little", major: "Electrical Engineering", year: "Freshman" },
      { name: "Rushil Kamarajugadda", role: "Little", major: "Electrical Engineering", year: "Sophomore" },
      { name: "Alisha Imam", role: "Little", major: "Civil Engineering", year: "Freshman" },
      { name: "Khoa Nguyen", role: "Little", major: "Mechanical Engineering", year: "Freshman" },
      { name: "Cristian Golkar", role: "Little", major: "Chemical Engineering", year: "Sophomore" },
    ],
  },
];

const headingFont: CSSProperties = {
  fontFamily: '"Bebas Neue", Impact, sans-serif',
  letterSpacing: "0.025em",
};

function MemberCard({ member, family }: { member: Member; family: Family }) {
  return (
    <article
      className="min-w-0 overflow-hidden rounded-xl border bg-white shadow-sm transition-shadow hover:shadow-md"
      style={{ borderColor: member.role === "Big" ? "#141B4D" : "#D0D0CE", borderWidth: member.role === "Big" ? 2 : 1 }}
    >
      <div className="relative flex h-36 items-center justify-center bg-[#E9E8E8] sm:h-40">
        {member.photo ? (
          <Image src={member.photo} alt={`${member.name} headshot`} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover" />
        ) : (
          <div className="flex flex-col items-center gap-2 text-[#686D76]">
            <svg aria-hidden="true" viewBox="0 0 48 48" className="h-10 w-10" fill="none">
              <circle cx="24" cy="15" r="9" fill="#B9BAC1" />
              <path d="M7 43c0-10 8-16 17-16s17 6 17 16" fill="#B9BAC1" />
            </svg>
            <span className="text-xs font-medium">Headshot coming soon</span>
          </div>
        )}
      </div>
      <div className="space-y-2 p-4">
        <span
          className="inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide"
          style={{ color: member.role === "Big" ? "#FFFFFF" : "#141B4D", backgroundColor: member.role === "Big" ? "#141B4D" : family.background }}
        >
          {member.role} · {family.name}
        </span>
        <h4 className="min-h-12 break-words text-base font-bold leading-snug text-[#141B4D]">{member.name}</h4>
        <p className="text-sm leading-snug text-[#3F4444]">{member.major}</p>
        <p className="text-xs font-medium text-[#686D76]">{member.year}</p>
      </div>
    </article>
  );
}

export default function BigLittle() {
  const total = families.reduce((sum, family) => sum + family.members.length, 0);

  return (
    <section aria-labelledby="big-little-heading" className="w-full bg-[#E9E8E8] text-[#101820]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <header className="mb-10">
          <h2 id="big-little-heading" className="text-5xl leading-none text-[#141B4D] sm:text-7xl" style={headingFont}>BIG–LITTLE PROGRAM</h2>
          <p className="mt-3 text-lg text-[#3F4444]">Building connections, one friendship at a time.</p>
        </header>

        <div className="mb-12 flex min-h-56 flex-col items-center justify-center rounded-2xl border border-[#B2B3BD] bg-[#D9D9D9] px-6 text-center sm:min-h-72">
          <p className="text-3xl text-[#141B4D] sm:text-4xl" style={headingFont}>SASE BIG–LITTLE FAMILY PHOTO</p>
          <p className="mt-2 text-sm text-[#4B5261]">Group photo can be added later</p>
        </div>

        <section className="mb-12" aria-labelledby="about-big-little">
          <h3 id="about-big-little" className="mb-3 text-3xl text-[#141B4D]" style={headingFont}>ABOUT THE BIG–LITTLE PROGRAM</h3>
          <p className="max-w-4xl text-base leading-7 text-[#3F4444]">
            The SASE Big–Little Program pairs members to encourage friendship, mentorship, and a strong sense of community at USF.
            Bigs help Littles navigate campus life, share their experiences, and feel welcome in the SASE family.
          </p>
        </section>

        <section className="mb-14 rounded-2xl border border-[#C7C7CE] bg-[#D9D9D9] p-5 sm:p-8" aria-labelledby="how-it-works">
          <h3 id="how-it-works" className="mb-6 text-center text-3xl text-[#141B4D]" style={headingFont}>HOW IT WORKS</h3>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["01", "CONNECT", "Join the program and get to know SASE."],
              ["02", "GET MATCHED", "Meet your Big or Little in the community."],
              ["03", "GROW TOGETHER", "Build skills, confidence, and lasting friendships."],
            ].map(([number, title, description]) => (
              <div key={number} className="rounded-xl border border-[#BFC0CB] bg-white p-5">
                <div className="flex items-center gap-3">
                  <span className="text-3xl text-[#668CB9]" style={headingFont}>{number}</span>
                  <h4 className="text-2xl text-[#141B4D]" style={headingFont}>{title}</h4>
                </div>
                <p className="mt-2 text-sm leading-6 text-[#3F4444]">{description}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="mb-8">
          <h3 className="text-4xl text-[#141B4D]" style={headingFont}>MEET OUR BIG–LITTLE FAMILIES</h3>
          <p className="mt-1 text-sm font-medium uppercase tracking-wide text-[#3F4444]">Four element families · Bigs & Littles · {total} members</p>
          <nav aria-label="Jump to family" className="mt-5 flex flex-wrap gap-3">
            {families.map((family) => (
              <a key={family.name} href={`#big-little-${family.name.toLowerCase()}`} className="rounded-lg border border-[#141B4D] bg-white px-5 py-2 font-semibold text-[#141B4D] transition-colors hover:bg-[#141B4D] hover:text-white">
                {family.name}
              </a>
            ))}
          </nav>
        </div>

        <div className="space-y-12">
          {families.map((family) => {
            const bigCount = family.members.filter((member) => member.role === "Big").length;
            return (
              <section key={family.name} id={`big-little-${family.name.toLowerCase()}`} aria-labelledby={`family-heading-${family.name}`} className="scroll-mt-10 overflow-hidden rounded-2xl border border-[#D0D0CE] bg-[#F7F7F9] shadow-sm">
                <div className="border-l-8 px-5 py-6 sm:px-8" style={{ borderColor: family.color }}>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 id={`family-heading-${family.name}`} className="text-4xl text-[#141B4D] sm:text-5xl" style={headingFont}>{family.name.toUpperCase()} FAMILY</h4>
                     </div>
                  <p className="mt-2 text-sm font-medium uppercase tracking-wide text-[#3F4444]">
                    {family.members.length} members · {bigCount} Bigs · {family.members.length - bigCount} Littles
                  </p>
                  <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {family.members.map((member) => <MemberCard key={member.name} member={member} family={family} />)}
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        <div className="mt-16 rounded-2xl border border-[#BFC0CB] bg-[#D9D9D9] px-6 py-10 text-center">
          <h3 className="text-4xl text-[#141B4D]" style={headingFont}>FIND YOUR SASE FAMILY</h3>
          <p className="mt-2 text-sm text-[#3F4444]">Get involved, meet new people, and build connections at USF.</p>
        </div>
      </div>
    </section>
  );
}
