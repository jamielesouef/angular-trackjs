// Karma configuration
module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    browsers: [ 'PhantomJS' ],
    reporters: [ 'progress', 'coverage' ],
    preprocessors: {
      'src/*.js': ['coverage']
    },
    coverageReporter: {
      reporters: [
        {type: 'lcov', dir: 'test/coverage'}
      ]
    }

  });
};
