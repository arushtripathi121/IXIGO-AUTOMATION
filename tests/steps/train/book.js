const { Given, When, Then } = require('@cucumber/cucumber');

const BookPage = require('../../pages/train/bookpage');

let bookPage;

Given('User opens ixigo trains page', async function () {

    bookPage = new BookPage(this.page);

    await bookPage.open();
});

// SOURCE
When('User enters source station {string}', async function (src) {

    await bookPage.enterSource(src);
});

When(
    'User selects source station {string} and {string}',
    async function (source, stationCode) {

        await bookPage.selectSource(source, stationCode);
    }
);

// DESTINATION
When('User enters destination station {string}', async function (dest) {

    await bookPage.enterDestination(dest);
});

When(
    'User selects destination station {string} and {string}',
    async function (destination, stationCode) {

        await bookPage.selectDestination(destination, stationCode);
    }
);

// DATE
When('User selects departure date {string}', async function (date) {

    await bookPage.selectDate(date);
});

// SEARCH
When('User clicks search button', async function () {

    await bookPage.search();
});

// VERIFY SEARCH PAGE
Then('User should navigate to train search page', async function () {

    await bookPage.verifySearchPage();
});

// FILTER
When('User applies AC filter', async function () {

    await bookPage.applyAC();
});

// TRAIN
When('User selects first available train', async function () {

    await bookPage.selectFirstTrain();
});

// BOOK
When('User clicks on book button', async function () {

    await bookPage.clickBook();
});

// ADD PASSENGER
When('click on add passenger', async function () {

    await bookPage.clickadd();
});

// PASSENGER
When(
    'User enters passenger details {string} and {string}',
    async function (name, age) {

        await bookPage.enterPassenger(name, age);
    }
);

// GENDER
When('User selects gender {string}', async function (gender) {

    await bookPage.selectGender(gender);
});

// BERTH
When('User selects berth preference {string}', async function (berth) {

    await bookPage.selectBerth(berth);
});

// SAVE
When('User saves passenger details', async function () {

    await bookPage.savePassengers();
});
When('user chooses first passenger',async function(){
    await bookPage.selectpassengers();
})


// CLOSE
When('User closes popup', async function () {

    await bookPage.closePopup();
});

// PAY
When('User clicks proceed to pay', async function () {

    await bookPage.proceedPays();
});

// NO REFUND
Then('User selects no refund option', async function () {

    await bookPage.noRefundOption();
});

// NEGATIVE TESTS
Then('User should see no station results', async function () {

    await bookPage.noStationResults();
});

Then('User should see validation message', async function () {

    await bookPage.validationMessage();
});