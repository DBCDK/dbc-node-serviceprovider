'use strict';

/**
 * @file
 * Transform that requests deletion of all likes associated with a given users profile.
 */

Object.defineProperty(exports, '__esModule', {
  value: true
});
var DeleteLikes = {

  /**
   * @return {string}
   */
  event: function event() {
    return 'deleteLikesFromMobilSoegProfile';
  },

  /**
   * @param {String} event
   * @param {Object} query
   * @param {Object} connection
   */
  requestTransform: function requestTransform(event, query, connection) {
    var passport = connection.request.session.passport || { user: { profile: { mobilSoegProfileId: null } } };
    var mobilSoegProfileId = passport.user.profile.mobilSoegProfileId;
    return this.callServiceClient('mobilSoegProfile', 'removeAllLikes', { mobilSoegProfileId: mobilSoegProfileId });
  },

  /**
   * @param {Object} response
   * @return {Object}
   */
  responseTransform: function responseTransform(response) {
    return { statusCode: response.statusCode, statusMessage: response.statusMessage };
  }
};

exports['default'] = DeleteLikes;
module.exports = exports['default'];