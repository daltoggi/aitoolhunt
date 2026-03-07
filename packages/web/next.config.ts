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
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Ensure better-sqlite3 is treated as external in dev mode
      config.externals = config.externals || [];
      if (Array.isArray(config.externals)) {
        config.externals.push('better-sqlite3');
      }
    }
    return config;
  },
};

export default nextConfig;
