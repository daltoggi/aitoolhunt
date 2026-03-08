import type { Metadata } from 'next';
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '@aitoolhunt/shared';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} - Discover the Best AI Tools`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  verification: {
    google: 'olOQOSNtyIOXkEXO2Q9s2V8nh5sy_lHlaXWLLzTwEmw',
  },
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        <Header />
        <main className="min-h-[calc(100vh-140px)]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-sm font-bold text-white">
            AI
          </div>
          <span className="text-lg font-bold text-gray-900">
            Tool<span className="text-indigo-600">Hunt</span>
          </span>
        </a>
        <nav className="hidden items-center gap-6 md:flex">
          <a href="/categories" className="text-sm font-medium text-gray-600 hover:text-gray-900">
            Categories
          </a>
          <a href="/search" className="text-sm font-medium text-gray-600 hover:text-gray-900">
            Search
          </a>
          <a href="/about" className="text-sm font-medium text-gray-600 hover:text-gray-900">
            About
          </a>
        </nav>
        <a
          href="/search"
          className="flex h-9 items-center gap-2 rounded-lg border bg-gray-50 px-3 text-sm text-gray-500 hover:bg-gray-100 md:w-64"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          Search tools...
        </a>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-gradient-to-br from-indigo-500 to-purple-600 text-xs font-bold text-white">
              AI
            </div>
            <span className="text-sm font-semibold text-gray-900">AI Tool Hunt</span>
          </div>
          <p className="text-sm text-gray-500">Discover the best AI tools for every task.</p>
          <nav className="flex gap-4">
            <a href="/about" className="text-sm text-gray-500 hover:text-gray-900">
              About
            </a>
            <a href="/contact" className="text-sm text-gray-500 hover:text-gray-900">
              Contact
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
