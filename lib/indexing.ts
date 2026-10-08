/**
 * Search engines may index the site only when SITE_ENV=production is set explicitly.
 * Every other deployment (Railway staging, previews, local) is served as noindex, so a
 * staging URL can never compete with the live site in search results.
 * Read at build time: changing SITE_ENV requires a rebuild.
 * The same rule is applied to the X-Robots-Tag header in next.config.mjs.
 */
export const isIndexable = process.env.SITE_ENV === "production"
