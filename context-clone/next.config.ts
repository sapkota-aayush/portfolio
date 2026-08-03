import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  serverExternalPackages: ["jsdom"],
  outputFileTracingRoot: path.join(process.cwd()),
};

export default nextConfig;
