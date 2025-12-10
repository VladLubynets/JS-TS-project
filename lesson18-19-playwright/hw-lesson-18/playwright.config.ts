import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    fullyParallel: false,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: [['list'], ['html', { outputFolder: 'reports/html' }]],
    
    use: {
        baseURL: 'https://www.saucedemo.com',
        trace: 'retain-on-failure',
        video: 'on',
        screenshot: 'on'
    },

    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
                headless: true,
                viewport: {
                    width: 1680,
                    height: 900
                }
            }
        }
    ]
});

