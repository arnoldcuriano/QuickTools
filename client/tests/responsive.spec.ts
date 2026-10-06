import { expect, test } from '@playwright/test';

const viewports = [
  { name: 'mobile', width: 360, height: 800 },
  { name: 'tablet', width: 768, height: 900 },
  { name: 'desktop', width: 1280, height: 1000 },
];

for (const viewport of viewports) {
  for (const theme of ['light', 'dark'] as const) {
    test(`home remains usable at ${viewport.name} width in ${theme}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.addInitScript((selectedTheme) => localStorage.setItem('quicktools.theme', selectedTheme), theme);
      await page.goto('/');

      await expect(page.getByRole('heading', { name: 'QuickTools', level: 1 })).toBeVisible();
      await expect(page.locator('.globe')).toBeVisible();
      await expect(page.getByRole('searchbox', { name: 'Search tools' })).toBeVisible();
      await expect(page.getByRole('link', { name: /Base64 Encoder\/Decoder/ })).toBeVisible();

      const hasHorizontalOverflow = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
      );
      expect(hasHorizontalOverflow).toBe(false);
    });
  }
}

test('command shortcut opens and focuses catalog search', async ({ page }) => {
  await page.goto('/tools/base64');
  await expect(page.getByRole('link', { name: 'QuickTools home' })).toBeVisible();
  await page.locator('body').press('Control+K');

  await expect(page).toHaveURL(/\?focus=search#catalog$/);
  await expect(page.getByRole('searchbox', { name: 'Search tools' })).toBeFocused();
});

const canvasSignature = async (page: import('@playwright/test').Page) =>
  page.locator('.globe').evaluate((canvas: HTMLCanvasElement) => {
    const context = canvas.getContext('2d');
    if (!context) return '';
    const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
    let signature = 0;
    for (let index = 0; index < pixels.length; index += 64) {
      signature = (signature + pixels[index] * 3 + pixels[index + 1] * 5 + pixels[index + 2] * 7 + pixels[index + 3]) >>> 0;
    }
    return `${canvas.width}:${signature}`;
  });

test('globe animates and recolors when the theme changes', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 1000 });
  await page.addInitScript(() => localStorage.setItem('quicktools.theme', 'dark'));
  await page.goto('/');
  await expect(page.locator('.globe')).toBeVisible();
  await page.waitForTimeout(150);

  const initial = await canvasSignature(page);
  await page.waitForTimeout(500);
  expect(await canvasSignature(page)).not.toBe(initial);

  await page.getByRole('button', { name: /Switch to light theme/ }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.waitForTimeout(50);
  expect(await canvasSignature(page)).not.toBe(initial);
});

test('globe remains static with reduced motion enabled', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 768, height: 900 });
  await page.goto('/');
  await expect(page.locator('.globe')).toBeVisible();
  await page.waitForTimeout(150);

  const initial = await canvasSignature(page);
  await page.waitForTimeout(500);
  expect(await canvasSignature(page)).toBe(initial);
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

    expect(styles.radius).toBe('4px');
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

test('mobile menu renders GitHub as a plain row', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.route('https://api.github.com/repos/arnoldcuriano/QuickTools', (route) => route.fulfill({ json: { stargazers_count: 1200 } }));
  await page.goto('/');
  await page.getByRole('button', { name: 'Menu' }).click();
  const github = page.getByRole('link', { name: /GitHub.*1.2k.*opens in a new tab/i });
  await expect(github).toBeVisible();
  await expect(github).not.toHaveClass(/\bgh\b/);
  await github.focus();
  await expect(github).toBeFocused();
});

test('GitHub stars fall back to cache and hide without one', async ({ page }) => {
  await page.route('https://api.github.com/repos/arnoldcuriano/QuickTools', (route) => route.fulfill({ status: 429, body: '' }));
  await page.goto('/');
  await page.evaluate(() => localStorage.setItem('qt-stars', JSON.stringify({ count: 128, savedAt: 0 })));
  await page.reload();
  await expect(page.locator('.desktop-nav [data-stars]')).toHaveText('128');

  await page.evaluate(() => localStorage.removeItem('qt-stars'));
  await page.reload();
  await expect(page.locator('.desktop-nav .gh-stars')).toBeHidden();
});
