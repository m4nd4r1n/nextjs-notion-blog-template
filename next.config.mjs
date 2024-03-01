/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'gravatar.com' },
      { hostname: 'www.notion.so' },
    ],
  },
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack },
  ) => {
    config.externals.push({ canvas: 'commonjs canvas' });
    return config;
  },
  output: 'standalone',
};

export default nextConfig;
