'use strict';
let babel = require('babel');

module.exports = function() {
  return {
    files: [
      {pattern: 'src/*.js'},
      {pattern: 'src/lib/*.js'},
      {pattern: 'src/transformers/**/*.js'},
      {pattern: 'src/clients/**/*.js'},
      {pattern: 'src/__tests__/**/*.mock.js'}
    ],

    tests: [
      {pattern: 'src/**/*.test.js'},
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
