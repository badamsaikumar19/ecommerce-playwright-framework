import { test, expect } from '../fixtures';
import { ProductData } from '../../utils/factories/UserFactory';

test.describe('Cart Tests', () => {

  test.beforeEach(async ({ pages }) => {
    await pages.login.navigateToLogin();
    await pages.login.login(process.env.TEST_USER_EMAIL!, process.env.TEST_USER_PASSWORD!);
    await pages.home.verifyHomePageLoaded();
  });

  // TC009 - Verify cart page loads
  test('TC009 - User should be able to navigate to cart page', async ({ pages }) => {
    await pages.home.goToCart();
    await pages.cart.verifyCartPageLoaded();
  });

  // TC010 - Verify product is in cart after adding
  test('TC010 - User should see product in cart after adding it', async ({ pages }) => {
    const product = ProductData.featured.mens; // 'Men Tshirt'

    // Navigate to products and add to cart
    await pages.product.navigateToProducts();
    await pages.product.addProductToCartByName(product);

    // Go to cart and verify
    await pages.home.goToCart();
    await pages.cart.verifyCartPageLoaded();
    await pages.cart.verifyProductInCart(product);
  });

  // TC011 - Remove product from cart
  test('TC011 - User should be able to remove a product from cart', async ({ pages }) => {
    const product = ProductData.featured.mens;

    // Add product first
    await pages.product.navigateToProducts();
    await pages.product.addProductToCartByName(product);

    // Go to cart and remove
    await pages.home.goToCart();
    await pages.cart.verifyProductInCart(product);
    await pages.cart.removeProductByName(product);

    // Verify removed
    await pages.cart.verifyProductNotInCart(product);
  });

  // TC012 - Verify cart is empty after removing all items
  test('TC012 - Cart should be empty after removing all products', async ({ pages }) => {
    const product = ProductData.featured.mens;

    // Add product first
    await pages.product.navigateToProducts();
    await pages.product.addProductToCartByName(product);

    // Go to cart, remove, verify empty
    await pages.home.goToCart();
    await pages.cart.verifyProductInCart(product);
      // Remove ALL items regardless of what's there
    await pages.cart.clearCart();
    await pages.cart.verifyCartIsEmpty();
  });

});