'use strict';

/**
 * @file
 * Uses the custom method 'findMobilSoegProfile' to retrieve a user.
 * The method ensures that if no user is found a new will be created.
 *
 * @see http://profile-i01.dbc.dk:3001/explorer/#!/MobilSoegProfiles/findMobilSoegProfile
 */
Object.defineProperty(exports, '__esModule', {
  value: true
});
var CheckBorrower = {

  /**
   * @return {string}
   */
  event: function event() {
    return 'findMobilSoegProfile';
  },

  /**
   * @param {String} event
   * @param {Object} query
   */
  requestTransform: function requestTransform(event, query) {
    return this.callServiceClient('profile', 'findMobilSoegProfile', {
      agencyid: query.agencyid,
      loanerid: query.loanerid
    });
  },

  /**
   * @param {Object} response
   * @return {Object}
   */
  responseTransform: function responseTransform(response) {
    return { body: response.body.response, statusCode: response.statusCode, statusMessage: response.statusMessage };
  }
};

exports['default'] = CheckBorrower;
module.exports = exports['default'];