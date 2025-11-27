import { defineConfig } from 'cypress';

export default defineConfig({
    e2e: {
        baseUrl: 'https://www.saucedemo.com',
        specPattern: 'cypress/specs/**/*.cy.ts',
        viewportWidth: 1280,
        viewportHeight: 720,
        setupNodeEvents(on, config) {}
    }
});

