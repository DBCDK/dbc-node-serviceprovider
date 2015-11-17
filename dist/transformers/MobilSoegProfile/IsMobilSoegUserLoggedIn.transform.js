'use strict';

/**
 * @file
 * Description
 */
Object.defineProperty(exports, '__esModule', {
  value: true
});
var IsMobilSoegUserLoggedIn = {

  /**
   * @return {string}
   */
  event: function event() {
    return 'isMobilSoegUserLoggedIn';
  },

  /**
   * @param {String} event
   * @param {Object} query
   * @param {Object} connection
   */
  requestTransform: function requestTransform(event, query, connection) {
    return new Promise(function (resolve, reject) {
      try {
        var isLoggedIn = connection.request.session && connection.request.session.passport ? true : false;
        resolve(isLoggedIn);
      } catch (e) {
        reject(Error('Something went wrong while checking a users status in IsMobilSoegUserLoggedIn.transform.js'));
      }
    });
  },

  /**
   * @param {Object} response
   * @return {Object}
   */
  responseTransform: function responseTransform(response) {
    return response;
  }
};

exports['default'] = IsMobilSoegUserLoggedIn;
module.exports = exports['default'];