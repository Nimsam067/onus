# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: edit-task.spec.js >> User can edit a task
- Location: tests\edit-task.spec.js:3:1

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
    27 × waiting for element to be visible and enabled
       - did not find some options
     - retrying select option action
       - waiting 500ms

```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test("User can edit a task", async ({ page }) => {
  4  |   const taskName = `Playwright ${Date.now()}`;
  5  | 
  6  |   // Login
  7  |   await page.goto("https://backend.d1dsmyx80v3kkk.amplifyapp.com/login/");
  8  | 
  9  |   await page
  10 |     .getByRole("textbox", { name: "Email" })
  11 |     .fill("nimsam067@gmail.com");
  12 | 
  13 |   await page
  14 |     .getByRole("textbox", { name: "Password" })
  15 |     .fill("Onus@1234!");
  16 | 
  17 |   await page
  18 |     .locator("form")
  19 |     .getByRole("button", { name: "Sign In" })
  20 |     .click();
  21 | 
  22 |   await expect(
  23 |     page.getByRole("button", { name: "+ New Task" })
  24 |   ).toBeVisible();
  25 | 
  26 |   // Create task
  27 |   await page.getByRole("button", { name: "+ New Task" }).click();
  28 | 
  29 |   await page
  30 |     .getByRole("textbox", {
  31 |       name: "Enter task title...",
  32 |     })
  33 |     .fill(taskName);
  34 | 
  35 |   await page
  36 |     .getByRole("textbox", {
  37 |       name: "Describe this task...",
  38 |     })
  39 |     .fill("Playwright Edit Test");
  40 | 
  41 |   await page
  42 |     .locator('input[type="date"]')
  43 |     .fill("2026-08-01");
  44 | 
  45 |   await page
  46 |     .getByRole("combobox")
  47 |     .first()
  48 |     .selectOption("in_progress");
  49 | 
  50 |   await page
  51 |     .getByRole("combobox")
  52 |     .nth(1)
> 53 |     .selectOption("Onus Tester");
     |      ^ Error: locator.selectOption: Target page, context or browser has been closed
  54 | 
  55 |   await page.getByRole("slider").fill("4");
  56 | 
  57 |   await page
  58 |     .getByRole("button", { name: "Create Task" })
  59 |     .click();
  60 | 
  61 |   // Verify task exists
  62 |   await expect(
  63 |     page.getByRole("heading", { name: taskName })
  64 |   ).toBeVisible();
  65 | 
  66 |   // Edit task
  67 |   await page.getByRole("button", { name: "⋮" }).first().click();
  68 | 
  69 |   await page
  70 |     .getByRole("button", { name: "Edit" })
  71 |     .click();
  72 | 
  73 |   // Change status to Done
  74 |   await page
  75 |     .getByRole("combobox")
  76 |     .nth(2)
  77 |     .selectOption("done");
  78 | 
  79 |   await page
  80 |     .getByRole("button", { name: "Save Changes" })
  81 |     .click();
  82 | 
  83 |   // Verify status changed
  84 |   await expect(
  85 |     page.getByDisplayValue("Done")
  86 |   ).toBeVisible();
  87 | 
  88 |   // Verify completed date appears
  89 |   await expect(
  90 |     page.getByText(/Completed/i)
  91 |   ).toBeVisible();
  92 | });
```