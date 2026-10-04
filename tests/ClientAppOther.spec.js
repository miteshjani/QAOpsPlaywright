const { test, expect } = require("@playwright/test");

test("New Client Login", async ({ browser }) => {
  const email = "miteshjani90@ymail.com";
  const context = await browser.newContext();
  const page = await context.newPage();
  const userName = page.locator("#userEmail");
  const password = page.locator("#userPassword");
  const loginBtn = page.locator("[value='Login']");
  const cardTitles = page.locator(".card-body b");
  const productName = "ZARA COAT 3";
  const products = page.locator(".card-body");
  await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
  await userName.fill(email);
  await password.fill("Test@123");
  await loginBtn.click();
  //   await page.waitForLoadState("networkidle");
  await cardTitles.first().waitFor();
  const titles = await cardTitles.allTextContents();
  console.log(titles);
  const firstTitle = await cardTitles.first().textContent();
  console.log(firstTitle);

  const count = await products.count();
  for (let i = 0; i < count; ++i) {
    if ((await products.nth(i).locator("b").textContent()) === productName) {
      // add to cart
      await products.nth(i).locator("text= Add To Cart").click();
      break;
    }
  }
  // await page.pause();
  await page.locator("[routerlink*='cart']").click();
  await page.locator("div li").first().waitFor();
  const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
  expect(bool).toBeTruthy();
  await page.locator("text=Checkout").click();
  await page.locator(".input[class$='input txt']").first().fill("123");
  await page.locator(".input[class$='input txt']").last().fill("Mitesh P Jani");
  await page.locator("[name='coupon']").fill("rahulshettyacademy");
  await page.locator("button:has-text('Apply Coupon')").click();
  await page.locator(".field .ng-star-inserted").waitFor();
  await expect(page.locator(".field .ng-star-inserted")).toHaveText(
    "* Coupon Applied",
  );
  // await page.locator("[placeholder*='Country']").pressSequentially("ind");
  await page.locator("[placeholder*='Country']").waitFor();
  await page
    .locator("[placeholder*='Country']")
    .pressSequentially("ind", { delay: 150 });
  const dropdown = await page.locator(".ta-results");
  await dropdown.waitFor();
  const optionscount = await dropdown.locator("button").count();
  console.log(optionscount);
  for (let i = 0; i < optionscount; ++i) {
    const text = await dropdown.locator("button").nth(i).textContent();
    console.log(text);
    if (text === " India") {
      await dropdown.locator("button").nth(i).click();
      break;
    }
  }
  // await page.pause();
  expect(await page.locator(".user__name [type='text']").first()).toHaveText(
    email,
  );
  await page.locator(".action__submit").click();
  await expect(page.locator(".hero-primary")).toHaveText(
    " Thankyou for the order. ",
  );
  const orderId = await page
    .locator(".em-spacer-1 .ng-star-inserted")
    .textContent();
  console.log(orderId);
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
    if (orderId.includes(productIDs[i])) {
      await ordertab.locator("button[class='btn btn-primary']").nth(i).click();
      // await page.pause();
      break;
    }
  }

  const orderIdDetails = await page.locator(".col-text").textContent();
  expect(orderId.includes(orderIdDetails)).toBeTruthy();
  // const orderIDs = await page
  //   .locator(".ng-star-inserted th[scope='row']")
  //   .nth(1)
  //   .textContent();
  // console.log(orderIDs);
});
test("Web Client App login", async ({ page }) => {
  //js file- Login js, DashboardPage
  const email = "miteshjani90@ymail.com";
  const productName = "ZARA COAT 3";
  const products = page.locator(".card-body");
  await page.goto("https://rahulshettyacademy.com/client");
  await page.getByPlaceholder("email@example.com").fill(email);
  await page.getByPlaceholder("enter your passsword").fill("Test@123");
  await page.getByRole("button", { name: "Login" }).click();
  await page.waitForLoadState("networkidle");
  await page.locator(".card-body b").first().waitFor();
  await page
    .locator(".card-body")
    .filter({ hasText: "ZARA COAT 3" })
    .getByRole("button", { name: "Add to Cart" })
    .click();

  await page
    .getByRole("listitem")
    .getByRole("button", { name: "Cart" })
    .click();
  //await page.pause();

  await page.locator("div li").first().waitFor();
  await expect(page.getByText("ZARA COAT 3")).toBeVisible();
  await page.getByRole("button", { name: "Checkout" }).click();

  await page
    .getByPlaceholder("Select Country")
    .pressSequentially("ind", { delay: 150 });

  await page.getByRole("button", { name: "India" }).nth(1).click();

  await page.getByText("PLACE ORDER").click();
  await expect(page.getByText("Thankyou for the order.")).toBeVisible();
  const orderId = await page
    .locator(".em-spacer-1 .ng-star-inserted")
    .textContent();
  console.log(orderId);
  const neworderId = orderId.replaceAll("|", "").trim();
  await page
    .getByRole("listitem")
    .getByRole("button", { name: "ORDERS" })
    .click();

  await page.locator("tbody").waitFor();
  await page
    .locator("tbody tr")
    .filter({ hasText: neworderId })
    .getByRole("button", { name: "View" })
    .click();

  const orderIdDetails = await page.getByText(neworderId).textContent();
  expect(neworderId === orderIdDetails).toBeTruthy();
});
