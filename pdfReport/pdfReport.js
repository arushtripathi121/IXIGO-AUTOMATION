const { chromium } = require("playwright");

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto("file:///C:/Users/arush/sprint/test-results/html-report/index.html");
    await page.pdf({ path: "test-results/report.pdf", format: "A4" });
    await browser.close();
})();