import type { Metadata } from 'next';
import Script from 'next/script';
import { getSiteConfig } from '@/lib/content';
import './globals.css';

const site = getSiteConfig();
const siteUrl = new URL(site.site_url);
const title = `${site.name} | Graphic Designer`;
const description =
  'Campaign and visual communication designer across social, motion, and print. Selected work, motion cutdowns, campaign systems, and Reed Award-winning creative by Matthew Larsen.';
const ogImage = '/og/matthew-larsen-portfolio-og.svg';

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title,
  description,
  applicationName: `${site.name} Portfolio`,
  keywords: [
    'Matthew Larsen',
    'Graphic Designer',
    'Campaign Designer',
    'Motion Design',
    'Social Media Design',
    'Political Campaign Design',
    'Reed Awards',
    'Portfolio',
  ],
  authors: [{ name: site.name, url: site.site_url }],
  creator: site.name,
  publisher: site.name,
  category: 'Design portfolio',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: site.site_url,
    siteName: `${site.name} Portfolio`,
    title,
    description,
    locale: 'en_NZ',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: `${site.name} portfolio preview`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  url: site.site_url,
  jobTitle: 'Graphic Designer',
  sameAs: [site.linkedin],
  email: `mailto:${site.email}`,
  award: [
    'Best International Campaign (National) - Reed Awards',
    'Best International Online Video (National) - Reed Awards',
  ],
  knowsAbout: [
    'Campaign design',
    'Motion graphics',
    'Social media creative',
    'Print design',
    'Visual communication',
  ],
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: `${site.name} Portfolio`,
  url: site.site_url,
  description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NZ">
      <body>
        <Script id="person-jsonld" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(personJsonLd)}
        </Script>
        <Script id="website-jsonld" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(websiteJsonLd)}
        </Script>
        {children}
      </body>
    </html>
  );
}
