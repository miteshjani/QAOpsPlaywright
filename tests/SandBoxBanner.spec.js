const { test, expect, request } = require("@playwright/test");
const { loginAndGoToEvents } = require("../utils/HelperFunctions.js");

const SIX_EVENTS_RESPONSE = {
  success: true,
  data: [
    {
      id: 1,
      title: "Tech Summit 2025",
      description: "Conference",
      category: "Tech Summit",
      venue: "HICC",
      city: "Hyderabad",
      eventDate: "2025-06-01T10:00:00.000Z",
      price: "999",
      totalSeats: 200,
      availableSeats: 150,
      imageUrl: null,
      isStatic: false,
      userId: null,
      createdAt: "2026-09-14T02:39:14.874Z",
      updatedAt: "2026-09-24T03:38:54.739Z",
    },
    {
      id: 2,
      title: "Rock Night Live",
      description: "Rock Night Liv",
      category: "Concert",
      venue: "Palace Grounds",
      city: "Bangalore",
      eventDate: "2025-06-05T18:00:00.000Z",
      price: "1500",
      totalSeats: 500,
      availableSeats: 300,
      imageUrl: null,
      isStatic: false,
      userId: null,
      createdAt: "2026-09-14T02:39:14.864Z",
      updatedAt: "2026-09-22T20:14:44.563Z",
    },
    {
      id: 3,
      title: "IPL Finals",
      description: "IPL Finals",
      category: "Sports",
      venue: "Chinnaswamy",
      city: "Bangalore",
      eventDate: "2025-06-10T19:30:00.000Z",
      price: "2000",
      totalSeats: 800,
      availableSeats: 50,
      imageUrl: null,
      isStatic: false,
      userId: null,
      createdAt: "2026-09-14T02:39:14.852Z",
      updatedAt: "2026-09-24T01:44:44.352Z",
    },
    {
      id: 4,
      title: "UX Design Workshop",
      description: "UX Design Workshop",
      category: "Workshop",
      venue: "WeWork",
      city: "Mumbai",
      eventDate: "2025-06-15T09:00:00.000Z",
      price: "500",
      totalSeats: 50,
      availableSeats: 20,
      imageUrl: null,
      isStatic: false,
      userId: null,
      createdAt: "2026-09-20T10:44:39.459Z",
      updatedAt: "2026-09-20T10:44:39.459Z",
    },
    {
      id: 5,
      title: "Lollapalooza India",
      description: "Lollapalooza India",
      category: "Festival",
      venue: "Mahalaxmi Racecourse",
      city: "Mumbai",
      eventDate: "2025-06-20T12:00:00.000Z",
      price: "3000",
      totalSeats: 5000,
      availableSeats: 2000,
      imageUrl: null,
      isStatic: false,
      userId: 2793,
      createdAt: "2026-09-20T06:42:40.754Z",
      updatedAt: "2026-09-20T10:41:05.414Z",
    },
    {
      id: 6,
      title: "AI & ML Expo",
      description: "AI & ML Expo",
      category: "Conference",
      venue: "Bangalore International Exhibition Centre",
      city: "Bangalore",
      eventDate: "2025-06-25T10:00:00.000Z",
      price: "750",
      totalSeats: 300,
      availableSeats: 180,
      imageUrl: null,
      isStatic: false,
      userId: 2793,
      createdAt: "2026-09-20T06:40:12.320Z",
      updatedAt: "2026-09-20T06:40:12.320Z",
    },
  ],
  pagination: {
    total: 6,
    page: 1,
    limit: 12,
    totalPages: 1,
  },
};

const FOUR_EVENTS_RESPONSE = {
  success: true,
  data: [
    {
      id: 1,
      title: "Tech Summit 2025",
      description: "Conference",
      category: "Tech Summit",
      venue: "HICC",
      city: "Hyderabad",
      eventDate: "2025-06-01T10:00:00.000Z",
      price: "999",
      totalSeats: 200,
      availableSeats: 150,
      imageUrl: null,
      isStatic: false,
      userId: null,
      createdAt: "2026-09-14T02:39:14.874Z",
      updatedAt: "2026-09-24T03:38:54.739Z",
    },
    {
      id: 2,
      title: "Rock Night Live",
      description: "Rock Night Liv",
      category: "Concert",
      venue: "Palace Grounds",
      city: "Bangalore",
      eventDate: "2025-06-05T18:00:00.000Z",
      price: "1500",
      totalSeats: 500,
      availableSeats: 300,
      imageUrl: null,
      isStatic: false,
      userId: null,
      createdAt: "2026-09-14T02:39:14.864Z",
      updatedAt: "2026-09-22T20:14:44.563Z",
    },
    {
      id: 3,
      title: "IPL Finals",
      description: "IPL Finals",
      category: "Sports",
      venue: "Chinnaswamy",
      city: "Bangalore",
      eventDate: "2025-06-10T19:30:00.000Z",
      price: "2000",
      totalSeats: 800,
      availableSeats: 50,
      imageUrl: null,
      isStatic: false,
      userId: null,
      createdAt: "2026-09-14T02:39:14.852Z",
      updatedAt: "2026-09-24T01:44:44.352Z",
    },
    {
      id: 4,
      title: "UX Design Workshop",
      description: "UX Design Workshop",
      category: "Workshop",
      venue: "WeWork",
      city: "Mumbai",
      eventDate: "2025-06-15T09:00:00.000Z",
      price: "500",
      totalSeats: 50,
      availableSeats: 20,
      imageUrl: null,
      isStatic: false,
      userId: null,
      createdAt: "2026-09-20T10:44:39.459Z",
      updatedAt: "2026-09-20T10:44:39.459Z",
    },
  ],
  pagination: {
    total: 6,
    page: 1,
    limit: 12,
    totalPages: 1,
  },
};

test("Event Hub Automation Assignment4", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.route(
    "https://api.eventhub.rahulshettyacademy.com/api/events?page=1&limit=12",
    async (route) => {
      const response = await page.request.fetch(route.request());
      let body = JSON.stringify(SIX_EVENTS_RESPONSE);
      route.fulfill({
        response,
        body,
      });
      // intercepting response - API response->{playwright fakeresponse}->browser->renderdata on front end
    },
  );
  await loginAndGoToEvents(page);
  //   const newPage = await loginAndGoToEvents({ page });
  await page.locator("[data-testid='event-card']").first().waitFor();
  const eventCount = await page.locator("[data-testid='event-card']").count();
  expect(
    await page.locator("[data-testid='event-card']").first(),
  ).toBeVisible();
  expect(eventCount === 6).toBeTruthy();

  const sandText = await page.getByText(/sandbox holds up to/i).textContent();
  console.log(sandText);
  const totalBookings = sandText.split(" ")[5];
  console.log(Number(totalBookings));
  expect(Number(totalBookings) === 9).toBeTruthy();
  // await page.pause();
});

test("Event Hub Automation Assignment5", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.route(
    "https://api.eventhub.rahulshettyacademy.com/api/events?page=1&limit=12",
    async (route) => {
      const response = await page.request.fetch(route.request());
      let body = JSON.stringify(FOUR_EVENTS_RESPONSE);
      route.fulfill({
        response,
        body,
      });
      // intercepting response - API response->{playwright fakeresponse}->browser->renderdata on front end
    },
  );
  await loginAndGoToEvents(page);
  //   const newPage = await loginAndGoToEvents({ page });
  await page.locator("[data-testid='event-card']").first().waitFor();
  const eventCount = await page.locator("[data-testid='event-card']").count();
  expect(
    await page.locator("[data-testid='event-card']").first(),
  ).toBeVisible();
  expect(eventCount === 4).toBeTruthy();

  expect(await page.getByText(/sandbox holds up to/i).isVisible()).toBeFalsy();
  await page.pause();
});
