const { expect } = require("@playwright/test");
const path = require("node:path");

class OrderFood {
    constructor(page) {
        this.page = page;
        this.train_section = page.locator(`//p[text()="Trains"]`).last();
        this.order_food = page.locator(`//div[text()="Order Food"]`);
    }
    async navigatetoApp(url) {
        await this.page.goto(url);
    }
    async TrainSection() {
        await this.train_section.click();
    }
    async OrderFood() {
        const [newpage] = await Promise.all([this.page.waitForEvent('popup'), this.order_food.click()]);
        await newpage.waitForLoadState();
        return await newpage;
    }
    async PnrTf(newpage, pnr) {

        this.pnr_Tf = newpage.locator("#pnr-input");
        await this.pnr_Tf.fill(pnr);
        await newpage.keyboard.press("Enter");

        this.errorMsg = await newpage.locator('[class="px-20 pb-20 pt-30 overflow-y-auto text-center no-scrollbar"]');
        await newpage.waitForTimeout(2000);
        if (await this.errorMsg.isVisible()) {
            const do_nothing=async ()=>{ };
            this.SelectHotels=do_nothing;
            this.AddFilters=do_nothing;
            this.AddProducts=do_nothing;
            this.ProceedNext=do_nothing;
            this.PassengerName=do_nothing;
            this.ContactNo=do_nothing;
            this.PaymentMethod=do_nothing;
            this.ProceedContinue=do_nothing;
            this.PaymentPageLoad=do_nothing;
            await newpage.screenshot({path:"screenshot/Tfo_invalid pnr.png"})
            console.log(`In Order Food on Train ,User have entered invalid ${pnr}.So please re-enter your pnr`);
            await newpage.close()
        }
    }
    async SelectHotels(newpage) {
        this.select_hotels = newpage.locator(".flex-1").first();
        await newpage.waitForTimeout(2000);
        await this.select_hotels.click();
    }

    async AddFilters(newpage) {
        this.filter_1 = newpage.locator(`(//div[@id="order-menu-filters"]/descendant::div[@class="flex-shrink-0"])[2]`);
        this.filter_2 = newpage.locator(`(//div[@id="order-menu-filters"]/descendant::div[@class="flex-shrink-0"])[3]`);
        await this.filter_1.click();
        // await this.filter_2.click();
    }
    async AddProducts(newpage) {
        this.product_1 = newpage.locator(`(//button[text()="Add"])[1]`);
        this.product_2 = newpage.locator(`(//button[text()="Add"])[2]`);
        await this.product_1.click();
        await this.product_2.click();
    }
    async ProceedNext(newpage) {
        this.proceed_next = newpage.locator(".main-cta");
        await this.proceed_next.click();
    }
    async PassengerName(newpage, name) {
        this.passengers_nameTf = newpage.locator("#passengerName-input");
        await this.passengers_nameTf.fill(name);
    }
    async ContactNo(newpage, contact) {
        this.contact_noTF = newpage.locator("#contactNumber-input");
        await newpage.waitForTimeout(1000);
        await this.contact_noTF.fill(contact);
    }
    async PaymentMethod(newpage) {
        this.payment_methodBtn = newpage.getByRole('button', { name: 'Pay at Delivery UPI/Cash' });
        await newpage.waitForTimeout(1000);
        await this.payment_methodBtn.click();
    }
    // async ProceedContinue(newpage) {
    //     this.proceed_continue = newpage.locator(`._continue-button_hvjmv_1`);
    //     await newpage.waitForTimeout(1000);
    //     await this.proceed_continue.click();
    // }
    async PaymentPageLoad(newpage) {
        try {
            this.assert = newpage.getByRole('heading', { name: 'Order Placed' });
            this.delivery_detail=newpage.locator('//p[@class="body-lg font-medium"]');
            await newpage.waitForTimeout(5000);
            await expect(this.assert).toHaveText(/Order Placed/);
            const delivery_on=await this.delivery_detail.textContent();
            await newpage.screenshot({ path: "screenshot/payment_page.png" })
            console.log("Payment page is loaded");
            console.log(`Your order wil be delievered on ${delivery_on}`)
        }
        catch (err) {
            console.log("payment page is not loaded", err);
        }
    }
}
module.exports = { OrderFood };