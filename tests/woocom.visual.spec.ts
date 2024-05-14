import { test, expect } from '@playwright/test';

test('full page screenshot', async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await page.locator('.add_to_cart_button').first().click()
  await page.locator('a.added_to_cart').click()
  expect(await page.screenshot({fullPage: true})).toMatchSnapshot('fullPage.png');
});

test('postpay widget screenshot for 1st item', async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await page.locator('.add_to_cart_button').first().click()
  await page.locator('a.added_to_cart').click()
  expect(await page.locator('div.postpay-locale-en.light').screenshot()).toMatchSnapshot('widgetPostpay1.png');
});

test('postpay widget screenshot for 3rd item', async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await page.locator('.add_to_cart_button').nth(2).click()
  await page.locator('a.added_to_cart').click()
  await expect(page.locator('div.postpay-locale-en.light')).toHaveScreenshot('widgetPostpay.png', { mask: [page.locator('.postpay-widget span.postpay-product-price-bold')], maxDiffPixelRatio: 0.12});
});

test.only('checkout widget screenshot for 3rd item', async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await page.locator('.add_to_cart_button').first().click()
  await page.locator('a.added_to_cart').click()
  await page.locator('.checkout-button').click()
  await page.locator('.woocommerce-checkout-payment li.payment_method_postpay').click()
  await expect(page.locator('div.postpay-widget .postpay-payment-summery-item')).toHaveCount(2)
  await expect(page.locator('.payment_method_postpay.payment_box')).toHaveScreenshot('checkoutPaymentMethods.png', { mask: [page.locator('div.postpay-product-price-wrapper').first(), page.locator('div.postpay-product-price-wrapper').last()], maxDiffPixelRatio: 0.03});
});
