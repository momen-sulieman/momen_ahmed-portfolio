import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { ThemeProvider } from "@/components/features/theme-provider";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { PageTransition } from "@/components/motion/page-transition";
import { absoluteUrl, defaultOgImage, siteConfig } from "@/lib/metadata";
import { site } from "@content/site";

import "@/styles/globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  /*
   * Declared explicitly rather than via the `icon.tsx` file convention: on a
   * sub-path deploy the convention emitted `/icon` without the basePath, so
   * the favicon 404'd. These are plain files in public/ with real extensions,
   * which also means a static host serves them with the right content type.
   */
  icons: {
    icon: [
      { url: absoluteUrl("/favicon.png"), sizes: "32x32", type: "image/png" },
      { url: absoluteUrl("/icon.png"), sizes: "512x512", type: "image/png" },
    ],
    apple: absoluteUrl("/icon.png"),
  },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    url: absoluteUrl("/"),
    title: siteConfig.title,
    description: siteConfig.description,
    images: [{ url: absoluteUrl(defaultOgImage), width: 1200, height: 630, alt: siteConfig.title }],
  },
};

/** Tints mobile browser chrome to match the page — mirrors --color-background. */
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0d" },
  ],
};

/**
 * Sets `.js` before first paint, and only where IntersectionObserver
 * exists. Every reveal rule in globals.css is scoped to that class, so a
 * visitor without JS is never served hidden content.
 */
const enableMotionScript = `if('IntersectionObserver' in window)document.documentElement.classList.add('js')`;

/** Person schema — all fields are resume facts, none invented. */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.fullName,
  alternateName: site.name,
  jobTitle: site.role,
  email: `mailto:${site.email}`,
  url: siteConfig.url,
  description: site.anchorLine,
  knowsLanguage: ["Arabic", "English"],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: site.education[0]?.institution,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: enableMotionScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <a
            href="#main"
            className="sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-50 focus-visible:rounded-lg focus-visible:bg-accent focus-visible:px-4 focus-visible:py-2 focus-visible:text-sm focus-visible:font-medium focus-visible:text-accent-foreground"
          >
            Skip to content
          </a>

          <Header />
          <main id="main" className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
