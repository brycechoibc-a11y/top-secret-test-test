/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/top-secret-test-test',
  assetPrefix: '/top-secret-test-test',
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    }
    return config
  }
};

export default nextConfig;