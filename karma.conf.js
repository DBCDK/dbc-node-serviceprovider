'use strict';
module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai'],
    files: [
      'src/**/*.test.js'
    ],
    exclude: [],
    reporters: ['coverage'],
    junitReporter: {
      outputFile: 'output/test-results.xml'
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false,
    preprocessors: {
      'src/**/*.js': ['babel'],
      'src/*.js': ['babel', 'coverage']
    }
  });
};
