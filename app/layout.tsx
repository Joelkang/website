import './global.css'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Navbar } from "./components/nav";
import Footer from './components/footer'
import { baseUrl } from "@/sitemap";
import { cn } from "@/lib/utils/styles";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Joel Kang・Context Cartographer",
    template: "%s | Joel Kang・Context Cartographer",
  },
  description: "This is my portfolio.",
  openGraph: {
    title: "Joel Kang・Context Cartographer",
    description: "Context Cartographer",
    url: baseUrl,
    siteName: "Joel Kang",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cn(
        "text-black bg-white dark:text-white dark:bg-black",
        GeistSans.variable,
        GeistMono.variable,
      )}
    >
      <body className="antialiased max-w-3xl mx-4 mt-8 lg:mx-auto">
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          <Navbar />
          {children}
          <Footer />
        </main>
      </body>
      <Analytics />
      <SpeedInsights />
    </html>
  );
}
