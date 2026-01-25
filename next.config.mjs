/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kxdfiudymbsykvmgthcm.supabase.co",
      },
    ],
  },
};

export default nextConfig;
