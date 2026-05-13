const { expect } = require('@playwright/test');

class BookPage {

    constructor(page) {

        this.page = page;
        this.fromInput = page.locator('//input[@placeholder="Enter Origin"]');
        this.toInput = page.locator('//input[@placeholder="Enter Destination"]');
        this.searchBtn = page.locator( '//button[@data-testid="book-train-tickets"]' );
        this.firstTrain = page.locator( '//div[contains(@class,"_prediction-text_")]' ).first();
        this.bookBtn = page.locator('//span[@class="body-xs truncate"]' ).first();
        this.addbtn = page.locator( '//div[@class="w-full py-15 text-center"]');
        this.name = page.locator('//input[@name="name"]');
        this.age = page.locator('//input[@name="age"]');
        this.savePassenger = page.locator( '//button[text()="Save Passenger"]');
        //   this.selectBtn = page.locator('//input[@type="checkbox"]').first();
        this.closeBtn = page.locator('(//button[@class="cursor-pointer"])[2]');
        this.proceedPay = page.locator('//button[text()="Proceed to Pay"]');
        this.noRefund = page.locator('//button[text()="No"]' );
 }

    //methods to perform actions on the elemnts and assertions to verify 
    async open() {

        await this.page.goto('https://www.ixigo.com/trains');

        await this.page.waitForLoadState('networkidle');

        await expect(this.page).toHaveURL(/trains/);
    }
    // ENTER SOURCE
    async enterSource(src) {

        await this.fromInput.click();

        await this.fromInput.fill(src);

        await expect(this.fromInput).toHaveValue(src);
    }

    // SELECT SOURCE
    async selectSource(source, stationCode) {

        const sourceStation = this.page.locator(
            `//p[contains(text(),"${source}") and contains(text(),"${stationCode}")]`
        );

        await expect(sourceStation).toBeVisible();

        await sourceStation.click();
    }

    // ENTER DESTINATION
    async enterDestination(dest) {

        await this.toInput.click();

        await this.toInput.fill(dest);

        await expect(this.toInput).toHaveValue(dest);
    }

    // SELECT DESTINATION
    async selectDestination(destination, stationCode) {

        const destinationStation = this.page.locator(
            `//p[contains(text(),"${destination}") and contains(text(),"${stationCode}")]`
        );

        await expect(destinationStation).toBeVisible();

        await destinationStation.click();
    }

    // SELECT DATE
    async selectDate(date) {

        const departureDate = this.page.locator(
            `//abbr[text()="${date}"]`
        ).first();

        await expect(departureDate).toBeVisible();

        await departureDate.click();
    }

    // CLICK SEARCH
    async search() {

        await this.searchBtn.click();

        await this.page.waitForTimeout(3000);
    }

    // VERIFY SEARCH PAGE
    async verifySearchPage() {

        await expect(this.page).toHaveURL(/search-pwa/);
    }

    // APPLY AC FILTER
    async applyAC() {

        await this.page.waitForTimeout(3000);

        const acFilter = this.page.locator(
            '(//input[@class="absolute opacity-0 w-full h-full inset-0 cursor-pointer"])[2]'
        );

        await expect(acFilter).toBeAttached();

        await acFilter.click({ force: true });
    }

    // SELECT FIRST TRAIN
    async selectFirstTrain() {

        await expect(this.firstTrain).toBeVisible();

        await this.firstTrain.click();
    }

    // CLICK BOOK
    async clickBook() {

        await expect(this.bookBtn).toBeVisible();

        await this.bookBtn.click();
    }

    // ADD PASSENGER
    async clickadd() {

        await expect(this.addbtn).toBeVisible();

        await this.addbtn.click();
    }

    // ENTER PASSENGER
    async enterPassenger(name, age) {

        await this.name.fill(name);

        await this.age.fill(age);

        await expect(this.name).toHaveValue(name);

        await expect(this.age).toHaveValue(age);
    }

    // SELECT GENDER
    async selectGender(gender) {

        const genderOption = this.page.locator(
            `//input[@value="${gender}"]`
        );

        await genderOption.click();

        await expect(genderOption).toBeChecked();
    }

    // SELECT BERTH
    async selectBerth(berth) {

        await this.page
            .locator('//input[@value="No Preference"]')
            .click({ force: true });

        const berthOption = this.page
            .getByText(berth, { exact: true })
            .last();

        await berthOption.click({ force: true });

        await expect(berthOption).toBeVisible();
    }
     async savePassengers() {

        await expect(this.savePassenger).toBeVisible();

        await this.savePassenger.click();
    }
//   async selectpassengers(){

//     await this.page.waitForLoadState('networkidle');

//     await this.selectBtn.waitFor({state: 'visible' });

//     await this.selectBtn.check();

//     console.log("Passenger selected");
// }
//     // SAVE PASSENGER
//     async savePassengers() {

//         await expect(this.savePassenger).toBeVisible();

//         await this.savePassenger.click();
//     }

    

    // CLOSE POPUP
    async closePopup() {

        await expect(this.closeBtn).toBeVisible();

        await this.closeBtn.click();
    }

    // PROCEED PAY
    async proceedPays() {

        await expect(this.proceedPay).toBeVisible();

        await this.proceedPay.click();
    }

    // NO REFUND
    async noRefundOption() {

        await expect(this.noRefund).toBeVisible();

        await this.noRefund.click();

        await this.page.screenshot({
            path: 'screenshot/payment.png'
        });
    }

    // NO STATION RESULTS
    async noStationResults() {

        const stationList = this.page.locator(
            '//p[contains(@class,"station-name")]'
        );

        await expect(stationList).toHaveCount(0);
    }

    // VALIDATION MESSAGE
    async validationMessage() {

        await expect(this.page).toHaveURL(/trains/);

        await expect(this.searchBtn).toBeVisible();
    }
}

module.exports = BookPage;