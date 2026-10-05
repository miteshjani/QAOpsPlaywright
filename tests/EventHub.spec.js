const { test, expect } = require("@playwright/test");

async function futureDateValue() {
  let now = new Date("2026-12-31");
  return (
    `${now.getDate().toString().padStart(2, "0")}` +
    "-" +
    `${(now.getMonth() + 1).toString().padStart(2, "0")}` +
    "-" +
    `${now.getFullYear().toString()}`
  );
}

test("Event Hub Automation Assignment1", async ({ browser }) => {
  const email = "miteshjani90@ymail.com";
  const password = "Test@123";
  const name = "Mitesh P Jani";
  const mobileNumber = "9176861116";
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://eventhub.rahulshettyacademy.com/login");
  await page.getByPlaceholder("you@email.com").fill(email);
  await page.getByPlaceholder("••••••").fill(password);
  await page.getByRole("button", { name: "Sign In" }).click();

  const eventLocator = page.locator("#nav-events");
  const browseEventsLocator = page.getByText("Browse Events →");
  await browseEventsLocator.waitFor();
  expect(await browseEventsLocator.isVisible()).toBeTruthy();
  await eventLocator.waitFor();
  await eventLocator.click();

  await eventLocator.waitFor();
  await eventLocator.click();
  await page.locator("[type*='button']").last().click();
  //   await page.pause();
  const title = `New Year Celebration ${await futureDateValue()}`;
  await page.locator("#event-title-input").fill(title);
  await page.getByPlaceholder("Describe the event…").fill(title);
  await page.getByLabel("City").fill("Bangalore");
  await page.getByLabel("Venue").fill("WhiteField");
  await page.getByLabel("Event Date & Time").type(await futureDateValue());

  await page.getByLabel("Event Date & Time").click();
  await page.keyboard.press("Tab");
  await page.getByLabel("Event Date & Time").type("15:30");
  await page.getByLabel("Price ($)").fill("100");
  await page.getByLabel("Total Seats").fill("50");
  await page.locator("#add-event-btn").click();

  await eventLocator.waitFor();
  await eventLocator.click();
  await expect(
    page.locator("[data-testid='event-card']").first(),
  ).toBeVisible();
  const event = await page
    .locator("[data-testid='event-card']")
    .filter({ hasText: title });
  await expect(event).toBeVisible({ timeout: 5000 });

  const seatsBeforeBooking = await page
    .locator("div .p-4")
    .filter({ hasText: title })
    .getByText("seats available")
    .textContent();
  console.log(seatsBeforeBooking);
  console.log(parseInt(seatsBeforeBooking));

  const seatsBefore = parseInt(seatsBeforeBooking);

  await event.getByRole("link", { hasText: "Book Now" }).first().click();
  const defaultQuantity = await page.locator("#ticket-count").textContent();
  console.log(defaultQuantity);
  await page.getByPlaceholder("Your full name").fill(name);
  await page.getByPlaceholder("you@email.com").fill(email);
  await page.getByPlaceholder("+91 98765 43210").fill(mobileNumber);
  await page.locator(".confirm-booking-btn").click();
  expect(await page.locator(" .booking-ref")).toBeVisible();
  const bookingRefrence = await page
    .locator(" .booking-ref")
    .first()
    .textContent();
  console.log(bookingRefrence);

  await page.locator("#nav-bookings").click();
  const currentUrl = page.url();
  console.log("Current URL:", currentUrl);
  expect(currentUrl.includes("/bookings")).toBeTruthy();
  expect(await page.locator("#booking-card").first()).toBeVisible();
  const currntBooking = await page
    .locator("#booking-card")
    .filter({ hasText: bookingRefrence });
  await expect(currntBooking).toBeVisible();
  await expect(currntBooking.getByText(title)).toBeVisible();

  await eventLocator.waitFor();
  await eventLocator.click();
  await page.waitForLoadState("networkidle");
  // await page.pause();
  await expect(
    page.locator("[data-testid='event-card']").first(),
  ).toBeVisible();
  await expect(event).toBeVisible({ timeout: 5000 });

  // const seatsAfterBooking = await page
  //   .locator("div .p-4")
  //   .filter({ hasText: title })
  //   .getByText("seats available")
  //   .textContent();

  await page
    .locator("div .p-4")
    .filter({ hasText: title })
    .locator("span:has-text('seats available')")
    .waitFor();
  const seatsAfterBooking = await page
    .locator("div .p-4")
    .filter({ hasText: title })
    .locator("span:has-text('seats available')")
    .textContent();

  // const seatText = await page
  //   .locator("div .p-4")
  //   .filter({ hasText: title })
  //   .allTextContents();
  // console.log(seatText);
  console.log(seatsAfterBooking);
  // console.log(parseInt(seatsAfterBooking));
  const seatsAfter = parseInt(seatsAfterBooking);
  console.log(seatsAfter);

  const seatsAfterBooking1 = await page
    .locator("div .p-4")
    .filter({ hasText: title })
    .locator("span:has-text('seats available')")
    .textContent();
  const seatsAfter1 = parseInt(seatsAfterBooking1);
  console.log(seatsAfter1);
  // await page.pause();
  expect(seatsAfter1 === seatsBefore - 1).toBeTruthy();
});

test("Event Hub Automation Assignment2 Single Ticket Booking", async ({
  browser,
}) => {
  const email = "miteshjani90@ymail.com";
  const password = "Test@123";
  const name = "Mitesh P Jani";
  const mobileNumber = "9176861116";
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://eventhub.rahulshettyacademy.com/login");
  await page.getByPlaceholder("you@email.com").fill(email);
  await page.getByPlaceholder("••••••").fill(password);
  await page.getByRole("button", { name: "Sign In" }).click();

  const eventLocator = page.locator("#nav-events");
  const browseEventsLocator = page.getByText("Browse Events →");
  await browseEventsLocator.waitFor();
  expect(await browseEventsLocator.isVisible()).toBeTruthy();
  await eventLocator.waitFor();
  await eventLocator.click();
  const title = `Dilli Diwali Mela`;
  await expect(
    page.locator("[data-testid='event-card']").first(),
  ).toBeVisible();
  const event = await page
    .locator("[data-testid='event-card']")
    .filter({ hasText: title });
  await expect(event).toBeVisible({ timeout: 5000 });
  await event.getByRole("link", { hasText: "Book Now" }).first().click();
  const defaultQuantity = await page.locator("#ticket-count").textContent();
  console.log(defaultQuantity);
  await page.getByPlaceholder("Your full name").fill(name);
  await page.getByPlaceholder("you@email.com").fill(email);
  await page.getByPlaceholder("+91 98765 43210").fill(mobileNumber);
  await page.locator(".confirm-booking-btn").click();
  expect(await page.locator(" .booking-ref")).toBeVisible();

  const bookingRefrence = await page
    .locator(" .booking-ref")
    .first()
    .textContent();
  console.log(bookingRefrence);

  await page.locator("#nav-bookings").click();
  const currentUrl = page.url();
  console.log("Current URL:", currentUrl);
  expect(currentUrl.includes("/bookings")).toBeTruthy();
  expect(await page.locator("#booking-card").first()).toBeVisible();
  await page
    .locator("[data-testid='booking-card']")
    .filter({ hasText: bookingRefrence })
    .getByRole("button", { name: "View Details" })
    .click();

  await page.getByText("Event Details").waitFor();
  expect(await page.getByText("Event Details").isVisible()).toBeTruthy();

  await page.getByText("Customer Details").waitFor();
  expect(await page.getByText("Customer Details").isVisible()).toBeTruthy();

  let bookingTitle = await page.getByText(title).last().textContent();
  let bookingTitleRef = await page
    .getByText(bookingRefrence)
    .last()
    .textContent();
  bookingTitle = bookingTitle.substring(0, 1);
  bookingTitleRef = bookingTitleRef.substring(0, 1);
  expect(bookingTitle === bookingTitleRef).toBeTruthy();

  await page
    .getByRole("button", { name: "Check eligibility for refund?" })
    .click();

  expect(await page.locator("#refund-spinner").isVisible()).toBeTruthy();
  // await page.locator("#refund-spinner").focus();
  await page.waitForSelector("#refund-spinner", {
    state: "hidden",
    timeout: 10000,
  });
  expect(await page.locator("#refund-result").isVisible()).toBeTruthy();
  expect(await page.locator("#refund-result")).toContainText(
    "Eligible for refund.",
  );
  expect(await page.locator("#refund-result")).toContainText(
    "Single-ticket bookings qualify for a full refund.",
  );
  // await page.getByText("Checking your refund eligibility…");
});

test("Event Hub Automation Assignment3 Group Ticket Booking", async ({
  browser,
}) => {
  const email = "miteshjani90@ymail.com";
  const password = "Test@123";
  const name = "Mitesh P Jani";
  const mobileNumber = "9176861116";
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://eventhub.rahulshettyacademy.com/login");
  await page.getByPlaceholder("you@email.com").fill(email);
  await page.getByPlaceholder("••••••").fill(password);
  await page.getByRole("button", { name: "Sign In" }).click();

  const eventLocator = page.locator("#nav-events");
  const browseEventsLocator = page.getByText("Browse Events →");
  await browseEventsLocator.waitFor();
  expect(await browseEventsLocator.isVisible()).toBeTruthy();
  await eventLocator.waitFor();
  await eventLocator.click();
  const title = `Dilli Diwali Mela`;
  await expect(
    page.locator("[data-testid='event-card']").first(),
  ).toBeVisible();
  const event = await page
    .locator("[data-testid='event-card']")
    .filter({ hasText: title });
  await expect(event).toBeVisible({ timeout: 5000 });
  await event.getByRole("link", { hasText: "Book Now" }).first().click();
  const defaultQuantity = await page.locator("#ticket-count").textContent();
  console.log(defaultQuantity);
  await page.getByRole("button", { name: "+" }).dblclick();
  const desiredQuantity = await page.locator("#ticket-count").textContent();
  console.log(desiredQuantity);
  await page.getByPlaceholder("Your full name").fill(name);
  await page.getByPlaceholder("you@email.com").fill(email);
  await page.getByPlaceholder("+91 98765 43210").fill(mobileNumber);
  await page.locator(".confirm-booking-btn").click();
  expect(await page.locator(" .booking-ref")).toBeVisible();

  const bookingRefrence = await page
    .locator(" .booking-ref")
    .first()
    .textContent();
  console.log(bookingRefrence);

  await page.locator("#nav-bookings").click();
  const currentUrl = page.url();
  console.log("Current URL:", currentUrl);
  expect(currentUrl.includes("/bookings")).toBeTruthy();
  expect(await page.locator("#booking-card").first()).toBeVisible();
  await page
    .locator("[data-testid='booking-card']")
    .filter({ hasText: bookingRefrence })
    .getByRole("button", { name: "View Details" })
    .click();

  await page.getByText("Event Details").waitFor();
  expect(await page.getByText("Event Details").isVisible()).toBeTruthy();

  await page.getByText("Customer Details").waitFor();
  expect(await page.getByText("Customer Details").isVisible()).toBeTruthy();

  let bookingTitle = await page.getByText(title).last().textContent();
  let bookingTitleRef = await page
    .getByText(bookingRefrence)
    .last()
    .textContent();
  bookingTitle = bookingTitle.substring(0, 1);
  bookingTitleRef = bookingTitleRef.substring(0, 1);
  expect(bookingTitle === bookingTitleRef).toBeTruthy();

  await page
    .getByRole("button", { name: "Check eligibility for refund?" })
    .click();

  expect(await page.locator("#refund-spinner").isVisible()).toBeTruthy();
  // await page.locator("#refund-spinner").focus();
  await page.waitForSelector("#refund-spinner", {
    state: "hidden",
    timeout: 10000,
  });
  expect(await page.locator("#refund-result").isVisible()).toBeTruthy();
  expect(await page.locator("#refund-result")).toContainText(
    "Not eligible for refund.",
  );
  expect(await page.locator("#refund-result")).toContainText(
    `Group bookings (${desiredQuantity} tickets) are non-refundable.`,
  );
  // await page.getByText("Checking your refund eligibility…");
});
