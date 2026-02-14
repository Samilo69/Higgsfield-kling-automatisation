// src/higgsfield.js

const { webkit } = require("playwright"); // IMPORTANT : WebKit pour Codespaces
const fs = require("fs");
const path = require("path");
const config = require("./config");
const utils = require("./utils");

module.exports = {
  browser: null,
  page: null,

  async init() {
    utils.log("Launching WebKit (Codespaces compatible)...");

    this.browser = await webkit.launch({
      headless: true,
      args: ["--no-sandbox"]
    });

    const context = await this.browser.newContext({
      acceptDownloads: true
    });

    this.page = await context.newPage();
    utils.log("Browser launched.");
  },

  async gotoHome() {
    utils.log("Navigating to Higgsfield...");
    await this.page.goto(config.BASE_URL, {
      timeout: config.TIMEOUTS.navigation,
      waitUntil: "domcontentloaded"
    });
    utils.log("Higgsfield loaded.");
  },

  async submitPrompt(promptText) {
    utils.log("Filling prompt...");

    await this.page.fill(
      config.SELECTORS.promptInput,
      promptText
    );

    utils.log("Prompt filled. Triggering generation...");
    await this.page.click(config.SELECTORS.generateButton);
  },

  async waitForVideo() {
    utils.log("Waiting for video generation...");

    await this.page.waitForSelector(
      config.SELECTORS.videoContainer,
      { timeout: config.TIMEOUTS.generation }
    );

    utils.log("Video container detected.");
  },

  async downloadVideo() {
    utils.log("Waiting for download button...");

    const downloadPromise = this.page.waitForEvent("download");
    await this.page.click(config.SELECTORS.downloadButton);

    const download = await downloadPromise;

    utils.ensureDir(config.PATHS.downloads);

    const filePath = path.join(
      config.PATHS.downloads,
      await download.suggestedFilename()
    );

    await download.saveAs(filePath);

    utils.log(`Video downloaded: ${filePath}`);
    return filePath;
  },

  async close() {
    utils.log("Closing browser...");
    if (this.browser) {
      await this.browser.close();
    }
  }
};

