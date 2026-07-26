import { test, expect } from "@playwright/test";
import { login } from "./helpers/login";

test("User can create a new task", async ({ page }) => {

  const taskName = `Playwright ${Date.now()}`;

  await login(page);

  await page
    .getByRole("button", {
      name: "+ New Task",
    })
    .click();

  await page
    .getByRole("textbox", {
      name: "Enter task title...",
    })
    .fill(taskName);

  await page
    .getByRole("textbox", {
      name: "Describe this task...",
    })
    .fill("Created by Playwright");

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

  await page
    .getByRole("slider")
    .fill("4");

  await page
    .getByRole("button", {
      name: "Create Task",
    })
    .click();

  await expect(
    page.getByRole("heading", {
      name: taskName,
    })
  ).toBeVisible();
});