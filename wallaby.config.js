'use strict';
let babel = require('babel');

module.exports = function() {
  return {
    files: [
      {pattern: 'src/*.js', load: false}
    ],

    tests: [
      {pattern: 'src/**/*.test.js', load: false}
    ],

    preprocessors: {
      '**/*.js': [
          file => babel.transform(file.content, {sourceMaps: true})
      ]
    },

    /*
    env: {
      type: 'node'2
    },
    */

    testFramework: 'mocha@2.0.1'
  };
};
