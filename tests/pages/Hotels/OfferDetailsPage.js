/**
 * OfferDetailsPage - Page Object Model for Offer Details Page
 * Handles offer code validation and verification
 */
class OfferDetailsPage {
    /**
     * Constructor for OfferDetailsPage
     * @param {Page} page - Playwright Page object
     */
    constructor(page) {
        this.page = page;
        // Locator for offer code display with specific styling
        this.offerCodeDisplay = page.locator('//span[@class="body-md font-bold text-black"]');
    }

    /**
     * Validate that the offer code displayed matches the expected code
     * Uses multiple verification strategies with fallback
     * @param {string} expectedCode - The expected offer code to match
     * @throws {Error} - If offer code cannot be found or doesn't match
     */
    async validateOfferCode(expectedCode) {
        // Fallback locator to find exact code text on page
        const exactCodeLocator = this.page.locator(`text="${expectedCode}"`);

        let foundCode = false;

        try {
            // Primary check: Find code using specific class selectors
            await this.offerCodeDisplay.first().waitFor({ state: 'visible', timeout: 3000 });
            const displayedCode = await this.offerCodeDisplay.innerText();
            console.log('Displayed Offer Code on Details Page:', displayedCode);
            // Verify code matches expected value
            if (displayedCode.trim() === expectedCode.trim()) {
                foundCode = true;
            }
            // Take screenshot for documentation
            await this.page.screenshot({ path: 'screenshots/offer_details.png', fullPage: true });
        } catch (error) {
            // Fallback: Try finding exact code text on page
            try {
                await exactCodeLocator.first().waitFor({ state: 'visible', timeout: 3000 });
                foundCode = true;
            } catch (e) {
                foundCode = false;
            }
        }

        if (!foundCode) {
            throw new Error(`Offer code validation failed. Expected to find code: ${expectedCode} on the Offer Details page.`);
        }
    }
}

module.exports = OfferDetailsPage;
