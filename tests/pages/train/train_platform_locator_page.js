const { expect } = require('@playwright/test');
const { PaymentDetails } = require('../../helpers/payment_detail_page');
const { urlToHttpOptions } = require('node:url');


class TrainPlatformLocator {
    constructor(page) {
        this.page = page;
        this.train_section = page.locator(`(//p[text()="Trains"])[2]`);
        this.train_platform_locator = page.locator('//div[text()="Train Platform"]');
        this.train_name_number = page.getByPlaceholder('Enter the train name or number');
        this.search_platformBtn = page.locator('//button[@class="c-btn u-link enabled"]');
        this.bookBtn = page.locator('(//button[@class="station-result-book-btn"])[3]');
        this.departure_date_section = page.getByPlaceholder('depart');
        this.departure_date = page.locator('//td[@data-date="25052026"]');
        this.searhBtn = page.locator('(//button[@class="c-btn u-link enabled"])[1]');
        this.coach_filter = page.locator('//div[@class="checkbox-list-item "]/descendant::span[text()="3A"]/preceding-sibling::span');
        this.show_availability = page.locator('(//span[@class="c-switch switch-off"])[3]');
        this.coach_select = page.locator(`(//span[@class="train-class" and text()='3A'])[1]`);
        this.final_bookBtn = page.locator('(//button[text()="Book"])[1]');
        this.payment_details = PaymentDetails(this.page);
    }
    async load_url(url) {
        await this.page.goto(url);
    }
    async TrainSection() {
        await this.train_section.click();
    }
    async TrainPlatformLocator() {
        await this.train_platform_locator.click();
    }
    async Enter_Train_NameOrNumber_to_get_data(name_or_number) {
        await this.train_name_number.click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.train_name_number.fill(name_or_number);
        await this.page.waitForTimeout(2000);
        await this.page.keyboard.press('Enter');
    }
    async click_platform_seach() {
        const url = await this.page.url()
        await this.search_platformBtn.click();
        await this.page.waitForTimeout(2000);
        if (url == await this.page.url()) {
            const do_nothing = async () => { };
            this.click_book_ticket_desired_station = do_nothing;
            this.change_departure_date = do_nothing;
            this.apply_filter_to_book_ticket = do_nothing;
            this.confirm_to_book_ticket = do_nothing;
            this.enter_traveller_deatails = do_nothing;
            this.enter_payment_details = do_nothing;
            this.paymentpageload = do_nothing;

        }
    }
    async click_book_ticket_desired_station() {
        await this.bookBtn.click();
    }
    async change_departure_date() {
        await this.page.waitForLoadState('networkidle');
        await this.departure_date_section.click();
        await this.page.waitForTimeout(2000);
        await this.departure_date.click();
        await this.searhBtn.click();
    }
    async apply_filter_to_book_ticket() {
        await this.coach_filter.click();
        await this.show_availability.click();
    }
    async confirm_to_book_ticket() {
        await this.coach_select.click()
        await this.final_bookBtn.click();
    }
    async enter_traveller_deatails() {
        await this.payment_details.AddNewTraveler();
    }
    async enter_payment_details() {
        await this.payment_details.EnterPaymentDetails_for_TRL();
    }
    async paymentpageload() {
        await this.payment_details.PaymentPageLoad();

    }
}
module.exports = { TrainPlatformLocator }