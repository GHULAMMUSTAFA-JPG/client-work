
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
            protocol: 'http',
            hostname: '**',
          },
          {
            protocol: 'https',
            hostname: '**',
          },
        ],
      },
      eslint: {
        ignoreDuringBuilds: true,
    },
    reactStrictMode: false,

    
  };
  