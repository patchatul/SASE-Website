import Image from "next/image";
import { FaDiscord, FaInstagram, FaLinkedin } from "react-icons/fa6";
import { SiLinktree } from "react-icons/si";
import SaseLogo from "@/public/sase_logos/navyHorizontal.png";
import StressfulPanda from "@/public/panda_stickers/stressfulPanda.png";
import Link from "next/link";

const socialLinks = [
  {
    label: "Discord",
    href: "https://discord.com/invite/TRFUzdd2cu",
    Icon: FaDiscord,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/usfsase/",
    Icon: FaInstagram,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/saseusf/",
    Icon: FaLinkedin,
  },
  { label: "Linktree", href: "https://linktr.ee/usfsase", Icon: SiLinktree },
];

// every contact link: hover lift + keyboard focus ring (color is inherited from the footer)
const linkBase =
  "inline-flex items-center transition duration-150 hover:-translate-y-0.5  hover:text-white focus-visible:outline-3 focus-visible:outline-offset-5 focus-visible:outline-current";

export default function Footer() {
  return (
    <footer
      aria-label="Site footer"
      className="shrink-0 bg-(--color-secondary) px-[clamp(1.5rem,4vw,4rem)] pt-12 pb-8 text-(--color-primary) md:pt-16 md:pb-6"
    >
      <div className="mx-auto grid max-w-8xl grid-cols-[minmax(0,1fr)_auto] gap-x-6 gap-y-12 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:items-center md:gap-x-16 md:gap-y-0">
        {/* brand: smaller logo + text */}
        <div className="flex flex-col items-start gap-1">
          <Image
            src={SaseLogo}
            alt="SASE"
            width={352}
            height={104}
            sizes="(min-width: 1024px) 190px, 140px"
            className="mb-3 h-auto w-35 lg:w-47.5"
          />
          <h2 className="text-2xl md:text-3xl">
            University of South Florida
          </h2>
          <h3 className="text-2xl md:text-3xl">
            Society of Asian Scientists and Engineers
          </h3>
        </div>

        {/* panda (hover / focus tooltip): right of the brand below md, middle column from md up */}
        <div
          className="group relative flex flex-col items-center self-center justify-self-end md:justify-self-center"
          tabIndex={0}
        >
            <Image
              src={StressfulPanda}
              alt="USF SASE Panda Sticker"
              sizes="(min-width: 1024px) 144px, (min-width: 768px) 112px, 96px"
              className="h-auto w-24 md:w-28 lg:w-36"
            />
          <div
            role="tooltip"
            // right-aligned below md so it can't run off the screen edge, centered from md up
            className="pointer-events-none absolute right-0 bottom-full z-20 mb-2 w-max max-w-56 translate-y-1 rounded-xl border-2 border-(--color-primary) bg-white px-3 py-2 text-center text-base opacity-0 shadow-[3px_3px_0_0_var(--color-primary)] transition duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 md:right-auto md:left-1/2 md:-translate-x-1/2"
          >
            Thank you for visiting SASE website!
          </div>
        </div>

        {/* contacts: full row, left-aligned below md; right column, right-aligned from md up */}
        <div className="col-span-2 flex flex-col items-center mb-6 gap-6 md:col-span-1 md:items-end md:justify-self-end">
          <p className="text-xl md:text-2xl">Contacts</p>
          <nav aria-label="Social media">
            {/* all icons in ONE row (below md they shrink a little instead of wrapping) */}
            <ul className="flex flex-nowrap items-center gap-6 md:gap-[clamp(1.25rem,2.5vw,2.5rem)]">
              {socialLinks.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    className={linkBase}
                    href={href}
                    aria-label={label}
                    title={label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon aria-hidden="true" className="size-8 md:size-10" />
                  </a>
                </li>
              ))}
              <li>
                <a
                  className={linkBase}
                  href="https://bullsconnect.usf.edu/SASE/club_signup"
                  aria-label="BullsConnect"
                  title="BullsConnect"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src="/bullsconnect.webp"
                    alt="BullsConnect"
                    width={267}
                    height={61}
                    className="h-auto w-32 md:w-40"
                  />
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* bottom bar: same on every screen size */}
      <div className="flex justify-center border-t-2 pt-5 text-center text-sm md:mt-14 md:text-base">
        <p>© 2026 USF SASE. All rights reserved.</p>
        <span className="mx-2">|</span>
        
        <p>Made by <Link href="/projects/" className="hover:text-white hover:underline  ">
        Code for Community.</Link></p>
      </div>
    </footer>
  );
}
