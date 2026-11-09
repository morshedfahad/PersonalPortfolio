import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// editorial display serif for headings
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
});

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Fahad Morshed",
  jobTitle: "Software Engineer & AI Researcher",
  url: "https://fahadmorshed.com",
  email: "mailto:morshedfahad@yahoo.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Dhaka",
    addressCountry: "BD",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Bangladesh University of Professionals",
  },
  sameAs: [
    "https://github.com/morshedfahad",
    "https://linkedin.com/in/morshedfahad",
  ],
  knowsAbout: [
    "Machine Learning",
    "Large Language Models",
    "Oracle APEX",
    "PL/SQL",
    "DevOps",
    "Docker",
    "Kubernetes",
    "FastAPI",
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://fahadmorshed.com"),
  title: "Fahad Morshed — Software Engineer & AI Researcher",
  description:
    "Software engineer and published AI researcher with 5+ years of experience in Oracle APEX, PL/SQL, full-stack development, and machine learning. Based in Dhaka, Bangladesh.",
  keywords: [
    "Fahad Morshed",
    "Software Engineer",
    "AI Researcher",
    "Oracle APEX",
    "LangChain",
    "Full-Stack Developer",
  ],
  openGraph: {
    title: "Fahad Morshed — Software Engineer & AI Researcher",
    description:
      "Building production-grade AI & enterprise systems — from LLM-powered learning platforms to Oracle solutions serving 5+ clients.",
    url: "https://fahadmorshed.com",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          {children}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
