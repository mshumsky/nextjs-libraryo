module.exports = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' https://via.placeholder.com data:",
          },
        ],
      },
    ];
  },
};
