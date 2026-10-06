const { test, expect } = require("@playwright/test");
const { PracticeLoginPage } = require("../pageobjects/PracticeLoginPage");
const { PracticeShopPage } = require("../pageobjects/PracticeShopPage");

test("@Web Login and verify iPhone X is displayed", async ({ page }) => {
  const loginPage = new PracticeLoginPage(page);
  const shopPage = new PracticeShopPage(page);

  await loginPage.goTo();
  await loginPage.login("rahulshettyacademy", "Learning@830$3mK2");

  await expect(page).toHaveURL(
    "https://rahulshettyacademy.com/angularpractice/shop",
  );
  await expect(shopPage.iphoneX).toBeVisible();
});
