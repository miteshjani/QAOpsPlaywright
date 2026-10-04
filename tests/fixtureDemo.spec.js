const { test, expect, request } = require("@playwright/test");
const { customtest } = require("../utils/Fixture.js");
customtest(
  "Fixture demo",
  async ({ authenticatedPage, createOrder, testDataForOrder }) => {
    await authenticatedPage.goto("https://rahulshettyacademy.com/client/");
    await authenticatedPage
      .locator("[routerlink*='/dashboard/myorders']")
      .first()
      .waitFor();
    await authenticatedPage
      .locator("[routerlink*='/dashboard/myorders']")
      .first()
      .click();
    const ordertab = authenticatedPage.locator(
      ".table tr[class='ng-star-inserted']",
    );
    await ordertab.first().waitFor();
    await expect(
      authenticatedPage.getByText(createOrder.orderId),
    ).toBeVisible();
    console.log(testDataForOrder.productName);
  },
);
