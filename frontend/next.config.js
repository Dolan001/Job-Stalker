/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        API_URL: 'http://localhost:8001'
    }
}

module.exports = nextConfig
