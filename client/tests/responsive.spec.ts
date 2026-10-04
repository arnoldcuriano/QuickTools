import { expect, test } from '@playwright/test';

const viewports = [
  { name: 'mobile', width: 360, height: 800 },
  { name: 'tablet', width: 768, height: 900 },
  { name: 'desktop', width: 1280, height: 1000 },
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

test('command shortcut opens and focuses catalog search', async ({ page }) => {
  await page.goto('/tools/base64');
  await page.evaluate(() => {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }));
  });

  await expect(page).toHaveURL(/\?focus=search#catalog$/);
  await expect(page.getByRole('searchbox', { name: 'Search tools' })).toBeFocused();
});

test('shared visual tokens remain monochrome and flat in both themes', async ({ page }) => {
  for (const theme of ['light', 'dark']) {
    await page.addInitScript((selectedTheme) => {
      window.localStorage.setItem('quicktools.theme', selectedTheme);
    }, theme);
    await page.goto('/');

    const styles = await page.evaluate(() => {
      const root = getComputedStyle(document.documentElement);
      const row = getComputedStyle(document.querySelector('.tool-row') as HTMLElement);
      return {
        background: root.getPropertyValue('--bg').trim(),
        text: root.getPropertyValue('--text').trim(),
        radius: root.getPropertyValue('--radius').trim(),
        cardShadow: row.boxShadow,
        cardBackgroundImage: row.backgroundImage,
      };
    });

    expect(styles.radius).toBe('0px');
    expect(styles.cardShadow).toBe('none');
    expect(styles.cardBackgroundImage).toBe('none');
    expect(styles.background).toMatch(theme === 'light' ? /^#fff(?:fff)?$/ : /^#000(?:000)?$/);
    expect(styles.text).toMatch(theme === 'light' ? /^#000(?:000)?$/ : /^#fff(?:fff)?$/);
  }
});

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
