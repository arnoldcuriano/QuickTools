import { expect, test } from '@playwright/test';

const viewports = [
  { name: 'mobile', width: 320, height: 800 },
  { name: 'tablet', width: 768, height: 900 },
  { name: 'desktop', width: 1440, height: 1000 },
];

for (const viewport of viewports) {
  test(`home remains usable at ${viewport.name} width`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'QuickTools', level: 1 })).toBeVisible();
    await expect(page.getByRole('searchbox', { name: 'Search tools' })).toBeVisible();
    await expect(page.getByRole('link', { name: /Base64 Encoder\/Decoder/ })).toBeVisible();

    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(hasHorizontalOverflow).toBe(false);
  });
}

test('theme selection survives navigation and reload', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => {
    window.localStorage.setItem('quicktools.theme', 'dark');
  });
  await page.reload();
  await page.getByRole('button', { name: /Switch to light theme/ }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');

  await page.getByRole('link', { name: /JSON Converter/ }).first().click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');

  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
});
