/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/robots.txt",
        destination: `${process.env.NEXT_PUBLIC_SITE_FRONT}/api/robots`,
      },
      {
        source: "/app-ads.txt",
        destination: `${process.env.NEXT_PUBLIC_SITE_FRONT}/api/app-ads`,
      },
    ];
  },
};

export default nextConfig;
