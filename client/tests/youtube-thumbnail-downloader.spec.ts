import { expect, test } from '@playwright/test';

const image = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=', 'base64');

test('parses a YouTube URL and hides unavailable thumbnail sizes', async ({ page }) => {
  await page.route('https://img.youtube.com/**', async (route) => {
    if (route.request().url().includes('/maxresdefault.jpg')) {
      await route.fulfill({ status: 404 });
      return;
    }
    await route.fulfill({ status: 200, contentType: 'image/png', body: image });
  });

  await page.goto('/tools/youtube-thumbnail-downloader');
  await page.getByLabel('YouTube URL or video ID').fill('https://youtu.be/dQw4w9WgXcQ?t=42');
  await page.getByRole('button', { name: 'Find thumbnails' }).click();

  await expect(page.getByText('Not available for this video')).toHaveCount(1);
  await expect(page.getByRole('img')).toHaveCount(4);
  await expect(page.getByText('1 x 1')).toHaveCount(4);
});

test('shows a plain-text validation error without requesting images', async ({ page }) => {
  let imageRequests = 0;
  page.on('request', (request) => {
    if (request.url().startsWith('https://img.youtube.com/')) imageRequests += 1;
  });

  await page.goto('/tools/youtube-thumbnail-downloader');
  await page.getByLabel('YouTube URL or video ID').fill('not a video');
  await page.getByRole('button', { name: 'Find thumbnails' }).click();

  await expect(page.getByRole('alert')).toHaveText('Error: Enter a valid YouTube URL or 11-character video ID.');
  expect(imageRequests).toBe(0);
});

test('opens the image in a new tab when the blob download is blocked', async ({ page }) => {
  await page.route('https://img.youtube.com/**', async (route) => {
    if (route.request().resourceType() === 'fetch') {
      await route.abort('blockedbyclient');
      return;
    }
    await route.fulfill({ status: 200, contentType: 'image/png', body: image });
  });

  await page.goto('/tools/youtube-thumbnail-downloader');
  await page.getByLabel('YouTube URL or video ID').fill('dQw4w9WgXcQ');
  await page.getByRole('button', { name: 'Find thumbnails' }).click();
  const result = page.getByRole('heading', { name: 'High quality' }).locator('..').locator('..');
  await expect(result.getByRole('img')).toBeVisible();

  const popupPromise = page.waitForEvent('popup');
  await result.getByRole('button', { name: 'Download' }).click();
  const popup = await popupPromise;
  await expect(result.getByRole('status')).toHaveText('The image opened in a new tab. Use your browser to save it.');
  await popup.close();
});
