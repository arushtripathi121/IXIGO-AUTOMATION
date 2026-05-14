const { expect } = require('@playwright/test');
const Data = require('../../../JSONFiles/roundTripData.json');
const testData = Data[0];

class RoundTripBookingPage {

    constructor(page) {
        this.page = page;
        this.departureCitySection = page.locator('//span[text() = "From"]');
        this.departureCityInput = page.locator('//label[text() = "From"]/following-sibling::input');
        this.arrivalCityInput = page.locator('//label[text() = "To"]/following-sibling::input');
        this.onwardJourneyDate = page.locator(`//abbr[@aria-label="${testData.date}"]`);
        this.studentFareOption = page.locator('//span[text()="Student"]');
        this.seniorCitizenFareOption = page.locator('//span[text()="Senior Citizen"]');
        this.businessTravelClassOption = page.locator('//span[text()="Business"]');
        this.flightSearchButton = page.locator('//button[text()="Search"]');
        this.lowestFareFilter = page.locator('//input[@value="cheapest"]');
        this.additionalFilterOption = page.locator('//input[@type="checkbox"]').nth(1);
        this.availableFlightSelectionButton = page.locator('//button[text()="Book"]').nth(0);
        this.passengerTitleDropdown = page.locator('//label[text()="Title"]/following-sibling::input');
        this.mrTitleOption = page.locator('//p[text()="Mr"]');
        this.travellerFirstNameInput = page.locator('//label[text()="First & Middle Name"]/following-sibling::input');
        this.travellerLastNameInput = page.locator('//label[text()="Last Name"]/following-sibling::input');
        this.travellerEmailInput = page.locator('//label[text()="Email"]/following-sibling::input');
        this.travellerDOBInput = page.locator('//label[text()="Date of Birth"]/following-sibling::input');
        this.travellerAddressInput = page.locator('//label[text()="Address"]/following-sibling::input');
        this.freeCancellationOption = page.locator("#standalone-none-fareType");
        this.bookingConfirmationButton = page.locator('//button[text() = "Confirm"]');
        this.skipProtectionButton = page.locator('//button[text() = "No, Thanks"]');
        this.continueBookingButton = page.locator('//button[contains(text(),"Continue")]').first();
        this.flightSeatOption = page.locator('//img[@alt="w-auto seat-icon"]').nth(7);
        this.mealSelectionButton = page.locator('//button[text() = "Meal Selection"]');
        this.addMealOptionButton = page.locator('(//button[text() = "Add"])').nth(2);
        this.paymentProceedButton = page.locator('//button[text() = "Continue To Pay"]');
        this.departureCitySuggestion = page.locator(`//span[contains(text(),"${testData.origin}")]`).first();
        this.arrivalCitySuggestion = page.locator(`//span[text()="${testData.destination}"]`).first();
        this.destinationDisplayText = page.locator('//span[text() = "To"]/following-sibling::p');
        this.oneWayJourneyOption = page.locator('//button[text()="One Way"]');
        this.roundTripJourneyOption = page.locator('//button[text()="Round Trip"]');
        this.nextJourneyFlightButton = page.locator('//button[text()="Next Flight"]');
        this.returnJourneyDate = page.locator(`//abbr[@aria-label="${testData.returnDate}"]`);
        this.loaderText = page.locator('text=Creating travel itinerary...');
    }

    async isElementVisible(locator){
        return await locator.waitFor({ state: 'visible', timeout: 3000 }).then(() => true).catch(() => false);
    }

    isRoundTrip(){
        return testData.tripType === "Round Trip";
    }

    async openFlightBookingWebsite() {
        await this.page.goto('https://www.ixigo.com/flights');
        await expect(this.page).toHaveURL(/ixigo/);
    }

    async chooseJourneyType(){

        if(!this.isRoundTrip()){
            await this.oneWayJourneyOption.click();
        }

        else{
            await this.roundTripJourneyOption.click();
        }
    }

    async enterDepartureCity() {

    await this.departureCitySection.click();

    if(!testData.origin){
        console.log("Negative Test : Origin Empty");
        return false;
    }

    await this.departureCityInput.fill(testData.origin);

    if(!await this.isElementVisible(this.departureCitySuggestion)){
        console.log("Negative Test : Invalid Origin");
        return false;
    }

    await this.departureCitySuggestion.click();

    return true;
}
async enterArrivalCity() {
    if(!testData.destination){
        console.log("Negative Test : Destination Empty");
        return false;
    }
    await this.arrivalCityInput.fill(testData.destination);
    const suggestionLocator = this.page.locator(`//div[@role="listitem"]//span[contains(text(),"${testData.destinationCode}")]`).first();
    if(!await this.isElementVisible(suggestionLocator)){
        console.log("Negative Test : Invalid Destination");
        return false;
    }
    await suggestionLocator.click();
    return true;
}

    async chooseDepartureDate() {
        await this.onwardJourneyDate.click();
    }

    async chooseReturnDate(){

        if(this.isRoundTrip()){
            await this.returnJourneyDate.click();
        }
    }

    async startFlightSearch() {

        if(testData.typeOfFlight == "Economy"){

            if(await this.isElementVisible(this.flightSearchButton)){
                await this.flightSearchButton.click();
            }
        }

        else{

            await this.businessTravelClassOption.click();

            if(await this.isElementVisible(this.flightSearchButton)){
                await this.flightSearchButton.click();
            }
        }

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

    async applyFlightFilters(){

        if(!this.isRoundTrip()){

            if(testData.student){
                await this.studentFareOption.click();
            }

            if(testData['Senior Citizen']){

                const dob = new Date(testData.dob);
                const today = new Date();

                let age = today.getFullYear() - dob.getFullYear();

                if(age > 60){
                    await this.seniorCitizenFareOption.click();
                }
            }

            await this.lowestFareFilter.click();
            await expect(this.lowestFareFilter).toBeChecked();

            await this.additionalFilterOption.click();
            await expect(this.additionalFilterOption).toBeChecked();
        }
    }

    async chooseAvailableFlight() {
        await this.availableFlightSelectionButton.click();
    }

    async enterTravellerInformation() {

        if(await this.isElementVisible(this.freeCancellationOption)){
            await this.freeCancellationOption.click();
            await expect(this.freeCancellationOption).toBeChecked();
        }

        await this.passengerTitleDropdown.click();
        await this.mrTitleOption.click();

        await this.travellerFirstNameInput.fill(testData.firstName);
        await expect(this.travellerFirstNameInput).toHaveValue(testData.firstName);

        await this.travellerLastNameInput.fill(testData.lastName);
        await expect(this.travellerLastNameInput).toHaveValue(testData.lastName);

        await this.travellerEmailInput.fill(testData.email);
        await expect(this.travellerEmailInput).toHaveValue(testData.email);

        if(await this.isElementVisible(this.travellerDOBInput)){
            await this.travellerDOBInput.fill(testData.dob);
            await expect(this.travellerDOBInput).toHaveValue(testData.dob);
        }

        await this.travellerAddressInput.fill(testData.address);
        await expect(this.travellerAddressInput).toHaveValue(testData.address);

        if(await this.isElementVisible(this.continueBookingButton)){
            await this.continueBookingButton.click();
        }
    }

    async verifyBookingInformation() {

        await this.bookingConfirmationButton.click();

        if(await this.isElementVisible(this.skipProtectionButton)){
            await this.skipProtectionButton.click();
        }
    }

    async choosePreferredSeats() {

        await this.flightSeatOption.click();

        if(await this.isElementVisible(this.nextJourneyFlightButton)){
            await this.nextJourneyFlightButton.click();
        }

        await this.flightSeatOption.click();

        if(await this.isElementVisible(this.mealSelectionButton)){
            await this.mealSelectionButton.click();
        }

        if(await this.isElementVisible(this.nextJourneyFlightButton)){
            await this.nextJourneyFlightButton.click();
        }
    }

    async addMealPreferences() {

        if(await this.isElementVisible(this.continueBookingButton)){
            await this.continueBookingButton.click();
        }

        await this.page.waitForLoadState('domcontentloaded');

        if(await this.isElementVisible(this.continueBookingButton)){
            await this.continueBookingButton.click();
        }

        await expect(this.paymentProceedButton).toBeVisible();

        if(await this.isElementVisible(this.paymentProceedButton)){
            await this.paymentProceedButton.click();
        }
    }

    async proceedToPaymentSection() {
        await expect(this.page.locator('//p[text()="Scan & Pay with UPI"]')).toBeVisible({timeout:12000});
        await this.page.screenshot({path: 'screenshot/screenshot3.png'});
    }
}

module.exports = RoundTripBookingPage;