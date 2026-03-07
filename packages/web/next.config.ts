import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@aitoolhunt/ui', '@aitoolhunt/shared', '@aitoolhunt/api'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  serverExternalPackages: ['better-sqlite3'],
};

export default nextConfig;
