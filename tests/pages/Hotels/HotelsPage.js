/**
 * HotelsPage - Page Object Model for Hotels Landing Page
 * Handles popular destinations navigation and offers section
 */
class HotelsPage {

    /**
     * Constructor for HotelsPage
     * @param {Page} page - Playwright Page object
     */
    constructor(page) {
        this.page = page;
        // Popular destination card for Goa
        this.popularDestinationsCards =
            page.getByRole('link', { name: 'Goa Goa Goa 4728 Properties' });
        // View All Offers button
        this.viewAllOffersButton = page.locator('text="View All"');
    }

    /**
     * Click on the third popular destination card (Goa)
     * Opens destination page in a new tab
     * @returns {Page} - New page object with destination results
     */
    async clickThirdPopularDestination() {
        // Wait for destination card to be visible
        await this.popularDestinationsCards.waitFor({
            state: 'visible'
        });

        const context = this.page.context();

        // Wait for new page and click destination card simultaneously
        const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            this.popularDestinationsCards.click()
        ]);

        await newPage.waitForLoadState('domcontentloaded');
        return newPage;
    }

    /**
     * Click View All Offers button
     * May open in new tab or navigate within same tab
     * @returns {Page} - Page object (new or current)
     */
    async clickViewAllOffers() {
        // Wait for View All button visibility
        await this.viewAllOffersButton.first().waitFor({ state: 'visible' });

        const context = this.page.context();
        // Try to catch new page event with timeout
        const newPagePromise = context.waitForEvent('page', { timeout: 5000 }).catch(() => null);

        await this.viewAllOffersButton.first().click();

        // Return new page if opened, otherwise return current page
        const newPage = await newPagePromise;
        if (newPage) {
            await newPage.waitForLoadState('domcontentloaded');
            return newPage;
        }

        await this.page.waitForLoadState('domcontentloaded');
        return this.page;
    }
}

module.exports = HotelsPage;