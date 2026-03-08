import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductPage extends BasePage {

  constructor(page: Page) {
    super(page);
  }
  // ── Search Locators ──
  private searchInput = this.page.locator('#search_product');
  private searchButton = this.page.locator('#submit_search');

  // ── Product Locators ──
  private allProducts = this.page.locator('.features_items');
  private productCards = this.page.locator('.productinfo');
  private productNames = this.page.locator('.productinfo p');
  private productPrices = this.page.locator('.productinfo h2');
  private addToCartBtns = this.page.locator('a.add-to-cart');
  private viewProductLinks = this.page.locator('a[href*="/product_details/"]');

  // ── Modal Locators ──
  private cartModal = this.page.locator('#cartModal');
  private continueShoppingBtn = this.page.locator('button:has-text("Continue Shopping")');
  private viewCartBtn = this.page.locator('a:has-text("View Cart")');



  // ── Navigation ──
  async navigateToProducts() {
    await this.navigate('/products');
  }

  // ── Search Actions ──
  async searchProduct(productName: string) {
    await this.fillInput(this.searchInput, productName);
    await this.clickElement(this.searchButton);
    await this.page.waitForLoadState('domcontentloaded')
  }


  // ── Product Actions ──
  async addProductToCartByName(productName: string) {
    // Find the product card that contains the name
    const productCard = this.page.locator(
      `.productinfo:has(p:has-text("${productName}"))`
    );

    // Hover over product to reveal Add to Cart button
    await productCard.hover();

    // Click Add to Cart inside that specific card
    const addToCartBtn = productCard.locator('a.add-to-cart');
    await this.clickElement(addToCartBtn);

    // Wait for modal to appear
    await this.cartModal.waitFor({ state: 'visible' });

    // ✅ Use existing locator — no new code needed
  await this.continueShoppingBtn.click({ force: true });
  await this.cartModal.waitFor({ state: 'hidden' });

  }


  async continueShopping() {
    await this.clickElement(this.continueShoppingBtn);
    await this.cartModal.waitFor({ state: 'hidden' });
  }

  async viewCartFromModal() {
    await this.clickElement(this.viewCartBtn);
    await this.waitForURL('/view_cart');
  }


  async viewProductByName(productName: string) {
    // Find the product card that contains the product name
    // then find the View Product link inside that same card
    const productCard = this.page
      .locator('.col-sm-4')                        // each product card
      .filter({ hasText: productName })            // that contains our product name
      .first();
    await productCard.hover();   // get its View Product link
    const viewLink = productCard.locator('a:has-text("View Product")')
    await viewLink.waitFor({ state: 'visible' });
    await viewLink.click();
    await this.page.waitForLoadState('domcontentloaded')
  }


  // ── Verifications ──
  async verifyProductsPageLoaded() {
    await this.verifyURL('/products');
    await this.verifyVisible(this.allProducts);
  }

  async verifySearchResults(productName: string) {
    const result = this.page.locator(
      `.productinfo p:has-text("${productName}")`
    );
    await this.verifyVisible(result);
  }

  async verifyProductExists(productName: string) {
    const product = this.page.locator(
      `.productinfo:has(p:has-text("${productName}"))`
    );
    await this.verifyVisible(product);
  }

  async getProductCount(): Promise<number> {
    return await this.productCards.count();
  }

}