const { Given } = require("@cucumber/cucumber");
const path = require("node:path");
const fs = require("fs");
const { getBrowser } = require("../../helpers/authHook");

Given("User should be logged in", async function () {
  const browser = getBrowser();

  const browserType = process.env.BROWSER || "chromium";

  const authFile = path.resolve(
    __dirname,
    `../../../JSONFiles/${browserType}.json`
  );

  if (!fs.existsSync(authFile)) {
    throw new Error(
      `No saved session found for ${browserType}. Run saveAuthSession.js first.`
    );
  }

  console.log(`Using saved session: ${authFile}`);


  this.context = await browser.newContext({
    storageState: authFile,
    recordVideo: {
      dir: "test-results/videos/",
      size: {
        width: 1280,
        height: 720,
      },
    },
  });

  this.page = await this.context.newPage();

  await this.page.goto("https://www.ixigo.com/", { waitUntil: "networkidle" });
});