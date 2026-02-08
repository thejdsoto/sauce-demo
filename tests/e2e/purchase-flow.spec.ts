import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { ProductsPage } from '../../pages/products.page';
import { CartPage } from '../../pages/cart.page';
import { CheckoutPage } from '../../pages/checkout.page';
import { users } from '../../fixtures/users';

test.describe('End-to-End Purchase Flow', () => {
    test('User can complete a purchase successfully', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);

        await loginPage.goto();
        await loginPage.login(users.standard.username, users.standard.password);

        await productsPage.addProductToCartByName('Sauce Labs Backpack');
        expect(await productsPage.getCartCount()).toBe(1);

        await productsPage.goToCart();
        await cartPage.proceedToCheckout();

        await checkoutPage.fillCustomerInfo('John', 'Doe', '12345');
        await checkoutPage.completeCheckout();

        await expect(page.locator('.complete-header')).toHaveText(
            'Thank you for your order!'
        );
    });
});
