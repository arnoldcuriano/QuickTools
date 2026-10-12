import { expect, test } from '@playwright/test';

test('Explorer sends registry requests and reuses the 60 second GET cache', async ({ page }) => {
  let requestCount = 0;
  await page.route('https://jsonplaceholder.typicode.com/todos/1', (route) => {
    requestCount += 1;
    return route.fulfill({ json: { id: 1, title: 'QuickTools response' } });
  });
  await page.goto('/tools/free-api-explorer');

  await page.getByRole('button', { name: 'Send request' }).click();
  await expect(page.getByText('Status 200')).toBeVisible();
  await expect(page.getByText(/QuickTools response/)).toBeVisible();
  await page.getByRole('button', { name: 'Send request' }).click();
  await expect(page.getByText('60s cache')).toBeVisible();
  expect(requestCount).toBe(1);
});

test('Explorer reports blocked CORS without sending a request', async ({ page }) => {
  let requestCount = 0;
  await page.route('https://api.restcountries.com/**', (route) => {
    requestCount += 1;
    return route.abort();
  });
  await page.goto('/tools/free-api-explorer');
  await page.getByRole('button', { name: 'REST Countries' }).click();
  await page.getByRole('button', { name: 'Send request' }).click();

  await expect(page.getByRole('alert')).toContainText('CORS blocked');
  expect(requestCount).toBe(0);
});

test('Explorer renders image responses with a download action', async ({ page }) => {
  await page.route('https://api.dicebear.com/**', (route) => route.fulfill({
    body: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"><rect width="20" height="20"/></svg>',
    contentType: 'image/svg+xml',
  }));
  await page.goto('/tools/free-api-explorer');
  await page.getByRole('button', { name: 'DiceBear' }).click();
  await page.getByRole('button', { name: 'Send request' }).click();

  await expect(page.getByRole('img', { name: 'DiceBear response' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Download image' })).toBeVisible();
});
