// Karma configuration
module.exports = function (config) {
    config.set({
        frameworks: ['jasmine'],
        browsers: [ 'PhantomJS' ],
        reporters: [ 'progress', 'coverage' ],
        preprocessors: {
            'src/*.js': ['coverage']
        },
        coverageReporter: {
            reporters: [
                { type: 'html', dir: 'test/coverage/' }
            ]
        }

    });
};
