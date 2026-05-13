const { OrderFood } = require("../../pages/train/train_food_order_page");
const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");


let order_food, newpage;
Given("navi to {string}", async function (url) {
    order_food = new OrderFood(this.page)
    await order_food.navigatetoApp(url);
})

When("select train section on dashboard", async function () {
    await order_food.TrainSection();
})
When("click on Order food on train section", async function () {
    newpage = await order_food.OrderFood();
})
When("enter valid PNR number {string}", async function (pnr) {
    await order_food.PnrTf(newpage, pnr)
})
When("select any one of hotels", async function () {
    await order_food.SelectHotels(newpage)
})
When("add some filters to sort out desired  results", async function () {
    await order_food.AddFilters(newpage);
})
When("select meals to Order", async function () {
    await order_food.AddProducts(newpage)
})
When("click on next button", async function () {
    await order_food.ProceedNext(newpage);
})
When("enter passengers name {string}", async function (name) {
    await order_food.PassengerName(newpage, name);
})
When("enter contact details {string}", async function (contact) {
    await order_food.ContactNo(newpage, contact);
})
When("select payment method", async function () {
    await order_food.PaymentMethod(newpage)
})
When("click on continue button", async function () {
    await order_food.ProceedContinue(newpage)
})
Then("payment page should load successfull", async function () {
    await order_food.PaymentPageLoad(newpage);
    console.log("Tested is completed successfully")
})