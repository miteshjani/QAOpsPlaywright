const { test, expect, request } = require("@playwright/test");
const { BannerUtils } = require("../utils/BannerUtils.js");

const {
  loginAndGoToEvents,
  loginAsGmailUser,
} = require("../utils/HelperFunctions.js");
const loginPayload = { email: "miteshjani90@ymail.com", password: "Test@123" };

let response;
let eventBookingResponse;
let yahooBookingId;
test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const bannerUtils = new BannerUtils(apiContext, loginPayload);
  response = await bannerUtils.getEventDetailsResponse();
  const eventBookingPayload = {
    customerName: "Mitesh P Jani",
    customerEmail: "miteshjani90@ymail.com",
    customerPhone: "+919176861116",
    quantity: 1,
    eventId: response.eventId,
  };
  eventBookingResponse = await bannerUtils.createBookings(eventBookingPayload);
  yahooBookingId = eventBookingResponse.bookingId;
});

test("Event Hub Automation Assignment6", async ({ page }) => {
  const gmail = "janimitesh90@gmail.com";
  await loginAsGmailUser(page, gmail);
  await page.goto(
    `https://eventhub.rahulshettyacademy.com/bookings/${yahooBookingId}`,
  );
  await page.waitForLoadState("networkidle");
  await page.locator("h3[class*='text-lg']").waitFor();
  expect(await page.locator("h3[class*='text-lg']")).toHaveText(
    "Access Denied",
  );
  expect(await page.locator("p[class*='text-sm']")).toHaveText(
    "You are not authorized to view this booking.",
  );
});
