const { expect } = require("@playwright/test");
exports.loginAndGoToEvents = async function loginAndGoToEvents(page) {
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
  // await context.storageState({ path: "state.json" });
  //   const webContext = await browser.newContext({ storageState: "state.json" });
  //   const newpage = await webContext.newPage();
  const eventLocator = page.locator("#nav-events");
  const browseEventsLocator = page.getByText("Browse Events →");
  await browseEventsLocator.waitFor();
  expect(await browseEventsLocator.isVisible()).toBeTruthy();
  await eventLocator.waitFor();
  await eventLocator.click();
  // return page;
};

exports.loginAsGmailUser = async function loginAsGmailUser(page, gmail_user) {
  const email = gmail_user;
  const password = "Test@1234";
  const name = "Mitesh P Jani";
  const mobileNumber = "9176861116";
  //   const context = await browser.newContext();
  //   const page = await context.newPage();
  await page.goto("https://eventhub.rahulshettyacademy.com/login");
  await page.getByPlaceholder("you@email.com").fill(email);
  await page.getByPlaceholder("••••••").fill(password);
  await page.getByRole("button", { name: "Sign In" }).click();

  await page.waitForLoadState("networkidle");
  // await context.storageState({ path: "state.json" });
  //   const webContext = await browser.newContext({ storageState: "state.json" });
  //   const newpage = await webContext.newPage();
  const myBookings = page.locator("#nav-bookings");
  const browseEventsLocator = page.getByText("Browse Events →");
  await browseEventsLocator.waitFor();
  expect(await browseEventsLocator.isVisible()).toBeTruthy();
};
