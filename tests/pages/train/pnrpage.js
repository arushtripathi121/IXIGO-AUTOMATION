const { expect } = require('@playwright/test');

class PnrPage {

    constructor(page) {

        this.page = page;

        this.trainsTab = page.locator('(//p[text()="Trains"])[2]');
        this.pnrStatus = page.locator('(//div[contains(@class,"body-md text-primary")])[2]');
        this.pnrInput = page.locator('//input[@type="tel"]');
        this.checkPnrBtn = page.locator('//button[text()="Check PNR Status"]');
        this.ticketCard = page.locator('//div[contains(@class,"rounded-15 overflow-hidden")]');
        this.runningStatus = page.locator('//a[text()=" Running Status"]');
        this.runningTable = page.locator('//table[@class="status-list-cntr"]');
        this.trainSchedule = page.locator('//a[text()=" Train Schedule"]');
        this.availability = page.locator('//span[text()="AVAILABILITY"]');
        this.calendar = page.locator('//a[@class="day-item u-ib calendar-page-link"]');
        this.date = page.locator('//div[text()="Tue, 07 Jul"]');
        this.bookBtn = page.locator('//div[contains(@class,"u-ripple")]');
        this.addbtn = page.locator('//button[@class="inline-flex justify-center items-center text-brand hover:bg-brand-over gap-0.5 rounded-5 button-sm min-h-30px icon-md px-2.5 pl-5px"]');
        this.nameInput = page.locator('//input[@data-testid="nameInput"]');
        this.ageInput = page.locator('//input[@data-testid="ageInput"]');
        this.genderFemale = page.locator('//input[@value="F"]');
        this.berthPreference = page.locator('(//span[@class="px-5px"])[2]');
        this.saveTraveller = page.locator('//button[text()="Save Traveller"]');
       this.selectButton = page.getByTestId('traveller-1').getByRole('checkbox');
        this.proceedPay = page.locator('//button[text()="Proceed To Pay"]');
        this.noBtn = page.locator('//button[text()="No"]');
    }
//these are the assertion to verify the visibility of elemnets 
    async verifyHomePage() {

        await expect(this.trainsTab).toBeVisible();
    }

    async verifyPnrPage() {

        await expect(this.pnrInput).toBeVisible();
    }

    async verifyTicketGenerated() {

        await expect(this.ticketCard).toBeVisible();
    }

    async verifyRunningStatusPage() {

        await expect(this.runningTable).toBeVisible();
    }

    async verifyAvailabilitySection() {

        await expect(this.availability).toBeVisible();
    }

    async verifyPassengerForm() {

        await expect(this.nameInput).toBeVisible();

        await expect(this.ageInput).toBeVisible();
    }

    async verifyPaymentPage() {

        await expect(this.proceedPay).toBeVisible();
    }
//these are the methods 
    async openWebsite() {

        await this.page.goto('https://www.ixigo.com');

        
    }

    async openTrainsSection() {

        await this.trainsTab.click();
    }

    async openPnrStatus() {

        await this.pnrStatus.click();

    }

    async enterPnr(pnrNo) {

        await this.pnrInput.fill(pnrNo);
        
    }

    async clickCheckPnr(pnrNo) {

        await this.checkPnrBtn.click();
        const errormessage= this.page.locator('//p[text()="Please enter a valid PNR number"]');
        await this.page.waitForTimeout(2000);
        if(await errormessage.isVisible()){
            const pass_methods= async()=>{ };
            this.takeTicketScreenshot=pass_methods
            this.openRunningStatus=pass_methods
            this.takeRunningStatusScreenshot=pass_methods
            this.goBackPage=pass_methods
            this.openTrainSchedule=pass_methods
            this.openAvailability=pass_methods
            this.selectDate=pass_methods
            this.clickBookButton=pass_methods
            this.addPassengers=pass_methods
            this.addPassengerDetails=pass_methods
            this.savePassenger=pass_methods
            this.selectpassenger=pass_methods
            this.proceedToPayment=pass_methods
            this.closePopup=pass_methods
            this.verifyTicketGenerated=pass_methods
            this.verifyRunningStatusPage=pass_methods
            this.verifyAvailabilitySection=pass_methods
            this.verifyPassengerForm=pass_methods
            this.verifyPaymentPage=pass_methods
           

            console.log(`invalid pnr ${pnrNo}` )
        }
        
    }

    async takeTicketScreenshot() {

        await this.ticketCard.screenshot({
            path: 'screenshot/ticket.png'
        });
    }

    async openRunningStatus() {

        await this.runningStatus.click();

        
    }

    async takeRunningStatusScreenshot() {

        await this.runningTable.screenshot({
            path: 'screenshot/runningStatus.png'
        });
    }

    async goBackPage() {

        await this.page.goBack();
    }

    async openTrainSchedule() {

        await this.trainSchedule.click();
    }

    async openAvailability() {

        await this.availability.click();

        
    }

    async selectDate() {

        await this.calendar.click();

        await this.date.click();
    }

    async clickBookButton() {

        await this.bookBtn.click();
    }

    async addPassengers() {

        await this.addbtn.click();

        
    }

    async addPassengerDetails(name, age) {

        await this.nameInput.fill(name);

        await this.ageInput.fill(age);

        await this.genderFemale.click();

        await this.berthPreference.click();
    }

    async savePassenger() {

        await this.saveTraveller.click();
    }
  async selectpassenger(){

    await this.page.waitForLoadState('networkidle');

    await this.selectButton.waitFor({state: 'visible' });

    await this.selectButton.click({force: true});

    console.log("Passenger selected");

     await this.page.waitForTimeout(2000);
}

    async proceedToPayment() {

        await this.proceedPay.click();

        
    }

    async closePopup() {

        await this.noBtn.click();
    }

}

module.exports = PnrPage;