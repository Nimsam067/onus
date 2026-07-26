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

  const modal = page.locator(".modal-container");

  await modal
    .getByRole("textbox", {
      name: "Enter task title...",
    })
    .fill(taskName);

  await modal
    .getByRole("textbox", {
      name: "Describe this task...",
    })
    .fill("Created by Playwright");

  await modal
    .locator('input[type="date"]')
    .fill("2026-08-01");

  await modal
    .getByRole("combobox")
    .first()
    .selectOption("in_progress");

  await modal
    .getByRole("combobox")
    .nth(1)
    .selectOption("Onus Tester");

  await modal
    .getByRole("slider")
    .fill("4");

  await modal
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