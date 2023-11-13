const { defineConfig } = require("cypress");
const Mochawesome = require("mochawesome");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:4200/",
    testIsolation: false,
    experimentalRunAllSpecs: true,
    video: true,
    screenshotsFolder: "screenShots",
    reporter: "mochawesome",
    reporterOptions: {
      overwrite: false,
      html: false,
      json: true,
      embeddedScreenshots: true,
    },
  },
});
