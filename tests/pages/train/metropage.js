class MetroPage {

    constructor(page) {

        this.page = page;

        this.trains = page.locator('(//p[text()="Trains"])[2]');
        this.running = page.locator('//div[text()="Running"]');

        this.checkLiveStatus = page.locator('//button[text()="Check Live Status"]');

        this.trainSuggestion = page.locator('//div[@class="seoAutocompleterDesktop_autocompleter-image__bXNGW flex justify-center items-center bg-tertiary p-2 mr-15 border border-tertiary rounded-8"]').first();

        this.importantLinks = page.locator('//li[text()="Important Links"]');

        this.metroRouteMap = page.locator('//a[text()="Delhi Metro Route Map"]');

        this.fromStation = page.locator('//p[text()="From"]');

        this.firstMetroStation = page.locator('//p[@class="body-md truncate font-medium"]').first();

        this.ticketButton = page.locator('//div[@class="flex h-50px w-50px flex-shrink-0 items-center justify-center overflow-hidden rounded-10 border border-tertiary bg-tertiary"]');

        this.proceedToPay = page.locator('//button[text()="Proceed to Pay"]');
    }

    async openWebsite() {

        await this.page.goto('https://www.ixigo.com');
    }

    async openTrainsSection() {

        await this.trains.click();
    }

    async openRunningStatus() {

        await this.running.click();
    }

    async clickCheckLiveStatus() {

        await this.checkLiveStatus.click();
    }

    async selectTrainSuggestion() {

        await this.trainSuggestion.click();
    }

    async openImportantLinks() {

        await this.importantLinks.click();
    }

    async openDelhiMetroRouteMap() {

        await this.metroRouteMap.click();
    }

    async selectSourceMetroStation() {

        await this.fromStation.click();

        await this.firstMetroStation.click();
    }

    async selectDestinationMetroStation() {

        await this.ticketButton.first().click();
    }

    async selectTickets() {

        await this.ticketButton.nth(2).click();
    }

   async clickProceedToPay() {

    await this.proceedToPay.click();

    // wait for payment page to load
    await this.page.waitForLoadState('networkidle');

    // optional extra wait
    await this.page.waitForTimeout(5000);

    await this.page.screenshot({
        path: 'screenshot/metro.png',
        fullPage: true
    });

    // keep browser open
    await this.page.pause();
}
}

module.exports = { MetroPage };