import { test, expect } from '@playwright/test';

test('homepage loads', async ({ page }) => {
  await page.goto('https://backend.d1dsmyx80v3kkk.amplifyapp.com/login');

  await expect(page).toHaveTitle(/Onus/i);
});