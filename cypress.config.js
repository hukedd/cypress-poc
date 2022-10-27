const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "2uukv6",
  defaultCommandTimeout: 5000,
  viewportWidth: 1280,
  viewportHeight: 750,
  scrollBehavior: false,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        log (message) {
          console.log(message)
          return null
        }
      })
    },
  },
});
