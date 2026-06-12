import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif, Sora, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-display",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
});

// Verdant (Design 06) typefaces — Sora (display), Plus Jakarta Sans (body), JetBrains Mono (labels).
const sora = Sora({
  variable: "--font-sora",
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://toshiconsulting.com";
// Index/track ONLY on the exact canonical host. A staging subdomain like
// new.toshiconsulting.com must NOT count as production — a substring match
// would wrongly let it be indexed + load GA (duplicate-content SEO harm).
const PRODUCTION_HOSTS = ["toshiconsulting.com", "www.toshiconsulting.com"];
const IS_PRODUCTION_DOMAIN = PRODUCTION_HOSTS.includes(new URL(SITE_URL).hostname);

// Search engine + analytics verification codes — set via .env.local (or docker-compose env).
// Get these from:
//   GOOGLE_SITE_VERIFICATION   → https://search.google.com/search-console (add property → HTML tag method)
//   BING_SITE_VERIFICATION     → https://www.bing.com/webmasters (add site → Meta tag verification)
//   NEXT_PUBLIC_GA_ID          → https://analytics.google.com (create GA4 property → copy G-XXXXXXXXXX measurement ID)
const GSC_CODE = process.env.GOOGLE_SITE_VERIFICATION || "";
const BING_CODE = process.env.BING_SITE_VERIFICATION || "";
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

export const metadata: Metadata = {
  title: "Toshi Consulting — Reliable IT, AI, Blockchain & DevOps Partner",
  description:
    "Toshi Consulting helps growing businesses secure and scale with AI integration, blockchain consulting, QA automation, and digital media — backed by 15+ years of delivery excellence.",
  metadataBase: new URL(SITE_URL),
  // Auto-noindex staging environments; only the canonical prod domain is indexable.
  robots: IS_PRODUCTION_DOMAIN
    ? { index: true, follow: true, googleBot: { index: true, follow: true } }
    : { index: false, follow: false },
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "Toshi Consulting — AI Integration, Automation & App Development",
    description:
      "We build AI integrations, intelligent automation, and high-performance web & mobile apps — modern software that automates your work and scales with confidence.",
    type: "website",
    url: SITE_URL,
  },
  twitter: { card: "summary_large_image" },
  ...(GSC_CODE || BING_CODE
    ? {
        verification: {
          ...(GSC_CODE && { google: GSC_CODE }),
          ...(BING_CODE && { other: { "msvalidate.01": BING_CODE } }),
        },
      }
    : {}),
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Toshi Consulting",
  legalName: "Toshi Consulting Services Private Limited",
  url: SITE_URL,
  logo: `${SITE_URL}/icon`,
  description:
    "Reliable IT solutions partner for AI integration, blockchain consulting, QA automation, and digital media & branding.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Plot 7, Twin Tower, Office 6, 4th Floor, IT Park Panchkula",
    addressLocality: "Panchkula",
    addressRegion: "Haryana",
    postalCode: "134116",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-9915718004",
    email: "info@toshiconsulting.com",
    contactType: "customer service",
    availableLanguage: ["English", "Hindi"],
  },
  sameAs: [
    'https://share.google/crSjVbZQu4RkGaB8W',                                              // Google Business Profile
    'https://www.facebook.com/people/Toshi-Consulting-Services/61573665045622',            // Facebook
    'https://www.linkedin.com/company/toshi-consulting-services',                          // LinkedIn Company Page
    'https://wa.me/919915718004',                                                          // WhatsApp Business
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Toshi Consulting",
  url: SITE_URL,
  // No SearchAction: the site has no on-site search endpoint, so advertising
  // one (target /blog?q=…) would be a false capability. Re-add when a real
  // search route exists (recommended once the blog passes ~25 posts).
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} ${sora.variable} ${jakarta.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        {/* Google Analytics 4 — only loads when GA_ID is set AND we're on the prod domain.
            Uses Google Consent Mode v2 defaults (denied) so it's DPDP-compliant until a consent banner flips it. */}
        {GA_ID && IS_PRODUCTION_DOMAIN && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  // Consent Mode v2 — denied by default (DPDP-safe); flip to 'granted' via consent banner.
                  gtag('consent', 'default', {
                    ad_storage: 'denied',
                    ad_user_data: 'denied',
                    ad_personalization: 'denied',
                    analytics_storage: 'denied',
                    wait_for_update: 500
                  });
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}', { anonymize_ip: true });
                `,
              }}
            />
          </>
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
