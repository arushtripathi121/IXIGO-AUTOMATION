const { Given, When } = require('@cucumber/cucumber');

const { MetroPage } = require('../../pages/train/metropage');

let metroPage;

Given('User open ixigo website', async function () {

    metroPage = new MetroPage(this.page);

    await metroPage.openWebsite();
});

// TRAINS
When('User opens trains sections', async function () {

    await metroPage.openTrainsSection();
});

// RUNNING
When('User opens running status page', async function () {

    await metroPage.openRunningStatus();
});

// CHECK STATUS
When('User clicks on check live status', async function () {

    await metroPage.clickCheckLiveStatus();
});

// TRAIN
When('User selects train from suggestion', async function () {

    await metroPage.selectTrainSuggestion();
});

// AGAIN
When('User clicks on check live status again', async function () {

    await metroPage.clickCheckLiveStatus();
});

// LINKS
When('User opens Important Links', async function () {

    await metroPage.openImportantLinks();
});

// METRO MAP
When('User opens Delhi Metro Route Map', async function () {

    await metroPage.openDelhiMetroRouteMap();
});

// SOURCE
When('User selects source metro station', async function () {

    await metroPage.selectSourceMetroStation();
});

// DESTINATION
When('User selects destination metro station', async function () {

    await metroPage.selectDestinationMetroStation();
});

// TICKETS
When('User selects number of tickets', async function () {

    await metroPage.selectTickets();
});

// PAY
When('User clicks on proceed to pay', async function () {

    await metroPage.clickProceedToPay();
});