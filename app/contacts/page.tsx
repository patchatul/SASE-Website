"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SaseLogo from "@/public/sase_logos/navyHorizontal.png";
import linktreeLogo from "@/public/social_media_logos/linktree-logo-long.webp";
import linkedinLogo from "@/public/social_media_logos/linkedin-logo-long.png";
import facebookLogo from "@/public/social_media_logos/facebook-logo-long.svg";
import instagramLogo from "@/public/social_media_logos/instagram-logo-long.png";
import discordLogo from "@/public/social_media_logos/discord-logo-blurple.png";
import bullsconnectLogo from "@/public/social_media_logos/bullsconnect.webp";


export default function Contacts() {
  return (
    <div className="bg-linear-to-b from-(--color-secondary) via-white to-(--color-secondary)">
    <div className=" w-full h-full pt-28 flex flex-col items-center justify-center gap-4 p-4 max-w-7xl mx-auto">
      <h1 className="text-(--color-primary) text-5xl font-semibold">Contact Us</h1>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 items-start text-2xl">
        <div className="bg-blue-200 border-2 border(--color-primary) rounded-xl p-10 m-10 flex flex-col items-left justify-left gap-8 max-w-3xl">
          <h2 className="text-3xl">Email</h2>
          <p className="underline"><a href="mailto:usf@saseconnect.org">usf@saseconnect.org</a></p>
          <form className="flex flex-col gap-4">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" className="border border-gray-300 rounded p-2 bg-white" />
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" className="border border-gray-300 rounded p-2 bg-white" />
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" className="border border-gray-300 rounded p-2 bg-white" rows={4}></textarea>
            <button type="submit" className="bg-(--color-primary) text-white rounded p-2 hover:bg-blue-700">Submit</button>
          </form>

        </div>
        <div className="bg-blue-200 border-2 border(--color-primary) rounded-xl p-10 m-10 w-xl ">
          <div>
            <h2 className="text-3xl text-center">Social Media</h2>
          </div>
          <div className="flex flex-col items-center justify-center gap-8 p-5 m-5 ">
            <a
              className="linktree-link"
              href="https://linktr.ee/usfsase"
              aria-label="LinkTree"
              title="LinkTree"
            >
              <Image
                src={linktreeLogo}
                alt="LinkTree"
                width={200}
                height={50}
              />
            </a>
            <a
              className="linkedin-link"
              href="https://www.linkedin.com/company/saseusf/"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <Image
                src={linkedinLogo}
                alt="LinkedIn"
                 width={200}
                height={50}
              />
            </a>
            <a
              className="facebook-link"
              href="https://www.facebook.com/SASEUSF/"
              aria-label="Facebook"
              title="Facebook"
            >
              <Image
                src={facebookLogo}
                alt="Facebook"
                width={200}
                height={50}
              />
            </a>
            <a
              className="instagram-link"
              href="https://www.instagram.com/usfsase/"
              aria-label="Instagram"
              title="Instagram"
            >
              <Image
                src={instagramLogo}
                alt="Instagram"
                 width={200}
                height={50}
              />
            </a>
            <a
              className="discord-link"
              href="https://discord.com/invite/TRFUzdd2cu"
              aria-label="Discord"
              title="Discord"
            >
              <Image
                src={discordLogo}
                alt="Discord"
                 width={200}
                height={50}
              />
            </a>

            <a
              className="footer-bullsconnect-link"
              href="https://bullsconnect.usf.edu/sase/home/"
              aria-label="BullsConnect"
              title="BullsConnect"
            >
              <Image
                src={bullsconnectLogo}
                alt="BullsConnect"
                 width={200}
                height={50}
              />
            </a>
          </div>
        </div>
      </div>
    </div >
    </div>
  );
}

