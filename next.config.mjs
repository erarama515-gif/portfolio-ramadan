import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http',  hostname: 'localhost' },
    ],
  },
  webpack: (config) => {
    // Payload's admin uses these — mark them external for the server bundle
    config.externals = config.externals || []
    return config
  },
}

export default withPayload(nextConfig)
