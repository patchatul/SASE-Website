This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Events calendar

The Events page reads the public SASE BullsConnect ICS feed with a 24-hour cache lifetime. Event cards use that feed for titles, dates, descriptions, and links. Flyer URLs come from BullsConnect's public event data and are cached for one hour; when an event has no flyer, the card displays the Instagram fallback.

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
    └── 📁.claude
        ├── settings.local.json
    └── 📁app
        └── 📁.vscode
            ├── launch.json
        └── 📁about
            ├── page.tsx
        └── 📁biglittle
            ├── page.tsx
        └── 📁contacts
            ├── page.tsx
        └── 📁eBoard
            ├── page.tsx
        └── 📁events
            ├── page.tsx
        └── 📁newsletter
            ├── page.tsx
        └── 📁projects
            ├── page.tsx
        ├── globals.css
        ├── layout.tsx
        ├── page.tsx
    └── 📁components
        ├── cards.tsx
        ├── eventCardActions.tsx
        ├── eventsCalendar.tsx
        ├── footer.tsx
        ├── landingPage.tsx
        ├── menubar.tsx
        ├── motionCardRow.tsx
        ├── newsletterCards.tsx
    └── 📁data
        ├── membersInfo.tsx
        ├── newsletter.json
    └── 📁lib
        ├── events.ts
    └── 📁public
        └── 📁big_lit_pics
            ├── big_lit.png
        └── 📁blog_pics
            
        └── 📁eboard_pics
           
        └── 📁members
            ├── eboard.JPG
            ├── eboard1.JPG
            ├── karaoke.jpeg
            ├── project_team.jpeg
            ├── project_team1.jpeg
            ├── workshop.jpeg
        └── 📁panda_stickers
            ├── air.png
            ├── earth.png
            ├── fire.png
            ├── pandaEE.png
            ├── pandaSitting.png
            ├── stressfulPanda.png
            ├── water.png
        └── 📁project_team_members
           
        └── 📁sase_logos
            ├── mixedHorizontal.png
            ├── mixedStack.png
            ├── mixedWhiteHorizontal.png
            ├── mixedWhiteStack.png
            ├── navyHorizontal.png
            ├── navyStack.png
            ├── whiteHorizontal.png
            ├── whiteStack.png
        ├── bullsconnect.webp
        ├── members.jpg
    ├── .env.local
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
