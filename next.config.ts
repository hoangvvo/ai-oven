import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
    ],
  },
  env: {
    PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID,
  },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  serverExternalPackages: [
    "sharp",
    "onnxruntime-node",
    "@zilliz/milvus2-sdk-node",
  ],
  outputFileTracingIncludes: {
    "/api/**/*": ["node_modules/@zilliz/milvus2-sdk-node/dist/proto/**/*"],
  },
  output: "standalone",
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
