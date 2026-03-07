import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About AI Tool Hunt',
  description: 'AI Tool Hunt helps you discover and compare the best AI tools for every task.',
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">About AI Tool Hunt</h1>

      <div className="mt-8 space-y-6 text-gray-700 leading-relaxed">
        <p>
          AI Tool Hunt is a comprehensive directory of AI tools, designed to help you find
          the perfect AI solution for your needs. We catalog and review hundreds of AI tools
          across categories like writing, coding, image generation, video, marketing, and more.
        </p>

        <h2 className="text-xl font-bold text-gray-900 pt-4">Our Mission</h2>
        <p>
          The AI landscape is growing rapidly with new tools launching every day. Our mission is
          to make it easy for anyone to discover, compare, and choose the right AI tools for
          their work, creative projects, or business.
        </p>

        <h2 className="text-xl font-bold text-gray-900 pt-4">What We Offer</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Curated database of AI tools with detailed descriptions</li>
          <li>Category-based browsing for easy discovery</li>
          <li>Pricing information to find tools within your budget</li>
          <li>Feature comparisons to make informed decisions</li>
          <li>Regular updates as new tools emerge</li>
        </ul>

        <h2 className="text-xl font-bold text-gray-900 pt-4">Contact</h2>
        <p>
          Have a suggestion for a tool we should list? Want to update your tool&apos;s listing?
          Reach out to us and we&apos;ll be happy to help.
        </p>
      </div>
    </div>
  );
}
