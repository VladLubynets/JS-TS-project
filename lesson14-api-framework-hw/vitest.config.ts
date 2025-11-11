import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        exclude: [],
        include: ['./tests/**/?(*.)+(spec|test).[t]s?(x)', './hw/tests/**/?(*.)+(spec|test).[t]s?(x)'],
        // Skip global setup if SKIP_GLOBAL_SETUP env var is set (for hw tests)
        globalSetup: process.env.SKIP_GLOBAL_SETUP ? [] : [
            //'./src/hooks/vitest-global-setup.ts',
            './src/hooks/jwt-init.ts'
        ],
        testTimeout: 120000
    }
});
