const data = require("../../JSONFiles/payment_deatils.json");
const { expect } = require('@playwright/test')

function PaymentDetails(page) {
    class PaymentFlow {
        constructor(page) {
            this.page = page;
            this.AddNewTravelerBtn = page.locator(`//button[text()="Add New Traveller"]`);
            this.fullnameTF = page.getByTestId('nameInput');
            this.AgeTf = page.getByTestId('ageInput');
            this.genderBtn = page.locator('(//input[@name="gender"])[1]');
            this.seat_preferenceBtn = page.locator('//span[text()="Lower"]');
            this.SaveBtn = page.getByTestId('save-new-traveller');
            this.mobileTF = page.getByTestId('contact-number');
            this.emailTF = page.getByTestId('email');
            this.additional_prefBtn = page.getByText("Consider for Auto Upgradation");
            this.changeBtn = this.page.locator('(//button[text()="Change"])[2]');
            this.Cancellation_popup = page.getByTestId('fc-popup-no');
            this.free_cancellationBtn = page.locator('(//input[@name="freeCancellation"])[2]');
            this.Proceed_to_payBtn = page.getByTestId('review-and-pay');
        }
        async AddNewTraveler() {
            this.select_passengers = this.page.locator('(//p[@class="body-md text-neutral-800"])[3]');
            await this.AddNewTravelerBtn.click();
            await this.fullnameTF.fill(data.Fullname);
            await this.AgeTf.fill(data.Age);
            await this.genderBtn.check();
            if (await this.seat_preferenceBtn.isVisible()) {
                await this.seat_preferenceBtn.click();
            }
            await this.SaveBtn.click();
            await this.select_passengers.click();
        }
        async EnterPaymentDetails() {
            await this.mobileTF.fill(data.mobile);
            await this.emailTF.fill(data.email);
            await this.additional_prefBtn.click({ force: true });

            try {
                // Wait up to 5 seconds for the popup to appear
                await this.Cancellation_popup.waitFor({ state: 'visible', timeout: 5000 });
                // If it appears, click 'No'
                await this.Cancellation_popup.click();
                // Wait for it to disappear so it doesn't block checkboxes
                await this.Cancellation_popup.waitFor({ state: 'hidden', timeout: 5000 });
            } catch (error) {
                // The popup didn't appear within 5 seconds, proceed as normal
                console.log("Popup did not appear within timeout");
            }

            // await this.free_cancellationBtn.check({ force: true });
            // await this.Proceed_to_payBtn.click();
        }
        async EnterPaymentDetails_for_TRL() {
            await this.mobileTF.fill(data.mobile);
            await this.emailTF.fill(data.email);
            // await this.additional_prefBtn.click({ force: true });
            await this.free_cancellationBtn.click();
            await this.Proceed_to_payBtn.click();

            try {
                // Wait up to 5 seconds for the popup to appear
                await this.Cancellation_popup.waitFor({ state: 'visible', timeout: 5000 });
                // If it appears, click 'No'
                await this.Cancellation_popup.click();
                // Wait for it to disappear so it doesn't block checkboxes
                await this.Cancellation_popup.waitFor({ state: 'hidden', timeout: 5000 });
            } catch (error) {
                // The popup didn't appear within 5 seconds, proceed as normal
                console.log("Popup did not appear within timeout");
            }

        }
        async PaymentPageLoad() {
            try {

                this.assert = await this.page.locator('//p[@class="body-md font-bold" and text()="Scan & Pay with UPI"]');
                this.amount = await this.page.locator('(//h6[@class="h6 font-bold"])[2]').textContent();
                await expect(this.assert).toContainText("Scan & Pay with UPI", { timeout: 15000 });
                console.log(`Payment page is loaded successfully and the amount to be paid is ${this.amount}`);

            }
            catch (err) {
                console.log("Payment is failed to load", err);
            }
        }
    }
    return new PaymentFlow(page);
}
module.exports = { PaymentDetails }