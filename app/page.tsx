"use client";
import MenuBar from "@/components/menubar";
import Footer from "@/components/footer";
import About from "@/app/about/page";
import Contacts from "@/app/contacts/page";
import Eboard from "@/app/eBoard/page";
import Events from "@/app/events/page";
import Programs from "@/app/programs/page";
import ProjectTeam from "@/components/projectTeam";
import BigLittle from "@/components/bigLittle";
import LandingPage from "@/components/landingPage";

export default function Home() {
 
  return (
    <div>
      <nav>
        <MenuBar />
      </nav>

      <main>
        <LandingPage/>
      </main>
      
      <div className="flex w-full flex-col items-center justify-center text-center">
        <About />
        <Events />
        <Programs />
        <BigLittle />
        <ProjectTeam />
        <Eboard />
        <Contacts />
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
