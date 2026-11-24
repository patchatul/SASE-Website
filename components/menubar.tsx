"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const programs = [
  { href: "/projects", label: "Projects Teams" },
  { href: "/biglittle", label: "Big-Little" },
];

type NavItem =
  | { id: string; label: string; href: string }
  | { id: string; label: string; children: { href: string; label: string }[] };

const items: NavItem[] = [
  { id: "/about", href: "/about", label: "About" },
  { id: "programs", label: "Programs", children: programs },
  { id: "/events", href: "/events", label: "Events" },
  { id: "/eBoard", href: "/eBoard", label: "E-Board" },
  { id: "/newsletter", href: "/newsletter", label: "Newsletter" },
  { id: "/contacts", href: "/contacts", label: "Contacts" },
];

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className={`h-4 w-4 transition-transform duration-300 ${
        open ? "rotate-180" : ""
      }`}
      aria-hidden
    >
      <path d="M5 8l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function MenuBar() {
  const pathname = usePathname();
  const [hovered, setHovered] = useState<string | null>(null);
  const [programsOpen, setProgramsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobilePrograms, setMobilePrograms] = useState(false);
  const programsRef = useRef<HTMLLIElement>(null);

  // close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setProgramsOpen(false);
    setMobilePrograms(false);
  }, [pathname]);

  // close on Escape / outside click
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setProgramsOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (
        programsRef.current &&
        !programsRef.current.contains(e.target as Node)
      ) {
        setProgramsOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  const isItemActive = (item: NavItem) =>
    "children" in item
      ? item.children.some((c) => isActive(c.href))
      : isActive(item.href);

  const activeId = items.find(isItemActive)?.id ?? null;
  const underlineOn = hovered ?? activeId;

  const Underline = ({ id }: { id: string }) =>
    underlineOn === id ? (
      <motion.span
        layoutId="nav-underline"
        className="absolute -bottom-1 left-0 h-0.5 w-full rounded bg-(--color-primary)"
        transition={{ type: "spring", stiffness: 400, damping: 32 }}
      />
    ) : null;

  return (
    <nav className="fixed z-50 w-full bg-blue-200 text-(--color-primary)">
      <div className="mx-auto flex h-16 max-w-8xl items-center justify-between px-6 md:px-6 lg:px-14 xl:px-24 2xl:px-32">
        <Link
          href="/"
          className="shrink-0 transition-transform duration-200 hover:scale-105"
        >
          <Image
            src="/sase_logos/navyHorizontal.png"
            alt="SASE"
            width={96}
            height={28}
            className="h-7 w-auto"
          />
        </Link>

        {/* Links (right) – visible from tablet (md) up */}
        <motion.ul
          layoutRoot
          onMouseLeave={() => setHovered(null)}
          className="hidden items-center gap-4  text-lg tracking-[0.5px] md:flex lg:gap-8 lg:text-xl xl:gap-10"
        >
          {items.map((item) =>
            "children" in item ? (
              <li key={item.id} ref={programsRef} className="relative">
                <button
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={programsOpen}
                  onClick={() => setProgramsOpen((v) => !v)}
                  onMouseEnter={() => setHovered(item.id)}
                  onFocus={() => setHovered(item.id)}
                  onBlur={() => setHovered(null)}
                  className="inline-flex items-center gap-1 transition-transform duration-200 hover:-translate-y-0.5"
                >
                  {item.label}
                  <Chevron open={programsOpen} />
                </button>
                <Underline id={item.id} />

                <AnimatePresence>
                  {programsOpen && (
                    <motion.div
                      role="menu"
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-1/2 top-full mt-4 flex -translate-x-1/2 flex-col gap-1 rounded-xl bg-blue-200 p-3 shadow-lg ring-1 w-max max-w-[calc(100vw-2rem)] "
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          role="menuitem"
                          className={`rounded-lg px-4 py-2 transition-transform duration-200 hover:-translate-y-0.5 ${
                            isActive(child.href) ? "underline" : ""
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ) : (
              <li key={item.id} className="relative">
                <Link
                  href={item.href}
                  onMouseEnter={() => setHovered(item.id)}
                  onFocus={() => setHovered(item.id)}
                  onBlur={() => setHovered(null)}
                  className="inline-block transition-transform duration-200 hover:-translate-y-0.5 "
                >
                  {item.label}
                </Link>
                <Underline id={item.id} />
              </li>
            )
          )}
        </motion.ul>

        {/* Mobile hamburger – phones only */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="relative flex h-10 w-10 items-center justify-center transition-colors md:hidden"
        >
          <span
            className={`absolute h-0.5 w-6 bg-current transition-all duration-300 ${
              mobileOpen ? "rotate-45" : "-translate-y-1.5"
            }`}
          />
          <span
            className={`absolute h-0.5 w-6 bg-current transition-all duration-300 ${
              mobileOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute h-0.5 w-6 bg-current transition-all duration-300 ${
              mobileOpen ? "-rotate-45" : "translate-y-1.5"
            }`}
          />
        </button>
      </div>

      {/* Mobile panel */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden bg-blue-200 md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 pb-5 pt-1 text-lg">
              {items.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  {"children" in item ? (
                    <>
                      <button
                        type="button"
                        aria-expanded={mobilePrograms}
                        onClick={() => setMobilePrograms((v) => !v)}
                        className={`flex w-full items-center justify-between border-l-2 px-4 py-3 text-left transition-all duration-200 hover:translate-x-1 hover:border-(--color-primary) ${
                          isItemActive(item)
                            ? "border-(--color-primary) underline"
                            : "border-transparent"
                        }`}
                      >
                        {item.label}
                        <Chevron open={mobilePrograms} />
                      </button>
                      <AnimatePresence initial={false}>
                        {mobilePrograms && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden pl-4"
                          >
                            {item.children.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  className={`block border-l-2 px-4 py-2.5 transition-all duration-200 hover:translate-x-1 hover:border-(--color-primary) ${
                                    isActive(child.href)
                                      ? "border-(--color-primary) underline"
                                      : "border-transparent"
                                  }`}
                                >
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={`block border-l-2 px-4 py-3 transition-all duration-200 hover:translate-x-1 ${
                        isActive(item.href)
                          ? "border-(--color-primary) underline"
                          : "border-transparent"
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
