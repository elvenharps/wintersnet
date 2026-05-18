import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [
      { source: "/history.php", destination: "/history", permanent: true },
      { source: "/about.php", destination: "/about", permanent: true },
      { source: "/index.php", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
