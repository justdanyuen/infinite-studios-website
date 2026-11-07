import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// Cloudflare quick tunnels (cloudflared) get a random *.trycloudflare.com hostname
const tunnelHosts = ["*.trycloudflare.com"];

const nextConfig: NextConfig = {
  devIndicators: false,
  // Let the dev server accept requests (JS chunks, HMR) through the tunnel. Dev-only by design.
  allowedDevOrigins: tunnelHosts,
  experimental: {
    agentFeedback: true,
    // Let the contact form's Server Action run through the tunnel, in dev only,
    // so production doesn't trust every trycloudflare.com site.
    ...(isDev && { serverActions: { allowedOrigins: tunnelHosts } }),
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;