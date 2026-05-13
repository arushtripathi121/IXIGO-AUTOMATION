const { Given, When, Then } = require('@cucumber/cucumber');

const PnrPage = require('../../pages/train/PnrPage');

let pnr;



Given('User opens ixigo website', async function () {

    pnr = new PnrPage(this.page);

    await pnr.openWebsite();
    await pnr.verifyHomePage();
});




When('User opens trains section', async function () {

    await pnr.openTrainsSection();
});


When('User opens PNR status page', async function () {

    await pnr.openPnrStatus();
    await pnr.verifyPnrPage();

});



When('User enters PNR number {string}', async function (pnrNo) {

    await pnr.enterPnr(pnrNo);
});




When('User clicks on check PNR status {string}', async function (pnrNo) {

    await pnr.clickCheckPnr(pnrNo);
    await pnr.verifyTicketGenerated();
});



Then('User takes screenshot of passenger ticket', async function () {

    await pnr.takeTicketScreenshot();
});




When('User checks running status', async function () {

    await pnr.openRunningStatus();
});




Then('User takes screenshot of running status', async function () {

    await pnr.takeRunningStatusScreenshot();
    await pnr.verifyRunningStatusPage();
});




When('User goes back to previous page', async function () {

    await pnr.goBackPage();
});




When('User opens train schedule', async function () {

    await pnr.openTrainSchedule();
});




When('User opens availability section', async function () {

    await pnr.openAvailability();
    await pnr.verifyAvailabilitySection();
});




When('User selects journey date', async function () {

    await pnr.selectDate();
});




When('User clicks on PNR book button', async function () {

    await pnr.clickBookButton();

});
When('User clicks on add passenger',async function(){
    await pnr.addPassengers();
    await pnr.verifyPassengerForm();
})




When('User adds passenger details {string} {string}', async function (name, age) {

    await pnr.addPassengerDetails(name, age);

    await pnr.savePassenger();
});


When('user choose first passenger',async function(){
    await pnr.selectpassenger();
})

Then('User proceeds to payment page', async function () {

    await pnr.proceedToPayment();
    await pnr.verifyPaymentPage();
});




Then('User closes the popup', async function () {

    await pnr.closePopup();
});