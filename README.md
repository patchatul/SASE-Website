This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Events calendar

The Events page reads the public SASE BullsConnect ICS feed and refreshes it every 15 minutes. Event cards use that feed for titles, dates, descriptions, and links. When a public event page exposes an `og:image`, its flyer appears on the card; otherwise the card displays `No flyer yet! cry`.

To use the Google Calendar API for the month calendar, subscribe a **public** Google calendar to the SASE ICS feed, enable the Google Calendar API in Google Cloud, and set these server-side variables in `.env.local` or your deployment environment:

```text
GOOGLE_CALENDAR_ID=your_public_calendar_id
GOOGLE_CALENDAR_API_KEY=your_api_key
```

Restart the dev server after setting them. Without these values, the month calendar uses the same live ICS data as the cards. Keep the API key server-side and restrict it to the Google Calendar API.

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

File Structure
```
└── 📁sase-website
    └── 📁app
        └── 📁contacts
            ├── page.tsx
        └── 📁eBoard
            ├── page.tsx
        ├── globals.css
        ├── layout.tsx
        ├── page.tsx
    └── 📁public
    ├── .gitignore
    ├── AGENTS.md
    ├── eslint.config.mjs
    ├── next-env.d.ts
    ├── next.config.ts
    ├── package-lock.json
    ├── package.json
    ├── README.md
    └── tsconfig.json
```
