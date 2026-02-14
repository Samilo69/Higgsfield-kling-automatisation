// src/main.js

const higgs = require("./higgsfield");
const utils = require("./utils");
const fs = require("fs");
const path = require("path");

async function run() {
  try {
    utils.log("=== Starting Higgsfield Automation ===");

    // 1. Initialisation du navigateur
    await higgs.init();

    // 2. Navigation vers Higgsfield
    await higgs.gotoHome();

    // 3. Lecture du prompt (pour l'instant un seul)
    const promptPath = path.join("prompts", "prompts.txt");
    const prompts = fs.readFileSync(promptPath, "utf8")
      .split("\n")
      .map(p => p.trim())
      .filter(Boolean);

    if (prompts.length === 0) {
      throw new Error("No prompts found in prompts.txt");
    }

    const prompt = prompts[0];
    utils.log(`Using prompt: "${prompt}"`);

    // 4. Envoi du prompt
    await higgs.submitPrompt(prompt);

    // 5. Attente de la génération vidéo
    await higgs.waitForVideo();

    // 6. Téléchargement
    await higgs.downloadVideo();

    utils.log("=== Automation completed successfully ===");
  } catch (err) {
    utils.log("ERROR: " + err.message);
  } finally {
    // 7. Fermeture propre
    await higgs.close();
  }
}

run();

