import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // for static export,
  rewrites: async () => {
    return [
      {
        // When statically exported, rewrites /university/:slug to /university
        // E.g., /university/1 is treated as /university
        // The static file server must also handle this redirection
        // Subsequent examples follow the same logic
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
    ];
  }
};

export default nextConfig;
