"use client";

import { useState } from "react";

type Member = {
  name: string;
  role: string;
  linkedin: string;
  major?: string;
  bio?: string;
};

const eboard: Member[] = [
  { name: "Sriharsha Manthena", role: "President", linkedin: "https://www.linkedin.com/in/sriharsha-manthena/" },
  { name: "Annalise Yee", role: "Vice President Internal", linkedin: "https://www.linkedin.com/in/annalise-yee-24555831a/" },
  { name: "Adhyayan Tiwari", role: "Vice President External", linkedin: "https://www.linkedin.com/in/adhyayan-tiwari-at/" },
  { name: "Katarina Jenarine", role: "Secretary", linkedin: "https://www.linkedin.com/in/katarina-jenarine-b23901395/" },
  { name: "Lakesh Kumar Ram Rakhiani", role: "Treasurer", linkedin: "https://www.linkedin.com/in/lakesh-k/" },
  { name: "Nishanth Baddigam", role: "Event Director - Cultural", linkedin: "https://www.linkedin.com/in/nishanthbaddigam06/" },
  { name: "Kundana Anumakonda", role: "Marketing Chair", linkedin: "https://www.linkedin.com/in/kundana-anumakonda/" },
  { name: "Patcharalak Tulyakul", role: "Marketing Chair", linkedin: "https://www.linkedin.com/in/patcharalak-tulyakul/" },
  { name: "Minh Hoa Vu", role: "Projects Director OPS", linkedin: "https://www.linkedin.com/in/hoa-vu-88851b387/" },
  { name: "Arie Bhagan", role: "Technical Projects Director", linkedin: "https://www.linkedin.com/in/arie-bhagan-83208a31a/" },
  { name: "Ashita Agrawal", role: "Conference and PR Chair", linkedin: "https://www.linkedin.com/in/ashita-agrawal-9a002532b/" },
  { name: "Felicity Liu", role: "Service Chair", linkedin: "https://www.linkedin.com/in/feliucity/" },
  { name: "Radhika Rao", role: "Engagement Director", linkedin: "https://www.linkedin.com/in/radhika-rao-09349a333/" },
  { name: "Rakshit Bhardwaj", role: "Fundraising Chair", linkedin: "https://www.linkedin.com/in/rakshit-bhardwaj-5a8238373/" },
  { name: "Vaanya Sharma", role: " Professional Development Event Director", linkedin: "https://www.linkedin.com/in/vaanya-sharma-/" },
];

const card = "rounded-2xl border-2 border-[#141b4d] shadow-[4px_4px_0_#141b4d]";
const button =
  "inline-block rounded-full border-2 border-[#141b4d] px-6 py-2 text-lg hover:bg-[#bfe0a1]";

export default function Eboard() {
  const [selected, setSelected] = useState<Member | null>(null);

  return (
        <main>
      {/* HERO: same light-blue fade as the About page */}
      <section className="bg-linear-to-b from-[#89abe3] to-[#e9e8e8] px-8 pb-20 pt-28 text-center md:px-20">
        <h1 className="text-6xl font-semibold text-[#141b4d] md:text-7xl">
          MEET THE EBOARD
        </h1>
        <div className="mx-auto mt-6 h-1.5 w-28 rounded-full bg-[#84ca44]" />
        <p className="mt-6 text-xl text-[#141b4d]">
          Click on any polaroid to learn more about each member!
        </p>
      </section>

      {/* POLAROIDS */}
      <section className="mx-auto max-w-[1400px] px-8 pb-28 pt-8 md:px-12">
        <div className="grid grid-cols-1 gap-x-14 gap-y-20 md:grid-cols-2 lg:grid-cols-3">
          {eboard.map((m, i) => (
            <button
              key={i}
              onClick={() => setSelected(m)}
              className={`${card} relative cursor-pointer bg-white p-5 pb-6 text-left transition duration-300 hover:-translate-y-3 hover:rotate-0 ${
                i % 2 === 0 ? "-rotate-2" : "rotate-2"
              }`}
            >
              {/* green tape */}
              <div className="absolute -top-3 left-1/2 h-7 w-28 -translate-x-1/2 -rotate-3 bg-[#bfe0a1]/80" />

              {/* photo */}
              <div className="flex aspect-square w-full items-center justify-center rounded-lg bg-[#d0d0ce] text-lg text-[#3f4444]">
                [PHOTO]
              </div>

              {/* caption strip */}
              <div className="pt-5 text-center">
                <h3 className="text-3xl font-semibold text-[#141b4d]">{m.name}</h3>
                <p className="mt-1 text-xl text-[#3f4444]">{m.role}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {selected && (
        <div
          onClick={() => setSelected(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`${card} relative w-full max-w-lg bg-white p-8`}
          >
            <button
              onClick={() => setSelected(null)}
              aria-label="Close"
              className="absolute right-4 top-2 text-4xl"
            >
              ×
            </button>

            <div className="mb-6 flex h-56 items-center justify-center rounded-xl bg-[#d0d0ce] text-lg text-[#3f4444]">
              [PHOTO]
            </div>

            <h2 className="text-3xl font-semibold text-[#141b4d]">{selected.name}</h2>
            <p className="mb-4 text-xl text-[#3f4444]">{selected.role}</p>
            <p className="mb-2 text-lg">
              <span className="font-semibold">Major:</span> {selected.major ?? "[MAJOR]"}
            </p>
            <p className="mb-6 text-lg">{selected.bio ?? "[BIO COMING SOON]"}</p>

            <a
              href={selected.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={button}
            >
              View LinkedIn
            </a>
          </div>
        </div>
      )}
    </main>
  );
}



