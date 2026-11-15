import { absoluteUrl, canonicalUrl, SITE } from '../data/site';
import type { FaqItem } from '../data/faqs';

const ORGANIZATION = {
  '@type': 'Organization',
  name: SITE.name,
  alternateName: 'Batch Video Downloader for TikTok',
  url: SITE.url,
  logo: absoluteUrl('/images/brand/bvt-icon-128.png'),
  sameAs: [SITE.storeUrl],
};

export function organizationSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    ...ORGANIZATION,
    description:
      'BVT is an independent Chrome extension for single and bulk TikTok video downloads, short drama episodes, and XLSX metadata export.',
  };
}

export function websiteSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
    inLanguage: 'en',
    description: SITE.description,
  };
}

export function softwareApplicationSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: SITE.name,
    alternateName: 'Batch Video Downloader for TikTok',
    applicationCategory: 'BrowserApplication',
    operatingSystem: 'Chrome',
    softwareVersion: SITE.version,
    description:
      'An independent Chrome extension for single and bulk TikTok video downloads, short drama episodes, ZIP or folder saves, and XLSX export of selected public metadata.',
    url: SITE.url,
    installUrl: SITE.storeUrl,
    image: absoluteUrl('/og/bvt-og.png'),
    sameAs: [SITE.storeUrl],
    featureList: [
      'Single TikTok video downloads from public pages',
      'Watermark-free HD where the page exposes a clean source',
      'Batch selection from Search, Explore, hashtag, and creator pages',
      'Creator posts, reposts, playlists, and liked video workflows',
      'Short drama episode selection and batch download',
      'Save to a chosen folder or download a ZIP archive',
      'XLSX export of selected public video metadata',
      'Filename templates and a 23-language interface',
    ],
  };
}

export function breadcrumbSchema(
  items: Array<{ name: string; href: string }>,
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: canonicalUrl(item.href),
    })),
  };
}

export function faqSchema(items: FaqItem[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}

export function articleSchema(input: {
  title: string;
  description: string;
  path: string;
  datePublished: Date;
  dateModified?: Date;
  category: string;
}): Record<string, unknown> {
  const url = canonicalUrl(input.path);
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.title,
    description: input.description,
    datePublished: input.datePublished.toISOString(),
    dateModified: (input.dateModified ?? input.datePublished).toISOString(),
    articleSection: input.category,
    inLanguage: 'en',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    author: ORGANIZATION,
    publisher: ORGANIZATION,
    image: absoluteUrl('/og/bvt-og.png'),
    url,
  };
}

export function itemListSchema(
  items: Array<{ name: string; href: string }>,
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: canonicalUrl(item.href),
    })),
  };
}
