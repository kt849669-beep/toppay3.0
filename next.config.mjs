/** @type {import('next').NextConfig} */
const nextConfig = {
  // NOTE: `output: 'standalone'` was removed. It is meant for self-hosting
  // (Docker/Node server). On Vercel it is unnecessary and can produce a
  // deployment that serves 404 for every route.
  poweredByHeader: false,
  async redirects() {
    return [{ source: '/login', destination: '/', permanent: true }];
  },
  async headers() {
    return [{
      source: '/(.*)',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      ],
    }];
  },
};

export default nextConfig;
