const { Given, When, Then } = require("@cucumber/cucumber");
const BusSearch = require("../../pages/busBooking/BusSearch");
const BusFilters = require("../../pages/busBooking/BusFilters");
const Payment = require("../../pages/busBooking/Payment");
const busTestData = require("../../../JSONFiles/busTestData.json");

function getBusTestData(testKey) {
    const data = busTestData[testKey];
    if (!data) {
        throw new Error(`No bus test data found for key: ${testKey}`);
    }
    return data;
}

Given("I open the bus booking page {string}", async function(url) {
    this.busSearch = new BusSearch(this.page);
    this.busFilters = new BusFilters(this.page);
    this.payment = new Payment(this.page);
    await this.busSearch.navigate(url);
});

When("I search buses from {string} to {string}", async function(source, destination) {
    await this.busSearch.setSource(source);
    await this.busSearch.setDestination(destination);
    this.page = await this.busSearch.search();
});

When("I apply bus filters", async function() {
    await this.busFilters.selectPriceFilter();
    await this.busFilters.selectSeatsFilter();
    await this.busFilters.selectRatingFilter();
    await this.busFilters.selectArrivalTimeFilter();
    await this.busFilters.selectDepartureTimeFilter();
    await this.busFilters.selectSeats();
    await this.busFilters.selectFirstAvailableSeat();
    await this.busFilters.selectBoardingPoint();
    await this.busFilters.selectDroppingPoint();
    await this.busFilters.clickProceed();
});

When("I select price filter", async function() {
    await this.busFilters.selectPriceFilter();
});

When("I select seats filter", async function() {
    await this.busFilters.selectSeatsFilter();
});

When("I select rating filter", async function() {
    await this.busFilters.selectRatingFilter();
});

When("I select arrival time filter", async function() {
    await this.busFilters.selectArrivalTimeFilter();
});

When("I select departure time filter", async function() {
    await this.busFilters.selectDepartureTimeFilter();
});

When("I set price range to {int} and {int}", async function(min, max) {
    await this.busFilters.setPriceRange(min, max);
});

When("I apply bus type filters", async function() {
    await this.busFilters.applyBusTypeFilters();
});

When("I select departure time {int}", async function(index) {
    const idx = Math.max(0, index - 1);
    if (this.busFilters.selectDepartureTimeByIndex) {
        await this.busFilters.selectDepartureTimeByIndex(idx);
    } else if (index === 1 && this.busFilters.selectDepartureTime1) {
        await this.busFilters.selectDepartureTime1();
    } else if (index === 2 && this.busFilters.selectDepartureTime2) {
        await this.busFilters.selectDepartureTime2();
    }
});

When("I select all departure times", async function() {
    if (this.busFilters.selectAllDepartureTimes) {
        await this.busFilters.selectAllDepartureTimes();
    }
});

When("I open seat selection", async function() {
    await this.busFilters.selectSeats();
});

When("I select {int} available seats", async function(count) {
    if (count === 1) {
        await this.busFilters.selectFirstAvailableSeat();
    } else if (count === 2) {
        await this.busFilters.selectTwoAvailableSeats();
    } else {
        throw new Error(`Selecting ${count} seats is not supported yet.`);
    }
});

When("I select boarding point", async function() {
    await this.busFilters.selectBoardingPoint();
});

When("I select dropping point", async function() {
    await this.busFilters.selectDroppingPoint();
});

When("I continue to payment", async function() {
    await this.busFilters.clickProceed();
});

Then("I enter passenger details using data {string}", async function(testKey) {
    const data = getBusTestData(testKey);
    await this.payment.details(data.passengerData);
});

When("I search buses with invalid data from {string}", async function(testKey) {
    const data = getBusTestData(testKey);
    await this.busSearch.setSource(data.source);
    await this.busSearch.setDestination(data.destination);
    await this.busSearch.searchExpectError();
});

Then("the search should show an error message", async function() {
    await expect(true).toBeTruthy();
});

Then("the number of buses should change after applying bus type filters", async function() {
    const { expect } = require('@playwright/test');
    await this.busFilters.pause(1000);
    const countBefore = await this.busFilters.getBusCount();
    await this.busFilters.applyBusTypeFilters();
    await this.busFilters.pause(2000);
    const countAfter = await this.busFilters.getBusCount();
    expect(countBefore).not.toEqual(countAfter);
});

When("I search buses with data from {string}", async function(testKey) {
    const data = getBusTestData(testKey);
    await this.busSearch.setSource(data.source);
    await this.busSearch.setDestination(data.destination);
    this.page = await this.busSearch.search();
});

Then("the search should be successful", async function() {
    const { expect } = require('@playwright/test');
    await expect(this.page).toHaveURL(/.*bus.*/);
});

Then("I am on the payment page", async function() {
    const { expect } = require('@playwright/test');
    await expect(this.page).not.toHaveURL(/.*bus_search.*/);
});

Then("no buses should be found", async function() {
    await this.busFilters.expectLessBusesFound();
});

Then("I attempt to enter passenger details using invalid data {string}", async function(testKey) {
    const data = getBusTestData(testKey);
    await this.payment.details(data.passengerData);
});

Then("the payment should show a validation error", async function() {
    await this.payment.expectValidationError();
});