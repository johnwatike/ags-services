/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Photography is served straight from /public; swap to next/image with a loader
  // once full-resolution originals replace the concept set.
  images: { unoptimized: true }
};
export default nextConfig;
