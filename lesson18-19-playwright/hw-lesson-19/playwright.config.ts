import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for hw-lesson-19 with multiple reporters
 * 
 * Available reporters:
 * - Mochawesome: Beautiful HTML reports
 * - Allure: Comprehensive dashboard with history tracking
 * - BrowserStack Test Observability: Cloud-based test analytics
 */

// Определяем репортер на основе переменной окружения
const getReporter = () => {
    const reporterType = process.env.REPORTER || 'default';
    
    switch (reporterType) {
        case 'mochawesome':
            return [
                ['list'],
                ['pwmochawesome', {
                    outputDir: 'reports/mochawesome',
                    outputJson: true,
                    outputHtml: true
                }]
            ];
        case 'allure':
            return [
                ['allure-playwright', {
                    detail: true,
                    outputFolder: 'allure-results',
                    suiteTitle: false
                }]
            ];
        case 'browserstack':
            return [
                ['list'],
                ['json', { outputFile: 'reports/browserstack/results.json' }]
            ];
        case 'all':
            return [
                ['list'],
                ['pwmochawesome', {
                    outputDir: 'reports/mochawesome',
                    outputJson: true,
                    outputHtml: true
                }],
                ['allure-playwright', {
                    detail: true,
                    outputFolder: 'allure-results',
                    suiteTitle: false
                }]
            ];
        default:
            return [['list'], ['html', { outputFolder: 'reports/html' }]];
    }
};

export default defineConfig({
    testDir: './tests',
    fullyParallel: false,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: getReporter(),
    
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
                headless: false,
                viewport: {
                    width: 1680,
                    height: 900
                }
            }
        }
    ]
});

