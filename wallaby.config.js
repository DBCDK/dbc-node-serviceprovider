'use strict';
let babel = require('babel');

module.exports = function() {
  return {
    files: [
      'src/**/*.js',
      '!src/**/__tests__/*.test.js'
    ],

    tests: [
      'src/**/__tests__/*.test.js'
    ],

    debug: true,

    preprocessors: {
      '**/*.js': [
        file => babel.transform(file.content, {sourceMaps: true})
      ]
    },

    env: {
      type: 'node',
      runner: 'node'
    },

    testFramework: 'mocha@2.1.0'
  };
};
