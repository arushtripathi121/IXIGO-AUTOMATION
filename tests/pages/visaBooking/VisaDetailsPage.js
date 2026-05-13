const { expect } = require('@playwright/test');

class VisaDetailsPage {
    constructor(page) {
        this.page = page;
        this.checkbox = page.locator('(//form-checkbox)[1]');
        this.continue = page.locator('.btn.btn-continue');
        this.photoUpload = page.locator('#travelDocument_0');
        this.paymentButton = page.locator('#make-payment');
        this.skipableCheck = page.locator('#skippable').first();
    }

    async checkCheckbox() {
        if (await this.checkbox.isVisible().catch(() => false)) {
            await this.checkbox.click();
        }
    }

    async clickOnContinue() {
        await expect(this.continue).toBeVisible();
        await expect(this.continue).toBeEnabled();
        await this.continue.click();
        await Promise.race([
            this.page.waitForNavigation({timeout: 5000 }),
            this.page.waitForTimeout(3000)
        ]);
        return this.page;
    }

    async skipable() {
        if (await this.skipableCheck.isVisible().catch(() => false)) {
            await this.skipableCheck.click();
        }
    }

    async uploadPhotoGraph(filePath) {
        if (await this.photoUpload.isVisible().catch(() => false)) {
            await this.photoUpload.setInputFiles(filePath);
            return true;
        }
        return false;
    }

    async makePayment() {
        if (await this.paymentButton.isVisible().catch(() => false)) {
            await this.paymentButton.click();
        }
    }

    async expectBookingComplete() {
        await expect(this.page.locator('body')).toBeVisible();
        await expect(this.page).toHaveURL(/.*(payment|booking|processing).*/, { timeout: 10000 });
    }
}

module.exports = VisaDetailsPage;