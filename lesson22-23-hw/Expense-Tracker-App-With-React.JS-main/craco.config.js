const path = require('path');

module.exports = {
  jest: {
    configure: {
      roots: ['<rootDir>/src', '<rootDir>/tests'],
      testMatch: ['<rootDir>/tests/**/*.test.js'],
      setupFilesAfterEnv: ['<rootDir>/tests/setupTests.js'],
      moduleDirectories: ['node_modules', path.join(__dirname, 'src')],
      modulePaths: ['<rootDir>/src'],
      reporters: process.env.JEST_JUNIT === 'true' 
        ? ['default', ['jest-junit', {
            outputDirectory: './test-results',
            outputName: 'junit.xml',
            classNameTemplate: '{classname}',
            titleTemplate: '{title}'
          }]]
        : ['default']
    }
  }
};
