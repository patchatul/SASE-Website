import EventsCalendar from "@/components/eventsCalendar";
import EventCardActions from "@/components/eventCardActions";
import { getCalendarEvents, getSaseEvents, splitEvents } from "@/lib/events";
import { connection } from "next/server";
import { Suspense } from "react";

export default function EventsPage() {
  return <Suspense fallback={<main className="min-h-screen bg-(--color-secondary) p-10 text-(--color-primary)">Loading events…</main>}><EventsContent /></Suspense>;
}

async function EventsContent() {
  await connection();
  const events = await getSaseEvents();
  const calendarEvents = await getCalendarEvents(events);
  const { upcoming, past } = splitEvents(events);

  return (
    <main className="min-h-screen bg-(--color-secondary) px-4 py-12 text-(--color-primary) sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-sm font-semibold tracking-[0.2em] uppercase">USF SASE</p>
          <h1 className="mt-2 text-5xl md:text-6xl">Events</h1>
          <p className="mt-3 max-w-2xl text-lg">Find what is happening with SASE and join us at our next event.</p>
        </div>

        <EventsCalendar events={calendarEvents} />

        <section className="mt-14" aria-labelledby="upcoming-events">
          <h2 id="upcoming-events" className="mb-6 text-3xl">Upcoming events</h2>
          {upcoming.length ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {upcoming.map((event) => <EventCard key={event.id} event={event} />)}
            </div>
          ) : (
            <div className="rounded-2xl border-2 border-(--color-primary) bg-white/80 p-6 shadow-[5px_5px_0_0_var(--color-primary)]">
              No upcoming events are listed yet. Check back soon or visit{" "}
              <a className="underline" href="https://bullsconnect.usf.edu/sase/events/">BullsConnect</a>.
            </div>
          )}
        </section>

        {past.length > 0 && (
          <section className="mt-14" aria-labelledby="past-events">
            <h2 id="past-events" className="mb-6 text-3xl">Recent events</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {past.slice(0, 6).map((event) => <EventCard key={event.id} event={event} />)}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

function EventCard({ event }: { event: Awaited<ReturnType<typeof getSaseEvents>>[number] }) {
  const start = new Date(event.start);
  const end = new Date(event.end);
  const dateParts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York", weekday: "short", month: "short", day: "numeric",
  }).formatToParts(start);
  const part = (type: string) => dateParts.find((item) => item.type === type)?.value ?? "";
  const day = Number(part("day"));
  const suffix = day % 100 >= 11 && day % 100 <= 13 ? "th" :
    day % 10 === 1 ? "st" : day % 10 === 2 ? "nd" : day % 10 === 3 ? "rd" : "th";
  const date = `${part("weekday")}, ${part("month")} ${day}${suffix}`;
  const formatTime = (value: Date) => new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York", hour: "numeric", minute: "2-digit",
  }).format(value);
  const time = event.allDay ? "All day" : `${formatTime(start)} – ${formatTime(end)}`;

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#101b2c] p-5 text-white shadow-[5px_5px_0_0_var(--color-primary)]">
      <div className="flex aspect-4/3 items-center justify-center overflow-hidden rounded-xl bg-[#0c1420] text-center text-2xl text-white">
        {event.image ? (
          // BullsConnect hosts event flyers on its own domain.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={event.image} alt={`${event.title} flyer`} className="h-full w-full object-cover" loading="lazy" />
        ) : (
          <span>No flyer yet! (┬┬﹏┬┬)</span>
        )}
      </div>
      <div className="flex flex-1 flex-col pt-5">
        <h3 className="mb-3 text-2xl font-semibold sm:text-3xl">{event.title}</h3>
        <p className="text-lg"><strong>Date:</strong> {date}</p>
        <p className="mt-1 text-lg"><strong>Time:</strong> {time}</p>
        <p className="mt-1 text-lg"><strong>Location:</strong> {event.location || "TBD"}</p>
        <EventCardActions description={event.description} url={event.url} title={event.title} />
      </div>
    </article>
  );
}
