import { createElement } from 'react';
import YouTubeThumbnailDownloader from '../../pages/tools/YouTubeThumbnailDownloader';
import { getTool } from '../../generated/toolRegistry';
import { parseYouTubeVideoId } from '../../utils/youtubeThumbnail';
import type { ToolModule } from '../types';

export const meta = getTool('youtube-thumbnail-downloader');
export const run = parseYouTubeVideoId;
export const examples = [
  { name: 'Accept an 11-character video ID', input: 'dQw4w9WgXcQ', expected: 'dQw4w9WgXcQ' },
  { name: 'Parse a standard watch URL', input: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', expected: 'dQw4w9WgXcQ' },
  { name: 'Ignore watch URL timestamps and extra parameters', input: 'https://www.youtube.com/watch?feature=share&v=dQw4w9WgXcQ&t=42s', expected: 'dQw4w9WgXcQ' },
  { name: 'Parse a mobile watch URL', input: 'https://m.youtube.com/watch?v=dQw4w9WgXcQ&si=abc', expected: 'dQw4w9WgXcQ' },
  { name: 'Parse a YouTube Music URL', input: 'https://music.youtube.com/watch?v=dQw4w9WgXcQ&list=RDAMVM', expected: 'dQw4w9WgXcQ' },
  { name: 'Parse a short URL', input: 'https://youtu.be/dQw4w9WgXcQ?t=12', expected: 'dQw4w9WgXcQ' },
  { name: 'Parse a Shorts URL', input: 'https://www.youtube.com/shorts/dQw4w9WgXcQ?feature=share', expected: 'dQw4w9WgXcQ' },
  { name: 'Parse an embed URL', input: 'https://www.youtube.com/embed/dQw4w9WgXcQ?start=10', expected: 'dQw4w9WgXcQ' },
  { name: 'Parse a live URL', input: 'https://www.youtube.com/live/dQw4w9WgXcQ?si=abc', expected: 'dQw4w9WgXcQ' },
  { name: 'Parse a legacy video URL', input: 'https://www.youtube.com/v/dQw4w9WgXcQ?version=3', expected: 'dQw4w9WgXcQ' },
  { name: 'Parse a URL without a protocol', input: 'youtube.com/watch?v=dQw4w9WgXcQ', expected: 'dQw4w9WgXcQ' },
  { name: 'Reject a lookalike host', input: 'https://youtube.com.example.com/watch?v=dQw4w9WgXcQ', expected: 'Error: Enter a valid YouTube URL or 11-character video ID.' },
  { name: 'Reject an invalid video ID', input: 'https://www.youtube.com/watch?v=short', expected: 'Error: Enter a valid YouTube URL or 11-character video ID.' },
  { name: 'Reject empty input', input: '', expected: 'Error: Enter a YouTube URL or 11-character video ID.' },
] as const;
export const config = { template: 'G', inputLabel: 'YouTube URL or video ID', live: false } as const;
export const Page = () => createElement(YouTubeThumbnailDownloader);
export default { meta, run, examples, config, Page } satisfies ToolModule<string, never, string>;
