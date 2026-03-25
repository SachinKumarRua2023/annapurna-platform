import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "assets.zyrosite.com" },
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },
  output: 'standalone',
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', 'three']
  },
  typescript: {
    ignoreBuildErrors: true
  }
};

export default nextConfig;