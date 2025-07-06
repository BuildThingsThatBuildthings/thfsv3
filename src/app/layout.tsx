import type { Metadata } from 'next';
import { Inter, Open_Sans } from 'next/font/google';
import './globals.css';
import { Navigation, Footer } from '@/components/layout';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const openSans = Open_Sans({ 
  subsets: ['latin'],
  variable: '--font-open-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'The Healing Frequency Space | Nashville Frequency Healing',
    template: '%s | The Healing Frequency Space'
  },
  description: 'Nashville\'s premier destination for frequency-based healing. Transform your well-being with Tesla Wellness Table and RoXiva light therapy sessions. Change Your Frequency, Change Everything.',
  keywords: [
    'frequency healing Nashville',
    'Tesla wellness table Tennessee',
    'RoXiva light therapy Nashville',
    'holistic healing Nashville',
    'energy healing Nashville',
    'wellness center Nashville',
    'Victoria frequency healing',
    'bioenergetic healing Tennessee'
  ],
  authors: [{ name: 'Victoria, The Healing Frequency Space' }],
  creator: 'The Healing Frequency Space',
  publisher: 'The Healing Frequency Space',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://healingfrequencyspace.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://healingfrequencyspace.com',
    title: 'The Healing Frequency Space | Nashville Frequency Healing',
    description: 'Transform your well-being with Tesla Wellness Table and RoXiva light therapy. Nashville\'s premier frequency healing sanctuary.',
    siteName: 'The Healing Frequency Space',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'The Healing Frequency Space - Nashville Frequency Healing Sanctuary',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Healing Frequency Space | Nashville Frequency Healing',
    description: 'Transform your well-being with Tesla Wellness Table and RoXiva light therapy.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'THFS',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${openSans.variable}`}>
      <body className="font-open-sans antialiased" suppressHydrationWarning={true}>
        <Navigation />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}