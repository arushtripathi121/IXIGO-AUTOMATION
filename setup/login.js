
const { chromium, firefox, webkit } = require("@playwright/test");
const fs = require("fs");
require("dotenv").config();

async function saveAuthenticatedSession() {
  const browserType = process.env.BROWSER || "chromium";

  let browserEngine;

  switch (browserType) {
    case "firefox":
      browserEngine = firefox;
      break;

    case "webkit":
      browserEngine = webkit;
      break;

    case "chromium":
    default:
      browserEngine = chromium;
  }

  const stateDir = "JSONFiles";

  if (!fs.existsSync(stateDir)) {
    fs.mkdirSync(stateDir);
  }

  const browser = await browserEngine.launch({ headless: false });


  const context = await browser.newContext();

  const page = await context.newPage();

  await page.goto("https://www.ixigo.com");


  await page.waitForTimeout(30000);
  await page.reload();


  const outPath = `${stateDir}/${browserType}.json`;

  await context.storageState({
    path: outPath,
  });

  console.log(`Saved session to ${outPath}`);


  console.log("Authenticated session saved successfully");

  await context.close();
  await browser.close();
}

saveAuthenticatedSession();

module.exports = { saveAuthenticatedSession };