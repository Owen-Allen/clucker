/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DB_HOST: process.env.DB_HOST
  }
}

module.exports = nextConfig
