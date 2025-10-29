import type { Config } from '@jest/types';

/**
 * Global setup runs once before all test suites
 * Use this for one-time setup operations like:
 * - Starting test databases
 * - Initializing test servers
 * - Setting global environment variables
 * - Creating necessary test directories
 */
export default function globalSetup(
    globalConfig: Config.GlobalConfig,
    projectConfig?: Config.ProjectConfig
): void {
    console.log('🚀 Running Jest global setup...');
    console.log(`Root directory: ${globalConfig.rootDir}`);
    console.log(`Test environment: ${projectConfig?.testEnvironment || 'default'}`);

    // Add your global setup logic here
    // Example: startTestServer();
    // Example: process.env.TEST_MODE = 'true';

    console.log('✅ Global setup completed');
}
