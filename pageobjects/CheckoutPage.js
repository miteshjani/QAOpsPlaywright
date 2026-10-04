const { expect } = require("@playwright/test");
class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.checkOutTilte = page.locator("div li");
    this.checkOutButton = page.locator("text=Checkout");
    this.checkOutDetails = page.locator(".input[class$='input txt']");
    this.coupon = page.locator("[name='coupon']");
    this.couponButton = page.locator("button:has-text('Apply Coupon')");
    this.couponText = page.locator(".field .ng-star-inserted");
    this.countryDropdown = page.locator("[placeholder*='Country']");
    this.countryDropdownResults = page.locator(".ta-results");
    this.checkOutUserName = page.locator(".user__name [type='text']");
    this.checkOutSubmit = page.locator(".action__submit");
    this.orderConfirmationText = page.locator(".hero-primary");
    this.orderNumber = page.locator(".em-spacer-1 .ng-star-inserted");
  }

  async checkOutProoduct(productName) {
    const checkOutProduct = this.page.locator(
      "h3:has-text('" + productName + "')",
    );
    await this.checkOutTilte.first().waitFor();
    const bool = await checkOutProduct.isVisible();
    expect(bool).toBeTruthy();
    await this.checkOutButton.click();
  }

  async applyCoupon() {
    await this.checkOutDetails.first().fill("123");
    await this.checkOutDetails.last().fill("Mitesh P Jani");
    await this.coupon.fill("rahulshettyacademy");
    await this.couponButton.click();
    await this.couponText.waitFor();
    await expect(this.couponText).toHaveText("* Coupon Applied");
  }

  async submitAndGetOrderId() {
    // await page.pause();
    await this.checkOutSubmit.click();
    await expect(this.orderConfirmationText).toHaveText(
      " Thankyou for the order. ",
    );
    const orderId = await this.orderNumber.textContent();
    console.log(orderId);
    return orderId;
  }

  async selectCountryAndSelect(countryCode, countryName) {
    await this.countryDropdown.waitFor();
    await this.countryDropdown.pressSequentially(countryCode, { delay: 150 });
    await this.countryDropdownResults.waitFor();
    const optionscount = await this.countryDropdownResults
      .locator("button")
      .count();
    console.log(optionscount);
    for (let i = 0; i < optionscount; ++i) {
      const text = await this.countryDropdownResults
        .locator("button")
        .nth(i)
        .textContent();
      console.log(text);
      if (text === countryName) {
        await this.countryDropdownResults.locator("button").nth(i).click();
        break;
      }
    }
  }

  async verifyEmailId(username) {
    expect(await this.checkOutUserName.first()).toHaveText(username);
  }
}
module.exports = { CheckoutPage };
