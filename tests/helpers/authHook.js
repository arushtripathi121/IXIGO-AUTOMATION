const {
  setDefaultTimeout,
  BeforeAll,
  AfterAll,
  After,
} = require("@cucumber/cucumber");

require("dotenv").config();

const { chromium, firefox, webkit } = require("@playwright/test");
const fs = require("fs");

setDefaultTimeout(60000);

let browser;

BeforeAll(async function () {
  const browserType = process.env.BROWSER || "chromium";

  switch (browserType) {
    case "firefox":
      browser = await firefox.launch({ headless: false });
      break;

    case "webkit":
      browser = await webkit.launch({ headless: false });
      break;

    case "chromium":
    default:
      browser = await chromium.launch({ headless: false });
  }

  console.log(`✓ Running tests on ${browserType}`);
});

After(async function ({ result }) {
  let videoPath;
  let screenshotPath;


  if (this.page) {
    const video = this.page.video();
    if (video) {
      videoPath = await video.path();
    }
  }

  if (result?.status === "FAILED" && this.page) {
    if (!fs.existsSync("screenshots")) {
      fs.mkdirSync("screenshots");
    }

    screenshotPath = `screenshots/${Date.now()}.png`;
    await this.page.screenshot({
      path: screenshotPath,
      fullPage: true,
    });
    
    const screenshotData = fs.readFileSync(screenshotPath);
    await this.attach(screenshotData, "image/png");
  }

  if (this.context) {
    await this.context.close();
  }

  // Attach video to Cucumber report
  if (videoPath && fs.existsSync(videoPath)) {
    const videoData = fs.readFileSync(videoPath);
    await this.attach(videoData, "video/webm");
  }
});

AfterAll(async function () {
  if (browser) {
    await browser.close();
  }
});

function getBrowser() {
  return browser;
}

module.exports = { getBrowser };