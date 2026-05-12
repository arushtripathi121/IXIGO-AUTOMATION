/**
 * HotelBookingSteps - Cucumber step definitions for Hotel Booking feature
 * Maps Gherkin feature steps to Playwright page object methods
 */
const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const path = require('path');
const fs = require('fs');
const { HomePage } = require('../../pages/Hotels/HomePages');
const { HotelSearchPage } = require('../../pages/Hotels/HotelSearchPage');
const { HotelResultsPage } = require('../../pages/Hotels/HotelResultsPage');
const { HotelDetailsPage } = require('../../pages/Hotels/HotelDetailsPages');
const { GuestDetailsPage } = require('../../pages/Hotels/GuestDetailsPage');

/**
 * Step: Navigate to Ixigo home page
 * Assumption: User is already logged in via authHook.js
 */
Given('the user is logged into Ixigo and is on the Home Page', async function () {
  // Navigation is handled here. The authHook.js already injected the logged-in state.
  await this.page.goto('https://www.ixigo.com');
  this.homePage = new HomePage(this.page);
});

/**
 * Step: Load test data for a specific test case
 * Reads from hotelTestCases.json
 */
When('the user loads test data for {string}', function (testCaseKey) {
  const dataPath = path.resolve(__dirname, '../../../JSONFiles/hotelTestCases.json');
  const rawData = fs.readFileSync(dataPath);
  const testCases = JSON.parse(rawData);

  this.testData = testCases[testCaseKey];
  if (!this.testData) {
    throw new Error(`Test data for key ${testCaseKey} not found!`);
  }
});

/**
 * Step: Navigate to Hotels section
 */
When('the user clicks on "Hotels"', async function () {
  await this.homePage.navigateToHotels();
  this.hotelSearchPage = new HotelSearchPage(this.page);
});

/**
 * Step: Enter search parameters (destination, dates, rooms, guests)
 */
When('the user enters Destination, Check-in Date, Check-out Date, Room and Guests', async function () {
  const { search } = this.testData;
  await this.hotelSearchPage.enterDetails(search.destination);
});

/**
 * Step: Click search button and navigate to results page
 */
When('the user clicks on the "Search" button', async function () {
  this.resultsPageInstance = await this.hotelSearchPage.clickSearch();
});

/**
 * Step: Initialize results page object
 */
Then('the user should see the search results', async function () {
  this.hotelResultsPage = new HotelResultsPage(this.resultsPageInstance || this.page);
});

/**
 * Step: Apply filters (Best Price Guarantee, Free Cancellation)
 */
When('the user applies the filters: Best Price Guarantee and Free Cancellation', async function () {
  await this.hotelResultsPage.applyFilters();
});

/**
 * Step: Sort results by price
 */
When('the user sorts the results by "Price Low to High"', async function () {
  await this.hotelResultsPage.sortResults();
});

/**
 * Step: Open first hotel card from results
 */
When('the user opens the first Hotel Card', async function () {
  // openFirstHotel returns a new page object because it opens in a new tab
  this.newTabPage = await this.hotelResultsPage.openFirstHotel();
  this.hotelDetailsPage = new HotelDetailsPage(this.newTabPage);
});

/**
 * Step: Click Reserve Room button
 */
When('the user clicks on "Reserve 1 Room"', async function () {
  await this.hotelDetailsPage.clickReserveRoom();
  this.page = this.hotelDetailsPage.page;
  this.guestDetailsPage = new GuestDetailsPage(this.page);
});

/**
 * Step: Fill guest details form
 */
When('the user enters Guest Details including Salutation, First Name, Last Name, Email, Mobile, and Nationality', async function () {
  const { guestDetails } = this.testData;
  await this.guestDetailsPage.fillGuestDetails(guestDetails);
});

/**
 * Step: Click Pay Now button
 */
When('the user clicks on "Pay Now"', async function () {
  await this.guestDetailsPage.clickPayNow();
});

/**
 * Step: Verify successful navigation to payment page
 */
Then('the user should successfully reach the payment page', async function () {
  const isPaymentOpen = await this.guestDetailsPage.isPaymentPageOpen();
  expect(isPaymentOpen).toBeTruthy();
});

/**
 * Step: Verify search is blocked for invalid input
 */
Then('the user clicks on "Search" and should be blocked', async function () {
  const isBlocked = await this.hotelSearchPage.clickSearchExpectFailure();
  expect(isBlocked).toBeTruthy();
});
