import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    supportFile: "tests/e2e/support/e2e.{js,jsx,ts,tsx}",
    specPattern: "tests/e2e/specs/**/*.cy.{js,jsx,ts,tsx}",
    videosFolder: "tests/e2e/videos",
    screenshotsFolder: "tests/e2e/screenshots",
    baseUrl: "http://localhost:5173",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    supportFile: "tests/component/support/component.{js,jsx,ts,tsx}",
    specPattern: "tests/component/specs/**/*.cy.{js,jsx,ts,tsx}",
    videosFolder: "tests/component/videos",
    screenshotsFolder: "tests/component/screenshots",
    indexHtmlFile: "tests/component/support/component-index.html",
    devServer: {
      framework: "vue",
      bundler: "vite",
    },
  },
});
