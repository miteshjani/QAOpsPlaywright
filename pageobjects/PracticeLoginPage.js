class PracticeLoginPage {
  constructor(page) {
    this.page = page;
    this.username = page.getByLabel("Username:");
    this.password = page.getByLabel("Password:");
    this.termsCheckbox = page.getByLabel(
      "I Agree to the terms and conditions",
    );
    this.signInButton = page.getByRole("button", { name: "Sign In" });
  }

  async goTo() {
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  }

  async login(username, password) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.termsCheckbox.check();
    await this.signInButton.click();
    await this.page.waitForURL("**/angularpractice/shop");
  }
}

module.exports = { PracticeLoginPage };
