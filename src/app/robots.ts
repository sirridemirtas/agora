import type { MetadataRoute } from 'next';
 
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: process.env.NEXT_PUBLIC_API_URL + '/sitemap.xml',
  }
}
