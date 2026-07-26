# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: create-task.spec.js >> User can create a new task
- Location: tests\create-task.spec.js:4:1

# Error details

```
Error: locator.selectOption: Target page, context or browser has been closed
Call log:
  - waiting for getByRole('combobox').nth(1)
    - locator resolved to <select class="task-status-select task-status-done">…</select>
  - attempting select option action
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
    - waiting 20ms
    2 × waiting for element to be visible and enabled
      - did not find some options
    - retrying select option action
      - waiting 100ms
    26 × waiting for element to be visible and enabled
       - did not find some options
     - retrying select option action
       - waiting 500ms

```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | import { login } from "./helpers/login";
  3  | 
  4  | test("User can create a new task", async ({ page }) => {
  5  | 
  6  |   const taskName = `Playwright ${Date.now()}`;
  7  | 
  8  |   await login(page);
  9  | 
  10 |   await page
  11 |     .getByRole("button", {
  12 |       name: "+ New Task",
  13 |     })
  14 |     .click();
  15 | 
  16 |   await page
  17 |     .getByRole("textbox", {
  18 |       name: "Enter task title...",
  19 |     })
  20 |     .fill(taskName);
  21 | 
  22 |   await page
  23 |     .getByRole("textbox", {
  24 |       name: "Describe this task...",
  25 |     })
  26 |     .fill("Created by Playwright");
  27 | 
  28 |   await page
  29 |     .locator('input[type="date"]')
  30 |     .fill("2026-08-01");
  31 | 
  32 |   await page
  33 |     .getByRole("combobox")
  34 |     .first()
  35 |     .selectOption("in_progress");
  36 | 
  37 |   await page
  38 |     .getByRole("combobox")
  39 |     .nth(1)
> 40 |     .selectOption("Onus Tester");
     |      ^ Error: locator.selectOption: Target page, context or browser has been closed
  41 | 
  42 |   await page
  43 |     .getByRole("slider")
  44 |     .fill("4");
  45 | 
  46 |   await page
  47 |     .getByRole("button", {
  48 |       name: "Create Task",
  49 |     })
  50 |     .click();
  51 | 
  52 |   await expect(
  53 |     page.getByRole("heading", {
  54 |       name: taskName,
  55 |     })
  56 |   ).toBeVisible();
  57 | });
```