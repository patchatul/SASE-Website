"use client";

import BigLittle from "@/components/bigLittle";
import ProjectTeam from "@/components/projectTeam";

export default function Programs() {
  return (
  <div className="pt-24">
     {/* use BigLittle and ProjectTeam components inside Programs page, we can use tab to open each one */}
    <BigLittle />
    <ProjectTeam />
  </div>
  );
}