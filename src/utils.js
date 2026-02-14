// src/utils.js

const fs = require("fs");
const path = require("path");

module.exports = {
  log(message) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${message}`);
  },

  async wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },

  ensureDir(dirPath) {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  },

  async retry(fn, retries = 3, delay = 2000) {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        return await fn();
      } catch (err) {
        if (attempt === retries) throw err;
        await this.wait(delay);
      }
    }
  }
};

