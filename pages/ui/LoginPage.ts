import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {

    constructor(page: Page) {
        super(page)
    }
    // ── Login Section Locators ──
    private loginEmailInput = this.page.locator('[data-qa="login-email"]');
    private loginPasswordInput = this.page.locator('[data-qa="login-password"]');
    private loginButton = this.page.locator('[data-qa="login-button"]');

    // ── Signup Section Locators ──
    private signupNameInput = this.page.locator('[data-qa="signup-name"]');
    private signupEmailInput = this.page.locator('[data-qa="signup-email"]');
    private signupButton = this.page.locator('[data-qa="signup-button"]');

    // ── Page Heading ──
    private loginHeading = this.page.locator('h2:has-text("Login to your account")');
    private signupHeading = this.page.locator('h2:has-text("New User Signup!")');

    async navigateToLogin() {
        await this.navigate('/login');
    }

// ── Actions ──
    async login(email: string, password: string) {

        await this.fillInput(this.loginEmailInput, email);
        await this.fillInput(this.loginPasswordInput,password);
        await this.clickElement(this.loginButton);
        await this.page.waitForLoadState('domcontentloaded');
    }

    async signup(name:string,email:string){
        await this.fillInput(this.signupNameInput,name);
        await this.fillInput(this.signupEmailInput,email);
        await this.clickElement(this.signupButton);
        await this.page.waitForLoadState('domcontentloaded');

    }
// ── Verifications ──
    async loginPageloaded(){
        await this.verifyVisible(this.loginHeading);
        await this.verifyVisible(this.signupHeading);

    }

      async verifyLoginError(errorMessage: string) {
    const error = this.page.locator('p:has-text("' + errorMessage + '")');
    await this.verifyVisible(error);
  }


}