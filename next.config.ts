import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // for static export
  reactStrictMode: true,
  rewrites: async () => {
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
        source: "/api/:path*",
        destination: "http://localhost:8080/api/:path*", // Proxy to Backend
      },
    ];
  }
};

export default nextConfig;
