export interface ScreenshotDefinition {
  /** Public URL base without the file extension. */
  base: string;
  title: string;
  description: string;
  alt: string;
  width: number;
  height: number;
}

/**
 * The site ships with the five current BVT Chrome Web Store screenshots. To
 * replace one, keep the same base name and dimensions (or update width/height
 * here) and rebuild. If a file is missing, ProductShot renders a clearly
 * labelled placeholder instead of a broken image.
 */
export const SCREENSHOTS = {
  'single-download': {
    base: '/images/screenshots/single-download',
    title: 'Single video download',
    description:
      'The BVT download control on a public TikTok video in the For You feed.',
    alt: 'BVT download control on a public TikTok video page.',
    width: 1280,
    height: 800,
  },
  'explore-list': {
    base: '/images/screenshots/explore-list',
    title: 'Download controls on Explore',
    description:
      'Download controls on public TikTok Explore cards for saving individual videos.',
    alt: 'BVT download controls on a public TikTok Explore page.',
    width: 1280,
    height: 800,
  },
  'search-list': {
    base: '/images/screenshots/search-list',
    title: 'Add and download on Search',
    description:
      'Add and download controls on a public TikTok Search results page for batch selection.',
    alt: 'BVT add and download controls on a TikTok Search results page.',
    width: 1280,
    height: 800,
  },
  'creator-profile': {
    base: '/images/screenshots/creator-profile',
    title: 'Creator profile download entry point',
    description:
      'The BVT Download entry point on a public TikTok creator profile.',
    alt: 'BVT Download button on a public TikTok creator profile.',
    width: 1280,
    height: 800,
  },
  'creator-panel': {
    base: '/images/screenshots/creator-panel',
    title: 'Creator filters and batch actions',
    description:
      'The BVT creator panel with acquisition channels, filters, selection, Export, and Download actions.',
    alt: 'BVT creator panel with filters, export, and batch download actions.',
    width: 1280,
    height: 800,
  },
} as const satisfies Record<string, ScreenshotDefinition>;

export type ScreenshotId = keyof typeof SCREENSHOTS;
