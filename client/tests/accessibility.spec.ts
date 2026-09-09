import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const routes = [
  '/',
  '/tools/base64',
  '/tools/text-formatter',
  '/tools/webp-converter',
  '/tools/json-converter',
  '/tools/qr-code-generator',
  '/tools/json-compare',
  '/tools/csv-tsv-converter',
  '/tools/regex-tester',
];

for (const route of routes) {
  test(`${route} has no serious accessibility violations`, async ({ page }) => {
    await page.goto(route);
    await page.waitForLoadState('networkidle');

    const results = await new AxeBuilder({ page }).analyze();
    const seriousViolations = results.violations.filter(({ impact }) =>
      impact === 'serious' || impact === 'critical',
    );

    expect(seriousViolations).toEqual([]);
  });
}
