/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    removeConsole: {
      exclude: ['error', 'warn', 'info'],
    },
  },
};

module.exports = nextConfig;
