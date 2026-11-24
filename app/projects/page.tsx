"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { Bebas_Neue } from "next/font/google";
import Image from "next/image";

// Condensed poster-style font used in the eboard design.
// If your site already loads this font globally, you can delete these lines and the `bebas.className` below.
const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"] });

type Team = {
  id: number;
  name: string;
  category: string;
  description: string;
  img?: string;
};
type Member = { name: string; role?: string; img?: string };

const FALLBACK_MEMBER_IMAGE = "/panda_stickers/pandaEE.png";

// To add a team photo, add  img: "/teams/filename.jpg"  (file goes in public/teams/)
const teams: Team[] = [
  {
    id: 1,
    name: "Code for Community",
    category: "Software",
    img: "/project_team_members/code_for_community.jpg",
    description:
      "Code for Community is a software project that partners with local businesses and communities to build websites that serve their needs. The team is currently building a SASE website to showcase the chapter’s accomplishments and community. The project helps members strengthen their software fundamentals and learn how to think through website design, from getting comfortable with Next.js and Figma to collaborating as a team with Git.",
  },
  {
    id: 2,
    name: "Robotic Arm Project",
    category: "Hardware",
    img: "/project_team_members/robotic_arm.jpg",
    description:
      "Robot Arm is a hardware project building a bionic arm with a five-fingered hand and a two-axis wrist that mirrors the movements of a sensor glove, plus a gesture-triggered web shooter. Members build skills in mechanical design, electronics, and programming, from SolidWorks CAD and 3D printing to integrating servos, sensors, and an Arduino Mega.",
  },
  {
    id: 3,
    name: "Brain Tumor Detection",
    category: "Machine Learning",
    img: "/project_team_members/brain_tumor_detection.jpg",
    description:
      "Brain Tumor Detection is a machine learning project that classifies brain tumors from MRI scans, comparing ResNet-18, ResNet-50, and EfficientNet-B0 to find the most reliable model. Members work through the full pipeline, from sourcing and preprocessing MRI data to training in Google Colab, while learning to evaluate data quality and model performance.",
  },
  {
    id: 4,
    name: "Delivery Bot",
    category: "Robotics",
    img: "/project_team_members/delivery_bot.jpg",
    description:
      "Delivery Bot is a robotics project building a small autonomous robot that delivers items to users who order through a website. The robot runs on a Raspberry Pi 5 with ROS 2, using LiDAR, IMU, SLAM, and Nav2 for mapping and navigation, with testing done first in Gazebo simulation. Members are split across hardware, embedded systems, and software teams, gaining experience across the full robotics stack.",
  },
  {
    id: 5,
    name: "Cancer Screening Device",
    category: "Biomedical",
    img: "/project_team_members/cancer_screening_device.jpg",
    description:
      "Cancer Screening Device is a biomedical project building a low-cost paper test strip that flags early warning signs of cancer from a single drop of blood, as simply as a pregnancy test. The strip uses a colloidal gold lateral flow assay that turns a line red when proteins such as CEA, CA 15-3, and CA-125 reach warning levels. Members gain hands-on experience in biomedical research, assay design, and lab testing while learning to build accessible healthcare technology.",
  },
  {
    id: 6,
    name: "Assistive Walking Device",
    category: "Hardware",
    img: "/project_team_members/assistive_walking_device.jpg",
    description:
      "Assistive Walking Device is a hardware team project working to build an affordable smart walking stick that helps visually impaired individuals navigate their surroundings with greater confidence and independence. The team is designing a lightweight, portable stick and exploring smart features such as obstacle detection and emergency alerts to make everyday travel safer. Along the way, student members gain hands-on experience in product design, 3D printing, and electronics while learning to build technology around real human needs.",
  },
  {
    id: 7,
    name: "Solar Water Purification System",
    category: "Engineering",
    img: "/project_team_members/water_purification.jpg",
    description:
      "Water Purification is a project building a low-cost gravity filter that turns dirty water into cleaner, usable water through five layers of rock, sand, activated charcoal, and cloth. The team will test tap, lake, and dirt-mixed water while measuring clarity, pH, flow rate, and cost. Members gain hands-on experience in design, prototyping, and experimental testing.",
  },
];

// To add a member photo, add  img: "/members/filename.jpg"  (file goes in public/members/)
// You can also add  role: "Team Lead"  to show under the name.
const membersByTeam: Record<number, Member[]> = {
  1: [
    // Code for Community (8)
    {
      name: "Patcharaluk Tulyakul",
      role: "Team Lead",
      img: "/eboard_pics/pat.jpg",
    },
    { name: "Rithva Menon", img: "/project_team_members/rithva.jpg" },
    { name: "Ashita Agrawal", img: "/eboard_pics/ashita.jpg" },
    { name: "Elizabeth Nyugen" },
    { name: "Pavithra Balaji", img: "/project_team_members/pavi.jpg" },
    { name: "Le Nyugen Dan" },
  ],
  2: [
    // Robotic Arm Project (6)
    { name: "Alesandra Morales" },
    { name: "Khoa Nguyen" },
    { name: "Mohid Rasool" },
    { name: "Liam Badillo" },
    { name: "Yash Ramlakhansingh" },
    { name: "Logan Martin" },
  ],
  3: [
    // Brain Tumor Detection (6)
    { name: "Lakshmi Prakash" },
    { name: "Chasrith Vasireddy" },
    { name: "Shraddaya Rai" },
    { name: "Phong Lien" },
    { name: "An Ton Bui" },
    { name: "Johnny Tran" },
  ],
  4: [
    // Delivery Bot (6)
    { name: "Akin Henry" },
    { name: "Alexander Bruneau", img: "/project_team_members/alex.jpg" },
    { name: "Mai Gia Tue Nguyen" },
    { name: "Christopher Thomas" },
    { name: "Yadira Rojas Reynoso" },
    { name: "Minh Hoa Vu", img: "/project_team_members/hoa.jpg" },
  ],
  5: [
    // Cancer Screening Device (5)
    { name: "Kanika Kuntal" },
    { name: "Shrinad Senthil Kumar" },
    { name: "Phuong Vo" },
    { name: "Joshitha Kalvakunila" },
    { name: "Maria Reshetnyak" },
    { name: "Khanh Trinh" },
  ],
  6: [
    // Assistive Walking Device (7)
    { name: "Ash Patel" },
    { name: "Zainab Taya" },
    { name: "Hiep Le", img: "/project_team_members/LeGiaHiep.jpg" },
    { name: "Jensen Singnoth" },
    { name: "Shreekar Saidu" },
    { name: "Lillian Duong" },
    { name: "Tam Vo" },
  ],
  7: [
    // Solar Water Purification System (4)
    { name: "Harini Rajesnayagham" },
    { name: "Delaine Rajesnayagham" },
    { name: "Alisha Imam" },
    { name: "Jolene" },
  ],
};

const NAVY = "#1a1a4e";
const TILTS = [-1.2, 0.8, -0.6, 1.1, -0.9, 0.7, -1.3, 0.9];

/* Empty photo slot: a soft sky-blue square with a person silhouette */
function PhotoPlaceholder() {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
    >
      <defs>
        <linearGradient id="phBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d3e2f7" />
          <stop offset="1" stopColor="#eef3fb" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" fill="url(#phBg)" />
      <circle cx="50" cy="40" r="14" fill="#a9bbdd" />
      <path d="M18 100c0-20 14-32 32-32s32 12 32 32z" fill="#a9bbdd" />
    </svg>
  );
}

function Polaroid({
  index,
  title,
  subtitle,
  img,
  onClick,
}: {
  index: number;
  title: string;
  subtitle?: string;
  img?: string;
  onClick?: () => void;
}) {
  const interactive = Boolean(onClick);
  const tilt = TILTS[index % TILTS.length];
  const isFallbackImage = img === FALLBACK_MEMBER_IMAGE;

  return (
    <div
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      onClick={onClick}
      onKeyDown={(e) => {
        if (interactive && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick?.();
        }
      }}
      style={{ "--tilt": `${tilt}deg` } as CSSProperties}
      className={`relative w-full max-w-sm sm:max-w-none sm:w-50 lg:w-70 rounded-2xl border-2 border-[#1a1a4e] bg-white p-4 pb-6 shadow-[5px_5px_0_0_#1a1a4e] transition-transform duration-200 ${
        interactive
          ? "cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#93a8d8]"
          : ""
      }`}
    >
      {/* green tape */}
      <div className="absolute -top-4 left-1/2 h-8 w-28 -translate-x-1/2 bg-[#c5e6a6]/90 " />

      {/* photo */}
      <div className="relative aspect-square w-full overflow-hidden rounded-lg">
        {img ? (
          <Image
            src={img}
            alt={title}
            fill
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 28vw"
            loading="lazy"
            decoding="async"
            className={isFallbackImage ? "object-contain p-4" : "object-cover"}
          />
        ) : (
          <PhotoPlaceholder />
        )}
      </div>

      {/* caption */}
      <div className="mt-5 min-h-18 text-center" style={{ color: NAVY }}>
        <p className="text-3xl leading-none tracking-wide">{title}</p>
        {subtitle && (
          <p className="mt-2 text-xl leading-none tracking-wide opacity-70">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="text-center" style={{ color: NAVY }}>
      <h2 className="text-6xl leading-none tracking-wide md:text-7xl">
        {title}
      </h2>
      <div className="mx-auto mt-5 h-1.5 w-16 rounded-full bg-[#7ed13a]" />
      <p className="mt-6 text-xl tracking-wide">{subtitle}</p>
    </div>
  );
}

export default function ProjectTeam() {
  const [selectedTeam, setSelectedTeam] = useState<number | null>(null);
  const [showMembers, setShowMembers] = useState(false);

  const team = teams.find((t) => t.id === selectedTeam);
  const members = team ? (membersByTeam[team.id] ?? []) : [];
  const modalOpen = Boolean(team) && !showMembers;

  const closeModal = () => setSelectedTeam(null);
  const backToAll = () => {
    setShowMembers(false);
    setSelectedTeam(null);
  };

  // Esc closes the popup + lock page scroll while it's open
  useEffect(() => {
    if (!modalOpen) return;
    const onKey = (e: KeyboardEvent) =>
      e.key === "Escape" && setSelectedTeam(null);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [modalOpen]);

  return (
    <section
      className={`${bebas.className} w-full px-6 pb-24 pt-36`}
      style={{
        backgroundColor: "#e8e8e8",
        backgroundImage:
          "linear-gradient(to bottom, #a4b9e6 0px, #e8e8e8 300px)",
      }}
    >
      {team && showMembers ? (
        /* VIEW 3: members of the selected team */
        <div className="mx-auto max-w-5xl">
          <button
            onClick={backToAll}
            className="rounded-full border-2 border-[#1a1a4e] bg-white px-6 py-2 text-xl tracking-wide text-[#1a1a4e] transition hover:bg-[#1a1a4e] hover:text-white"
          >
            ← Back to all teams
          </button>

          <div className="mt-8">
            <SectionHeading
              title={team.name}
              subtitle="Click on the polaroids to meet the members!"
            />
          </div>

          <div className="mt-20 flex flex-wrap justify-center gap-x-12 gap-y-16">
            {members.map((m, i) => (
              <Polaroid
                key={i}
                index={i}
                title={m.name}
                subtitle={m.role}
                img={m.img ?? FALLBACK_MEMBER_IMAGE}
              />
            ))}
          </div>
        </div>
      ) : (
        /* VIEW 1: polaroid overview of all teams */
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            title="Meet the Project Teams"
            subtitle="Click on any polaroid to learn more about each project!"
          />

          <div className="mt-20 flex flex-wrap justify-center gap-x-12 gap-y-16">
            {teams.map((t, i) => (
              <Polaroid
                key={t.id}
                index={i}
                title={t.name}
                subtitle={t.category}
                img={t.img}
                onClick={() => setSelectedTeam(t.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* VIEW 2: description popup */}
      {modalOpen && team && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={closeModal}
        >
          <div
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-2xl border-2 border-[#1a1a4e] bg-white p-6 shadow-[5px_5px_0_0_#1a1a4e] md:p-8"
          >
            <button
              onClick={closeModal}
              aria-label="Close"
              className="absolute right-4 top-3 z-10 text-2xl leading-none text-[#1a1a4e] hover:opacity-60"
            >
              ×
            </button>

            <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-10">
              <div className="relative aspect-square w-full overflow-hidden rounded-lg md:w-2/5 md:shrink-0">
                {team.img ? (
                  <Image
                    src={team.img}
                    alt={team.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    loading="lazy"
                    decoding="async"
                    className="object-cover"
                  />
                ) : (
                  <PhotoPlaceholder />
                )}
              </div>

              <div className="flex-1">
                <h3 className="text-5xl leading-none tracking-wide text-[#1a1a4e]">
                  {team.name}
                </h3>
                <p className="mt-2 text-2xl tracking-wide text-[#1a1a4e]/70">
                  {team.category}
                </p>

                <p className="mt-5 text-xl leading-7 tracking-wide text-[#1a1a4e]">
                  {team.description}
                </p>

                <button
                  onClick={() => setShowMembers(true)}
                  className="mt-7 rounded-full border-2 border-[#1a1a4e] px-6 py-2 text-xl tracking-wide text-[#1a1a4e] transition hover:bg-[#1a1a4e] hover:text-white"
                >
                  Meet the team
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
