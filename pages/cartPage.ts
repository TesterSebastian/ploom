import { Page, Locator, expect } from "@playwright/test";

export default class CartPage {
  readonly page: Page;

  readonly checkoutButton: Locator;
  readonly cartPageTitle: Locator;
  readonly productNameInCart: Locator;
  readonly removeButton: Locator;
  readonly removeButtonSave: Locator;
  readonly emptyCartLocator: Locator;

  constructor(page: Page) {
    this.page = page;

    this.checkoutButton = page.locator(
      '[data-testid="miniCartCheckoutButton"]',
    );
    this.productNameInCart = page
      .locator(".ProductMiniature-module-name-iyA8t")
      .nth(1);
    this.removeButton = page.locator(
      '[data-testid="regular-cart-list"] [data-testid="cartRemoveButton"]',
    );
    this.removeButtonSave = page.locator(
      '[data-testid="remove-item-submit-button"]',
    );
    this.emptyCartLocator = page
      .locator('[data-testid="emptyCartContainer"]')
      .nth(1);
  }

  async goToCart() {
    await this.checkoutButton.click();
  }

  async verifyProductInCart() {
    const productName = await this.productNameInCart.textContent();
    return productName;
  }

  async removeProduct() {
    await this.removeButton.click();
    await this.removeButtonSave.click();
  }
}
