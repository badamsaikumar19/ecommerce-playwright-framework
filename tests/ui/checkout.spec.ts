import { test } from '../fixtures';
import { UserFactory } from '../../utils/factories/UserFactory';
import { ProductData } from '../../utils/factories/UserFactory';

test.describe('Checkout Tests', () => {

  // Generate a fresh user for each test
  let userData: ReturnType<typeof UserFactory.generate>;

  test.beforeEach(async ({ pages }) => {
    userData = UserFactory.generate();

    // Step 1: Go to login page → click Signup
    await pages.login.navigateToLogin();
    await pages.login.signup(userData.name, userData.email);

    // Step 2: Fill registration form
    await pages.register.verifyRegisterPageLoaded();
    await pages.register.registerNewUser({
      title:     userData.title,
      password:  userData.password,
      day:       userData.day,
      month:     userData.month,
      year:      userData.year,
      firstName: userData.firstName,
      lastName:  userData.lastName,
      company:   userData.company,
      address1:  userData.address1,
      address2:  userData.address2,
      country:   userData.country,
      state:     userData.state,
      city:      userData.city,
      zipcode:   userData.zipcode,
      mobile:    userData.mobile,
    });

    // Step 3: Verify account created → continue to home
    await pages.register.verifyAccountCreated();
    await pages.register.clickContinueAfterRegistration();
    await pages.home.verifyHomePageLoaded();
  });

  // TC013 - Full E2E
  test('TC013 - User should complete full checkout flow successfully', async ({ pages }) => {
    const product = ProductData.featured.mens;

    // Add product to cart
    await pages.product.navigateToProducts();
    await pages.product.addProductToCartByName(product);

    // Go to cart → proceed to checkout
    await pages.home.goToCart();
    await pages.cart.verifyCartPageLoaded();
    await pages.cart.verifyProductInCart(product);
    await pages.cart.proceedToCheckout();

    // Checkout page
    await pages.checkout.verifyCheckoutPageLoaded();
    await pages.checkout.addComment('Please deliver ASAP');
    await pages.checkout.placeOrder();

    // Payment page
    await pages.payment.verifyPaymentPageLoaded();
    await pages.payment.enterPaymentDetails(
      `${userData.firstName} ${userData.lastName}`,
      '4111111111111111',
      '123',
      '12',
      '2027'
    );
    await pages.payment.confirmPayment();

    // Order confirmation
    await pages.orderConfirmation.verifyOrderPlaced();
    await pages.orderConfirmation.verifyOrderConfirmationMessage();
  });

  // TC014 - Verify delivery address
  test('TC014 - Delivery address should match registered address', async ({ pages }) => {
    const product = ProductData.featured.womens;

    // Add product → go to checkout
    await pages.product.navigateToProducts();
    await pages.product.addProductToCartByName(product);
    await pages.home.goToCart();
    await pages.cart.proceedToCheckout();

    // Verify delivery name matches registered user
    await pages.checkout.verifyCheckoutPageLoaded();
    await pages.checkout.verifyDeliveryAddress(userData.firstName);
  });

  // TC015 - Verify product in order summary
  test('TC015 - Order summary should contain the added product', async ({ pages }) => {
    const product = ProductData.featured.dress;

    // Add product → go to checkout
    await pages.product.navigateToProducts();
    await pages.product.addProductToCartByName(product);
    await pages.home.goToCart();
    await pages.cart.proceedToCheckout();

    // Verify product appears in order summary
    await pages.checkout.verifyCheckoutPageLoaded();
    await pages.checkout.verifyProductInOrder(product);
  });

});