"use client";

import { useState } from "react";

import Image from "next/image";

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
const photos: Record<string, string> = {
  "Sriharsha Manthena": "/eboard_pics/Sriharsha.jpeg",
  "Annalise Yee": "/eboard_pics/Annalise.jpg",
  "Adhyayan Tiwari": "/eboard_pics/Adhyayan.png",
  "Katarina Jenarine": "/eboard_pics/Kat.jpeg",
  "Lakesh Kumar Ram Rakhiani": "/eboard_pics/Laksh.jpeg",
  "Nishanth Baddigam": "/eboard_pics/Nishanth.png",
  "Kundana Anumakonda": "/eboard_pics/Kundana.jpg",
  "Patcharalak Tulyakul": "/eboard_pics/Patcharalak.jpg",
  "Minh Hoa Vu": "/eboard_pics/Hoa.jpeg",
  "Arie Bhagan": "/eboard_pics/Arie.jpeg",
  "Ashita Agrawal": "/eboard_pics/Ashita.jpeg",
  "Felicity Liu": "/eboard_pics/Felicity.jpeg",
  "Radhika Rao": "/eboard_pics/Radhika.jpeg",
  "Rakshit Bhardwaj": "/eboard_pics/Rakshit.JPG",
  "Vaanya Sharma": "/eboard_pics/Vaanya.jpeg",
};

const details: Record<string, { year: string; major: string; bio: string }> = {
  "Sriharsha Manthena": {
    year: "Third-year",
    major: "Computer Engineering",
    bio: "Loves playing Minecraft and FIFA. He is a 2x hackathon winner specializing in full-stack development, and has done renewable energy research on Heliostat Field simulation software under USF professor Dr. Yogi Goswami. His next stop: chip manufacturing and hardware development.",
  },
  "Annalise Yee": {
    year: "Second-year",
    major: "Biomedical Sciences",
    bio: "Loves arts and crafts, OSU, project sekai, Tetris, music, and acrobatic sports like gymnastics, figure skating and taekwondo poomsae. She is interested in making cool drones, like a hand-controlled sword drone army, and has been involved in research, internships and employment through FIU, Moffitt and SMH.",
  },
  "Adhyayan Tiwari": {
    year: "Second-year",
    major: "Electrical Engineering",
    bio: "Loves singing, writing and doing community service. He has created some amazing PCBs and is passionate about humanoid robots and robotics.",
  },
  "Katarina Jenarine": {
    year: "Second-year",
    major: "Cell/Molecular Biology",
    bio: "This summer she shadowed in an AdventHealth microbiology lab, observed patient results, and learned about new genome sequencing technology. She plays piano and loves the arts, creating science animations that visualize cellular functions to make learning easier for other students.",
  },
  "Lakesh Kumar Ram Rakhiani": {
    year: "Second-year",
    major: "Mathematics and Econometrics",
    bio: "Studying for his actuarial science exams and hoping to become an actuary. He likes volunteering for various causes, especially helping under-privileged kids with their education in Pakistan.",
  },
  "Nishanth Baddigam": {
    year: "Third-year",
    major: "Business Analytics & Information Systems",
    bio: "Loves to cook, travel and go to the gym. He previously worked at the Tampa Airport as a research intern.",
  },
  "Kundana Anumakonda": {
    year: "Second-year",
    major: "Computer Science",
    bio: "Passionate about backend development and working on some full-stack projects. She hopes to start hardware projects and research more about AI and its hardware side. Her hobbies include reading webnovels, cooking, exploring new places and going on road trips.",
  },
  "Patcharalak Tulyakul": {
    year: "Third-year",
    major: "Computer Science",
    bio: "Was an Instructional Design Intern at Herzing University, where she designed learner-centered Canvas course templates and resolved 4,000+ accessibility issues this summer. Outside of that she walks her cats, tutors college students, takes road trips, does photography, works on coding projects, and makes art and crafts.",
  },
  "Minh Hoa Vu": {
    year: "Second-year",
    major: "Computer Science",
    bio: "Passionate about becoming a backend developer or AI engineer, and interested in AI research. She had an AI engineering internship this summer. Outside of studying, she likes to try new things and visit new places.",
  },
  "Arie Bhagan": {
    year: "Second-year",
    major: "Electrical Engineering",
    bio: "Interested in robotics and electric vehicles. She has built hands-on projects like Arduino-based robots, including an obstacle-avoiding robot, and an EV accelerator system using a potentiometer and motor driver. She plays soccer for USF and enjoys exploring new tech.",
  },
  "Ashita Agrawal": {
    year: "First-year",
    major: "Computer Science",
    bio: "Interested in AI, technology and all things creative. She has explored both AI and digital marketing through internships, a fun mix of tech, problem-solving and creativity. She loves trying new things, exploring new sports, and spending way too much time watching sitcoms.",
  },
  "Felicity Liu": {
    year: "Second-year",
    major: "Chemistry",
    bio: "Loves crafts like painting and crocheting, and is also a figure skater. She is looking forward to SASE's involvement in the community.",
  },
  "Radhika Rao": {
    year: "Third-year",
    major: "Biomedical Sciences",
    bio: "Wants to go to law school and is studying for the LSAT. She plays piano and crochets, wants to learn the violin, and likes karaoke. She oversees the Big-Little mentorship program in the Fall and manages the Interns (E-Board shadowing) program in the Spring.",
  },
  "Rakshit Bhardwaj": {
    year: "Second-year",
    major: "Computer Science",
    bio: "Passionate about AI, data analysis, and building things through programming. Outside of school, you can usually find him listening to music, trying new food, working out, or watching many movies and TV series.",
  },
  "Vaanya Sharma": {
    year: "Second-year",
    major: "Computer Science",
    bio: "Interested in coding, technology and web development. She loves reading, learning new things, being involved on campus, and exploring new places. Right now she is working on personal coding projects and exploring APIs and application development.",
  },
};

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
        <p className="mt-8 text-2xl tracking-wide text-[#141b4d] md:text-2xl">
          Click on any polaroid to learn more about each member!
        </p>
      </section>

      {/* POLAROIDS */}
      <section className="mx-auto max-w-[1500px] px-8 pb-28 pt-8 md:px-12">
        <div className="grid grid-cols-1 gap-x-20 gap-y-28 md:grid-cols-2 lg:grid-cols-3">
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
              <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-lg bg-[#d0d0ce] text-lg text-[#3f4444]">
                {photos[m.name] ? (
                  <Image
                    src={photos[m.name]}
                    alt={m.name}
                    fill
                    sizes="(min-width: 1024px) 400px, 100vw"
                    className="object-cover object-top"
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
                    className="object-cover object-[50%_25%]"
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



