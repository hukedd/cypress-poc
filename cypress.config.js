const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "ygc4wg",
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
