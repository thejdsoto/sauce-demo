import { Page, Locator } from '@playwright/test';

export class ProductsPage {
    readonly page: Page;
    readonly inventoryItems: Locator;
    readonly cartBadge: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inventoryItems = page.locator('.inventory_item');
        this.cartBadge = page.locator('.shopping_cart_badge');
    }

    async addProductToCartByName(productName: string) {
        const product = this.page
        .locator('.inventory_item')
        .filter({ hasText: productName });
        await product.locator('button').click();
    }

    async goToCart() {
        await this.page.locator('.shopping_cart_link').click();
    }

    async getCartCount(): Promise<number> {
        if (await this.cartBadge.count() === 0) return 0;
        return Number(await this.cartBadge.textContent());
    }
}
