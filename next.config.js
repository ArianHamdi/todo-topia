const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname)],
    prependData: "@use 'styles' as *;",
  },
}

module.exports = nextConfig
