import type { NextConfig } from "next";
import path from "path";
const fs = require('fs');

const nextConfig: NextConfig = {
  devIndicators: false,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/elements',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
