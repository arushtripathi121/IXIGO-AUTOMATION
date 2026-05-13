const { Given, When, Then } = require('@cucumber/cucumber');
const { TrainPlatformLocator } = require('../../pages/train/train_platform_locator_page');

let train_platform_locator;

Given('load {string}', async function (url) {
    train_platform_locator = new TrainPlatformLocator(this.page);
    await train_platform_locator.load_url(url);
})
When('select train module in the dashboard', async function () {
    await train_platform_locator.TrainSection();
})
When('select train paltform locator option', async function () {
    await train_platform_locator.TrainPlatformLocator();
})
When('enter train name or number to get desired results {string}', async function (name_or_number) {
    await train_platform_locator.Enter_Train_NameOrNumber_to_get_data(name_or_number);
})
When('click on search platform button', async function () {
    await train_platform_locator.click_platform_seach();
})
When('click on book button to particular station', async function () {
    await train_platform_locator.click_book_ticket_desired_station();
})
When('change the date to travel on desired date', async function () {
    await train_platform_locator.change_departure_date();
})
When('apply some filters to get desired results to book ticket', async function () {
    await train_platform_locator.apply_filter_to_book_ticket();
})
When('select the available class and coach you want to travel', async function () {
    await train_platform_locator.confirm_to_book_ticket();
})
When('proceed with payment process', async function () {
    await train_platform_locator.enter_traveller_deatails();
    await train_platform_locator.enter_payment_details();
})
Then('payment page should visible successfully', async function () {
    await train_platform_locator.paymentpageload();
    await this.page.screenshot({ path: 'screenshot/Train_Ticket_Sceanrio2_payment_page.png' });
})
