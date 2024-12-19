import { test, expect } from "@playwright/test";
import { environments } from "../playwright.config";

import ShopPage from "../pages/shopPage";
import ProductPage from "../pages/productPage";
import Utils from "../utils/utils";

environments.forEach(({ name, baseURL, shopName, productName }) => {
  test.describe(`${name} - Functional Tests`, () => {
    test.beforeEach(async ({ page }) => {
      const ageConfirmationSelector = ".ageconfirmation__confirmBtn";
      const acceptCookiesSelector = '[id="onetrust-accept-btn-handler"]';

      await page.goto(baseURL);
      await page.click(acceptCookiesSelector);
      await page.click(ageConfirmationSelector);
    });

    test(`should verify no broken links or images on the product page on ${name}`, async ({
      page,
    }) => {
      const shopPage = new ShopPage(page, shopName);
      const productPage = new ProductPage(page, productName);

      await shopPage.openShop();
      await shopPage.closeShopMenu();
      await productPage.openProductCart();
      await page.waitForLoadState("networkidle");
      const results = await Utils.validateLinksAndImages(page);

      Utils.handleFailedResults(results);
    });
  });
});
