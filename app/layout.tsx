import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, IBM_Plex_Mono } from "next/font/google";
import { MotionProvider } from "@/components/MotionProvider";
import { SiteFooter, SiteHeader } from "@/components/ui";
import { Spotlight } from "@/components/Spotlight";
import { TipLayer } from "@/components/TipLayer";
import { Analytics } from "@vercel/analytics/next";
import { site, siteUrl } from "@/content/site";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-plex-mono",
});

// Applies a remembered theme before first paint (no flash). Without a stored
// choice nothing is stamped and CSS follows prefers-color-scheme.
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;

const title = `${site.name} — ${site.title}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description: site.tagline,
  authors: [{ name: site.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    title,
    description: site.tagline,
    siteName: site.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.tagline,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f4f1" },
    { media: "(prefers-color-scheme: dark)", color: "#120e0f" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-surface focus:px-4 focus:py-2 focus:text-sm"
        >
          Skip to content
        </a>
        <SiteHeader />
        <MotionProvider>{children}</MotionProvider>
        <SiteFooter />
        <Spotlight />
        <TipLayer />
        {/* Vercel Web Analytics: cookieless, only reports on Vercel deployments. */}
        <Analytics />
      </body>
    </html>
  );
}
