import type { CardItem, InfoItem } from "@/components/cards";
 
/* ---------- hero slideshow ---------- */
export const memberImages = [
  {src:"/members/eboard.jpg", alt: "SASE USF E-board" },
  {src:"/members/eboard1.jpg", alt: "SASE USF E-board" },
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
export type Member = {
  name: string;
  role: string;
  linkedin: string;
  major?: string;
  bio?: string;
};

export const eboard: Member[] = [
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
export const photos: Record<string, string> = {
  "Sriharsha Manthena": "/eboard_pics/harsha.jpg",
  "Annalise Yee": "/eboard_pics/annalise.jpg",
  "Adhyayan Tiwari": "/eboard_pics/Adhyayan.png",
  "Katarina Jenarine": "/eboard_pics/kat.jpg",
  "Lakesh Kumar Ram Rakhiani": "/eboard_pics/Laksh.jpeg",
  "Nishanth Baddigam": "/eboard_pics/nishanth.jpg",
  "Kundana Anumakonda": "/eboard_pics/kundana.jpg",
  "Patcharalak Tulyakul": "/eboard_pics/pat.jpg",
  "Minh Hoa Vu": "/eboard_pics/hoa.jpg",
  "Arie Bhagan": "/eboard_pics/Arie.jpeg",
  "Ashita Agrawal": "/eboard_pics/ashita.jpg",
  "Felicity Liu": "/eboard_pics/felicity.jpg",
  "Radhika Rao": "/eboard_pics/radhika.jpg",
  "Rakshit Bhardwaj": "/eboard_pics/Rakshit.JPG",
  "Vaanya Sharma": "/eboard_pics/vaanya.jpg",
};

export const details: Record<string, { year: string; major: string; bio: string }> = {
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