/**
 * HotelDetailsPage - Page Object Model for Hotel Details and Room Reservation
 * Handles room reservation action and navigation to guest details page
 */
class HotelDetailsPage {
  /**
   * Constructor for HotelDetailsPage
   * @param {Page} page - Playwright Page object
   */
  constructor(page) {
    this.page = page;
    // Reserve room button locator
    this.reserveRoomButton = page.locator('text="Reserve 1 Room"').first();
  }

  /**
   * Click the Reserve 1 Room button to proceed to guest details
   * Waits for navigation to guest/checkout/booking page
   */
  async clickReserveRoom() {
    // Perform click and wait for URL change simultaneously
    await Promise.all([
      this.page.waitForURL(/guest|checkout|booking/i),
      this.reserveRoomButton.click()
    ]);
  }
}

module.exports = { HotelDetailsPage };
