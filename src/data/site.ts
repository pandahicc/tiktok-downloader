import siteConfig from '../../site.config.json';

const envGaMeasurementId = import.meta.env.PUBLIC_GA_MEASUREMENT_ID;
const DEFAULT_GA_MEASUREMENT_ID = 'G-KR510SG28B';

export const SITE = {
  url: siteConfig.url,
  name: 'BVT',
  legalName: 'BVT',
  shortName: 'BVT',
  title: 'BVT — Batch Video Downloader for TikTok',
  description:
    'Download single TikTok videos or bulk download from Search, Explore, and creator profiles. Save videos as MP4 or ZIP, or export selected metadata to XLSX.',
  storeUrl:
    'https://chromewebstore.google.com/detail/bvt-batch-video-downloade/kgnhdajpegmmcekmmkofhgjojddajphe',
  version: '0.1.3',
  supportEmail: 'pandahi.cc@gmail.com',
  interfaceLanguages: 23,
  gaMeasurementId:
    envGaMeasurementId ??
    (import.meta.env.PROD ? DEFAULT_GA_MEASUREMENT_ID : ''),
};

export const NAV = [
  { label: 'Features', href: '/features/' },
  { label: 'Guides', href: '/guides/' },
  { label: 'Plans', href: '/plans/' },
  { label: 'Support', href: '/support/' },
] as const;

export const FEATURES = [
  {
    id: 'single-video-download',
    title: 'Single Video Download',
    href: '/features/single-video-download/',
    icon: 'download',
    description:
      'Save the watermark-free HD source where TikTok provides one, with a filename template and a visible download progress indicator.',
  },
  {
    id: 'bulk-download',
    title: 'Bulk from Lists',
    href: '/features/bulk-download/',
    icon: 'layers',
    description:
      'Add videos from Search, Explore, and creator profiles, then save a ZIP or write the selected files directly to a folder.',
  },
  {
    id: 'creator-video-download',
    title: 'Creator Tools',
    href: '/features/creator-video-download/',
    icon: 'user',
    description:
      'Load a creator’s posts, reposts, playlists, or liked videos, filter the list, and batch download the selection.',
  },
  {
    id: 'short-drama-download',
    title: 'Short Drama Downloads',
    href: '/features/short-drama-download/',
    icon: 'film',
    description:
      'Open a TikTok short drama, pick episodes from a paged grid, and download the selected episodes in one run.',
  },
  {
    id: 'xlsx-export',
    title: 'XLSX Metadata Export',
    href: '/features/xlsx-export/',
    icon: 'table',
    description:
      'Export 15 metadata columns for the selected videos to an XLSX workbook for review in a spreadsheet.',
  },
] as const;

export const SUPPORTED_PAGES = [
  'Video detail pages',
  'Creator profiles',
  'Search results',
  'Explore',
  'Hashtag pages',
  'Short drama pages',
  'Home and Following',
] as const;

export const USE_CASES = [
  {
    title: 'Creators saving references',
    icon: 'spark',
    description:
      'Keep a local folder of the public videos you want to study, reference, or discuss with your team.',
  },
  {
    title: 'Social media managers',
    icon: 'list',
    description:
      'Collect a batch from a campaign hashtag, a search page, or a creator profile without downloading one video at a time.',
  },
  {
    title: 'Researchers and analysts',
    icon: 'table',
    description:
      'Pair selected MP4s with an XLSX export of views, likes, comments, shares, dates, and playlist context.',
  },
  {
    title: 'Agencies and small teams',
    icon: 'folder',
    description:
      'Save approved public posts to a chosen folder and keep the source page and export together for review.',
  },
] as const;

export const COMPARISON = [
  {
    label: 'Single video download',
    free: 'Included',
    pro: 'Included',
  },
  {
    label: 'Watermark-free HD where the source supports it',
    free: 'Included',
    pro: 'Included',
  },
  {
    label: 'Batch from Search, Explore, and profiles',
    free: 'Limited',
    pro: 'Full workflow',
  },
  {
    label: 'Creator posts, reposts, playlists, and liked videos',
    free: 'Limited',
    pro: 'Full workflow',
  },
  {
    label: 'Short drama episode downloads',
    free: 'Limited',
    pro: 'Full workflow',
  },
  {
    label: 'Save to a folder or download as ZIP',
    free: 'Limited',
    pro: 'Full workflow',
  },
  {
    label: 'XLSX metadata export',
    free: 'Limited',
    pro: 'Full workflow',
  },
  {
    label: 'Filename templates',
    free: 'Included',
    pro: 'Included',
  },
  {
    label: 'Interface languages',
    free: '23',
    pro: '23',
  },
] as const;

export const FOOTER_COLUMNS = [
  {
    title: 'Features',
    links: [
      { label: 'All features', href: '/features/' },
      { label: 'Single video', href: '/features/single-video-download/' },
      { label: 'Bulk from lists', href: '/features/bulk-download/' },
      { label: 'Creator tools', href: '/features/creator-video-download/' },
      { label: 'Short drama', href: '/features/short-drama-download/' },
      { label: 'XLSX export', href: '/features/xlsx-export/' },
    ],
  },
  {
    title: 'Guides',
    links: [
      { label: 'All guides', href: '/guides/' },
      {
        label: 'Download a TikTok video',
        href: '/guides/how-to-download-tiktok-videos/',
      },
      {
        label: 'Bulk download videos',
        href: '/guides/how-to-bulk-download-tiktok-videos/',
      },
      {
        label: 'Download a creator’s videos',
        href: '/guides/how-to-download-a-tiktok-creators-videos/',
      },
      {
        label: 'Export video data to Excel',
        href: '/guides/how-to-export-tiktok-video-data-to-excel/',
      },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About BVT', href: '/about/' },
      { label: 'Support', href: '/support/' },
      { label: 'Changelog', href: '/changelog/' },
      { label: 'Email support', href: `mailto:${SITE.supportEmail}` },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy/' },
      { label: 'Terms of Use', href: '/terms/' },
      { label: 'Chrome Web Store', href: storeUrl('footer') },
    ],
  },
] as const;

export const RELATED_TOOLS = [
  {
    name: 'TokGrid — TikTok analytics',
    href: 'https://tokgrid.app/',
  },
  {
    name: 'ATK — TikTok Live Monitor',
    href: 'https://atk-live.com/',
  },
  {
    name: 'TikTok Subtitle Export',
    href: 'https://tiktoksubtitleexport.com/',
  },
] as const;

export const STATIC_PATHS = [
  '/',
  '/features/',
  '/features/single-video-download/',
  '/features/bulk-download/',
  '/features/creator-video-download/',
  '/features/short-drama-download/',
  '/features/xlsx-export/',
  '/guides/',
  '/plans/',
  '/support/',
  '/privacy/',
  '/terms/',
  '/about/',
  '/changelog/',
] as const;

export function storeUrl(campaign: string): string {
  const url = new URL(SITE.storeUrl);
  url.searchParams.set('utm_source', new URL(SITE.url).hostname);
  url.searchParams.set('utm_medium', 'website');
  url.searchParams.set('utm_campaign', campaign);
  return url.toString();
}

export function canonicalUrl(pathname = '/'): string {
  const url = new URL(pathname, SITE.url);
  if (!url.pathname.endsWith('/') && !/\.[a-z0-9]+$/i.test(url.pathname)) {
    url.pathname += '/';
  }
  return url.href;
}

export function absoluteUrl(pathname: string): string {
  return new URL(pathname, SITE.url).href;
}
