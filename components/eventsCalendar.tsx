"use client";

import { useMemo, useState } from "react";
import type { SaseEvent } from "@/lib/events";

type CalendarEvent = Pick<SaseEvent, "id" | "title" | "start" | "end" | "allDay" | "url">;
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const colors = ["bg-[#c9e7b0]", "bg-[#a9ddff]", "bg-[#dcd5ff]", "bg-[#ffe1aa]"];

function dateKey(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York", year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(date);
  const value = (type: string) => parts.find((part) => part.type === type)?.value;
  return `${value("year")}-${value("month")}-${value("day")}`;
}

export default function EventsCalendar({ events }: { events: CalendarEvent[] }) {
  const [month, setMonth] = useState(() => {
    const [year, monthNumber] = dateKey(new Date()).split("-").map(Number);
    return new Date(year, monthNumber - 1, 1);
  });
  const firstDay = month.getDay();
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const cellCount = Math.ceil((firstDay + daysInMonth) / 7) * 7;
  const today = dateKey(new Date());

  const eventsByDay = useMemo(() => {
    const days = new Map<string, CalendarEvent[]>();
    for (const event of events) {
      const first = event.allDay ? event.start.slice(0, 10) : dateKey(new Date(event.start));
      const last = event.allDay
        ? new Date(new Date(`${event.end.slice(0, 10)}T00:00:00Z`).getTime() - 1).toISOString().slice(0, 10)
        : dateKey(new Date(new Date(event.end).getTime() - 1));
      const day = new Date(`${first}T00:00:00Z`);
      for (let span = 0; span < 31 && day.toISOString().slice(0, 10) <= last; span++) {
        const key = day.toISOString().slice(0, 10);
        const existing = days.get(key) ?? [];
        existing.push(event);
        days.set(key, existing);
        day.setUTCDate(day.getUTCDate() + 1);
      }
    }
    return days;
  }, [events]);

  const changeMonth = (offset: number) => setMonth(new Date(month.getFullYear(), month.getMonth() + offset, 1));

  return (
    <section aria-label="Events calendar" className="overflow-hidden rounded-2xl border-2 border-(--color-primary) bg-white shadow-[6px_6px_0_0_var(--color-primary)]">
      <div className="flex flex-wrap items-center justify-between gap-4 bg-(--color-primary) px-5 py-4 text-white">
        <h2 className="text-2xl md:text-3xl">{new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(month)}</h2>
        <div className="flex items-center gap-2">
          <button type="button" onClick={() => changeMonth(-1)} aria-label="Previous month" className="rounded-full border border-white px-4 py-1 hover:bg-white/20">←</button>
          <button type="button" onClick={() => { const [year, monthNumber] = dateKey(new Date()).split("-").map(Number); setMonth(new Date(year, monthNumber - 1, 1)); }} className="rounded-full border border-white px-4 py-1 hover:bg-white/20">Today</button>
          <button type="button" onClick={() => changeMonth(1)} aria-label="Next month" className="rounded-full border border-white px-4 py-1 hover:bg-white/20">→</button>
        </div>
      </div>
      <div className="grid grid-cols-7 border-b border-(--color-primary)/20 bg-(--light-blue) text-center text-xs font-semibold uppercase sm:text-sm">
        {weekdays.map((day) => <div key={day} className="p-2 sm:p-3">{day}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-px bg-(--color-primary)/15">
        {Array.from({ length: cellCount }, (_, index) => {
          const date = new Date(month.getFullYear(), month.getMonth(), index - firstDay + 1);
          const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
          const dayEvents = eventsByDay.get(key) ?? [];
          const inMonth = date.getMonth() === month.getMonth();
          return (
            <div key={key} className={`min-h-20 overflow-hidden bg-white p-1.5 sm:min-h-30 sm:p-2 ${inMonth ? "" : "bg-slate-50 text-slate-400"}`}>
              <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs sm:text-sm ${key === today ? "bg-(--color-primary) text-white" : ""}`}>{date.getDate()}</span>
              <div className="mt-1 space-y-1">
                {dayEvents.map((event, eventIndex) => (
                  <a key={event.id} href={event.url} target="_blank" rel="noopener noreferrer" title={event.title} className={`block rounded px-1 py-1 text-[10px] leading-tight text-(--color-primary) hover:underline sm:px-2 sm:text-xs ${colors[eventIndex % colors.length]}`}>
                    <span className="line-clamp-2">{event.title}</span>
                  </a>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
