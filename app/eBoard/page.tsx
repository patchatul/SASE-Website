"use client";

import { useState } from "react";

import Image from "next/image";

import { eboard, photos, details, type Member } from "@/data/membersInfo";


const card = "rounded-2xl border-2 border-[#141b4d] shadow-[4px_4px_0_#141b4d]";
const button =
  "inline-block rounded-full border-2 border-[#141b4d] px-6 py-2 text-lg hover:bg-[#bfe0a1]";

export default function Eboard() {
  const [selected, setSelected] = useState<Member | null>(null);

  return (
        <main>
      {/* HERO: same light-blue fade as the About page */}
      <section className="bg-linear-to-b from-[#89abe3] to-[#e9e8e8] px-8 pb-20 pt-28 text-center md:px-20">
        <h1 className="text-4xl font-semibold text-[#141b4d] md:text-8xl">
          MEET THE EBOARD
        </h1>
        <div className="mx-auto mt-6 h-2 w-36 rounded-full bg-[#84ca44]" />
         <p className="text-xl md:text-2xl text-(--color-primary) mt-6 md:mt-10">
                Our executive board leads USF SASE: planning events, running our
                programs, and supporting members all year long.
              </p>
        <p className="text-sm text-(--color-primary)">
          Click on any polaroid to learn more about each member!
        </p>
      </section>

      {/* POLAROIDS */}
      <section className="mx-auto w-full md:max-w-6xl px-8 pb-28 pt-8 md:px-12">
        <div className="justify-items-center grid grid-cols-1 gap-x-20 gap-y-28 md:grid-cols-2 lg:grid-cols-3">
          {eboard.map((m, i) => (
            <button
              key={i}
              onClick={() => setSelected(m)}
              className={`${card}  relative w-full max-w-72 cursor-pointer bg-white p-5 pb-6 text-left transition duration-300 hover:-translate-y-3 hover:rotate-0 ${
                i % 2 === 0 ? "-rotate-2" : "rotate-2"
              }`}
            >
              {/* green tape */}
              <div className="absolute -top-3 left-1/2 h-7 w-28 -translate-x-1/2 -rotate-3 bg-[#bfe0a1]/80" />

              {/* photo */}
              <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-lg bg-[#d0d0ce] text-lg text-[#3f4444]">
                {photos[m.name] ? (
                  <Image
                    src={photos[m.name]}
                    alt={m.name}
                    fill
                    sizes="(min-width: 1024px) 400px, 100vw"
                    className="object-cover object-[50%]"
                  />
                ) : (
                  "[PHOTO]"
                )}
              </div>

              {/* caption strip */}
              <div className="pt-6 text-center">
                <h3 className="text-4xl font-semibold text-[#141b4d]">{m.name}</h3>
                <p className="mt-2 text-2xl text-[#3f4444]">{m.role}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

            {selected && (
        <div
          onClick={() => setSelected(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 md:p-8"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`${card} relative max-h-[92vh] w-full max-w-5xl overflow-y-auto bg-white p-6 md:p-10`}
          >
            <button
              onClick={() => setSelected(null)}
              aria-label="Close"
              className="absolute right-5 top-2 text-5xl leading-none"
            >
              ×
            </button>

            <div className="grid gap-8 md:grid-cols-[2fr_3fr] md:gap-12">
              {/* LEFT: photo */}
              <div className="relative flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-xl bg-[#d0d0ce] text-lg text-[#3f4444]">
                {photos[selected.name] ? (
                  <Image
                    src={photos[selected.name]}
                    alt={selected.name}
                    fill
                    sizes="(min-width: 768px) 400px, 100vw"
                    className="object-cover object-[50%]"
                  />
                ) : (
                  "[PHOTO]"
                )}
              </div>

              {/* RIGHT: text */}
              <div className="flex flex-col justify-center">
                <h2 className="text-4xl font-semibold text-[#141b4d] md:text-5xl">
                  {selected.name}
                </h2>
                <p className="mt-2 text-2xl text-[#3f4444]">{selected.role}</p>
                <div className="my-6 h-1.5 w-20 rounded-full bg-[#84ca44]" />

                <p className="mb-2 text-xl md:text-2xl">
                  <span className="font-semibold">Year:</span>{" "}
                  {details[selected.name]?.year ?? "[YEAR]"}
                </p>
                <p className="mb-4 text-xl md:text-2xl">
                  <span className="font-semibold">Major:</span>{" "}
                  {details[selected.name]?.major ?? "[MAJOR]"}
                </p>
                <p className="mb-8 text-xl leading-relaxed md:text-2xl">
                  {details[selected.name]?.bio ?? "[BIO COMING SOON]"}
                </p>

                <a
                  href={selected.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block self-start rounded-full border-2 border-[#141b4d] px-8 py-3 text-xl hover:bg-[#bfe0a1]"
                >
                  View LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}



