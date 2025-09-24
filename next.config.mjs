/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/sitemap-0.xml',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
