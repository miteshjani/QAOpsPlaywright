const { expect, request } = require("@playwright/test");
const { eventCustontest } = require("../utils/Fixture.js");
eventCustontest("Fixture demo", async ({ authenticatedPage, createEvent }) => {
  await authenticatedPage.goto("https://eventhub.rahulshettyacademy.com/");
  await authenticatedPage.waitForLoadState("networkidle");
  // await context.storageState({ path: "state.json" });
  //   const webContext = await browser.newContext({ storageState: "state.json" });
  //   const newpage = await webContext.newPage();
  const eventLocator = authenticatedPage.locator("#nav-events");
  const browseEventsLocator = authenticatedPage.getByText("Browse Events →");
  await browseEventsLocator.waitFor();
  expect(await browseEventsLocator.isVisible()).toBeTruthy();
  await eventLocator.waitFor();
  await eventLocator.click();
  const event = await authenticatedPage
    .locator("[data-testid='event-card']")
    .filter({ hasText: createEvent.eventTitle });
  await expect(event).toBeVisible();
});
