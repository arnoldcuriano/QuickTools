import { expect, test } from '@playwright/test';
import { publishedTools } from '../src/generated/toolRegistry';

const tools = publishedTools.map((tool) => [tool.path, tool.name, tool.runsLocally ? 'Runs locally in your browser' : 'Sends requests to', tool.template] as const);

for (const [route, title, activity, template] of tools) {
  test(`${title} uses the shared tool layout`, async ({ page }) => {
    await page.goto(route);
    await expect(page.getByRole('heading', { level: 1, name: title })).toHaveCount(1);
    await expect(page.getByRole('link', { name: 'Back to tools' })).toHaveCount(1);
    await expect(page.locator('.tool-kicker > span')).toContainText(activity);
    await expect(page.locator('.tool-layout')).toHaveCount(1);
    await expect(page.locator('.tool-page')).toHaveAttribute('data-template', template);
    await expect(page.getByRole('complementary', { name: 'Settings' })).toHaveCount(1);
  });
}

for (const width of [360, 768, 1280]) {
  for (const theme of ['light', 'dark']) {
    test(`every shared layout fits ${width}px in ${theme}`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.addInitScript((value) => localStorage.setItem('quicktools.theme', value), theme);
      for (const [route, title] of tools) {
        await page.goto(route);
        await expect(page.getByRole('heading', { level: 1, name: title })).toBeVisible();
        expect(await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth), route).toBeLessThanOrEqual(1);
        const [settingsBox, mainBox] = await Promise.all([page.getByRole('complementary', { name: 'Settings' }).boundingBox(), page.locator('.tool-main').boundingBox()]);
        if (width < 900) expect(settingsBox!.y, route).toBeGreaterThan(mainBox!.y);
        else {
          expect(settingsBox!.x, route).toBeGreaterThan(mainBox!.x);
          expect(settingsBox!.width, route).toBe(320);
        }
        const heights = await page.locator('.ui-button').evaluateAll((buttons) => buttons.map((button) => ({ ghost: button.classList.contains('ui-button-ghost'), height: button.getBoundingClientRect().height })));
        for (const button of heights) expect(button.height, route).toBe(button.ghost ? 32 : 40);
      }
    });
  }
}

test('tool page is keyboard navigable', async ({ page }) => {
  await page.goto('/tools/base64-encoder-decoder');
  await expect(page.getByRole('heading', { level: 1, name: 'Base64 Encoder/Decoder' })).toBeVisible();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'QuickTools home' })).toBeFocused();
  for (let index = 0; index < 12; index += 1) await page.keyboard.press('Tab');
  await expect(page.locator(':focus')).toBeVisible();
});
