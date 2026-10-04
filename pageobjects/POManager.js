const { LoginPage } = require("./LoginPage");
const { DashboardPage } = require("./DashboardPage1");
const { CheckoutPage } = require("./CheckoutPage");
const { OrderPage } = require("./OrderPage");
class POManager {
  constructor(page) {
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

module.exports = { POManager };
