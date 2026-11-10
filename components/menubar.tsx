"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const links = [
  { href: "/about", label: "About" },
  { href: "/programs", label: "Programs" },
  { href: "/events", label: "Events" },
  { href: "/eBoard", label: "E-Board" },
  { href: "/contacts", label: "Contacts" },
];

export default function MenuBar() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <nav className="fixed inset-x-3 top-1 p-1 z-50 mx-auto max-w-8xl lg:inset-x-[5%] rounded-full border border-white/50 bg-linear-to-b from-white/35 to-white/15 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),inset_0_-1px_2px_rgba(255,255,255,0.3),0_6px_24px_rgba(0,0,0,0.12)] backdrop-blur-[6px] backdrop-saturate-180">
       <div className="flex h-12 items-center justify-between px-6 md:px-10">
        <Link href="/" className="hidden sm:block">
          <Image
            src="/sase_logos/navyHorizontal.png"
            alt="SASE"
            width={80}
            height={24}
            className="h-6 w-auto [filter:drop-shadow(0_0_2px_#fff)_drop-shadow(0_0_6px_#fff)]"
          />
        </Link>
        <motion.ul
          layoutRoot
          onMouseLeave={() => setHovered(null)}
          className="mx-auto flex items-center gap-3 text-md tracking-[0.5px] whitespace-nowrap text-slate-900 [text-shadow:0_0_1px_#fff,0_0_6px_#fff,0_0_12px_#fff] sm:mx-0 sm:gap-6 lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:gap-11 lg:text-lg"
        >
          {links.map((link) => (
            <li key={link.href} className="relative">
              {/*glass pill that slides to the hovered link */}
              <AnimatePresence>
                {hovered === link.href && (
                  <motion.span
                    layoutId="nav-hover"
                    className="absolute -inset-x-3 -inset-y-1 -z-10 rounded-full border border-white/50 bg-white/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
              </AnimatePresence>
              <Link
                href={link.href}
                onMouseEnter={() => setHovered(link.href)}
                onFocus={() => setHovered(link.href)}
                onBlur={() => setHovered(null)}
                className="transition-colors duration-200 hover:text-black "
              >
                {link.label}
              </Link>
            </li>
          ))}
        </motion.ul>
      </div>
    </nav>
  );
}
