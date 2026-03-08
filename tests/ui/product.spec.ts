import { test, expect } from '../fixtures';
import { ProductData }    from '../../utils/factories/UserFactory';

test.describe('Product Tests',()=>{


    test.beforeEach(async({pages})=>{
        await pages.login.navigateToLogin();
    await pages.login.login(
      process.env.TEST_USER_EMAIL!,
      process.env.TEST_USER_PASSWORD!
    );
    await pages.home.verifyHomePageLoaded();
    })

      test('TC005 - User should navigate to products page successfully',
    async ({ pages }) => {

      // Step 1: Go to products
      await pages.home.goToProducts();

      // Step 2: Verify products page loaded
      await pages.product.verifyProductsPageLoaded();

      // Step 3: Verify products exist
      const count = await pages.product.getProductCount();
      expect(count).toBeGreaterThan(0);
  });

  test('TC006 - User should search product by name successfully',
    async ({ pages }) => {

      // ── Dynamic product name ──
      const productName = ProductData.getRandom();
      console.log(`Searching for: ${productName}`);

      await pages.home.goToProducts();
      await pages.product.searchProduct(productName);
      await pages.product.verifySearchResults(productName);
  });

    test('TC007 - User should add product to cart successfully',
    async ({ pages }) => {

      // ── Dynamic product name ──
      const productName = ProductData.featured.mens;
      console.log(`Adding to cart: ${productName}`);

      await pages.home.goToProducts();
      await pages.product.addProductToCartByName(productName);
      await pages.product.continueShopping();
      await pages.home.goToCart();
      await pages.cart.verifyProductInCart(productName);
  });

  test('TC008 - User should view product details successfully',
    async ({ pages }) => {

      // ── Dynamic product name ──
      const productName = ProductData.getRandom();
      console.log(`Viewing product: ${productName}`);

      await pages.home.goToProducts();
      await pages.product.viewProductByName(productName);
      await pages.product.verifyURL('/product_details');
  });
})