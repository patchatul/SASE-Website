import type { CardItem, InfoItem } from "@/components/cards";
 
/* ---------- hero slideshow ---------- */
export const memberImages = [
  { src: "/members/workshop.jpeg", alt: "SASE USF Workshop" },
  { src: "/members/big_little1.jpeg", alt: "SASE USF Big Little event" },
  { src: "/members/big_little.jpeg", alt: "SASE USF Big Little event" },
  { src: "/members/karaoke.jpeg", alt: "SASE USF Karaoke event" },
  { src: "/members/project_team1.jpeg", alt: "SASE USF Project team" },
  { src: "/members/project_team.jpeg", alt: "SASE USF Project team" },
];
 
/* ---------- numbers shown on the site ---------- */
export const siteStats = [
  { value: "772+", label: "Members" },
  { value: "2123+", label: "Instagram Followers" },
  { value: "1258+", label: "LinkedIn Followers" },
  { value: "191+", label: "Events" },
]
 
/* ---------- about ---------- */
export const mission: InfoItem[] = [
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
 
export const offers: InfoItem[] = [
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
 
/* ---------- programs ---------- */
export const projectTeams: CardItem[] = [
  {
    name: "AI for Brain Tumor Detection",
    description: "One sentence long description of what the project is about.",  image: "/members/project_team.jpeg",
  },
  { name: "Assistive Walking Device", description: "What this project is about.",  image: "/members/project_team.jpeg" },
  {name: "Cancer screening device", description: "What this project is about.",  image: "/members/project_team.jpeg" },
  { name: "Code for Community", description: "What this project is about.",  image: "/members/project_team1.jpeg" },
  { name: "Delivery bot", description: "What this project is about.",  image: "/members/project_team.jpeg" },
  { name: "Solar water purification", description: "What this project is about.",  image: "/members/project_team.jpeg" },
  {name: "Smart Robot", description: "What this project is about.",  image: "/members/project_team.jpeg" },
];
 
export const bigLittle: CardItem[] = [
  {
    name: "Resume Reviews",
    description:
      "Get feedback on your resume and LinkedIn from an experienced upperclassman.",
      image: "/members/big_little.jpeg"
  },
  {
    name: "Mock Interviews",
    description:
      "Practice technical and behavioral interviews before the real thing.",
      image: "/members/big_little1.jpeg"
  },
  {
    name: "Internships & Research",
    description:
      "Learn how to find and land internships and research positions in STEM.",
      image: "/members/big_little.jpeg"
  },
];
 
/* ---------- e-board ---------- */
export const eboard: CardItem[] = [
  {
    name: "Firstname Lastname",
    subtitle: "President",
    description: "Major, year. One line about them.",
  },
  {
    name: "Firstname Lastname",
    subtitle: "Vice President",
    description: "Major, year. One line about them.",
  },
  {
    name: "Firstname Lastname",
    subtitle: "Treasurer",
    description: "Major, year. One line about them.",
  },
  {
    name: "Firstname Lastname",
    subtitle: "Secretary",
    description: "Major, year. One line about them.",
  },
];
 