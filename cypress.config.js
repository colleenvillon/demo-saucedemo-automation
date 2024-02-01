const { defineConfig } = require('cypress');
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  defaultCommandTimeout: 60000,
  pageLoadTimeout: 180000,
  requestTimeout: 30000,
  chromeWebSecurity: false,
  e2e: {
    baseUrl: 'https://www.saucedemo.com/',
    watchForFileChanges: false,
    testIsolation: false,
    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return config;
    },
    env: {
      allureReuseAfterSpec: true,
      "allureResultsPath": "allure-results"
    }
  },
});
