// src/config.js

module.exports = {
  BASE_URL: "https://higgsfield.ai",

  // Sélecteurs de l'interface Higgsfield
  SELECTORS: {
    promptInput: 'textarea[placeholder="Describe your video..."]',
    generateButton: 'button:has-text("Generate")',
    videoContainer: '.video-result',
    downloadButton: 'button:has-text("Download")'
  },

  // Timeouts globaux
  TIMEOUTS: {
    navigation: 30000,
    generation: 180000, // 3 minutes max pour Kling
    waitBetweenChecks: 3000
  },

  // Dossiers internes
  PATHS: {
    downloads: "downloads"
  }
};

