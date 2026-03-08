import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class OrderConfirmationPage extends BasePage {

  constructor(page: Page) {
    super(page);
  }

  // ── Confirmation Page Locators ──
  private orderPlacedTitle   = this.page.locator(
    'b:has-text("Order Placed!")'
  );
  private congratsMessage    = this.page.locator(
    'p:has-text("Congratulations! Your order has been confirmed!")'
  );
  private downloadInvoiceBtn = this.page.locator(
    'a:has-text("Download Invoice")'
  );
  private continueBtn        = this.page.locator(
    'a:has-text("Continue")'
  );

  // ── Actions ──
  async downloadInvoice() {
    // Handle file download
    const [ download ] = await Promise.all([
      this.page.waitForEvent('download'),
      this.clickElement(this.downloadInvoiceBtn)
    ]);
    return download;
  }

  async clickContinue() {
    await this.clickElement(this.continueBtn);
    await this.waitForURL('/');
  }

  // ── Verifications ──
  async verifyOrderPlaced() {
    await this.verifyURL('/payment_done');
    await this.verifyVisible(this.orderPlacedTitle);
    await this.verifyVisible(this.congratsMessage);
  }

  async verifyOrderConfirmationMessage() {
    await this.verifyText(
      this.congratsMessage,
      'Congratulations! Your order has been confirmed!'
    );
  }
}