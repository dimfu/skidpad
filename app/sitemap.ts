const site = 'https://skidpad.vercel.app'

export default function sitemap() {
  return [{ url: site, lastModified: new Date().toISOString() }]
}
