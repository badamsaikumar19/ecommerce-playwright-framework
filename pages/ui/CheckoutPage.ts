import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {

  constructor(page: Page) {
    super(page);
  }

  // ── Address Locators ──
  private deliveryAddress  = this.page.locator('#address_delivery');
  private billingAddress   = this.page.locator('#address_invoice');
  private deliveryFullName = this.page.locator(
    '#address_delivery .address_firstname'
  );

  // ── Order Summary Locators ──
  private orderTable       = this.page.locator('#cart_info');
  private orderProductName = this.page.locator(
    '#cart_info .cart_description h4 a'
  );
  private orderTotalPrice  = this.page.locator('.cart_total_price');

  // ── Action Locators ──
  private commentBox       = this.page.locator('textarea[name="message"]');
  private placeOrderBtn    = this.page.locator('a[href="/payment"].check_out');

  // ── Navigation ──
  async navigateToCheckout() {
    await this.navigate('/checkout');
  }

  // ── Actions ──
  async addComment(comment: string) {
    await this.fillInput(this.commentBox, comment);
  }

  async placeOrder() {
    await this.placeOrderBtn.click();
    //await this.clickElement(this.placeOrderBtn);
     await this.page.waitForLoadState('domcontentloaded');
    
  }

  async getDeliveryName(): Promise<string> {
    return await this.deliveryFullName.innerText();
  }

  async getTotalPrice(): Promise<string> {
    return await this.orderTotalPrice.innerText();
  }

  async getOrderedProductName(): Promise<string> {
    return await this.orderProductName.innerText();
  }

  // ── Verifications ──
  async verifyCheckoutPageLoaded() {
    await this.verifyURL('/checkout');
    await this.verifyVisible(this.deliveryAddress);
    await this.verifyVisible(this.billingAddress);
  }

  async verifyDeliveryAddress(name: string) {
    await this.verifyText(this.deliveryFullName, name);
  }

  async verifyProductInOrder(productName: string) {
    await this.verifyText(this.orderProductName, productName);
  }

  async verifyTotalPrice(expectedPrice: string) {
    await this.verifyText(this.orderTotalPrice, expectedPrice);
  }
}