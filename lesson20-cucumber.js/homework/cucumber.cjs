const common = {
    loader: ['ts-node/esm'],
    format: ['@cucumber/pretty-formatter'],
    formatOptions: {
        snippetInterface: 'async-await',
    },
    import: ['src/**/*.ts'],
    tags: 'not @skip'
};

const ci = {
    ...common,
    format: [
        ...common.format,
        'json:./reports/cucumber.json',
        'html:./reports/cucumber-embedded.html',
        'junit:./reports/cucumber.xml'
    ],
    retry: 2
};

const local = {
    ...common,
    retry: 0
};

module.exports = {
    default: common,
    ci: ci,
    local: local
};


