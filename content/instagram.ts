/**
 * Instagram feed shown on the home page.
 *
 * Replace these placeholders with real posts: copy the permalink from the post
 * ("..." → Copy link), export the video, and drop a poster frame in
 * /public/images. Nothing here should describe engagement — see the note at
 * the bottom of this file.
 *
 * TODO(content): every entry below is a placeholder. The clips are generic
 * stock footage, not Mother of Flower's own work.
 */

export interface InstagramPost {
  id: string;
  /** MP4 in /public/videos, or an external URL. */
  videoSrc: string;
  /** Still shown before the video loads. */
  posterSrc: string;
  caption: string;
  /** Link to the individual post, not the profile. */
  permalink: string;
}

export const INSTAGRAM_PROFILE = 'https://www.instagram.com/mother_of_flower/';
export const INSTAGRAM_HANDLE = '@mother_of_flower';

export const instagramPosts: InstagramPost[] = [
  {
    id: 'placeholder-1',
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4',
    posterSrc: '/images/vanilla_blush.webp',
    caption: 'Placeholder — replace with a real post from the studio.',
    permalink: INSTAGRAM_PROFILE,
  },
  {
    id: 'placeholder-2',
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-against-blue-sky-4591-large.mp4',
    posterSrc: '/images/blush_harmony.webp',
    caption: 'Placeholder — replace with a real post from the studio.',
    permalink: INSTAGRAM_PROFILE,
  },
  {
    id: 'placeholder-3',
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-girl-dancing-happily-in-a-field-of-flowers-4702-large.mp4',
    posterSrc: '/images/pink_symphony.webp',
    caption: 'Placeholder — replace with a real post from the studio.',
    permalink: INSTAGRAM_PROFILE,
  },
  {
    id: 'placeholder-4',
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-very-close-shot-of-the-leaves-of-a-tree-wet-18310-large.mp4',
    posterSrc: '/images/cream_cloud.webp',
    caption: 'Placeholder — replace with a real post from the studio.',
    permalink: INSTAGRAM_PROFILE,
  },
];

/*
 * Deliberately no `likes`, `views` or `comments` fields.
 *
 * The section previously displayed invented engagement (42.8K views, 7,201
 * likes) and invented comments from people who do not exist. That is
 * unverifiable social proof, and Meta and Google both treat fabricated
 * engagement claims as grounds for rejecting ads.
 *
 * PLAN — connecting the real feed (Instagram Basic Display API):
 *  1. Create a Meta app, add the "Instagram Basic Display" product and add the
 *     studio's account as an Instagram Tester.
 *  2. Complete the OAuth flow once to obtain a short-lived user token, then
 *     exchange it for a long-lived token (60 days).
 *  3. Store the long-lived token as INSTAGRAM_ACCESS_TOKEN; refresh it on a
 *     schedule (a cron route hitting refresh_access_token) before it expires.
 *  4. Fetch GET /me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink
 *     from a server component or route handler, cache with revalidate: 3600,
 *     filter to media_type === 'VIDEO', and map onto InstagramPost above.
 *  5. Keep this file as the fallback when the API is unavailable, so the
 *     section never renders empty.
 */
