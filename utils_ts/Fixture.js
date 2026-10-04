const base = require("@playwright/test");
const { APIUtils } = require("./APIUtils.js");
const { BannerUtils } = require("./BannerUtils.js");
const { request } = require("@playwright/test");

const loginPayload = {
  userEmail: "miteshjani90@ymail.com",
  userPassword: "Test@123",
};
const loginEventPayload = {
  email: "miteshjani90@ymail.com",
  password: "Test@123",
};
const orderPayload = {
  orders: [{ country: "India", productOrderedId: "6960eac0c941646b7a8b3e68" }],
};
const eventCreationPayload = {
  title: "Pongal Celebration 14/01/2027",
  description: "Pongal Celebration 14/01/2027",
  category: "Festival",
  venue: "Marina Beach",
  city: "Chennai",
  eventDate: "2027-01-14T04:00:00.000Z",
  price: 100,
  totalSeats: 500,
};
exports.customtest = base.test.extend({
  authenticatedPage: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const email = "miteshjani90@ymail.com";
    const userName = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const loginBtn = page.locator("[value='Login']");
    await page.goto("https://rahulshettyacademy.com/client/");
    await userName.fill(email);
    await password.fill("Test@123");
    await loginBtn.click();
    await page.waitForLoadState("networkidle");
    await use(page);
    // tear down
    await context.close();
  },
  createOrder: async ({}, use) => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    const response = await apiUtils.createOrder(orderPayload);
    await use(response);
    // tear down
    await apiContext.dispose();
  },

  testDataForOrder: {
    productName: "ADIDAS ORIGINAL",
  },
});

exports.eventCustontest = base.test.extend({
  authenticatedPage: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const email = "miteshjani90@ymail.com";
    const password = "Test@123";
    const name = "Mitesh P Jani";
    const mobileNumber = "9176861116";
    //   const context = await browser.newContext();
    //   const page = await context.newPage();
    await page.goto("https://eventhub.rahulshettyacademy.com/login");
    await page.getByPlaceholder("you@email.com").fill(email);
    await page.getByPlaceholder("••••••").fill(password);
    await page.getByRole("button", { name: "Sign In" }).click();

    await page.waitForLoadState("networkidle");
    await use(page);
    // tear down
    await context.close();
  },
  createEvent: async ({}, use) => {
    const apiContext = await request.newContext();
    const bannerUtils = new BannerUtils(apiContext, loginEventPayload);
    const response = await bannerUtils.createEvent(eventCreationPayload);
    await use(response);
    // tear down
    await apiContext.dispose();
  },
});
