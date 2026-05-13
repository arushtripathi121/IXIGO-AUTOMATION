const { PaymentDetails } = require('../../helpers/payment_detail_page');
class VandeBharat_Booking {
    constructor(page) {
        this.page = page;
        this.train_section = page.locator(`(//p[text()="Trains"])[2]`);
        this.Vande_Bharat_section = page.locator('//div[text()="Vande Bharat"]');
        this.show_availabity = page.locator('(//button[text()="Show Availability"])[1]');
        this.BooK_NA = page.locator(`(//div[@class="day-item u-ib na"])[1]`);
        this.Book_green = page.locator(`(//div[@class="day-item u-ib green"])[1]`);
        this.Final_BookBtn = page.getByRole('button', { name: 'BOOK' });
        this.payment_flow = PaymentDetails(this.page);
    }
    async navigatetoApp(url) {
        await this.page.goto(url);
    }
    async TrainSection() {
        await this.train_section.click();
    }
    async click_Vande_Bharat_section() {
        await this.Vande_Bharat_section.click();
    }
    async click_show_availabity() {
        await this.show_availabity.click();
        await this.page.waitForTimeout(2000);
    }
    async CheckAvailability_seat_Book_ticket() {
        if (await this.BooK_NA.isVisible()) {
            await this.BooK_NA.click();
            await this.page.waitForTimeout(2000);
        }
        await this.Book_green.click();
        await this.Final_BookBtn.click();
    }
    async enter_traveller_details_and_complete_the_payment() {
        await this.payment_flow.AddNewTraveler();
        await this.payment_flow.EnterPaymentDetails_for_TRL();
    }
    async paymentpageload() {
        await this.payment_flow.PaymentPageLoad();
    }
}
module.exports = { VandeBharat_Booking };
