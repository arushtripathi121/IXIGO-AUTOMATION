const { expect } = require('@playwright/test');

/**
 * ProfilePage - Page Object Model for User Profile
 * Handles profile dropdown navigation and wishlist verification
 */
class ProfilePage {

    /**
     * Constructor for ProfilePage
     * @param {Page} page - Playwright Page object
     */
    constructor(page) {
        this.page = page;
        // Profile dropdown/menu element
        this.profileDropdown =
            page.locator('[class="truncate UserInfo_name-header__Akvsx"]');
        // Wishlist navigation link
        this.wishlistOption =
            page.locator('[href="/hotels/wishlists/summary"]');
        // Hotel cards in wishlist
        this.savedHotels =
            page.locator('//h2[@class="h6 truncate font-medium text-primary"]');
    }

    /**
     * Navigate to wishlist through profile dropdown
     * Takes screenshots for documentation
     */
    async navigateToWishlist() {
        // Screenshot before opening profile dropdown
        await this.page.screenshot({ path: 'screenshots/before_profile_dropdown.png', fullPage: true });

        // Wait for profile dropdown to be visible
        await this.profileDropdown.waitFor({
            state: 'visible',
            timeout: 10000
        }).catch(async (e) => {
            // Take failure screenshot if dropdown not found
            await this.page.screenshot({ path: 'screenshots/failed_profile_dropdown.png', fullPage: true });
            throw e;
        });

        // Click profile dropdown
        await this.profileDropdown.click();

        // Wait for wishlist option to appear
        await this.wishlistOption.waitFor({
            state: 'visible'
        });

        // Click wishlist link
        await this.wishlistOption.click();

        // Wait for wishlist page to load
        await this.page.waitForLoadState('domcontentloaded');
    }

    /**
     * Verify that a saved hotel is present in the wishlist
     * @param {string} hotelName - Name of hotel to verify
     */
    async verifyHotelInWishlist(hotelName) {
        // Wait for wishlist to load completely
        await this.page.waitForTimeout(3000);

        // Get all hotel names in wishlist
        const hotels =
            await this.savedHotels.allTextContents();
        console.log('Hotels in wishlist:', hotels);

        // Check if hotel is present in wishlist
        const isPresent =
            hotels.some(h =>
                h.trim().includes(hotelName.trim())
            );

        expect(isPresent).toBeTruthy();
    }
}

module.exports = ProfilePage;