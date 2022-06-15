/** @type {import('next').NextConfig} */
const securityHeaders = [
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
];
const nextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    domains: ["s4.anilist.co"],
  },
  env: {
    API_URL: process.env.API_URL,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;
