//Author Mitesh
const { test, expect } = require("@playwright/test");
const { customtest } = require("../utils/fixture-test-data.js");
const { POManager } = require("../pageobjects/POManager");
const dataSet = JSON.parse(
  JSON.stringify(require("../utils/placeOrderTestData.json")),
);

for (const data of dataSet) {
  test(`Web New Client Login for ${data.productName}`, async ({ browser }) => {
    const countryCode = "Ind";
    const country = " India";
    const context = await browser.newContext();
    const page = await context.newPage();
    const pomanager = new POManager(page);
    const loginPage = pomanager.getLoginPage();
    const dashBoardPage = pomanager.getdashBoardPage();
    const checkOutPage = pomanager.getCheckOutPage();
    const orderPage = pomanager.getOrderPage();
    await loginPage.goTo();
    await loginPage.validLogin(data.userName, data.password);
    await dashBoardPage.searchProductAddCart(data.productName);
    await dashBoardPage.navigateToCart();
    await checkOutPage.checkOutProoduct(data.productName);
    await checkOutPage.applyCoupon();
    await checkOutPage.verifyEmailId(data.userName);
    await checkOutPage.selectCountryAndSelect(countryCode, country);
    const orderId = await checkOutPage.submitAndGetOrderId();
    await orderPage.navigateToOrderPage();
    await orderPage.verifyOrder(orderId);
  });
}

customtest(`New Client Login`, async ({ browser, testDataForOrder }) => {
  const countryCode = "Ind";
  const country = " India";
  const context = await browser.newContext();
  const page = await context.newPage();
  const pomanager = new POManager(page);
  const loginPage = pomanager.getLoginPage();
  const dashBoardPage = pomanager.getdashBoardPage();
  const checkOutPage = pomanager.getCheckOutPage();
  const orderPage = pomanager.getOrderPage();
  await loginPage.goTo();
  await loginPage.validLogin(
    testDataForOrder.userName,
    testDataForOrder.password,
  );
  await dashBoardPage.searchProductAddCart(testDataForOrder.productName);
  await dashBoardPage.navigateToCart();
  await checkOutPage.checkOutProoduct(testDataForOrder.productName);
  await checkOutPage.applyCoupon();
  await checkOutPage.verifyEmailId(testDataForOrder.userName);
  await checkOutPage.selectCountryAndSelect(countryCode, country);
  const orderId = await checkOutPage.submitAndGetOrderId();
  await orderPage.navigateToOrderPage();
  await orderPage.verifyOrder(orderId);
  await context.close();
});
