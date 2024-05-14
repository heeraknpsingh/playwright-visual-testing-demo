import { test, expect } from '@playwright/test';

test('page screenshot', async ({page }) => {
  // open website
  await page.goto("/joy-arm-chair-light-brown", { waitUntil: "load" });
  // handle dialog accept
  page.on('dialog', async dialog => {
    console.log(dialog.message());
    await dialog.accept()
  });
  //verify postpay widget texts
  await page.evaluate(() => document.fonts.ready);
  expect(await page.screenshot({fullPage: true, animations: 'disabled'})).toMatchSnapshot('productInstalmentPage.png',{threshold: 0.2, maxDiffPixels: 80, maxDiffPixelRatio: 0.2});
});

test('widget screenshot', async ({ page }) => {
    // open website
    await page.goto("/joy-arm-chair-light-brown", { waitUntil: "load" });
    // handle dialog accept
    page.on('dialog', async dialog => {
      console.log(dialog.message());
      await dialog.accept()
    });
    //verify postpay widget
    await page.evaluate(() => document.fonts.ready);
    expect(await page.locator('.postpay-widget').screenshot()).toMatchSnapshot('widgetPostpay.png');
  });

  test('postpay dialog screenshot', async ({ page }) => {
    // open website
    await page.goto("/joy-arm-chair-light-brown", { waitUntil: "load" });
    // handle dialog accept
    page.on('dialog', async dialog => {
      console.log(dialog.message());
      await dialog.accept()
    });
    //verify postpay dialog
    await page.evaluate(() => document.fonts.ready);
    await page.locator(".postpay-product-widget-text-wrapper a[href='https://postpay.io']").click();
    expect(await page.locator('.show .postpay-learn-more-modal-content-wrapper-bank').screenshot()).toMatchSnapshot('dialogPostpay.png');
  });

  test('widget screenshot - mask data', async ({ page }) => {
    await page.goto("/christy-benchleather", { waitUntil: "load" });
    page.on('dialog', async dialog => {
      console.log(dialog.message());
      await dialog.accept()
    });
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator(".postpay-widget")).toHaveScreenshot("widgetPostpayMask.png", {mask: [page.locator(".postpay-widget .postpay-product-price-bold")], maxDiffPixelRatio: 0.04})
  });

  test('dialog screenshot - mask data', async ({ page }, testInfo) => {
    await page.goto("/christy-benchleather", { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    page.on('dialog', async dialog => {
      console.log(dialog.message());
      await dialog.accept()
    });
    await page.locator(".postpay-product-widget-text-wrapper a[href='https://postpay.io']").click();
    await expect(page.locator(".show .postpay-payment-options-title-description")).toHaveScreenshot("dialogPostpayMask.png", {mask: [page.locator(".show .postpay-payment-options-title-description span.postpay-product-price-bold")], maxDiffPixelRatio: 0.03})
    await testInfo.attach("dialog-mask", {
        body: await page.locator('.show .postpay-payment-options-title-description').screenshot(),
        contentType: 'image/png'
    })
  });