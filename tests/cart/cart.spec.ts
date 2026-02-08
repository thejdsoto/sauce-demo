import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import { ProductsPage } from '../../pages/products.page';
import { CartPage } from '../../pages/cart.page';
import { users } from '../../fixtures/users';

test.describe('Cart Management', () => {
    let productsPage: ProductsPage;
    let cartPage: CartPage;

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(users.standard.username, users.standard.password);
        productsPage = new ProductsPage(page);
        cartPage = new CartPage(page);
    });

    test('Add single product to cart', async ({}) => {
        await productsPage.addProductToCartByName('Sauce Labs Backpack');
        expect(await productsPage.getCartCount()).toBe(1);

        await productsPage.goToCart();
        const items = await cartPage.getCartItemNames();

        expect(items).toContain('Sauce Labs Backpack');
    });

    test('Add multiple products to cart', async ({}) => {
        await productsPage.addProductToCartByName('Sauce Labs Backpack');
        await productsPage.addProductToCartByName('Sauce Labs Bike Light');

        expect(await productsPage.getCartCount()).toBe(2);
    });

    test('Remove product from cart', async ({ page }) => {
        await productsPage.addProductToCartByName('Sauce Labs Backpack');
        await productsPage.goToCart();

        await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
        expect(await cartPage.cartItems.count()).toBe(0);
    });
});
