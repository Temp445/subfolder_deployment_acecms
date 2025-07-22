
import { Geist, Geist_Mono, Urbanist } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import "../globals.css";
import 'swiper/css';
import GTM from '@/components/analytics/GTM';
import { GTMTracker } from '@/components/analytics/GTMTracker';
import { GTM_ID } from '@/lib/gtm';
import LinkedInTracker from '@/components/LinkedInTracker';

const linkedInPartnerId = process.env.NEXT_PUBLIC_LI_PARTNER_ID!;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const urbanist = Urbanist({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Ensure Google Tag Manager ID is set
  if (!GTM_ID) {
    console.error(
      "❌ Missing Google Tag Manager ID. Please set NEXT_PUBLIC_GTM_ID in .env."
    );
  }

  return (
    <html lang={locale}>
      <head>
        <link rel="icon" href="/AceLogo.png" />
        <GTM />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${urbanist.variable} antialiased`}
      >
        {/* Google Tag Manager Fallback Script */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>

        {/* Google Tag Manager Tracker */}
        <GTMTracker />

        {/* LinkedIn Tracker */}
        <LinkedInTracker partnerId={linkedInPartnerId} />

        <NextIntlClientProvider> {children} </NextIntlClientProvider>
      </body>
    </html>

  );
}
