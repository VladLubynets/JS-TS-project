export default {
    extensionsToTreatAsEsm: ['.ts'],
    verbose: true,
    preset: 'ts-jest/presets/default-esm',
    testEnvironment: 'node',
    transform: {
        '^.+\\.tsx?$': ['ts-jest', { 
            useESM: true,
            tsconfig: {
                module: 'ESNext',
                moduleResolution: 'node'
            }
        }]
    },
    testPathIgnorePatterns: ['./dist', './build', './specs'],
    clearMocks: true,
    coverageProvider: 'v8',
    testMatch: ['**/tests/**/*.[t]s?(x)', '**/?(*.)+(spec|test).[t]s?(x)']
};


