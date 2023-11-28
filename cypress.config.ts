import { defineConfig } from 'cypress';
import { TEST_URL } from './src/utils/constants';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: TEST_URL,
    viewportWidth: 1440,
    viewportHeight: 880,
    defaultCommandTimeout: 12000,
  },
});
