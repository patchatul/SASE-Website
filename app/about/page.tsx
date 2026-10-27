"use client";

// ---- DATA: edit the words here, the page below repeats them ----
const pillars = [
  { title: "[PILLAR 1]", text: "[SHORT DESCRIPTION]", color: "bg-[#89abe3]" },
  { title: "[PILLAR 2]", text: "[SHORT DESCRIPTION]", color: "bg-[#bfe0a1]" },
  { title: "[PILLAR 3]", text: "[SHORT DESCRIPTION]", color: "bg-[#89abe3]" },
];

const stats = [
  { value: "[00+]", label: "[MEMBERS]" },
  { value: "[00]", label: "[EVENTS PER YEAR]" },
  { value: "[00]", label: "[SPONSORS]" },
  { value: "[YEAR]", label: "[FOUNDED]" },
];

const eboard = [
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
  { name: "[NAME]", role: "[ROLE]", linkedin: "#" },
];

// ---- SHARED STYLES: reused so every section matches ----
const card = "rounded-2xl border-2 border-[#141b4d] shadow-[4px_4px_0_#141b4d]";
const pad = "px-8 py-16 md:px-20";
const button =
  "rounded-full border-2 border-[#141b4d] px-6 py-2 text-lg hover:bg-[#bfe0a1]";

export default function About() {
  return (
    <div className="w-full bg-linear-to-b from-[#cfdcf3] to-white text-left text-(--color-primary)">
      {/* HERO */}
      <section className={`${pad} flex flex-col gap-8 md:flex-row md:items-center`}>
        <div className="flex flex-1 flex-col gap-4">
          <p className="text-lg text-[#3f4444]">[EYEBROW: ABOUT THE CLUB]</p>
          <h1 className="text-4xl font-bold">[PAGE HEADLINE - ONE LINE]</h1>
          <p className="text-lg text-[#3f4444]">[ONE OR TWO SENTENCE INTRO]</p>
          <div className="flex gap-4">
            <a
              href="https://bullsconnect.usf.edu/sase/home/"
              className={`${button} bg-[#84ca44]`}
            >
              Join Us
            </a>
            <a href="#mission" className={button}>
              Our Mission
            </a>
          </div>
        </div>
        <div
          className={`${card} flex h-72 flex-1 items-center justify-center bg-[#d0d0ce] text-lg text-[#3f4444]`}
        >
          [HERO PHOTO]
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className={`${pad} grid gap-8 md:grid-cols-2 md:items-center`}>
        <div
          className={`${card} flex h-72 items-center justify-center bg-[#d0d0ce] text-lg text-[#3f4444]`}
        >
          [PHOTO - CLUB MEETING]
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-semibold">[WHO WE ARE]</h2>
          <p className="text-lg">[CLUB INFORMATION - PARAGRAPH 1]</p>
          <p className="text-lg">[CLUB INFORMATION - PARAGRAPH 2]</p>
        </div>
      </section>

      {/* MISSION */}
      <section id="mission" className={`${pad} bg-[#89abe3] text-center`}>
        <h2 className="text-3xl font-semibold">OUR MISSION</h2>
        <p className="mx-auto mt-4 max-w-3xl text-2xl">
          [MISSION STATEMENT - ONE STRONG SENTENCE]
        </p>
      </section>

      {/* WHAT WE DO */}
      <section className={pad}>
        <h2 className="mb-8 text-3xl font-semibold">WHAT WE DO</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {pillars.map((p) => (
            <div key={p.title} className={`${card} ${p.color} p-6`}>
              <h3 className="text-2xl font-semibold">{p.title}</h3>
              <p className="mt-2 text-lg">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BY THE NUMBERS */}
      <section className={`${pad} bg-[#141b4d] text-white`}>
        <h2 className="mb-8 text-center text-3xl font-semibold">SASE USF BY THE NUMBERS</h2>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border-2 border-[#89abe3] p-6 text-center"
            >
              <p className="text-4xl text-[#84ca44]">{s.value}</p>
              <p className="text-lg">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* EBOARD */}
      <section className={pad}>
        <h2 className="mb-8 text-3xl font-semibold">MEET THE EBOARD</h2>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
          {eboard.map((m, i) => (
            <a
              key={i}
              href={m.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`${card} block overflow-hidden bg-white transition hover:-translate-y-1 hover:bg-[#bfe0a1]`}
            >
              <div className="flex h-40 items-center justify-center bg-[#d0d0ce] text-lg text-[#3f4444]">
                [PHOTO]
              </div>
              <div className="border-t-4 border-[#84ca44] p-4">
                <h3 className="text-2xl font-semibold">{m.name}</h3>
                <p className="text-lg text-[#3f4444]">{m.role}</p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}