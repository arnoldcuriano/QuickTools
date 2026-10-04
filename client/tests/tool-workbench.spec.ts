import { expect, test } from '@playwright/test';

const tools = [
  ['/tools/base64', 'Base64 Encoder/Decoder'],
  ['/tools/text-formatter', 'Text Formatter'],
  ['/tools/webp-converter', 'WebP Converter'],
  ['/tools/json-converter', 'JSON Converter'],
  ['/tools/qr-code-generator', 'QR Code Generator'],
  ['/tools/json-compare', 'JSON Compare'],
  ['/tools/csv-tsv-converter', 'CSV / TSV Converter'],
  ['/tools/regex-tester', 'Regex Tester'],
] as const;

for (const [route, title] of tools) {
  test(`${title} uses the shared tool layout`, async ({ page }) => {
    await page.goto(route);
    await expect(page.getByRole('heading', { level: 1, name: title })).toHaveCount(1);
    await expect(page.getByRole('link', { name: 'Back to tools' })).toHaveCount(1);
    await expect(page.getByText('Runs locally in your browser', { exact: true })).toHaveCount(1);
    await expect(page.locator('.tool-layout')).toHaveCount(1);
    await expect(page.getByRole('complementary', { name: 'Settings' })).toHaveCount(1);
  });
}

for (const width of [360, 768, 1280]) {
  for (const theme of ['light', 'dark']) {
    test(`shared layout fits ${width}px in ${theme}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.addInitScript((value) => localStorage.setItem('quicktools.theme', value), theme);
      await page.goto('/tools/webp-converter');
      expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)).toBeLessThanOrEqual(1);
      const [settingsBox, mainBox] = await Promise.all([page.getByRole('complementary', { name: 'Settings' }).boundingBox(), page.locator('.tool-main').boundingBox()]);
      if (width < 900) expect(settingsBox!.y).toBeGreaterThan(mainBox!.y);
      else expect(settingsBox!.x).toBeGreaterThan(mainBox!.x);
    });
  }
}

test('tool page is keyboard navigable', async ({ page }) => {
  await page.goto('/tools/base64');
  await expect(page.getByRole('heading', { level: 1, name: 'Base64 Encoder/Decoder' })).toBeVisible();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'QuickTools home' })).toBeFocused();
  for (let index = 0; index < 12; index += 1) await page.keyboard.press('Tab');
  await expect(page.locator(':focus')).toBeVisible();
});
