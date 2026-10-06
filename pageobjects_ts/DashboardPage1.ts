import { Locator, Page } from "@playwright/test";
export class DashboardPage {
  page: Page;
  products: Locator;
  cart: Locator;
  constructor(page: Page) {
    this.page = page;
    this.products = page.locator(".card-body");
    this.cart = page.locator("[routerlink*='cart']");
  }

  async searchProductAddCart(productName: string) {
    const product = this.products.filter({
      has: this.page.getByText(productName, { exact: true }),
    });
    await product.getByRole("button", { name: "Add To Cart" }).click();
  }

  async navigateToCart() {
    await this.cart.click();
  }
}
