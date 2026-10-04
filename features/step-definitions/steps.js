const { Given, When, Then } = require("@cucumber/cucumber");
const { POManager } = require("../../pageobjects/POManager");
const { test, expect } = require("@playwright/test");
const playwright = require("@playwright/test");
let browser;
Given(
  "a login to Ecommerce application with {string} and {string}",
  { timeout: 100 * 1000 },
  async function (username, password) {
    // Write code here that turns the phrase above into concrete actions

    const loginPage = this.pomanager.getLoginPage();
    await loginPage.goTo();
    this.username = username;
    await loginPage.validLogin(username, password);
  },
);
When("Add {string} to Cart", async function (productName) {
  // Write code here that turns the phrase above into concrete actions
  const dashBoardPage = this.pomanager.getdashBoardPage();
  await dashBoardPage.searchProductAddCart(productName);
  await dashBoardPage.navigateToCart();
});
Then("Verify {string} is displayed in the Cart", async function (productName) {
  // Write code here that turns the phrase above into concrete actions
  const checkOutPage = this.pomanager.getCheckOutPage();
  await checkOutPage.checkOutProoduct(productName);
});
When(
  "Enter valid details and Place the order",
  { timeout: 100 * 1000 },
  async function () {
    // Write code here that turns the phrase above into concrete actions
    const countryCode = "Ind";
    const country = " India";
    const checkOutPage = this.pomanager.getCheckOutPage();
    await checkOutPage.applyCoupon();
    await checkOutPage.verifyEmailId(this.username);
    await checkOutPage.selectCountryAndSelect(countryCode, country);
    this.orderId = await checkOutPage.submitAndGetOrderId();
  },
);
Then("Verify order in present in OrderHistory", async function () {
  // Write code here that turns the phrase above into concrete actions
  const orderPage = this.pomanager.getOrderPage();
  await orderPage.navigateToOrderPage();
  await orderPage.verifyOrder(this.orderId);
});

Given(
  "a login to Ecommerce2 application with {string} and {string}",
  async function (username, password) {
    // Write code here that turns the phrase above into concrete actions
    const userName = this.page.locator("#username");
    const signIn = this.page.locator("#signInBtn");
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await this.page.title());
    await userName.fill(username);
    await this.page.locator("[type='password']").fill(password);
    await signIn.click();
  },
);

Then("Verify Error message is displayed", async function () {
  // Write code here that turns the phrase above into concrete actions
  console.log(await this.page.locator("[style*='block']").textContent());
  await expect(this.page.locator("[style*='block']")).toContainText(
    "Incorrect",
  );
});
