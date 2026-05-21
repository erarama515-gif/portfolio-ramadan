/** @type {import('next').NextConfig} */
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

// Derive the API host so Next/Image can serve uploads from it
let apiHostname = 'localhost'
let apiProtocol = 'http'
try {
  const u = new URL(API_URL)
  apiHostname = u.hostname
  apiProtocol = u.protocol.replace(':', '')
} catch {}

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'http',  hostname: 'localhost',  port: '8000', pathname: '/uploads/**' },
      { protocol: 'http',  hostname: '127.0.0.1',  port: '8000', pathname: '/uploads/**' },
      { protocol: apiProtocol, hostname: apiHostname, pathname: '/uploads/**' },
      // إن أردت السماح بأي مضيف HTTPS، ألغِ التعليق:
      // { protocol: 'https', hostname: '**', pathname: '/uploads/**' },
    ],
  },
  env: {
    NEXT_PUBLIC_API_URL: API_URL,
  },
}

module.exports = nextConfig
