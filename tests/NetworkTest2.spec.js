const { test, expect, request } = require("@playwright/test");
const { url } = require("node:inspector");
test("Security test request intercept", async ({ page }) => {
  const email = "miteshjani90@ymail.com";
  const userName = page.locator("#userEmail");
  const password = page.locator("#userPassword");
  const loginBtn = page.locator("[value='Login']");
  const cardTitles = page.locator(".card-body b");
  const productName = "ZARA COAT 3";
  const products = page.locator(".card-body");
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  await userName.fill(email);
  await password.fill("Test@123");
  await loginBtn.click();
  await cardTitles.first().waitFor();
  await page.locator("[routerlink*='/dashboard/myorders']").first().waitFor();
  await page.locator("[routerlink*='/dashboard/myorders']").first().click();
  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    async (route) =>
      await route.continue({
        url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6 ",
      }),
  );
  await page.locator("button:has-text('View')").first().click();
  // await page.pause();
  await expect(page.locator("p").last()).toHaveText(
    "You are not authorize to view this order",
  );
});
