import { Page,expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {

  constructor(page: Page) {
    super(page);
  }

  // ── Cart Table Locators ──
  private cartTable        = this.page.locator('#cart_info_table');
  private cartRows         = this.page.locator('#cart_info_table tbody tr');
  private emptyCartMessage = this.page.locator('b:has-text("Cart is empty!")');

  // ── Cart Item Locators ──
  private cartProductNames  = this.page.locator('.cart_description h4 a');
  private cartProductPrices = this.page.locator('.cart_price p');
  private cartQuantities    = this.page.locator('.cart_quantity button');
  private cartTotals        = this.page.locator('.cart_total_price');
  private deleteButtons     = this.page.locator('.cart_quantity_delete');

  // ── Action Locators ──
  private checkoutButton   = this.page.locator('.btn.check_out');

  // ── Checkout Modal Locators ──
  private checkoutModal       = this.page.locator('.modal-content');
  private modalTitle          = this.page.locator('.modal-title');
  private registerLoginBtn    = this.page.locator('.modal-body a[href="/login"]');
  private continueOnCartBtn   = this.page.locator('.close-checkout-modal');

  // ── Navigation ──
  async navigateToCart() {
    await this.navigate('/view_cart');
  }

  // ── Actions ──
  async proceedToCheckout() {
    await this.clickElement(this.checkoutButton);
     await this.page.waitForLoadState('domcontentloaded'); 
  }

  async removeProductByName(productName: string) {
    // Find delete button for specific product
    const deleteBtn = this.page.locator(
      `tr:has(.cart_description h4 a:has-text("${productName}"))
       .cart_quantity_delete`
    );
    await this.clickElement(deleteBtn);
     await this.page.waitForLoadState('domcontentloaded'); 
  }

  async getProductQuantity(productName: string): Promise<string> {
    // Find quantity for specific product
    const quantity = this.page.locator(
      `tr:has(.cart_description h4 a:has-text("${productName}"))
       .cart_quantity button`
    );
    return await quantity.innerText();
  }

  async getProductPrice(productName: string): Promise<string> {
    // Find price for specific product
    const price = this.page.locator(
      `tr:has(.cart_description h4 a:has-text("${productName}"))
       .cart_price p`
    );
    return await price.innerText();
  }

  // ── Verifications ──
  async verifyCartPageLoaded() {
    await this.verifyURL('/view_cart');
  }

  async verifyProductInCart(productName: string) {
    const product = this.page.locator(
      `.cart_description h4 a:has-text("${productName}")`
    );
    await this.verifyVisible(product);
  }

  async verifyCartIsEmpty() {
    await this.verifyVisible(this.emptyCartMessage);
  }

  async verifyProductNotInCart(productName: string) {
    const product = this.page.locator(
      `.cart_description h4 a:has-text("${productName}")`
    );
    await expect(product).not.toBeVisible();
  }

  async getCartItemCount(): Promise<number> {
    return await this.cartRows.count();
  }

  // ── Modal Actions ──
  async isCheckoutModalVisible(): Promise<boolean> {
    return await this.isVisible(this.checkoutModal);
  }

  async loginFromCheckoutModal() {
    await this.clickElement(this.registerLoginBtn);
    await this.waitForURL('/login');
  }

  async continueOnCart() {
    await this.clickElement(this.continueOnCartBtn);
    await this.checkoutModal.waitFor({ state: 'hidden' });
  }

  async clearCart() {
  // Keep deleting until no items remain
  while (await this.cartRows.count() > 0) {
    await this.deleteButtons.first().click();
    await this.page.waitForLoadState('domcontentloaded');
  }
}
}
