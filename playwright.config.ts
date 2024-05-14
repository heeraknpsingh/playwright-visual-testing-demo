import { defineConfig, devices } from '@playwright/test';
const url = ''
export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    trace: 'on-first-retry',
  },
  expect: {
    toHaveScreenshot: {
      animations: 'disabled',

    },
    toMatchSnapshot: {
    }
  },
  projects: [
    {
      name: 'woocommerece-chrome',
      use: {
        ...devices['Desktop Chrome'], baseURL: url,
      }
    },
    {
      name: 'woocommerece-mob-chrome',
      use: {
        browserName: "webkit",
        ...devices['iPhone 14 Pro Max'], baseURL: url,
      }
    }
    // {
    //   name: "demo-chrome",
    //   // timeout: 20000,
    //   use: {
    //     // actionTimeout: 11000,
    //     ...devices['Desktop Chrome'], channel: 'chrome', baseURL: '',
    //     viewport: {
    //       width: 390,
    //       height: 844,
    //     }
    //   }
    // },
    // {
    //   name: "desktop-chrome",
    //   timeout: 10000,
    //   use: {
    //     actionTimeout: 11000,
    //     ...devices['Desktop Chrome'], channel: 'chrome', baseURL: ''
    //   }
    // },
    // {
    //   name: "mobile-chrome-pixel",
    //   timeout: 10000,
    //   use: {
    //     actionTimeout: 11000,
    //     ...devices['Pixel 5'], channel: 'chrome', baseURL: '',
    //   } 
    // },
    // {
    //   name: "mobile-chrome-viewport",
    //   timeout: 10000,
    //   use: {
    //    actionTimeout: 11000,
    //    browserName: "webkit", baseURL: '',
    //    viewport: {
    //     width: 2560,
    //     height: 1620,
    //     }
    //   }
    // },
  ],
});
