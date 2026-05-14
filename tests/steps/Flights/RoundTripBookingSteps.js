/**
 * @file flightBookingSteps.js
 * @description Step definitions for complete flight booking workflow on ixigo flights application.
 */

const { Given, When, Then } = require('@cucumber/cucumber');
const FlightBookingPage = require('../../pages/Flights/RoundTripBookingPage');

let flightPage;

/**
 * Launches ixigo website and initializes flight booking page object.
 */
Given('user opens ixigo flights application', async function () {

    flightPage = new FlightBookingPage(this.page);

    await flightPage.openFlightBookingWebsite();
});

When('user chooses flight type', async function () {
    await flightPage.chooseJourneyType();
});

/**
 * Selects origin city for flight search.
 */
When('user enters departure city', async function () {

    this.searchStatus = await flightPage.enterDepartureCity();

    if(this.searchStatus === false){
        return;
    }
});

/**
 * Selects destination city for flight search.
 */
When('user enters arrival city', async function () {

    this.searchStatus = await flightPage.enterArrivalCity();

    if(this.searchStatus === false){
        return;
    }
});

/**
 * Selects departure date for flight booking.
 */
When('user chooses onward journey date', async function () {

    if(this.searchStatus === false){
        return;
    }

    await flightPage.chooseDepartureDate();
});

When('user chooses return journey date when required', async function () {

    if(this.searchStatus === false){
        return;
    }

    await flightPage.chooseReturnDate();
});

/**
 * Clicks search button to fetch available flights.
 */
When('user starts flight search', async function () {

    if(this.searchStatus === false){
        return;
    }

    this.searchStatus = await flightPage.startFlightSearch();
});

/**
 * Applies required flight filters on search results page.
 */
When('user applies preferred flight filters' , async function () {

    if(this.searchStatus === false){
        return;
    }

    await flightPage.applyFlightFilters();
});

/**
 * Selects and books first available flight from results.
 */
When('user selects available flight option', async function () {

    if(this.searchStatus === false){
        return;
    }

    await flightPage.chooseAvailableFlight();
});

/**
 * Fills passenger information required for booking.
 */
Then('user enters traveller information', async function () {

    if(this.searchStatus === false){
        return;
    }

    await flightPage.enterTravellerInformation();
});

/**
 * Verifies and confirms booking details before proceeding.
 */
Then('user verifies booking information', async function () {

    if(this.searchStatus === false){
        return;
    }

    await flightPage.verifyBookingInformation();
});

/**
 * Selects seats for passenger booking.
 */
Then('user chooses preferred seats', async function () {

    if(this.searchStatus === false){
        return;
    }

    await flightPage.choosePreferredSeats();
});

/**
 * Selects meals for passenger booking.
 */
Then('user adds meal preferences', async function () {

    if(this.searchStatus === false){
        return;
    }

    await flightPage.addMealPreferences();
});

/**
 * Continues workflow to payment page.
 */
Then('user proceeds towards payment section', async function () {

    if(this.searchStatus === false){
        return;
    }

    await flightPage.proceedToPaymentSection();
});

// Booking flow intentionally stops before payment to avoid actual transaction or ticket confirmation.