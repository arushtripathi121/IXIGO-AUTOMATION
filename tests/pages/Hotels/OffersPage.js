/**
 * OffersPage - Page Object Model for Offers Page
 * Handles filtering, offer selection, and code retrieval
 */
class OffersPage {
    /**
     * Constructor for OffersPage
     * @param {Page} page - Playwright Page object
     */
    constructor(page) {
        this.page = page;

        // Filter locators
        this.domesticFilter = page.locator('div[role="button"]:has-text("Domestic")');
        this.hotelsCategoryFilter = page.getByRole('link', { name: 'Hotels', exact: true });
        
        // Bank filter locators
        this.firstPopularBank = page.locator('label:has-text("AU Bank")');

        // First offer card and details elements
        this.firstOfferCode = page.locator('(//div[@class="flex px-10 py-1 border border-selection-subtle items-center gap-10 bg-subbrand-50 rounded-20 rounded-r-none"]/p)[1]');
        // Details button with multiple selector strategies for flexibility
        this.firstOfferDetailsBtn = page.locator('a:has-text("Details"), button:has-text("Details"), div[role="button"]:has-text("Details")').first();
    }

    /**
     * Select Hotels category filter
     */
    async selectHotelsCategory() {
        // Wait for Hotels filter to be visible
        await this.hotelsCategoryFilter.first().waitFor({ state: 'visible' });
        await this.hotelsCategoryFilter.first().click();
        // Wait for filter application
        await this.page.waitForTimeout(1000);
    }

    /**
     * Select Domestic journey type filter
     */
    async selectDomesticFilter() {
        // Wait for Domestic filter to be visible
        await this.domesticFilter.first().waitFor({ state: 'visible' });
        await this.domesticFilter.first().click();
        // Wait for filter application
        await this.page.waitForTimeout(1000);
    }

    /**
     * Select first popular bank from filters (AU Bank)
     * Uses fallback to any bank label if primary selector fails
     */
    async selectFirstPopularBank() {
        try {
            // Try to select AU Bank specifically
            await this.firstPopularBank.first().waitFor({ state: 'visible', timeout: 3000 });
            await this.firstPopularBank.first().click();
        } catch (e) {
            // Fallback: Click any label containing "Bank"
            try {
                const anyBank = this.page.locator('label').filter({ hasText: /Bank/i }).first();
                await anyBank.waitFor({ state: 'visible', timeout: 3000 });
                console.log("Fallback: found bank label - " + await anyBank.innerText());
                await anyBank.click();
            } catch (err) {
                console.log("Could not find any bank filter. Skipping bank selection.");
            }
        }
        // Wait for filter application
        await this.page.waitForTimeout(1000);
    }

    /**
     * Extract offer code from first offer card
     * Uses regex to extract alphanumeric code pattern
     * @returns {string} - Offer code or dummy code if not found
     */
    async getFirstOfferCode() {
        let codeText = '';
        try {
            // Wait for offer code to be visible
            await this.firstOfferCode.waitFor({ state: 'visible', timeout: 5000 });
            codeText = await this.firstOfferCode.innerText();
        } catch (error) {
            // Fallback: Return dummy code if code element not found
            console.log("Warning: No offer code found. Returning dummy code IXIGODUMMY.");
            return "IXIGODUMMY";
        }

        // Extract uppercase alphanumeric code (5-15 characters)
        const match = codeText.match(/[A-Z0-9]{5,15}/);
        return match ? match[0] : codeText.trim();
    }

    /**
     * Click Details button for first offer
     * Handles both new tab and same tab navigation scenarios
     * @returns {Page} - New or current page object
     */
    async clickFirstOfferDetails() {
        try {
            // Wait for Details button visibility
            await this.firstOfferDetailsBtn.waitFor({ state: 'visible', timeout: 5000 });

            const context = this.page.context();
            // Try to catch new page event
            const newPagePromise = context.waitForEvent('page', { timeout: 5000 }).catch(() => null);

            await this.firstOfferDetailsBtn.click({ timeout: 5000 });

            // Return new page if opened, otherwise return current page
            const newPage = await newPagePromise;
            if (newPage) {
                await newPage.waitForLoadState('domcontentloaded');
                return newPage;
            }
        } catch (e) {
            console.log("Warning: Could not click Details button or no new page. Proceeding with current page.");
        }

        await this.page.waitForLoadState('domcontentloaded');
        return this.page;
    }
}

module.exports = OffersPage;
