"use client";

import BigLittle from "@/components/bigLittle";
import ProjectTeam from "@/components/projectTeam";

export default function Programs() {
  return (
    <div 
      className="relative w-full min-h-screen bg-cover bg-center flex flex-col justify-between p-8" 
      style={{ backgroundImage: "url('/path-to-your-bg-image.jpg')" }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 z-0"></div>

      {/* Main Content Area */}
      <div className="relative z-10 text-white flex flex-col gap-12 w-full">
        <h2 className="text-2xl font-semibold">Programs</h2>
        <BigLittle />
        <ProjectTeam />
      </div>
    </div>
  );
}