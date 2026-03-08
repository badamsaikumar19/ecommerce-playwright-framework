import { test as base }          from '@playwright/test';
import { LoginPage }             from '../../pages/ui/LoginPage';
import { HomePage }              from '../../pages/ui/HomePage';
import { ProductPage }           from '../../pages/ui/ProductPage';
import { CartPage }              from '../../pages/ui/CartPage';
import { CheckoutPage }          from '../../pages/ui/CheckoutPage';
import { PaymentsPage }          from '../../pages/ui/PaymentsPage';
import { OrderConfirmationPage } from '../../pages/ui/OrderConfirmationPage';
import { RegisterPage }          from '../../pages/ui/RegisterPage';

// ── Individual page types ──
type Pages = {
  loginPage:             LoginPage;
  homePage:              HomePage;
  productPage:           ProductPage;
  cartPage:              CartPage;
  checkoutPage:          CheckoutPage;
  paymentsPage:          PaymentsPage;
  orderConfirmationPage: OrderConfirmationPage;
  registerPage:          RegisterPage;
};

// ── Master pages object type ──
type PageFixtures = Pages & {
  pages: {
    login:             LoginPage;
    home:              HomePage;
    product:           ProductPage;
    cart:              CartPage;
    checkout:          CheckoutPage;
    payment:           PaymentsPage;
    orderConfirmation: OrderConfirmationPage;
    register:          RegisterPage;
  };
};

// ── Extend Playwright test ──
export const test = base.extend<PageFixtures>({

  // ── Individual fixtures ──
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  paymentsPage: async ({ page }, use) => {
    await use(new PaymentsPage(page));
  },
  orderConfirmationPage: async ({ page }, use) => {
    await use(new OrderConfirmationPage(page));
  },
  registerPage: async ({ page }, use) => {
    await use(new RegisterPage(page));
  },

  // ── Master pages fixture ──
  pages: async ({ page }, use) => {
    await use({
      login:             new LoginPage(page),
      home:              new HomePage(page),
      product:           new ProductPage(page),
      cart:              new CartPage(page),
      checkout:          new CheckoutPage(page),
      payment:           new PaymentsPage(page),
      orderConfirmation: new OrderConfirmationPage(page),
      register:          new RegisterPage(page),
    });
  },

});
test.beforeEach(async ({ page }) => {
  await page.route('**/*', (route) => {
    const blockedDomains = [
      'googleadservices.com',
      'googlesyndication.com',
      'doubleclick.net',
      'google-analytics.com',
      'adservice.google.com',
      'amazon-adsystem.com',
      'google.com/pagead',       // ← add this
  'pagead2.googlesyndication.com',
    ];
    const url = route.request().url();
    if (blockedDomains.some(domain => url.includes(domain))) {
      route.abort();
    } else {
      route.continue();
    }
  });
});
// ── Export expect ──
export { expect } from '@playwright/test';