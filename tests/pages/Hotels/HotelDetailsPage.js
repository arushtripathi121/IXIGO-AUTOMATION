/**
 * HotelDetailsPage - Page Object Model for Hotel Details Page
 * Handles hotel name retrieval and wishlist/save functionality
 */
class HotelDetailsPage {

    /**
     * Constructor for HotelDetailsPage
     * @param {Page} page - Playwright Page object
     */
    constructor(page) {
        this.page = page;
        // Hotel name displayed as first h3 element on the page
        this.hotelName =
            page.locator('h3').first();
    }

    /**
     * Retrieve the hotel name from the details page
     * @returns {string} - The hotel name
     */
    async getHotelName() {
        // Wait for hotel name element to be available
        await this.hotelName.waitFor();
        return await this.hotelName.textContent();
    }

    /**
     * Click the Save/Wishlist icon to add hotel to wishlist
     * Uses multiple selector strategies to find the button for flexibility
     */
    async clickSaveIcon() {
        await this.page.waitForLoadState('domcontentloaded');

        // Multiple selector strategies for the save/wishlist button
        const selectors = [
            '(//button[@class="inline-flex justify-center items-center text-brand hover:bg-brand-over gap-5px rounded-10 min-h-50px button-lg icon-md px-20 pr-15px"])[1]',
            // 'button[aria-label*="Wishlist"], button[aria-label*="wishlist"]',
            // 'button[aria-label*="Save"], button[aria-label*="save"]',
            // 'button:has-text("Save"), button:has-text("SAVE")',
            // 'button:has-text("Wishlist"), button:has-text("WISHLIST")',
            // '[class*="wishlist"] button, [class*="save"] button',
            // 'button svg[class*="heart"]',
            // 'button[class*="heart"]',
            // 'button[aria-label*="heart"]'
        ];

        let saveIcon = null;

        for (const selector of selectors) {
            const element = this.page.locator(selector).first();
            try {
                // Use waitFor with a short timeout to quickly fail if not visible
                await element.waitFor({ state: 'visible', timeout: 3000 });
                saveIcon = element;
                break;
            } catch (e) {
                // Selector not found or not visible, try next one
                continue;
            }
        }

        if (!saveIcon) {
            throw new Error('Could not find the Save/Wishlist button after trying all selectors');
        }

        await saveIcon.click();

        await this.page.waitForTimeout(3000);
    }
}

module.exports = HotelDetailsPage;