const { test, expect, request } = require("@playwright/test");
const { APIUtils } = require("../utils/APIUtils");

let response;
const loginPayload = {
  userEmail: "miteshjani90@ymail.com",
  userPassword: "Test@123",
};

const orderPayload = {
  orders: [{ country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68" }],
};

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, loginPayload);
  response = await apiUtils.createOrder(orderPayload);
});

test("@API New Client Login", async ({ page }) => {
  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, response.token);

  const email = "miteshjani90@ymail.com";

  //   const userName = page.locator("#userEmail");
  //   const password = page.locator("#userPassword");
  //   const loginBtn = page.locator("[value='Login']");
  const cardTitles = page.locator(".card-body b");
  const productName = "ZARA COAT 3";
  const products = page.locator(".card-body");
  await page.goto("https://rahulshettyacademy.com/client/");
  //   await userName.fill(email);
  //   await password.fill("Test@123");
  //   await loginBtn.click();
  //   await page.waitForLoadState("networkidle");
  await page.locator("[routerlink*='/dashboard/myorders']").first().waitFor();
  await page.locator("[routerlink*='/dashboard/myorders']").first().click();

  const ordertab = page.locator(".table tr[class='ng-star-inserted']");
  // console.log(ordertab);
  await ordertab.first().waitFor();
  const productCount = await ordertab.count();
  console.log(productCount);
  const productIDs = await ordertab
    .locator("th[scope='row']")
    .allTextContents();
  console.log(productIDs);
  for (let i = 0; i <= productCount; i++) {
    if (response.orderId.includes(productIDs[i])) {
      await ordertab.locator("button[class='btn btn-primary']").nth(i).click();
      // await page.pause();
      break;
    }
  }

  const orderIdDetails = await page.locator(".col-text").textContent();
  expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
  // const orderIDs = await page
  //   .locator(".ng-star-inserted th[scope='row']")
  //   .nth(1)
  //   .textContent();
  // console.log(orderIDs);
});
