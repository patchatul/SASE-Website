import type { Metadata } from "next";
import { Bebas_Neue } from "next/font/google";
import "./globals.css";

//font from google fonts
const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400",
});


export const metadata: Metadata = {
  title: "SASE USF - Society of Asian Scientists and Engineers at University of South Florida",
  description: "SASE website for the Society of Asian Scientists and Engineers at University of South Florida. SASE is a student organization that promotes diversity and inclusion in STEM fields, providing professional development and networking opportunities for students.",
  authors: [{ name: "Code for Community Project Team" }],
  keywords: ["SASE", "Society of Asian Scientists and Engineers", "Website", "University of South Florida", "USF", "Student Organization", "STEM", "Science", "Technology", "Engineering", "Mathematics", "Computer Science", "Engineering", "Mathematics", "Science", "Technology", "Innovation", "Diversity", "Inclusion", "Community", "Leadership", "Professional Development"],
 //add og later after deployment
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
