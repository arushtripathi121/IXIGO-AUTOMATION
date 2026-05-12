/**
 * HomePage - Alternate Page Object Model for Home Page Navigation
 * Handles navigation to Hotels section with direct href navigation
 */
class HomePage {
  /**
   * Constructor for HomePage
   * @param {Page} page - Playwright Page object
   */
  constructor(page) {
    this.page = page;
    // Target anchor link with href="/hotels" for direct navigation
    this.hotelsTab = page.locator('a[href="/hotels"]').first();
  }

  /**
   * Navigate to Hotels page with fallback mechanism
   * Attempts click navigation first, falls back to direct URL navigation if needed
   */
  async navigateToHotels() {
    try {
      // Try to click the Hotels link (may fail due to overlays or timing issues)
      await this.hotelsTab.click({ timeout: 5000 });
      // Wait for URL to reflect Hotels page
      await this.page.waitForURL('**/hotels**', { timeout: 10000 }).catch(() => { });
    } catch (e) {
      // Fallback: Direct navigation to Hotels page URL
      console.log('Direct navigation fallback to /hotels');
      await this.page.goto('https://www.ixigo.com/hotels', { timeout: 15000 });
    }
    // Ensure page is fully loaded
    await this.page.waitForLoadState('domcontentloaded');
  }
}

module.exports = { HomePage };
