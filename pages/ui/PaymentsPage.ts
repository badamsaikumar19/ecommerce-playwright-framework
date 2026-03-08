import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class PaymentsPage extends BasePage {

  constructor(page: Page) {
    super(page);
  }

  // ── Payment Form Locators ──
  private nameOnCardInput  = this.page.locator('[data-qa="name-on-card"]');
  private cardNumberInput  = this.page.locator('[data-qa="card-number"]');
  private cvcInput         = this.page.locator('[data-qa="cvc"]');
  private expiryMonthInput = this.page.locator('[data-qa="expiry-month"]');
  private expiryYearInput  = this.page.locator('[data-qa="expiry-year"]');
  private payButton        = this.page.locator('[data-qa="pay-button"]');

  // ── Navigation ──
  async navigateToPayment() {
    await this.navigate('/payment');
  }

  // ── Actions ──
  async enterPaymentDetails(
    nameOnCard: string,
    cardNumber: string,
    cvc: string,
    expiryMonth: string,
    expiryYear: string
  ) {
    await this.fillInput(this.nameOnCardInput,  nameOnCard);
    await this.fillInput(this.cardNumberInput,  cardNumber);
    await this.fillInput(this.cvcInput,         cvc);
    await this.fillInput(this.expiryMonthInput, expiryMonth);
    await this.fillInput(this.expiryYearInput,  expiryYear);
  }

  async confirmPayment() {
    await this.clickElement(this.payButton);
    await this.waitForURL('/payment_done');
  }

  // ── Verifications ──
  async verifyPaymentPageLoaded() {
    await this.verifyURL('/payment');
    await this.verifyVisible(this.nameOnCardInput);
    await this.verifyVisible(this.payButton);
  }
}