const { expect } = require('@playwright/test');
const Data = require('../../../JSONFiles/flightData.json');
const testData = Data[0];

class FlightBookingPage {

    constructor(page) {
        this.page = page;
        this.fromBlock = page.locator('//span[text() = "From"]');
        this.fromInput = page.locator('//label[text() = "From"]/following-sibling::input');
        this.toInput = page.locator('//label[text() = "To"]/following-sibling::input');
        this.departureDate = page.locator(`//abbr[@aria-label="${testData.date}"]`);
        this.studentBTN = page.locator('//span[text()="Student"]');
        this.seniorCitizenBTN = page.locator('//span[text()="Senior Citizen"]');
        this.businessClassBTN = page.locator('//span[text()="Business"]');
        this.searchButton = page.locator('//button[text()="Search"]');
        this.filter1 = page.locator('//input[@value="cheapest"]');
        this.filter2 = page.locator('//input[@type="checkbox"]').nth(1);
        this.bookButton = page.locator('//button[text()="Book"]').nth(0);
        this.titleInput = page.locator('//label[text()="Title"]/following-sibling::input');
        this.mrOption = page.locator('//p[text()="Mr"]');
        this.firstNameInput = page.locator('//label[text()="First & Middle Name"]/following-sibling::input');
        this.lastNameInput = page.locator('//label[text()="Last Name"]/following-sibling::input');
        this.emailInput = page.locator('//label[text()="Email"]/following-sibling::input');
        this.DOBInput = page.locator('//label[text()="Date of Birth"]/following-sibling::input');
        this.addressInput = page.locator('//label[text()="Address"]/following-sibling::input');
        this.freeCancellation = page.locator("#standalone-none-fareType");
        this.confirmBTN = page.locator('//button[text() = "Confirm"]');
        this.BTN = page.locator('//button[text() = "No, Thanks"]');
        this.continueBTN = page.locator('//button[contains(text(),"Continue")]');
        this.seatBTN = page.locator('(//img[@alt="w-auto seat-icon"])').nth(17);
        this.mealBTN = page.locator('//button[text() = "Meal Selection"]');
        this.addMealBTN = page.locator('(//button[text() = "Add"])').nth(2);
        this.skipBTN = page.locator('//button[text() = "Continue To Pay"]');
        this.delhiOption = page.locator(`//span[contains(text(),"${testData.originCode}")]`).first();
        this.firstSuggestion = page.locator(`//span[text()="${testData.destination}"]`).first();
        this.toBlockText = page.locator('//span[text() = "To"]/following-sibling::p');
    }

    async isElementVisible(locator){
        return await locator.waitFor({ state: 'visible', timeout: 3000 }).then(() => true).catch(() => false);
    }

    async launchWebsite() {
        await this.page.goto('https://www.ixigo.com/flights');
        await expect(this.page).toHaveURL(/ixigo/);
    }

    async selectOrigin() {
        await this.fromBlock.click();

        if(!testData.origin){
            console.log("Negative Test : Origin Empty");
            return;
        }

        await this.fromInput.fill(testData.origin);
        await expect(this.delhiOption).toBeVisible();

        const suggestionCount = await this.page.locator('//span[@class="text-primary text-sm"]').count();

        if(suggestionCount === 0){
            console.log("Negative Test : Invalid Origin");
            return;
        }

        await this.delhiOption.click();

        if(!testData.destination){
            console.log("Negative Test : Destination Empty");
            return;
        }

        await this.toInput.fill(testData.destination);

        const destinationCount = await this.page.locator('//span[@class="text-primary text-sm"]').count();

        if(destinationCount === 0){
            console.log("Negative Test : Invalid Destination");
            return;
        }

        await this.firstSuggestion.click();
        await this.departureDate.click();
    }

    async clickSearch() {
        await this.searchButton.click();

        if(testData.isNegative){
            console.log("Negative Test Passed");

            await this.page.screenshot({
                path: 'screenshots/search_failure.png',
                fullPage: true
            });

            return false;
        }

        console.log("Positive Test Passed");
        return true;
    }

    async clickFilter1(){
        if(testData.student){
            await this.studentBTN.click();
        }

        if(testData['Senior Citizen']){
            const dob = new Date(testData.dob);
            const today = new Date();
            let age = today.getFullYear() - dob.getFullYear();

            if(age > 60){
                await this.seniorCitizenBTN.click();
            }
        }

        await this.filter1.click();
        await expect(this.filter1).toBeChecked();

        await this.filter2.click();
        await expect(this.filter2).toBeChecked();
    }

    async bookFlight() {
        await this.bookButton.click();
    }

    async fillPassengerDetails() {

        if(await this.isElementVisible(this.freeCancellation)){
            await this.freeCancellation.click();
            await expect(this.freeCancellation).toBeChecked();
        }

        await this.titleInput.click();
        await this.mrOption.click();

        await this.firstNameInput.fill(testData.firstName);
        await expect(this.firstNameInput).toHaveValue(testData.firstName);

        await this.lastNameInput.fill(testData.lastName);
        await expect(this.lastNameInput).toHaveValue(testData.lastName);

        await this.emailInput.fill(testData.email);
        await expect(this.emailInput).toHaveValue(testData.email);

        if(await this.isElementVisible(this.DOBInput)){
            await this.DOBInput.fill(testData.dob);
            await expect(this.DOBInput).toHaveValue(testData.dob);
        }

        await this.addressInput.fill(testData.address);
        await expect(this.addressInput).toHaveValue(testData.address);

        await this.continueBTN.click();
    }

    async confirmBookingDetails() {
        await this.confirmBTN.click();

        if(await this.isElementVisible(this.BTN)){
            await this.BTN.click();
        }
    }

    async selectSeats() {
        await this.seatBTN.click();

        if(await this.isElementVisible(this.mealBTN)){
            await this.mealBTN.click();
        }
    }

    async selectMeals() {

        if(await this.isElementVisible(this.addMealBTN)){
            await this.addMealBTN.click();
        }

        if(await this.isElementVisible(this.continueBTN)){
            await this.continueBTN.click();
        }

        if(await this.isElementVisible(this.continueBTN)){
            await this.continueBTN.click();
        }
    }

    async continueToPayment() {

        if(await this.isElementVisible(this.skipBTN)){
            await this.skipBTN.click();
        }
        await expect(this.page.locator('//p[text()="Scan & Pay with UPI"]')).toBeVisible({timeout:12000});
        await this.page.screenshot({path: 'screenshot/screenshot.png'});
    }
}

module.exports = FlightBookingPage;