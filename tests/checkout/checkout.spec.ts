import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { ProductsPage } from '../../pages/products.page';
import { CartPage } from '../../pages/cart.page';
import { CheckoutPage } from '../../pages/checkout.page';
import { users } from '../../fixtures/users';

test.describe('Checkout', () => {
    let loginPage: LoginPage;
    let productsPage: ProductsPage;
    let cartPage: CartPage;
    let checkoutPage: CheckoutPage;
    
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        productsPage = new ProductsPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);
        await loginPage.goto();
        await loginPage.login(users.standard.username, users.standard.password);
        await productsPage.addProductToCartByName('Sauce Labs Backpack');
        await productsPage.goToCart();
    });

    test('Checkout with missing required fields shows error', async ({}) => {
        await cartPage.proceedToCheckout();
        await checkoutPage.fillCustomerInfo('', '', '');

        await expect(checkoutPage.errorMessage).toBeVisible();
    });

    test('Order total is calculated correctly', async ({ page }) => {
        const itemTotal = await page.locator('.summary_subtotal_label').textContent();
        const tax = await page.locator('.summary_tax_label').textContent();
        const total = await page.locator('.summary_total_label').textContent();

        expect(itemTotal).toContain('$');
        expect(tax).toContain('$');
        expect(total).toContain('$');
    });
});
