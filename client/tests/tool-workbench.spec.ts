import { expect, test } from '@playwright/test';

const tools = [
  { route: '/tools/base64', title: 'Base64 Encoder/Decoder', reset: 'Clear all' },
  { route: '/tools/text-formatter', title: 'Text Formatter', reset: 'Clear all' },
  { route: '/tools/webp-converter', title: 'WebP Converter', reset: 'Clear all' },
  { route: '/tools/json-converter', title: 'JSON Converter', reset: 'Clear all' },
  { route: '/tools/qr-code-generator', title: 'QR Code Generator', reset: 'Reset' },
  { route: '/tools/json-compare', title: 'JSON Compare', reset: 'Clear all' },
  { route: '/tools/csv-tsv-converter', title: 'CSV / TSV Converter', reset: 'Clear' },
  { route: '/tools/regex-tester', title: 'Regex Tester', reset: 'Reset' },
];

for (const tool of tools) {
  test(`${tool.title} keeps workspace actions out of global navigation`, async ({ page }) => {
    await page.goto(tool.route);

    await expect(page.getByRole('heading', { level: 1, name: tool.title })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Back to tools' })).toBeVisible();
    await expect(page.getByText('Runs locally in your browser', { exact: true })).toBeVisible();

    const appHeader = page.locator('header');
    await expect(appHeader.getByRole('button', { name: /clear|reset|copy|download/i })).toHaveCount(0);

    const toolbar = page.getByRole('toolbar', { name: 'Tool actions' });
    await expect(toolbar.getByRole('button', { name: tool.reset, exact: true })).toBeVisible();
  });
}

test('tool actions fit a narrow mobile viewport', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto('/tools/csv-tsv-converter');

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});
