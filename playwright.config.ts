import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();


export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : 1,
  reporter: [
    ['html', { outputFolder: 'reports/html', open: 'never' }],
    ['allure-playwright', { outputFolder: 'reports/allure-results' }],
    ['list']
  ],
  use: {
    baseURL: process.env.BASE_URL || 'https://automationexercise.com',
    headless: !!process.env.CI,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    actionTimeout: 30000,
    navigationTimeout: 30000,

  },

  projects: [
    {
      name: 'chromium',
      
      use: {
        channel:process.env.CI ? undefined : 'chrome',  // ← real Chrome locally, chromium in CI ,
        viewport: null,                    // ✅ keep this in project
        launchOptions: {
          args: ['--start-maximized'],     // ✅ move here, under project
        },
      },

    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'api',
    //   testDir: './tests/api',
    //   use: {
    //     baseURL: process.env.API_URL || 'https://automationexercise.com',
    //   },
    // },
  ],
});


