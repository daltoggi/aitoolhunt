import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for AI Tool Hunt – how we collect and use information.',
};

export default function PrivacyPage() {
  const lastUpdated = 'March 9, 2026';

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
      <p className="mt-2 text-sm text-gray-500">Last updated: {lastUpdated}</p>

      <div className="mt-8 space-y-8 leading-relaxed text-gray-700">
        <section>
          <h2 className="mb-3 text-xl font-bold text-gray-900">1. Overview</h2>
          <p>
            AI Tool Hunt (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates the website{' '}
            <a href="https://aitoolhunt.vercel.app" className="text-indigo-600 hover:underline">
              aitoolhunt.vercel.app
            </a>
            . This Privacy Policy explains how we collect, use, and protect your information when
            you visit our site.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-gray-900">2. Information We Collect</h2>
          <p className="mb-3">
            We do not require account creation or collect personal information directly. However,
            the following data may be collected automatically:
          </p>
          <ul className="ml-2 list-inside list-disc space-y-2">
            <li>
              <strong>Usage data:</strong> Pages visited, time spent, browser type, and device type
              — collected via Google Analytics
            </li>
            <li>
              <strong>Log data:</strong> IP address, referring URL, and timestamp — collected by our
              hosting provider (Vercel)
            </li>
            <li>
              <strong>Cookies:</strong> Google Analytics uses cookies to distinguish visitors and
              track sessions
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-gray-900">3. How We Use Your Information</h2>
          <ul className="ml-2 list-inside list-disc space-y-2">
            <li>To understand how visitors use the site and improve our content</li>
            <li>To monitor site performance and fix technical issues</li>
            <li>To display relevant advertising (Google AdSense, when active)</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-gray-900">4. Third-Party Services</h2>
          <p className="mb-3">
            We use the following third-party services that may collect data independently:
          </p>
          <ul className="ml-2 list-inside list-disc space-y-2">
            <li>
              <strong>Google Analytics:</strong> Tracks site usage. See{' '}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline"
              >
                Google&apos;s Privacy Policy
              </a>
            </li>
            <li>
              <strong>Google AdSense:</strong> May display ads using cookies. See{' '}
              <a
                href="https://policies.google.com/technologies/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline"
              >
                Google&apos;s Ad Policy
              </a>
            </li>
            <li>
              <strong>Vercel:</strong> Our hosting provider. See{' '}
              <a
                href="https://vercel.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline"
              >
                Vercel&apos;s Privacy Policy
              </a>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-gray-900">5. Cookies</h2>
          <p>
            We use cookies for analytics purposes. You can opt out of Google Analytics tracking by
            installing the{' '}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline"
            >
              Google Analytics Opt-out Browser Add-on
            </a>
            . Most browsers also allow you to refuse cookies in their settings.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-gray-900">6. Data Retention</h2>
          <p>
            Analytics data is retained for 26 months as per Google Analytics default settings. We do
            not store personal data on our own servers.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-gray-900">7. Children&apos;s Privacy</h2>
          <p>
            Our site is not directed at children under 13. We do not knowingly collect personal
            information from children.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-gray-900">8. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this page
            with an updated date.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-bold text-gray-900">9. Contact</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us via the{' '}
            <a href="/about" className="text-indigo-600 hover:underline">
              About page
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
