import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project so Turbopack ignores the unrelated
  // parent-directory lockfile during the build.
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return ["siksha-tantra.vercel.app", "shikshatantra.shop"].map((host) => ({
      source: "/:path*",
      has: [{ type: "host" as const, value: host }],
      destination: "https://www.shikshatantra.shop/:path*",
      permanent: true,
    }));
  },
};

export default nextConfig;
