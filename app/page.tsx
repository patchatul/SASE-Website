import Image from "next/image";
import SaseLogo from "@/public/sase_logos/navyHorizontal.png";
import Members from "@/public/members.jpg";
import MenuBar from "@/components/menubar";
import Footer from "@/components/footer";
import About from "@/app/about/page";
import Contacts from "@/app/contacts/page";
import Eboard from "@/app/eBoard/page";
import Events from "@/app/events/page";
import Programs from "@/app/programs/page";
import ProjectTeam from "@/components/projectTeam";
import BigLittle from "@/components/bigLittle";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <nav>
        <MenuBar />
      </nav>
      <main className="">
        <Image src={SaseLogo} alt="SASE Logo" width={200} height={200}/>
        <Image src={Members} alt="SASE Members"width={600} height={600}priority/>
        <h1 className="text-(--color-primary) text-4xl font-bold">
          welcome to SASE
        </h1>
        <h2 className="text-(--color-primary) text-2xl font-semibold">
          Society of Asian Scientists and Engineers at University of South
          Florida
        </h2>
      </main>
      <body className="flex flex-col items-center justify-center flex-1 w-full px-20 text-center">
        <About />
        <Events />
        <Programs />
        <BigLittle />
        <ProjectTeam />
        <Eboard />
        <Contacts />
      </body>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
