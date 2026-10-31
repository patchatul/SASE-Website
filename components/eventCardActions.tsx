"use client";

import { useId, useState } from "react";

export default function EventCardActions({ description, url, title }: {
  description: string;
  url: string;
  title: string;
}) {
  const [open, setOpen] = useState(false);
  const descriptionId = useId();

  return (
    <div className="mt-auto pt-6">
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={descriptionId}
          onClick={() => setOpen((value) => !value)}
          className="rounded-lg bg-[#006b9d] px-3 py-3 text-center text-lg font-semibold text-white transition hover:bg-[#005982] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Event info
        </button>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-(--green) px-3 py-3 text-center text-lg font-semibold text-white transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          BullsConnect ↗ <span className="sr-only">for {title} (opens in a new tab)</span>
        </a>
      </div>
      <div id={descriptionId} hidden={!open} className="mt-5 rounded-lg bg-[#0c1420] p-4 text-base whitespace-pre-line">
        {description || "More details coming soon."}
      </div>
    </div>
  );
}
