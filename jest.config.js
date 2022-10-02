module.exports = {
    moduleNameMapper: {
        '@core/(.*)': '<rootDir>/src/app/core/$1',
        '@env/(.*)': '<rootDir>/src/environments/environment.ts'
    },
    preset: 'jest-preset-angular',
    globalSetup: 'jest-preset-angular/global-setup',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    coverageThreshold: {
        global: {
            branches: 40,
            functions: 40,
            lines: 95,
            statements: 40
        }
    },

    collectCoverageFrom: [
        "<rootDir>/**/*.(t|j)s"
    ],
    coveragePathIgnorePatterns: [
        "/node_modules/",
        "<rootDir>/\\.tmp/",
        "/offline.decorator.ts",
        "<rootDir>/src/app/shared/*",
        "<rootDir>/src/app/auth/*",
        "<rootDir>/src/app/header/*",
        "<rootDir>/src/app/shopping-list/*",
        "<rootDir>/src/app/recipes/*",
        "<rootDir>/dist/*",
        "jest.config.js",
        "karma.conf.js",
        ".main.ts",
        "<rootDir>/src/app/core.module.ts/*",
        "<rootDir>/src/app/app.module.ts/*",
        "<rootDir>/src/app/app.component.ts/*",
        "<rootDir>/src/app/app-routing.module.ts/*",
        "<rootDir>/src/app/test/test.module.ts/*",
        ".polyfills.ts",
        "<rootDir>/src/environments",
        "<rootDir>/coverage/*"
    ]
};