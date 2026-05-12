/**
 * HotelSearchPage - Page Object Model for Hotel Search Page
 * Handles destination input, date selection, room/guest selection, and search
 */
class HotelSearchPage {
  /**
   * Constructor for HotelSearchPage
   * @param {Page} page - Playwright Page object
   */
  constructor(page) {
    this.page = page;
    
    // Destination input field
    this.destinationInput = page.locator('input[placeholder="Enter city, area or property name"]');
    // Search button
    this.searchButton = page.locator('(//div[@class="card-description rounded-10 rounded-b-20 rounded-t-none border border-t-0 border-primary px-20 pb-15 pt-25 flex items-center justify-center gap-x-5"])[3]');

    // Date selection locators
    this.checkInInput = page.locator('(//p[@class="body-xs text-secondary"])[2]');
    this.InputDate = page.locator('(//button[@class="react-calendar__tile react-calendar__month-view__days__day"])[15]');
    this.OutputDate = page.locator('(//button[@class="react-calendar__tile react-calendar__month-view__days__day"])[17]');
    
    // Room and guest increment buttons
    this.roomIncrement = page.locator('//p[@data-testid="room-increment"]');
    this.adultIncrement = page.locator('//p[@data-testid="adult-increment"]');
    this.childIncrement = page.locator('//p[@data-testid="counter-increment-children"]');
  }

  /**
   * Enter search details including destination, dates, rooms and guests
   * @param {string} destination - Hotel destination/city name
   */
  async enterDetails(destination) {
    // Enter destination and confirm with Enter key
    await this.destinationInput.fill(destination);
    await this.page.waitForTimeout(2000);
    await this.destinationInput.press('Enter');
    await this.page.waitForTimeout(1000);

    // Open calendar for date selection
    await this.checkInInput.click();

    // Wait for calendar UI to appear
    await this.page.waitForTimeout(2000);

    // Select check-in and check-out dates
    await this.InputDate.click();
    await this.page.waitForTimeout(2000);
    await this.OutputDate.click();

    // Increment room count and guest counts
    await this.roomIncrement.click();
    await this.adultIncrement.click();
    await this.childIncrement.click();

    await this.page.waitForTimeout(2000);
  }

  /**
   * Click search button and wait for results page to load in new tab
   * @returns {Page} - New page object with search results
   */
  async clickSearch() {
    const context = this.page.context();

    // Wait for new page and click search simultaneously
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      this.searchButton.click()
    ]);

    // Wait for results page to fully load and take screenshot
    await newPage.waitForLoadState('domcontentloaded');
    await newPage.screenshot({ path: 'screenshots/done.png', fullPage: true });

    return newPage;
  }

  /**
   * Attempt search with empty/invalid destination and verify it's blocked
   * @returns {boolean} - True if search was blocked (still on search page)
   */
  async clickSearchExpectFailure() {
    await this.searchButton.click();

    // Wait to ensure no navigation happens
    await this.page.waitForTimeout(2000);

    // Check if search button is still visible (indicates search was blocked)
    const isSearchButtonVisible = await this.searchButton.isVisible();
    // Take screenshot for failure documentation
    await this.page.screenshot({ path: 'screenshots/search_failure.png', fullPage: true });
    return isSearchButtonVisible;
  }
}

module.exports = { HotelSearchPage };

