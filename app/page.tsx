"use client";
import MenuBar from "@/components/menubar";
import Footer from "@/components/footer";
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
        
      </div>
      
    </div>
  );
}
