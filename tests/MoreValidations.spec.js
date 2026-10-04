const { test, expect } = require("@playwright/test");

// test.describe.configure({ mode: "parallel" });
// test.describe.configure({ mode: "serial" });
test("Popup Validations", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  //   await page.goto("http://google.com");
  //   await page.goBack();
  //   await page.goForward();
  await expect(page.locator("#displayed-text")).toBeVisible();
  await page.locator("#hide-textbox").click();
  await expect(page.locator("#displayed-text")).toBeHidden();
  await page.pause();
  page.on("dialog", (dialog) => dialog.accept());
  await page.locator("#confirmbtn").click();
  await page.locator("#mousehover").hover();
  const framePage = page.frameLocator("#course-iframe");
  await framePage
    .locator("div a[href*='/all-access-subscription']:visible")
    .click();
  await framePage
    .getByRole("link", { name: "All Access Subscription" })
    .click();
  const textCheck = await framePage
    .locator(".text-center div[class*='text-2xl']")
    .first()
    .textContent();
});

test("Screenshot and visua;l comparison", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await expect(page.locator("#displayed-text")).toBeVisible();
  await page
    .locator("#displayed-text")
    .screenshot({ path: "partialScreenshot.png" });
  await page.locator("#hide-textbox").click();
  await page.screenshot({ path: "screenshot.png" });
  await expect(page.locator("#displayed-text")).toBeHidden();
});

test("visua;l comparison", async ({ page }) => {
  await page.goto("https://www.flightaware.com/");
  await page.locator("[data-testid='log-in']").waitFor();
  expect(await page.screenshot()).toMatchSnapshot("landing.png");
  // await page.getByRole("link", { name: "Logout" }).click();
});

test("visua;l comparison yahoo", async ({ page }) => {
  await page.goto("https://www.yahoo.com/");
  await page.locator("[aria-label='Yahoo']").waitFor();
  expect(await page.screenshot()).toMatchSnapshot("landing.png");
  // await page.locator("#mainDropDownLink").hover();
  // await page.getByRole("link", { name: "Logout" }).click();
});

test("visua;l comparison google", async ({ page }) => {
  await page.goto("https://www.google.com/");
  expect(await page.screenshot()).toMatchSnapshot("landing.png");
});
