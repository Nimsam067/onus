import { test } from '@playwright/test';

test('authenticate', async ({ page }) => {
    await page.goto('https://backend.d1dsmyx80v3kkk.amplifyapp.com/login');

    console.log('Please log in with Google.');

    // Give yourself time to complete login manually
    await page.waitForTimeout(30000);

    await page.context().storageState({
        path: 'playwright/.auth/user.json',
    });
});