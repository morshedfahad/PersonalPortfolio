import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Accessing the dev server over the network via the server's public IP makes
  // HMR requests cross-origin; allow that host so hot-reload works.
  allowedDevOrigins: ["46.4.106.46"],
};

export default nextConfig;
