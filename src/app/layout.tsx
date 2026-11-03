import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { MobileCtaBar } from "@/components/mobile-cta";
import { Providers } from "@/components/providers";
import { ScrollProgress } from "@/components/scroll-progress";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { MicrosoftClarity } from "@/components/analytics/microsoft-clarity";
import { site, SITE } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "GARV AI LABS — Intelligence that finishes the work",
    template: "%s · GARV AI LABS",
  },
  description:
    "GARV AI LABS builds AI-native systems that declutter operations, unite disconnected systems and turn data into decisive action. AI agents, software, mobile apps, websites, SEO and GEO.",
  keywords: [
    "AI agents India",
    "AI automation",
    "software development Noida",
    "mobile app development",
    "SEO",
    "generative engine optimization",
    "GARV AI LABS",
  ],
  // No title/description/url here: Next fills og:title and og:description from
  // each page's own metadata. No canonical either — each page sets its own;
  // one here made every page claim to be the homepage.
  openGraph: {
    siteName: "GARV AI LABS",
    locale: "en_IN",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "GARV AI LABS",
  url: SITE,
  logo: `${SITE}/garvai-logo.png`,
  description:
    "GARV AI LABS builds AI-native systems that declutter operations, unite disconnected systems and turn data into decisive action.",
  email: site.email,
  telephone: site.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.line1,
    addressLocality: "Noida",
    addressRegion: "Uttar Pradesh",
    addressCountry: "IN",
  },
};

export const viewport: Viewport = {
  themeColor: "#ee6352",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={inter.variable}>
      <body className="min-h-dvh">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:font-semibold focus:text-on-accent"
        >
          Skip to content
        </a>
        <Providers>
          <GoogleAnalytics />
          <MicrosoftClarity />
          <ScrollProgress />
          <Nav />
          <main id="main">{children}</main>
          <Footer />
          <MobileCtaBar />
        </Providers>
      </body>
    </html>
  );
}
