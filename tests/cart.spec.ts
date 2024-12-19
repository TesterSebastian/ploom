import { test, expect } from "@playwright/test";
import { environments } from "../playwright.config";

import ShopPage from "../pages/shopPage";
import ProductPage from "../pages/productPage";
import CartPage from "../pages/cartPage";

environments.forEach(({ name, baseURL, shopName, productName }) => {
  test.describe(`${name} - Functional Tests`, () => {
    test.beforeEach(async ({ page }) => {
      const ageConfirmationSelector = ".ageconfirmation__confirmBtn";
      const acceptCookiesSelector = '[id="onetrust-accept-btn-handler"]';

      await page.goto(baseURL);
      await page.click(acceptCookiesSelector);
      await page.click(ageConfirmationSelector);
    });

    test(`should add a product to the cart on ${name}`, async ({ page }) => {
      const shopPage = new ShopPage(page, shopName);
      const productPage = new ProductPage(page, productName);
      const cartPage = new CartPage(page);

      await shopPage.openShop();
      await shopPage.closeShopMenu();
      const productTitle = await productPage.addProductToCart();
      await productPage.verifyMiniCartCount("1");
      await cartPage.goToCart();
      const productTitleInBasket = await cartPage.verifyProductInCart();

      expect(productTitleInBasket).toContain(productTitle);
    });

    test(`should remove a product from the cart on ${name}`, async ({
      page,
    }) => {
      const shopPage = new ShopPage(page, shopName);
      const productPage = new ProductPage(page, productName);
      const cartPage = new CartPage(page);

      await shopPage.openShop();
      await shopPage.closeShopMenu();
      await productPage.addProductToCart();
      await cartPage.goToCart();
      await cartPage.removeProduct();
      await cartPage.emptyCartLocator.waitFor({ state: "visible" });

      await expect(cartPage.emptyCartLocator).toBeVisible();
    });

  });
});
