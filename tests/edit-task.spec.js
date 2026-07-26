import { test, expect } from "@playwright/test";

test("User can edit a task", async ({ page }) => {
  const taskName = `Playwright ${Date.now()}`;

  // Login
  await page.goto("https://backend.d1dsmyx80v3kkk.amplifyapp.com/login/");

  await page
    .getByRole("textbox", { name: "Email" })
    .fill("nimsam067@gmail.com");

  await page
    .getByRole("textbox", { name: "Password" })
    .fill("Onus@1234!");

  await page
    .locator("form")
    .getByRole("button", { name: "Sign In" })
    .click();

  await expect(
    page.getByRole("button", { name: "+ New Task" })
  ).toBeVisible();

  // Create task
  await page.getByRole("button", { name: "+ New Task" }).click();

  await page
    .getByRole("textbox", {
      name: "Enter task title...",
    })
    .fill(taskName);

  await page
    .getByRole("textbox", {
      name: "Describe this task...",
    })
    .fill("Playwright Edit Test");

  await page
    .locator('input[type="date"]')
    .fill("2026-08-01");

  await page
    .getByRole("combobox")
    .first()
    .selectOption("in_progress");

  await page
    .getByRole("combobox")
    .nth(1)
    .selectOption("Onus Tester");

  await page.getByRole("slider").fill("4");

  await page
    .getByRole("button", { name: "Create Task" })
    .click();

  // Verify task exists
  await expect(
    page.getByRole("heading", { name: taskName })
  ).toBeVisible();

  // Edit task
  await page.getByRole("button", { name: "⋮" }).first().click();

  await page
    .getByRole("button", { name: "Edit" })
    .click();

  // Change status to Done
  await page
    .getByRole("combobox")
    .nth(2)
    .selectOption("done");

  await page
    .getByRole("button", { name: "Save Changes" })
    .click();

  // Verify status changed
  await expect(
    page.getByDisplayValue("Done")
  ).toBeVisible();

  // Verify completed date appears
  await expect(
    page.getByText(/Completed/i)
  ).toBeVisible();
});