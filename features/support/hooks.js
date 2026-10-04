const {
  After,
  Before,
  AfterStep,
  BeforeStep,
  Status,
} = require("@cucumber/cucumber");
const playwright = require("@playwright/test");
const { POManager } = require("../../pageobjects/POManager");

// Synchronous
Before(async function () {
  this.browser = await playwright.chromium.launch({ headless: false });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
  this.pomanager = new POManager(this.page);
});

After(async function () {
  if (this.page) {
    await this.page.close();
  }
  if (this.context) {
    await this.context.close();
  }
  if (this.browser) await this.browser.close(); // 🔑 ensures auto‑exit
  console.log("I am the last to execute");
});

BeforeStep(function () {
  // This hook will be executed before all steps in a scenario with tag @foo
});

AfterStep(async function ({ result }) {
  // This hook will be executed after all steps, and take a screenshot on step failure
  if (result.status === Status.FAILED) {
    await this.page.screenshot({ path: "screenshot1.png" });
  }
});
