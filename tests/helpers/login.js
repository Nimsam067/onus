import { expect } from "@playwright/test";

export async function login(page) {
  await page.goto(
    "https://backend.d1dsmyx80v3kkk.amplifyapp.com/login/"
  );

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
}