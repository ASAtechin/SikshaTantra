import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project so Turbopack ignores the unrelated
  // parent-directory lockfile during the build.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
