const { Given, Then, When } = require("@cucumber/cucumber");
const { VandeBharat_Booking } = require("../../pages/train/Vande_Bharat_page");


let vandeBharatBooking;

Given('start with {string}', async function (url) {
    vandeBharatBooking = new VandeBharat_Booking(this.page);
    await vandeBharatBooking.navigatetoApp(url);
})
When('select train mode in dashboard', async function () {
    await vandeBharatBooking.TrainSection();
})
When('select vande bharat section', async function () {
    await vandeBharatBooking.click_Vande_Bharat_section();
})
When('select any one specific Vande Bharat Train', async function () {
    await vandeBharatBooking.click_show_availabity();
})
When('check availability seat and book ticket to travel', async function () {
    await vandeBharatBooking.CheckAvailability_seat_Book_ticket();
})
When('enter traveller details and complete the payment', async function () {
    await vandeBharatBooking.enter_traveller_details_and_complete_the_payment();
})
Then('payment page should appear successfully', async function () {
    await vandeBharatBooking.paymentpageload();
    await this.page.screenshot({ path: 'screenshot/Vande_Bharat_Payment.png' });
})
