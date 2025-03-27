import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // for static export
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        // When statically exported, rewrites /university/:slug to /university
        // E.g., /university/1 is treated as /university
        // The static file server must also handle this redirection
        source: '/university/:slug',
        destination: '/university',
      },
      {
        source: '/post/:slug',
        destination: '/post',
      },
      {
        source: '/@:username',
        destination: '/user',
      },
      {
        source: '/messages/:username',
        destination: '/messages',
      },
      {
        source: '/settings/:setting',
        destination: '/settings',
      },
      {
        source: "/api/:path*",
        destination: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/:path*",
      },
    ];
  }
};

export default nextConfig;
