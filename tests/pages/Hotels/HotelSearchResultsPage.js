/**
 * HotelSearchResultsPage - Page Object Model for Hotel Search Results (Commented/Unused)
 * Contains alternate implementation for clicking hotel cards
 * Note: This class is currently not in use - see HotelResultsPage instead
 */
// class HotelSearchResultsPage {

//     constructor(page) {

//         this.page = page;

//         this.hotelCards =
//             page.locator('(//div[@class="flex cursor-pointer bg-primary flex-row gap-x-20 p-20 rounded-20"])[1]');

//         // this.crossIcon = page.locator('#848 > g:nth-child(2) > path');
//     }

//     // async closePopupIfPresent() {

//     //     try {

//     //         await this.page.keyboard.press('Escape');

//     //         if (await this.crossIcon.isVisible({ timeout: 2000 })) {

//     //             await this.crossIcon.click();
//     //         }

//     //     } catch (e) {

//     //         console.log("Popup not present");
//     //     }
//     // }

//     async clickFirstHotelAndGetNewPage() {

//         // await this.closePopupIfPresent();

//         await this.hotelCards.waitFor({
//             state: 'visible'
//         });

//         // const context = this.page.context();

//         // const [newPage] = await Promise.all([

//         //     context.waitForEvent('page'),

//             this.hotelCards.click()
//         // ]);

//         // await newPage.waitForLoadState('domcontentloaded');

//         // return newPage;
//     }
// }

// module.exports = HotelSearchResultsPage;

class HotelSearchResultsPage {

    constructor(page) {

        this.page = page;

        this.hotelCards =
            page.locator('(//div[@class="flex cursor-pointer bg-primary flex-row gap-x-20 p-20 rounded-20"])[1]');
    }

    async clickFirstHotelAndGetNewPage() {
        await this.hotelCards.waitFor({ state: 'visible' });

        const context = this.page.context();

        const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            this.hotelCards.click()
        ]);

        await newPage.waitForLoadState('domcontentloaded');

        return newPage;
    }
}

module.exports = HotelSearchResultsPage;