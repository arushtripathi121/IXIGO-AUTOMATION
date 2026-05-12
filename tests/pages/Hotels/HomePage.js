/**
 * HomePage - Page Object Model for Home Page
 * Handles navigation to Hotels section from the home page
 */
class HomePage {

    /**
     * Constructor for HomePage
     * @param {Page} page - Playwright Page object
     */
    constructor(page) {
        this.page = page;
        // Hotels menu link with promotional text
        this.hotelsMenu =
            page.getByRole('link', { name: 'ixigo Hotels Up to 50% Off' }).nth(1);
    }

    /**
     * Navigate to Ixigo home page
     */
    async navigate() {
        await this.page.goto('https://www.ixigo.com/');
    }

    /**
     * Click on Hotels menu to navigate to Hotels section
     */
    async clickHotelsMenu() {
        // Wait for menu to be visible
        await this.hotelsMenu.waitFor({
            state: 'visible'
        });

        await this.hotelsMenu.click();

        // Wait for page to fully load
        await this.page.waitForLoadState('domcontentloaded');
    }
}

module.exports = HomePage;