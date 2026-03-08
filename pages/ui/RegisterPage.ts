import { Page,expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class RegisterPage extends BasePage {

  constructor(page: Page) {
    super(page);
  }

  // ── Personal Info Locators ──
  private titleMr       = this.page.locator('input[type="radio"][value="Mr"]');
  private titleMrs      = this.page.locator('input[type="radio"][value="Mrs"]');
  private nameInput     = this.page.locator('[data-qa="name"]');
  private emailInput    = this.page.locator('[data-qa="email"]');
  private passwordInput = this.page.locator('[data-qa="password"]');
  private dayDropdown   = this.page.locator('#days');
  private monthDropdown = this.page.locator('#months');
  private yearDropdown  = this.page.locator('#years');
  private newsletter    = this.page.locator('input[name="newsletter"]');
  private optin         = this.page.locator('input[name="optin"]');

  // ── Address Info Locators ──
  private firstNameInput = this.page.locator('[data-qa="first_name"]');
  private lastNameInput  = this.page.locator('[data-qa="last_name"]');
  private companyInput   = this.page.locator('[data-qa="company"]');
  private address1Input  = this.page.locator('[data-qa="address"]');
  private address2Input  = this.page.locator('[data-qa="address2"]');
  private countryDropdown = this.page.locator('#country');
  private stateInput     = this.page.locator('[data-qa="state"]');
  private cityInput      = this.page.locator('[data-qa="city"]');
  private zipcodeInput   = this.page.locator('[data-qa="zipcode"]');
  private mobileInput    = this.page.locator('[data-qa="mobile_number"]');

  // ── Submit Locators ──
  private createAccountBtn = this.page.locator('[data-qa="create-account"]');
  private accountCreatedMsg = this.page.locator('[data-qa="account-created"]');
  private continueBtn      = this.page.locator('[data-qa="continue-button"]');

  // ── Actions ──
  async selectTitle(title: 'Mr' | 'Mrs') {
    if (title === 'Mr') {
      await this.clickElement(this.titleMr);
    } else {
      await this.clickElement(this.titleMrs);
    }
  }

  async fillPersonalInfo(
    password: string,
    day: string,
    month: string,
    year: string
  ) {
    await this.fillInput(this.passwordInput, password);
    await this.dayDropdown.selectOption(day);
    await this.monthDropdown.selectOption(month);
    await this.yearDropdown.selectOption(year);
  }

  async checkNewsletter() {
    if (!await this.newsletter.isChecked()) {
      await this.clickElement(this.newsletter);
    }
  }

  async checkOptin() {
    if (!await this.optin.isChecked()) {
      await this.clickElement(this.optin);
    }
  }

  async fillAddressInfo(
    firstName: string,
    lastName: string,
    company: string,
    address1: string,
    address2: string,
    country: string,
    state: string,
    city: string,
    zipcode: string,
    mobile: string
  ) {
    await this.fillInput(this.firstNameInput,  firstName);
    await this.fillInput(this.lastNameInput,   lastName);
    await this.fillInput(this.companyInput,    company);
    await this.fillInput(this.address1Input,   address1);
    await this.fillInput(this.address2Input,   address2);
    await this.countryDropdown.selectOption(country);
    await this.fillInput(this.stateInput,      state);
    await this.fillInput(this.cityInput,       city);
    await this.fillInput(this.zipcodeInput,    zipcode);
    await this.fillInput(this.mobileInput,     mobile);
  }

  async submitRegistration() {
    await this.clickElement(this.createAccountBtn);
      await this.page.waitForLoadState('domcontentloaded');
  }

  async clickContinueAfterRegistration() {
    await this.continueBtn.click({ force: true });
    //await this.clickElement(this.continueBtn);
    await this.waitForURL('/');
  }

  // ── Master Register Method ──
  // Calls all steps in one go!
  async registerNewUser(userData: {
    title: 'Mr' | 'Mrs';
    password: string;
    day: string;
    month: string;
    year: string;
    firstName: string;
    lastName: string;
    company: string;
    address1: string;
    address2: string;
    country: string;
    state: string;
    city: string;
    zipcode: string;
    mobile: string;
  }) {
    await this.selectTitle(userData.title);
    await this.fillPersonalInfo(
      userData.password,
      userData.day,
      userData.month,
      userData.year
    );
    await this.checkNewsletter();
    await this.checkOptin();
    await this.fillAddressInfo(
      userData.firstName,
      userData.lastName,
      userData.company,
      userData.address1,
      userData.address2,
      userData.country,
      userData.state,
      userData.city,
      userData.zipcode,
      userData.mobile
    );
    await this.submitRegistration();
  }

  // ── Verifications ──
  async verifyRegisterPageLoaded() {
    await this.verifyURL('/signup');
    await this.verifyVisible(this.nameInput);
  }

  async verifyAccountCreated() {
   await expect(this.accountCreatedMsg).toBeVisible({ timeout: 15000 }); /
  }
}

