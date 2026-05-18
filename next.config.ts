import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [
      // Path redirects: legacy .php URLs -> clean URLs
      { source: "/history.php", destination: "/history", permanent: true },
      { source: "/about.php", destination: "/about", permanent: true },
      { source: "/index.php", destination: "/", permanent: true },

      // Host redirect: apex -> www (www.wintersnet.net is the canonical host)
      {
        source: "/:path*",
        has: [{ type: "host", value: "wintersnet.net" }],
        destination: "https://www.wintersnet.net/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
