/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config')
const nextConfig = {
  reactStrictMode: true,
  env: {
    // SERVER_URL_GRAPHQL: 'http://192.168.202.52:1337/graphql',
    // SERVER_URL: 'http://192.168.202.52:1337'
    SERVER_URL_GRAPHQL: 'https://admin.kobska.az/graphql',
    SERVER_URL: 'https://admin.kobska.az',
    // SERVER_URL_GRAPHQL: 'http://localhost:1337/graphql',
    // SERVER_URL: 'http://localhost:1337',
    CLIENT_URL: 'https://kobska.az',
    LANGUAGE_MODE: 'mono'
  },
  images: {
    domains: [
      '192.168.202.52',
      'kobska-cpanel.knexel.com',
      'cpanel.kobska.az',
      'admin.kobska.az',
      'localhost'
    ]
  },
  i18n,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack']
    })
    config.resolve.alias.canvas = false

    return config
  }
}

module.exports = nextConfig
