import ICAL from "ical.js";

const FEED_URL = "https://bullsconnect.usf.edu/ical/usf/ical_club_58511.ics";
const EVENT_URL = "https://bullsconnect.usf.edu/sase/events/";
const MAX_OCCURRENCES = 300;

export type SaseEvent = {
  id: string;
  title: string;
  description: string;
  start: string;
  end: string;
  allDay: boolean;
  location: string;
  url: string;
  image: string | null;
};

export function splitEvents(events: SaseEvent[]) {
  const now = Date.now();
  return {
    upcoming: events.filter((event) => new Date(event.end).getTime() >= now),
    past: events.filter((event) => new Date(event.end).getTime() < now).reverse(),
  };
}

function safeUrl(value: string | null | undefined): string {
  if (!value) return "";
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname === "bullsconnect.usf.edu"
      ? url.toString()
      : "";
  } catch {
    return "";
  }
}

function cleanDescription(value: string): string {
  return value.replace(/\n---\nEvent Details:[\s\S]*$/i, "").trim();
}

function parseFeed(ics: string): SaseEvent[] {
  const calendar = new ICAL.Component(ICAL.parse(ics));
  const components = calendar.getAllSubcomponents("vevent");
  const events: SaseEvent[] = [];
  const today = new Date();
  const lowerBound = new Date(today.getFullYear() - 1, 0, 1);
  const upperBound = new Date(today.getFullYear() + 2, 0, 1);

  for (const component of components) {
    if (component.getFirstPropertyValue("status") === "CANCELLED") continue;
    const event = new ICAL.Event(component);
    if (event.isRecurrenceException()) continue;
    const url = safeUrl(String(component.getFirstPropertyValue("url") ?? "")) || EVENT_URL;
    const imageValue = component.getFirstPropertyValue("image") ?? component.getFirstPropertyValue("attach");
    const image = safeUrl(typeof imageValue === "string" ? imageValue : "") || null;
    const addOccurrence = (start: Date, end: Date, allDay: boolean, title: string, description: string, location: string) => {
      if (end < lowerBound || start >= upperBound) return;
      events.push({
        id: `${event.uid}-${start.toISOString()}`,
        title,
        description: cleanDescription(description),
        start: start.toISOString(),
        end: end.toISOString(),
        allDay,
        location,
        url,
        image,
      });
    };

    if (event.isRecurring()) {
      const iterator = event.iterator();
      for (let count = 0; count < MAX_OCCURRENCES; count++) {
        const next = iterator.next();
        if (!next || next.toJSDate() >= upperBound) break;
        const occurrence = event.getOccurrenceDetails(next);
        const actual = occurrence.item;
        addOccurrence(
          occurrence.startDate.toJSDate(), occurrence.endDate.toJSDate(),
          occurrence.startDate.isDate, actual.summary, actual.description, actual.location,
        );
      }
    } else {
      addOccurrence(
        event.startDate.toJSDate(), event.endDate.toJSDate(),
        event.startDate.isDate, event.summary, event.description, event.location,
      );
    }
  }

  return events.sort((a, b) => a.start.localeCompare(b.start));
}

async function getFlyer(url: string): Promise<string | null> {
  if (!url || url === EVENT_URL) return null;
  try {
    const response = await fetch(url, { next: { revalidate: 3600 }, signal: AbortSignal.timeout(8000) });
    if (!response.ok) return null;
    const html = await response.text();
    const meta = html.match(/<meta\s+[^>]*property=["']og:image["'][^>]*>/i)?.[0];
    const raw = meta?.match(/content=["']([^"']+)["']/i)?.[1];
    return safeUrl(raw?.replace(/&amp;/g, "&")) || null;
  } catch {
    return null;
  }
}

export async function getSaseEvents(): Promise<SaseEvent[]> {
  try {
    const response = await fetch(FEED_URL, { next: { revalidate: 900 }, signal: AbortSignal.timeout(10000) });
    if (!response.ok) throw new Error(`ICS request failed: ${response.status}`);
    const events = parseFeed(await response.text());
    const flyers = await Promise.all(events.map((event) => getFlyer(event.url)));
    return events.map((event, index) => ({ ...event, image: event.image ?? flyers[index] }));
  } catch (error) {
    console.error("Could not load SASE events", error);
    return [];
  }
}

type GoogleEvent = {
  id: string;
  summary?: string;
  description?: string;
  location?: string;
  htmlLink?: string;
  status?: string;
  start?: { dateTime?: string; date?: string };
  end?: { dateTime?: string; date?: string };
};

// A public Google calendar can be used once its ID and API key are configured.
// The ICS feed remains the source for cards and the calendar fallback.
export async function getCalendarEvents(fallbackEvents: SaseEvent[]): Promise<Pick<SaseEvent, "id" | "title" | "start" | "end" | "allDay" | "url">[]> {
  const calendarId = process.env.GOOGLE_CALENDAR_ID;
  const apiKey = process.env.GOOGLE_CALENDAR_API_KEY;
  if (calendarId && apiKey) {
    try {
      const params = new URLSearchParams({
        key: apiKey,
        singleEvents: "true",
        showDeleted: "false",
        maxResults: "2500",
        timeMin: new Date(new Date().getFullYear() - 1, 0, 1).toISOString(),
        timeMax: new Date(new Date().getFullYear() + 2, 0, 1).toISOString(),
      });
      const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?${params}`, {
        next: { revalidate: 900 }, signal: AbortSignal.timeout(10000),
      });
      if (!response.ok) throw new Error(`Google Calendar request failed: ${response.status}`);
      const data = (await response.json()) as { items?: GoogleEvent[] };
      return (data.items ?? []).filter((item) => item.status !== "cancelled" && item.start && item.end).map((item) => ({
        id: item.id,
        title: item.summary || "SASE event",
        start: item.start!.dateTime || `${item.start!.date}T00:00:00`,
        end: item.end!.dateTime || `${item.end!.date}T00:00:00`,
        allDay: Boolean(item.start!.date),
        url: item.htmlLink || EVENT_URL,
      }));
    } catch (error) {
      console.error("Could not load Google Calendar events; using ICS feed", error);
    }
  }
  return fallbackEvents.map(({ id, title, start, end, allDay, url }) => ({ id, title, start, end, allDay, url }));
}
