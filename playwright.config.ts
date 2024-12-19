import { defineConfig, devices } from "@playwright/test";

export const environments = [
  {
    name: "Ploom PL",
    baseURL: "https://www.ploom.pl/pl",
    shopName: "Sklep",
    productName: "16199177",
  },
  {
    name: "Ploom UK",
    baseURL: "https://www.ploom.co.uk/en",
    shopName: "Shop",
    productName: "ploom-x-advanced",
  },
];

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  timeout: 40000,
  use: {
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1920, height: 1080 }
      },
    },
    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
        viewport: { width: 1366, height: 768 }
      },
    }
  ],
});
