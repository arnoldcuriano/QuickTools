import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { publishedTools } from '../src/generated/toolRegistry';

const routes = [
  '/',
  '/docs',
  ...publishedTools.map((tool) => tool.path),
  '/kitchen-sink',
];

for (const route of routes) {
  for (const theme of ['dark', 'light'] as const) {
    test(`${route} has no serious accessibility violations in ${theme} mode`, async ({ page }) => {
      await page.addInitScript((selectedTheme) => {
        window.localStorage.setItem('quicktools.theme', selectedTheme);
      }, theme);
      await page.goto(route);
      await page.waitForLoadState('networkidle');

      const results = await new AxeBuilder({ page }).analyze();
      const seriousViolations = results.violations.filter(
        ({ impact }) => impact === 'serious' || impact === 'critical',
      );

      expect(seriousViolations).toEqual([]);
    });
  }
}
