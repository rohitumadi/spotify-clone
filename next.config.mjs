/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fkzpdtfriynkqfwdjkpf.supabase.co",
      },
    ],
  },
};

export default nextConfig;
