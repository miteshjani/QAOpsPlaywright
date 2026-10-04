import { LoginPage } from "./LoginPage";
import { DashboardPage } from "./DashboardPage1";
import { CheckoutPage } from "./CheckoutPage";
import { OrderPage } from "./OrderPage";
import { Page } from "@playwright/test";
export class POManager {
  page: Page;
  loginPage: LoginPage;
  dashBoardPage: DashboardPage;
  checkOutPage: CheckoutPage;
  orderPage: OrderPage;

  constructor(page: any) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.dashBoardPage = new DashboardPage(this.page);
    this.checkOutPage = new CheckoutPage(this.page);
    this.orderPage = new OrderPage(this.page);
  }

  getLoginPage() {
    return this.loginPage;
  }

  getdashBoardPage() {
    return this.dashBoardPage;
  }

  getCheckOutPage() {
    return this.checkOutPage;
  }

  getOrderPage() {
    return this.orderPage;
  }
}
