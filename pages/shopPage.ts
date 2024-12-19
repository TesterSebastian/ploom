import { Page, Locator } from "@playwright/test";

export default class ShopPage {
  readonly page: Page;
  readonly shopLink: Locator;
  readonly closeShopMenuButton: Locator;

  constructor(page: Page, shopText: string = "Sklep") {
    this.page = page;

    this.shopLink = page.locator(`text="${shopText}"`).nth(0);
    this.closeShopMenuButton = page
      .locator("li")
      .filter({ hasText: `${shopText}` })
      .getByTestId("CloseShopMenu");
  }

  async openShop() {
    await this.shopLink.click();
  }

  async closeShopMenu() {
    await this.closeShopMenuButton.click();
  }
}
