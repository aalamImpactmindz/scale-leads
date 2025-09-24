/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://scaleleads.fr',
  generateRobotsTxt: true,
  changefreq: 'daily',        // tells Google how often pages update
  priority: 1.0,              // relative importance (0.0 - 1.0)
  sitemapSize: 7000,
  exclude: ['/api/*'],        // exclude API routes if not needed
};
