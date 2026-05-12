/**
 * HotelResultsPage - Page Object Model for Hotel Search Results
 * Handles filtering, sorting, and hotel card selection
 */
class HotelResultsPage {
  /**
   * Constructor for HotelResultsPage
   * @param {Page} page - Playwright Page object
   */
  constructor(page) {
    this.page = page;

    // Filter locators
    this.bestPriceGuaranteeFilter = page.locator('(//input[@class="absolute opacity-0 w-full h-full inset-0 cursor-pointer"])[1]');
    this.freeCancellationFilter = page.locator('(//span[@class="relative shrink-0 inline-flex items-center justify-center w-20 h-20 rounded hover:bg-primary-over border border-primary"]/input)[1]');
    
    // Sort functionality locators
    this.sortDropdown = page.locator('//div[@class="ml-auto flex-shrink-0 overflow-hidden rounded-10"]');
    this.priceLowToHighOption = page.locator('(//input[@name="sort"])[29]');

    // Hotel card selection locator
    this.firstHotelCard = page.locator('(//div[@data-testid="hotel-card"])[1]');
  }

  /**
   * Apply filters for Best Price Guarantee and Free Cancellation
   */
  async applyFilters() {
    // Click Best Price Guarantee filter with error handling
    await this.bestPriceGuaranteeFilter.click({ force: true, timeout: 3000 }).catch(() => { });
    await this.page.waitForTimeout(2000);

    // Click Free Cancellation filter with error handling
    await this.freeCancellationFilter.click({ force: true, timeout: 3000 }).catch(() => { });
    await this.page.waitForTimeout(2000);
  }

  /**
   * Sort results by Price Low to High
   */
  async sortResults() {
    // Open sort dropdown
    await this.sortDropdown.click();
    // Select Price Low to High option
    await this.priceLowToHighOption.click();
    // Wait for sort to be applied
    await this.page.waitForTimeout(2000);
  }

  /**
   * Open first hotel card (typically opens in a new tab)
   * @returns {Page} - New page object for the hotel details page
   */
  async openFirstHotel() {
    // Wait for new page and click hotel card simultaneously
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.firstHotelCard.click()
    ]);
    // Wait for new page to load
    await newPage.waitForLoadState('domcontentloaded');
    return newPage;
  }
}

module.exports = { HotelResultsPage };
