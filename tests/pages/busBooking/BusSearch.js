const { expect } = require('@playwright/test');

class BusSearch {
    constructor(page) {
        this.page = page;
        this.source = page.locator('input[placeholder="Leaving From"]');
        this.destination = page.locator('input[placeholder="Going To"]');
        this.searchButton = page.locator('#search-button').first();
        this.tomorrow = page.getByRole('button', {name: "tomorrow"});
    }

    async navigate(url) {
        await this.page.goto(url, { timeout: 15000 });
        await expect(this.page).toHaveURL(/\/buses(?:\/|$)/);
        await this.page.waitForLoadState('networkidle').catch(() => {});
    }

    async setSource(source) {
        await expect(this.source).toBeVisible();
        await expect(this.source).toBeEnabled();
        await this.source.fill(source);
        await expect(this.source).toHaveValue(source);
        await this.page.waitForTimeout(1000);
        await this.page.keyboard.press('Enter');
    }
    
    async setDestination(destination) {
        await expect(this.destination).toBeVisible();
        await expect(this.destination).toBeEnabled();
        await this.destination.fill(destination);
        await this.page.waitForTimeout(1000);
        await expect(this.destination).toHaveValue(destination);
        await this.page.keyboard.press('Enter');
    }

    async search() {
        await this.page.waitForTimeout(500);
        await expect(this.searchButton).toBeVisible();
        await expect(this.searchButton).toBeEnabled();
        await this.tomorrow.click();
        await this.page.waitForTimeout(1000);
        await this.searchButton.click();
        // await this.page.waitForNavigation();
        await this.page.waitForTimeout(1000);
        return this.page;
    }

    async searchExpectError() {
        await expect(this.searchButton).toBeVisible();
        await expect(this.searchButton).toBeEnabled();
        await this.searchButton.click();
        await this.page.waitForTimeout(1000);
        await expect(this.page).toHaveURL(/.*bus.*/);
    }
}

module.exports = BusSearch;