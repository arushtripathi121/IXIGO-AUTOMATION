/**
 * hotelWishlistSteps - Cucumber step definitions for Hotel Wishlist feature
 * Maps Gherkin feature steps for wishlist and offers functionality
 */
const { Given, When, Then } = require('@cucumber/cucumber');

const HomePage = require('../../pages/Hotels/HomePage');
const HotelsPage = require('../../pages/Hotels/HotelsPage');
const HotelSearchResultsPage = require('../../pages/Hotels/HotelSearchResultsPage');
const HotelDetailsPage = require('../../pages/Hotels/HotelDetailsPage');
const ProfilePage = require('../../pages/Hotels/ProfilePage');
const OffersPage = require('../../pages/Hotels/OffersPage');
const OfferDetailsPage = require('../../pages/Hotels/OfferDetailsPage');

/**
 * Step: Navigate to Ixigo home page
 */
Given('the user is on the ixigo homepage', async function () {
    this.homePage = new HomePage(this.page);
    await this.homePage.navigate();
});

/**
 * Step: Navigate to Hotels section
 */
When('the user navigates to the "Hotels" section', async function () {
    await this.homePage.clickHotelsMenu();
});

/**
 * Step: Click on 3rd popular destination card
 */
When('the user clicks on the 3rd card in the "Popular Destinations" section', async function () {
    this.hotelsPage = new HotelsPage(this.page);
    this.page = await this.hotelsPage.clickThirdPopularDestination();
});

/**
 * Step: Open first hotel from search results
 */
When('the user opens the first hotel from the search results', async function () {
    this.hotelSearchResultsPage = new HotelSearchResultsPage(this.page);
    this.page = await this.hotelSearchResultsPage.clickFirstHotelAndGetNewPage();
});

/**
 * Step: Save hotel to wishlist
 */
When('the user saves the hotel using the Save icon', async function () {
    this.hotelDetailsPage = new HotelDetailsPage(this.page);
    this.savedHotelName = await this.hotelDetailsPage.getHotelName();
    await this.hotelDetailsPage.clickSaveIcon();
});

/**
 * Step: Navigate to wishlist from profile
 */
When('the user navigates to the "Hotels Wishlist" from the Profile dropdown', async function () {
    this.profilePage = new ProfilePage(this.page);
    await this.profilePage.navigateToWishlist();
});

/**
 * Step: Verify hotel is in wishlist
 */
Then('the saved hotel should be visible in "My Wishlist"', async function () {
    console.log('Saved hotel name:', this.savedHotelName);
    await this.profilePage.verifyHotelInWishlist(this.savedHotelName);
});

/**
 * Step: Click View All in Offers section
 */
When('the user clicks "View All" in the Offers For You section', async function () {
    this.hotelsPage = new HotelsPage(this.page);
    this.page = await this.hotelsPage.clickViewAllOffers();
});

/**
 * Step: Apply Hotels category filter
 */
When('the user applies the "Hotels" category filter', async function () {
    this.offersPage = new OffersPage(this.page);
    await this.offersPage.selectHotelsCategory();
});

/**
 * Step: Apply Domestic journey filter
 */
When('the user applies the "Domestic" Journey Type filter', async function () {
    await this.offersPage.selectDomesticFilter();
});

/**
 * Step: Select first bank from popular banks
 */
When('the user selects the first bank from Popular Banks', async function () {
    await this.offersPage.selectFirstPopularBank();
});

/**
 * Step: Extract and save offer code
 */
Then('the user saves the offer code of the first offer and prints it', async function () {
    this.savedOfferCode = await this.offersPage.getFirstOfferCode();
    console.log('Saved Offer Code:', this.savedOfferCode);
});

/**
 * Step: Click Details button on offer
 */
When('the user clicks the "Details" button of the first offer', async function () {
    this.page = await this.offersPage.clickFirstOfferDetails();
});

/**
 * Step: Verify offer code matches on details page
 */
Then('the saved offer code should exactly match the code on the Offer Details page', async function () {
    this.offerDetailsPage = new OfferDetailsPage(this.page);
    await this.offerDetailsPage.validateOfferCode(this.savedOfferCode);
});
