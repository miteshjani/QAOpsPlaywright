import { expect, Locator, Page } from "@playwright/test";
export class DashboardPage {
  page: Page;
  products: Locator;
  productsText: Locator;
  cart: Locator;
  constructor(page: Page) {
    this.page = page;
    this.products = page.locator(".card-body");
    this.productsText = page.locator(".card-body b");
    this.cart = page.locator("[routerlink*='cart']");
  }

  async searchProductAddCart(productName: string) {
    await this.productsText.first().waitFor();
    const titles = await this.productsText.allTextContents();
    console.log(titles);
    const firstTitle = await this.productsText.first().textContent();
    console.log(firstTitle);
    const count = await this.products.count();
    for (let i = 0; i < count; ++i) {
      if (
        (await this.products.nth(i).locator("b").textContent()) === productName
      ) {
        // add to cart
        await this.products.nth(i).locator("text= Add To Cart").click();
        break;
      }
    }
  }

  async navigateToCart() {
    await this.cart.click();
  }
}
