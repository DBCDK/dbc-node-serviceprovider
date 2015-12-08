'use strict';

/**
 * @file
 * Small utility functions.
 */

/**
 * Method that returns current time in milliseconds, but with decimal precision of nanoseconds.
 *
 * @returns {number} current time in milliseconds
 */
Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.now = now;

function now() {
  var hr = process.hrtime();
  return (hr[0] * 1e9 + hr[1]) / 1000000;
}