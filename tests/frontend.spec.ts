import { test, expect } from '@playwright/test';
const url = ""

test('verify page title', async ({ page }) => {
  // open website
  await page.goto(url);
  
  // handle dialog accept
  page.on('dialog', async dialog => {
    console.log(dialog.message());
    await dialog.accept()
  });

  //verify page title
  await expect(page).toHaveTitle(/Joy Arm Chair, Light Brown/);

  //verify postpay widget text
  await expect(page.locator(".postpay-product-widget-text-wrapper .postpay-product-widget-text")).toHaveText('As low as AED 585.57 /month');
});

test('verify Postpay model window', async ({ page }) => {
  // open website
  await page.goto(url);
  
  // handle dialog reject
  page.on('dialog', async dialog => {
    // 3. Do stuff with the dialog here (reject/accept etc.)
    console.log(dialog.message());
    await dialog.dismiss()
  });

  // click on the info icon link next to postpay
  await page.locator(".postpay-product-widget-text-wrapper a[href='https://postpay.io']").click();
  
  // verify heading text on postpay dialog 
  await expect(page.locator('.postpay-payment-options-title-main')).toHaveText('Pay in instalments');

  // verify both instalments option 
  await expect(page.locator('.postpay-payment-options-item .postpay-payment-options-item_info')).toHaveCount(2);
  await expect(page.locator('.postpay-payment-options-item .postpay-payment-options-item_info')).toHaveText(['3 months', '6 months']);
  await expect(page.locator('.postpay-payment-options-item .postpay-payment-options-item-amount')).toHaveText(['AED 1,102.00 /month', 'AED 585.57 /month']);
  await expect(page.locator('.postpay-payment-options-item .postpay-payment-options-item-fees')).toHaveText(['Interest-free', 'Total Fees: AED 207.12']);

  // verify footer text on postpay dialog 
  await expect(page.locator('.postpay-payment-options-scroll .postpay-learn-more-modal-footer')).toContainText('You must be 18 years or older and a resident of UAE. Valid debit or credit card and acceptance of terms required to apply.');
});