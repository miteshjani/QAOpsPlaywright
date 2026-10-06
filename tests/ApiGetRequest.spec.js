//Author Mitesh
const { test, expect } = require("@playwright/test");
const { OrderPage } = require("../pageobjects/OrderPage");
const dataSet = JSON.parse(
  JSON.stringify(require("../utils/placeOrderTestData.json")),
);

test("GET request returns a post", async ({ page, request }) => {
  const orderPage = new OrderPage(page);

  const response = await request.get(
    "https://jsonplaceholder.typicode.com/posts/1",
  );

  expect(response.status()).toBe(200);

  const post = await response.json();
  expect(post).toMatchObject({
    userId: 1,
    id: 1,
  });
  expect(post.title).toBeTruthy();
});
