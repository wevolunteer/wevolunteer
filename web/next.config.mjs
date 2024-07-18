/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",

  async rewrites() {
    if (process.env.NODE_ENV === "development") {
      return [
        {
          source: "/api/:path*",
          destination: `http://localhost:3000/api/:path*`,
        },
      ]
    }

    return []
  },
}

export default nextConfig
