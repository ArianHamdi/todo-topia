const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    // List of supported locales
    locales: ['en', 'de', 'es', 'fr', 'it'],
    // Default locale
    defaultLocale: 'en',
    localeDetection: false,
  },
  sassOptions: {
    includePaths: [path.join(__dirname)],
    prependData: "@use './src/styles' as *;",
  },
  webpack: config => {
    //SVGR config
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            dimensions: false,
          },
        },
      ],
    });

    return config;
  },
};

module.exports = nextConfig;
