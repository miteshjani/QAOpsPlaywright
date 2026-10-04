// @ts-check
import { defineConfig, devices } from "@playwright/test";
import { workers } from "node:cluster";
import { permission } from "node:process";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = {
  testDir: "./tests",
  retries: 1,
  workers: 3,
  video: "retain-on-failure",
  timeout: 30 * 1000,
  expect: {
    timeout: 5000,
  },
  reporter: "html",
  projects: [
    {
      name: "safari",

      use: {
        /* Base URL to use in actions like `await page.goto('')`. */
        // baseURL: 'http://localhost:3000'
        browserName: "webkit",
        headless: false,
        actionTimeout: 10 * 1000,
        navigationTimeout: 30 * 1000,
        screenshot: "off",
        trace: "on",
        // ...devices["iPhone 11"],
      },
    },
    {
      name: "chrome",
      use: {
        /* Base URL to use in actions like `await page.goto('')`. */
        // baseURL: 'http://localhost:3000'
        browserName: "chromium",
        headless: false,
        actionTimeout: 10 * 1000,
        navigationTimeout: 30 * 1000,
        screenshot: "on",
        // ignoreHttpsErrors: true,
        // permissions: ["geolocation"],
        trace: "on",
        // viewport: { width: 720, height: 720 },
      },
    },
  ],
  // use: {
  //   /* Base URL to use in actions like `await page.goto('')`. */
  //   // baseURL: 'http://localhost:3000'
  //   browserName: "webkit",
  //   headless: false,
  //   actionTimeout: 10 * 1000,
  //   navigationTimeout: 30 * 1000,
  //   screenshot: "on",
  //   trace: "on",
  // },
};
module.exports = config;
