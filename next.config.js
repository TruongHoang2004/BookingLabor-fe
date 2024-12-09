/** @type {import('next').Config} */
const config = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // If your API calls are to NestJS
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3000/api/:path*',
      },
    ];
  },
};

export default config;