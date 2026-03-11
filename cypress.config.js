const { defineConfig } = require("cypress");
const { allureCypress } = require("allure-cypress/reporter");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      allureCypress(on, config);
      return config;
    },
    pageLoadTimeout: 120000,
    defaultCommandTimeout: 15000,
    requestTimeout: 15000,
    // -----------------------
    baseUrl: "https://www.kitapsepeti.com",
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
  },
});