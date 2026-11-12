const VIDEO_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/u;
const YOUTUBE_HOSTS = new Set(['youtube.com', 'www.youtube.com', 'm.youtube.com', 'music.youtube.com']);
const SHORT_HOSTS = new Set(['youtu.be', 'www.youtu.be']);

export const EMPTY_YOUTUBE_INPUT_ERROR = 'Error: Enter a YouTube URL or 11-character video ID.';
export const INVALID_YOUTUBE_INPUT_ERROR = 'Error: Enter a valid YouTube URL or 11-character video ID.';

const validVideoId = (value: string | null) => value && VIDEO_ID_PATTERN.test(value) ? value : null;

export const parseYouTubeVideoId = (input: string): string => {
  const value = input.trim();
  if (!value) return EMPTY_YOUTUBE_INPUT_ERROR;
  if (VIDEO_ID_PATTERN.test(value)) return value;

  let url: URL;
  try {
    url = new URL(/^https?:\/\//iu.test(value) ? value : `https://${value}`);
  } catch {
    return INVALID_YOUTUBE_INPUT_ERROR;
  }

  const host = url.hostname.toLowerCase();
  if (SHORT_HOSTS.has(host)) {
    return validVideoId(url.pathname.split('/').filter(Boolean)[0] ?? null) ?? INVALID_YOUTUBE_INPUT_ERROR;
  }
  if (!YOUTUBE_HOSTS.has(host)) return INVALID_YOUTUBE_INPUT_ERROR;

  if (url.pathname === '/watch') {
    return validVideoId(url.searchParams.get('v')) ?? INVALID_YOUTUBE_INPUT_ERROR;
  }

  const [kind, candidate] = url.pathname.split('/').filter(Boolean);
  if (!['shorts', 'embed', 'live', 'v'].includes(kind ?? '')) return INVALID_YOUTUBE_INPUT_ERROR;
  return validVideoId(candidate ?? null) ?? INVALID_YOUTUBE_INPUT_ERROR;
};

export const youtubeThumbnailUrl = (videoId: string, size: string) => `https://img.youtube.com/vi/${videoId}/${size}.jpg`;
