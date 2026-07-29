import './globals.css';
import { Manrope } from 'next/font/google';
import { ToastProvider } from '@/components/ui/use-toast';
import CrispChat from '@/components/site/CrispChat';

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
});

const SITE_URL = 'https://mesachicasolutions.vercel.app';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Mesa Chica Solutions | Dynamics 365, Power Platform y Azure',
  description:
    'Implementación y desarrollo de soluciones empresariales con Dynamics 365, Power Apps, Power Automate, Power BI, Dataverse y Azure.',
  openGraph: {
    title: 'Mesa Chica Solutions | Dynamics 365, Power Platform y Azure',
    description:
      'Implementación y desarrollo de soluciones empresariales con Dynamics 365, Power Apps, Power Automate, Power BI, Dataverse y Azure.',
    url: SITE_URL,
    siteName: 'Mesa Chica Solutions',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'es_AR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mesa Chica Solutions | Dynamics 365, Power Platform y Azure',
    description:
      'Implementación y desarrollo de soluciones empresariales con Dynamics 365, Power Apps, Power Automate, Power BI, Dataverse y Azure.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={manrope.variable}>
      <body>
        <ToastProvider>{children}</ToastProvider>
        <CrispChat />
      </body>
    </html>
  );
}
