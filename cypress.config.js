const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity: false,
  screenshotOnRunFailure: true,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir:'cypress/testReports',
    charts: true,
    reportPageTitle: 'custom-title',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    debug: true
  },

  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on)

      // implement node event listeners here
      return config    
    },
    baseUrl: "https://fakestoreapi.com"
  },
});
