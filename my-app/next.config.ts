import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/blog", destination: "/", permanent: false },
      { source: "/blog/:slug", destination: "/", permanent: false },
      { source: "/writing", destination: "/", permanent: false },
      { source: "/writing/:slug", destination: "/", permanent: false },
      { source: "/projects", destination: "/work", permanent: true },
    ];
  },
};

export default nextConfig;
