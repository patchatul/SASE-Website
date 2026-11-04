"use client";

import { useState } from "react";

const teams = [
  { id: 1, name: "Code for Community", description: "Code for Community is a software project that partners with local businesses and communities to build websites that serve their needs. The team is currently building a SASE website to showcase the chapter’s accomplishments and community. The project helps members strengthen their software fundamentals and learn how to think through website design, from getting comfortable with Next.js and Figma to collaborating as a team with Git." },
  { id: 2, name: "Robotic Arm Project", description: "Robot Arm is a hardware project building a bionic arm with a five-fingered hand and a two-axis wrist that mirrors the movements of a sensor glove, plus a gesture-triggered web shooter. Members build skills in mechanical design, electronics, and programming, from SolidWorks CAD and 3D printing to integrating servos, sensors, and an Arduino Mega." },
  { id: 3, name: "Brain Tumor Detection", description: "Brain Tumor Detection is a machine learning project that classifies brain tumors from MRI scans, comparing ResNet-18, ResNet-50, and EfficientNet-B0 to find the most reliable model. Members work through the full pipeline, from sourcing and preprocessing MRI data to training in Google Colab, while learning to evaluate data quality and model performance." },
  { id: 4, name: "Delivery Bot", description: "Delivery Bot is a robotics project building a small autonomous robot that delivers items to users who order through a website. The robot runs on a Raspberry Pi 5 with ROS 2, using LiDAR, IMU, SLAM, and Nav2 for mapping and navigation, with testing done first in Gazebo simulation. Members are split across hardware, embedded systems, and software teams, gaining experience across the full robotics stack." },
  { id: 5, name: "Cancer Screening Device", description: "Cancer Screening Device is a biomedical project building a low-cost paper test strip that flags early warning signs of cancer from a single drop of blood, as simply as a pregnancy test. The strip uses a colloidal gold lateral flow assay that turns a line red when proteins such as CEA, CA 15-3, and CA-125 reach warning levels. Members gain hands-on experience in biomedical research, assay design, and lab testing while learning to build accessible healthcare technology." },
  { id: 6, name: "Assistive Walking Device", description: "Assistive Walking Device is a hardware team project working to build an affordable smart walking stick that helps visually impaired individuals navigate their surroundings with greater confidence and independence. The team is designing a lightweight, portable stick and exploring smart features such as obstacle detection and emergency alerts to make everyday travel safer. Along the way, student members gain hands-on experience in product design, 3D printing, and electronics while learning to build technology around real human needs." },
  { id: 7, name: " Solar Water Purification System", description: "Water Purification is a project building a low-cost gravity filter that turns dirty water into cleaner, usable water through five layers of rock, sand, activated charcoal, and cloth. The team will test tap, lake, and dirt-mixed water while measuring clarity, pH, flow rate, and cost. Members gain hands-on experience in design, prototyping, and experimental testing." },
];

const circleColors = [
  "bg-[#93a8d8]", // blue
  "bg-[#d0e4b4]", // green
  "bg-[#a5aef5]", // lavender
];

export default function ProjectTeam() {
  // null means show the overview of all teams
  const [selectedTeam, setSelectedTeam] = useState<number | null>(null);
  const team = teams.find((t) => t.id === selectedTeam);
  const teamIndex = teams.findIndex((t) => t.id === selectedTeam);

  return (
    <div
      className="relative w-full bg-cover bg-center flex flex-col items-center px-8 pt-10 pb-16 rounded-xl overflow-hidden"
      style={{ backgroundImage: "url('/team-bg.jpg')" }}
    >
      <div className="w-full">
        {!team ? (
          /* VIEW 1: Overview of all teams */
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-white tracking-widest mb-8">
              PROJECT TEAMS
            </h2>
            <div className="flex justify-center items-center gap-8 flex-wrap max-w-5xl mx-auto">
              {teams.map((t,i) => (
                <div
                 key={t.id}
                 onClick={() => setSelectedTeam(t.id)}
                className="flex flex-col items-center cursor-pointer transition-transform hover:scale-105"
                  >
                <div
                 className={`w-36 h-36 md:w-44 md:h-44 rounded-full ${circleColors[i % circleColors.length]} border-2 border-[#1a1a4e] shadow-[6px_6px_0_0_#ffffff] flex items-center justify-center text-center p-4 text-[#1a1a4e] font-semibold`}
                  >     
                {t.name}
                </div>
                 </div>
              ))}
            </div>
          </div>
        ) : (
          /* VIEW 2: Detail view */
          <div className="flex flex-col items-center">
            <button
              onClick={() => setSelectedTeam(null)}
              className="mb-8 bg-[#bfe0fb] hover:bg-[#d3eafd] text-[#1a1a4e] border-2 border-white px-5 py-2 rounded-full text-sm font-medium transition"
            >
              ← Back to All Teams
            </button>

            <div className="flex flex-col md:flex-row items-center justify-center gap-12 w-full max-w-4xl">
              <div className={`w-48 h-48 md:w-64 md:h-64 rounded-full ${circleColors[teamIndex % circleColors.length]} border-2 border-[#1a1a4e] shadow-[8px_8px_0_0_#ffffff] flex items-center justify-center text-center p-4 text-2xl font-semibold text-[#1a1a4e]`}>
                {team.name}
              </div>

              <div className="bg-[#111133]/90 text-white p-8 rounded-lg w-full md:w-[500px] min-h-48 flex flex-col justify-center shadow-xl border border-white/10">
                <h3 className="text-2xl font-bold tracking-wider mb-2 uppercase">
                  About {team.name}
                </h3>
                <p className="text-gray-200 text-sm">{team.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}