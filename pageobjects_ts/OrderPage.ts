import { expect, Locator, Page } from "@playwright/test";
export class OrderPage {
  page: Page;
  orderLink: Locator;
  orderTab: Locator;
  orderDetails: Locator;
  constructor(page: Page) {
    this.page = page;
    this.orderLink = page.locator("[routerlink*='/dashboard/myorders']");
    this.orderTab = page.locator(".table tr[class='ng-star-inserted']");
    this.orderDetails = page.locator(".col-text");
  }

  async navigateToOrderPage() {
    await this.orderLink.first().waitFor();
    await this.orderLink.first().click();
  }

  async getOrderId() {
    return await this.orderDetails.textContent();
  }
  async verifyOrder(orderId: string) {
    // console.log(ordertab);

    await this.orderTab.first().waitFor();
    const orderCount = await this.orderTab.count();
    console.log(orderCount);
    const orderIDs = await this.orderTab
      .locator("th[scope='row']")
      .allTextContents();
    console.log(orderIDs);
    for (let i = 0; i <= orderCount; i++) {
      if (orderId.includes(orderIDs[i])) {
        await this.orderTab
          .locator("button[class='btn btn-primary']")
          .nth(i)
          .click();
        // await page.pause();
        break;
      }
    }

    let orderIdDetails: any = await this.getOrderId();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
  }
}


