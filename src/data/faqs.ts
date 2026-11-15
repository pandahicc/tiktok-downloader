export interface FaqItem {
  q: string;
  a: string;
}

export const HOME_FAQS: FaqItem[] = [
  {
    q: 'What is BVT?',
    a: 'BVT is an independent Chrome extension for downloading public TikTok videos. It supports single video downloads, batch downloads from Search, Explore, and creator profiles, short drama episodes, ZIP or folder saves, and XLSX export of selected video metadata.',
  },
  {
    q: 'Is BVT free?',
    a: 'BVT is free to install. The Basic version covers single video downloads and limited batch processing. Pro unlocks the full batch workflow through an in-app purchase. The extension shows the current plan and price before checkout; this website does not display billing details.',
  },
  {
    q: 'Do I need a TikTok or BVT account?',
    a: 'No BVT account is required for core use. BVT works on public TikTok pages you open, though TikTok may still show a login wall for some content. Pro activation uses the extension’s subscription and license flow, not a website account.',
  },
  {
    q: 'Which TikTok pages are supported?',
    a: 'BVT is built for public video detail pages, creator profiles, Search results, Explore, hashtag pages, short drama pages, and the Home/Following feed. It does not bypass login, CAPTCHA, region blocks, DRM, or other access controls.',
  },
  {
    q: 'Does BVT remove watermarks?',
    a: 'BVT saves the watermark-free HD source when TikTok exposes one for that video. It does not re-encode or edit media, so it cannot remove a watermark that is embedded in the only available source, and it cannot turn an SD source into HD. Availability depends on the page.',
  },
  {
    q: 'Can I download every video from a creator?',
    a: 'The creator tools request successive pages of posts, reposts, playlists, or liked videos for the profile you open. The run stops when TikTok stops returning items or when you stop it. Private, removed, region-blocked, or otherwise unavailable videos cannot be downloaded, so the result is not a guaranteed complete archive.',
  },
  {
    q: 'What file formats does BVT produce?',
    a: 'Videos are saved as MP4 files. Batch downloads can be saved as a ZIP or written to a folder you choose. Selected video metadata can be exported as an XLSX workbook. BVT does not download audio-only files.',
  },
  {
    q: 'Where are my files saved?',
    a: 'Single downloads go through the browser’s normal download flow. Batch downloads can be saved as a ZIP or written to a folder you select with the browser’s folder picker. Files stay on your computer; BVT does not upload them to a server.',
  },
  {
    q: 'Why did a download fail?',
    a: 'A video may have no playable source, its media URL may have expired, the network may have dropped, or the browser may have denied folder access. Refresh the page and retry. In a batch, failed items are reported without stopping the rest of the run.',
  },
  {
    q: 'Is BVT affiliated with TikTok, and is downloading allowed?',
    a: 'No. BVT is an independent product and is not affiliated with, endorsed by, or sponsored by TikTok or ByteDance. Downloading a public video does not give you permission to republish it or use it commercially. Follow applicable law, TikTok’s terms, and the content owner’s permissions.',
  },
];

export const SINGLE_VIDEO_FAQS: FaqItem[] = [
  {
    q: 'Where does the download button appear?',
    a: 'BVT adds a download control to supported public video cards and detail pages. The exact position follows TikTok’s current layout. If the button is missing, refresh the page and confirm that the URL is a supported public page.',
  },
  {
    q: 'Is the download watermark-free?',
    a: 'BVT requests the clean HD source when TikTok exposes one. The file is not re-encoded or edited. If the only available source already contains a watermark, BVT cannot remove it.',
  },
  {
    q: 'Can I choose the filename?',
    a: 'Yes. The extension offers title, publish date plus title, publish date plus video ID, and username plus publish date plus title templates. Set the template in the extension’s settings or popup.',
  },
  {
    q: 'Can I cancel a download?',
    a: 'Click the active download control again while the progress indicator is running. A cancelled download stops the current request; it does not affect other videos.',
  },
  {
    q: 'Why is the video low quality?',
    a: 'BVT saves the best source the page makes available. If TikTok only exposes an SD or lower-bitrate source for that video, that is the file BVT can save. It cannot upscale or reconstruct a higher-quality version.',
  },
];

export const BULK_DOWNLOAD_FAQS: FaqItem[] = [
  {
    q: 'Which pages support batch selection?',
    a: 'Search results, Explore, creator profiles, and hashtag pages. Video detail pages support single downloads. The exact controls depend on the page type and TikTok’s current layout.',
  },
  {
    q: 'How do I add videos to a batch?',
    a: 'Use the add control on each card, or use the page-level selection controls where available. Then start the batch download and choose ZIP or a destination folder.',
  },
  {
    q: 'Should I use ZIP or save to a folder?',
    a: 'ZIP produces one archive through the browser’s download flow. Save to folder writes individual MP4 files into a folder you choose, which is often easier for large batches or later review. Both options work on the same selection.',
  },
  {
    q: 'Is there a batch limit?',
    a: 'The Basic version has limited batch processing; Pro unlocks the full batch workflow. The extension shows the current limits and plan details. Batch size is also limited by the videos TikTok actually makes available on the page.',
  },
  {
    q: 'Why are some videos skipped?',
    a: 'A video can have no playable source, an expired URL, or a format the page does not expose. Skipped or failed items are reported separately. A failed item does not stop the rest of the queue.',
  },
  {
    q: 'Does BVT download every card on the page?',
    a: 'No. BVT works with the videos the page returns or renders. It does not guarantee every video in a search, hashtag, or profile, and it does not promise a complete historical archive.',
  },
];

export const CREATOR_VIDEO_FAQS: FaqItem[] = [
  {
    q: 'Which creator sections can BVT load?',
    a: 'Posts, reposts, playlists, and liked videos, where TikTok makes those sections available on the public profile. The extension’s creator modal provides a channel selector and Start, Continue, and Stop controls.',
  },
  {
    q: 'What filters are available?',
    a: 'You can filter by duration, publish time, keywords, and minimum play or like counts, depending on the fields the page exposes. The filtered selection is the set used for download or export.',
  },
  {
    q: 'Can I continue a run that stopped?',
    a: 'Yes, use Continue where the extension offers it. A stopped or interrupted run may need to be restarted from the current page. BVT does not merge partial runs across pages or sessions.',
  },
  {
    q: 'Can I export the creator’s metadata?',
    a: 'Yes. Selected videos can be exported as an XLSX workbook with fields such as video ID, description, detail URL, media URL, publish date, duration, playlist context, and public engagement counts, where available.',
  },
  {
    q: 'Why is the video count lower than the profile shows?',
    a: 'The profile may include private, removed, region-blocked, or otherwise unavailable items that BVT cannot load. TikTok can also stop returning pages, and BVT does not bypass those limits. Treat the result as the available sample, not a complete archive.',
  },
];

export const SHORT_DRAMA_FAQS: FaqItem[] = [
  {
    q: 'Where does the short drama download button appear?',
    a: 'BVT adds a download control to supported public TikTok short drama pages. Opening it shows the available episodes in a paged grid.',
  },
  {
    q: 'Can I select only some episodes?',
    a: 'Yes. Click an episode to select or deselect it, or use the select-all control. The selected episode count is shown next to the export and save actions.',
  },
  {
    q: 'What can I do with the selected episodes?',
    a: 'Save them to a folder, or export their metadata to XLSX. Saving writes MP4 files; the export produces a spreadsheet of the selected episode records.',
  },
  {
    q: 'Why are some episodes missing?',
    a: 'Episodes may be region-restricted, removed, or unavailable from the page data. BVT cannot load or download episodes TikTok does not expose, and it does not bypass access controls.',
  },
  {
    q: 'Does BVT download the entire drama automatically?',
    a: 'No. BVT loads the available episode list and lets you choose what to save. Availability and completeness depend on the drama page and TikTok’s responses.',
  },
];

export const XLSX_EXPORT_FAQS: FaqItem[] = [
  {
    q: 'Which fields are included in the XLSX export?',
    a: 'Video ID, cover URL, description, detail URL, media URL, isTop, create date, playlist ID, playlist name, duration, play count, digg count, collect count, comment count, and share count.',
  },
  {
    q: 'Which videos are included?',
    a: 'The export uses the selected videos from the current creator, short drama, or list workflow. It does not merge data across pages, tabs, or browsing sessions.',
  },
  {
    q: 'Are the engagement counts live?',
    a: 'They are a snapshot of the values the page exposes at the time of the run. BVT does not refresh them in the background or provide historical trends.',
  },
  {
    q: 'Does the export include sales or revenue?',
    a: 'No. BVT does not estimate sales, revenue, advertising spend, or conversion. The workbook contains the public metadata fields listed above, where available.',
  },
  {
    q: 'Is the XLSX file an Excel integration?',
    a: 'No. BVT generates a local .xlsx workbook that you can open in Excel, Google Sheets, or another spreadsheet application. There is no account connection, add-in, or automatic sync.',
  },
];

export const PLANS_FAQS: FaqItem[] = [
  {
    q: 'What is included in the Basic version?',
    a: 'Basic covers single video downloads and limited batch processing, including the on-page download controls and the short drama episode picker. Limits are shown in the extension.',
  },
  {
    q: 'What does Pro add?',
    a: 'Pro unlocks the full batch workflow for list pages, creator profiles, short drama episodes, folder or ZIP output, and XLSX export. Pro does not change which videos TikTok makes available or grant rights to use them.',
  },
  {
    q: 'How much does Pro cost?',
    a: 'The current plan and price are shown inside the extension’s subscription flow before checkout. This website does not display billing details because plans and prices can change.',
  },
  {
    q: 'How is Pro activated?',
    a: 'Open the extension’s subscription flow and complete the in-app purchase. When you return, the extension can refresh the license status. If activation does not appear, use the refresh or restore control in the extension.',
  },
  {
    q: 'Do limits reset?',
    a: 'Basic limits reset according to the schedule shown in the extension. Pro removes the Basic batch limit for supported workflows. Page availability and TikTok’s own limits still apply.',
  },
  {
    q: 'Can I cancel or manage my plan?',
    a: 'Use the subscription management flow provided by the extension or the store checkout. BVT does not receive or store your card details. Contact support if the status does not update after a purchase.',
  },
];

export const SUPPORT_FAQS: FaqItem[] = [
  {
    q: 'How do I install BVT?',
    a: 'Open the BVT listing in the Chrome Web Store, choose Add to Chrome, and pin the extension if you want quick access. Then open a supported public TikTok page and look for the BVT download control.',
  },
  {
    q: 'Why does the download button not appear?',
    a: 'Confirm that BVT is enabled, that you are on a supported public tiktok.com page, and that the page has finished rendering. Refresh the page and try again. Private or logged-in-only content is outside the supported scope.',
  },
  {
    q: 'Why does a download stay at 0% or fail?',
    a: 'The media URL may have expired, the video may not expose a playable source, or the network may have dropped. Refresh the page and retry. A failed item in a batch does not stop the rest of the queue.',
  },
  {
    q: 'Why does ZIP or folder saving not start?',
    a: 'Folder saving uses the browser’s File System Access API and requires you to choose a folder and grant permission. If the prompt was dismissed or permission was denied, start the action again and approve the folder request.',
  },
  {
    q: 'Why is the XLSX file empty or missing values?',
    a: 'Confirm that videos are selected before exporting. Some public page fields can be missing; BVT leaves them blank rather than inventing values. The workbook includes the fields listed on the XLSX export page.',
  },
  {
    q: 'Pro is active but the extension still says Basic.',
    a: 'Return to the extension after checkout and refresh the license status. If it still does not update, reopen the extension, confirm you are using the same browser profile, and contact support with the purchase reference only — never send a password or token.',
  },
  {
    q: 'Does BVT work on private or logged-in content?',
    a: 'No. BVT is intended for public pages and does not bypass login, CAPTCHA, region blocks, DRM, or rate limits. TikTok may still show a login wall for some public content, and BVT cannot override it.',
  },
  {
    q: 'How do I contact support?',
    a: 'Email pandahi.cc@gmail.com. Include the extension version, the page type, and a short description of what happened. Do not send account credentials, page data, or subscription tokens.',
  },
];
