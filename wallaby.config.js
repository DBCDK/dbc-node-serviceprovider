'use strict';
let babel = require('babel');

module.exports = function() {
  return {
    files: [
      {pattern: 'src/*.js'}
    ],

    tests: [
      {pattern: 'src/**/*.test.js'}
    ],

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
