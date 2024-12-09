const { StrictMode } = require("react");

module.exports = {

  async headers() {
    return [
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-store' },
        ],
      },
    ];
  },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'media.licdn.com',
            port: '',
          },
        ],
      },
      eslint: {
        ignoreDuringBuilds: true,
    },
    StrictMode:false
  };
  