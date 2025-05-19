const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // baseUrl: 'https://www.saucedemo.com',
    env: {
      facebook_url: "www.facebook.com",
      instagram_url: "www.instagram.com",
      orangehrm_url:
        "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
      username: "Admin",
      password: "admin123",
    },
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    defaultCommandTimeout: 5000,
  },
});
