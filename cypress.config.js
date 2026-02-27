const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/support/e2e.js',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx}',
    video: false,
    screenshotOnRunFailure: false,
    defaultCommandTimeout: 10000,
    env: {
      USER_EMAIL: 'ardian.wahyusaputra17@gmail.com',
      USER_PASSWORD: 'pekanbaru123zx',
    },
  },
});
