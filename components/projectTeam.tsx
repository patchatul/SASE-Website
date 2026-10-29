"use client";

<h3 className="text-(--color-primary) text-2xl font-semibold">Project Team</h3>

import { useState } from "react";

export default function ProjectTeam() {
  // Track which team is clicked. null means show all 4 teams.
  const [selectedTeam, setSelectedTeam] = useState<number | null>(null);

  // Data for each team
  const teams = [
    { id: 1, name: "Code for Community", description: "Working on upgrading the SASE website and the Bullsconnect website." },
    { id: 2, name: "Robotic Arm Project", description: "Working on building a robotic arm." },
    { id: 3, name: "Brain Tumor Detection", description: "Exploring AI integration and data science projects." },
    { id: 4, name: "Autonomous Bot", description: "Building community events and open-source tooling." },
    { id: 5, name: "Cancer Screening", description: "Brain Tumor Screening" },
    { id: 6, name: "Assistive Walking Device", description: "Assistive Walking Device"},
    { id: 7, name: "Water Purification System", description: "Water Purification System"},

  ];
  return (
    <div 
      className="relative w-full min-h-[700px] bg-cover bg-center flex flex-col justify-center items-center p-8 rounded-xl overflow-hidden"
      style={{ backgroundImage: "url('C:/Users/rithv/OneDrive/Pictures/downloads.jpg')" }}>
      <div className="w-full">
      {selectedTeam === null ? (
        /* VIEW 1: The 4 Circular Cards Overview */
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-white tracking-widest mb-12">PROJECT TEAMS</h2>
          <div className="flex justify-center items-center gap-8 flex-wrap">
            {teams.map((team) => (
              <div 
                key={team.id} 
                onClick={() => setSelectedTeam(team.id)}
                className="flex flex-col items-center cursor-pointer transition-transform hover:scale-105"
              >
                {/* Circular Card */}
                <div className="w-36 h-36 md:w-44 md:h-44 rounded-full bg-gray-200/80 border-4 border-white shadow-lg mb-3 flex items-center justify-center text-gray-800 font-bold">
                  {team.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* VIEW 2: Detail View (Circle on Left, Text Box on Right) */
        <div className="flex flex-col items-center">
          {/* Back Button */}
          <button 
            onClick={() => setSelectedTeam(null)} 
            className="mb-8 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full text-sm font-semibold transition"
          >
            ← Back to All Teams
          </button>

          <div className="flex flex-col md:flex-row items-center justify-center gap-12 w-full max-w-4xl">
            {/* Large Circle on Left */}
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gray-200/80 border-4 border-white shadow-xl flex items-center justify-center text-2xl font-bold text-gray-800">
              {teams.find((t) => t.id === selectedTeam)?.name}
            </div>

            {/* About Box on Right */}
            <div className="bg-[#111133]/90 text-white p-8 rounded-lg w-full md:w-[500px] h-48 flex flex-col justify-center shadow-xl border border-white/10">
              <h3 className="text-2xl font-bold tracking-wider mb-2">ABOUT TEAM {teams.find((t) => t.id === selectedTeam)?.name}</h3>
              <p className="text-gray-200 text-sm">
                {teams.find((t) => t.id === selectedTeam)?.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  )}