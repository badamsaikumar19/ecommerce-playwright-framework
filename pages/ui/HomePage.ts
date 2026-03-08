import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {

  constructor(page: Page) {
    super(page);
  }
  // ── Navigation Locators ──
  private homeNavLink     = this.page.locator('a[href="/"]').first();
  private productsNavLink = this.page.locator('a[href="/products"]');
  private cartNavLink = this.page.getByRole('link', { name: ' Cart' }).first();
  private loginNavLink    = this.page.locator('a[href="/login"]');

  // ── Post Login Locators ──
  private loggedInText    = this.page.locator('a:has-text("Logged in as")');
  private logoutNavLink   = this.page.locator('a[href="/logout"]');

  // ── Subscription Locators ──
  private subscribeEmail  = this.page.locator('#susbscribe_email');
  private subscribeButton = this.page.locator('#subscribe');
  private subscribeSuccess = this.page.locator('#success-subscribe');

  // ── Post Login Nav Locators ──
  private HomePageloggedInText     = this.page.locator('a:has-text("Logged in as")');
  private logoutLink       = this.page.locator('a[href="/logout"]');
  private deleteAccountLink = this.page.locator('a[href="/delete_account"]');


  // ── Navigation Actions ──
  async navigateToHome() {
    await this.navigate('/');
  }

  async goToProducts() {
    await this.clickElement(this.productsNavLink);
    await this.waitForURL('/products');
  }

  async goToCart() {
    await this.clickElement(this.cartNavLink);
     await this.page.waitForLoadState('domcontentloaded'); 
  }

  async goToLogin() {
    await this.clickElement(this.loginNavLink);
    await this.waitForURL('/login');
  }

  async goToLogout() {
    await this.clickElement(this.logoutNavLink);
    await this.waitForURL('/login');
  }


  // ── Subscription Actions ──
  async subscribeWithEmail(email: string) {
    await this.fillInput(this.subscribeEmail, email);
    await this.clickElement(this.subscribeButton);
  }

  // ── Verifications ──
  async verifyHomePageLoaded() {
    await this.verifyURL('/');
    await this.verifyVisible(this.productsNavLink);
  }

  async verifyLoggedIn(username: string) {
    await this.verifyText(this.loggedInText, username);
  }

  async verifyLoggedOut() {
    await this.verifyVisible(this.loginNavLink);
  }

  async verifySubscriptionSuccess() {
    await this.verifyVisible(this.subscribeSuccess);
  }

  async HomePageverifyLoggedIn(username: string) {
    await this.verifyText(this.loggedInText, username);
  }

  async logout() {
    await this.clickElement(this.logoutLink);
    await this.waitForURL('/login');
  }

  async deleteAccount() {
    await this.clickElement(this.deleteAccountLink);
    await this.waitForURL('/delete_account');
  }
}