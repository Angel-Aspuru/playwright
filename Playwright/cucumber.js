module.exports = {
    default: {
        requireModule: ['ts-node/register'],
        require: [
            'cucumber/steps/**/*.ts',
            'cucumber/support/**/*.ts'
        ],
        paths: ['cucumber/features/**/*.feature'],
        format: ['progress', 'html:cucumber-report.html'],
    }
};