import { Page, Locator, expect } from "@playwright/test";

export default class ProductPage {
  readonly page: Page;

  readonly productTitleLocator: Locator;
  readonly productContainer: Locator;
  readonly addToCartButton: Locator;
  readonly miniCartCount: Locator;

  constructor(page: Page, product: String) {
    this.page = page;

    this.productTitleLocator = page
      .locator(`[data-sku="${product}"] .aem-productTeaserComponent__title`)
      .nth(0);
    this.productContainer = page.locator(`[data-sku="${product}"]`);
    this.addToCartButton = page.getByTestId("pdpAddToProduct");
    this.miniCartCount = page.locator(".mini-cart__header-count");
  }

  async addProductToCart() {
    const productTitle = await this.productTitleLocator.textContent();
    if (!productTitle) {
      throw new Error("Product title is null. Unable to add product to cart.");
    }
    await this.productContainer.click();
    await this.addToCartButton.click();
    return productTitle;
  }

  async openProductCart() {
    await this.productContainer.click();
  }

  async verifyMiniCartCount(expectedCount: string) {
    await expect
      .poll(
        async () => {
          const basketCount = await this.miniCartCount.textContent();
          return basketCount;
        },
        { timeout: 10000 },
      )
      .toContain(expectedCount);
  }
}
