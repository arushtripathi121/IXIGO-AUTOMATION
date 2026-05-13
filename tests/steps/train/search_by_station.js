const { Given, When, Then } = require("@cucumber/cucumber");
const { SearchByStation } = require("../../pages/train/search_by_station_page");

let search_by_station;

Given('proceed to {string}', async function (url) {
    search_by_station = new SearchByStation(this.page);
    await search_by_station.navigatoApp(url);
})
When("select train option on dashboard", async function () {
    await search_by_station.TrainSection();
})
When("select search by station name section", async function () {
    await search_by_station.SearchByStation();
})
When("enter staion name to get desired results {string}", async function (station_name) {
    await search_by_station.enter_station_name(station_name);
})
When("click search button", async function () {
    await search_by_station.click_searchBTN();
})
When("click Book button to buy tickets", async function () {
    await search_by_station.click_book_button_to_buy_tickets();
})
When("check for available and book tickets", async function () {
    await search_by_station.check_for_availability_to_book_tickets();
})
When("add new traveller and enter their details", async function () {
    await search_by_station.add_new_traveller();
})
When("enter payment details", async function () {
    await search_by_station.enter_payment_details();
})
Then("payment page should load successfully", async function () {
    await search_by_station.paymentpageload();
    console.log("Tested is Completed successfully");
})
