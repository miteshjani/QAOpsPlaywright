class PracticeShopPage {
  constructor(page) {
    this.iphoneX = page.getByRole("heading", { name: /^iphone X$/i });
  }
}

module.exports = { PracticeShopPage };
