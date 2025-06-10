import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // webpack(config) {
  //   config.module.rules.push({
  //     test: /\.svg$/,
  //     issuer: { and: [/\.(js|ts)x?$/] },
  //     use: ["@svgr/webpack"],
  //   });
  //   return config;
  // },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [375, 744, 1200],
    imageSizes: [16, 32, 48, 64, 96],
  },
};

export default nextConfig;
