const { expect } = require("@playwright/test")
const { PaymentDetails } = require('../../helpers/payment_detail_page');

class SearchByStation {
    constructor(page) {
        this.page = page;
        this.train_section = page.locator(`(//p[text()="Trains"])[2]`);
        this.search_by_station = page.locator(`(//div[text()="Search By"])[2]`);
        this.station_nameTF = page.getByPlaceholder('Enter the station name or code');
        this.searchBtn = page.locator(`(//div[@class="search"])[2]`);
        this.BookBtn = page.getByRole('link', { name: 'Book Now' }).nth(1);
        this.BooK_NA = page.locator(`(//div[@class="day-item u-ib na"])[1]`);
        this.Book_green = page.locator(`(//div[@class="day-item u-ib green"])[1]`);
        this.Final_BookBtn = page.getByRole('button', { name: 'BOOK' });
        this.payment_flow = PaymentDetails(this.page);
    }
    async navigatoApp(url) {
        await this.page.goto(url);
    }
    async TrainSection() {
        await this.train_section.click();
    }
    async SearchByStation() {
        await this.search_by_station.click();
    }
    async enter_station_name(station_name) {
        await this.page.waitForLoadState('networkidle');
        await this.station_nameTF.click()
        await this.station_nameTF.fill(station_name);
        await this.page.waitForTimeout(3000);
        await this.page.keyboard.press("Enter");
    }
    async click_searchBTN() {
        await this.searchBtn.click();
        await this.page.waitForTimeout(2000)
        this.erromsg = this.page.locator('//div[@class="error-msg"]');
        await this.page.waitForTimeout(1000); // Wait briefly for error to appear
        if (await this.erromsg.isVisible() && (await this.erromsg.textContent()).includes("enter station name/code")) {
            //Dynamically override the remaining  methods to do nothing and pass
            const do_nothing = async () => { };
            this.click_book_button_to_buy_tickets = do_nothing;
            this.check_for_availability_to_book_tickets = do_nothing;
            this.add_new_traveller = do_nothing;
            this.enter_payment_details = do_nothing;
            this.paymentpageload = do_nothing;
            console.log('You have entered the wrong station name/code');
            await this.page.screenshot({ path: "screenshot/Train_Ticket_invalid_pnr.png" });
        }
    }
    async click_book_button_to_buy_tickets() {
        await this.page.waitForTimeout(2000);
        await this.BookBtn.click();
    }
    async check_for_availability_to_book_tickets() {
        if (await this.BooK_NA.isVisible()) {
            await this.BooK_NA.click();
            await this.page.waitForTimeout(2000)
        }
        await this.Book_green.click();
        await this.Final_BookBtn.click();
    }
    async add_new_traveller() {
        await this.payment_flow.AddNewTraveler();
    }
    async enter_payment_details() {
        await this.payment_flow.EnterPaymentDetails_for_TRL();
    }
    async paymentpageload() {
        await this.payment_flow.PaymentPageLoad();
    }
}
module.exports = { SearchByStation };