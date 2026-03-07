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
      // Mark better-sqlite3 as commonjs external for both dev and SSG build.
      // Native C++ addons must be loaded via Node.js require, not webpack.
      const existingExternals = config.externals || [];
      config.externals = [
        ...(Array.isArray(existingExternals) ? existingExternals : []),
        ({ request }: { request?: string }, callback: (err?: Error | null, result?: string) => void) => {
          if (request === 'better-sqlite3') {
            return callback(null, `commonjs ${request}`);
          }
          callback();
        },
      ];
    }
    return config;
  },
};

export default nextConfig;
