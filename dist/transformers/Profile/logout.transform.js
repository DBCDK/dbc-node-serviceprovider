'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var LogoutUserTransform = {

  event: function event() {
    return 'logoutUser';
  },

  requestTransform: function requestTransform(event, query) {
    // eslint-disable-line no-unused-vars
    var promise = this.callServiceClient('profile', 'logoutUser', query);
    return promise;
  },

  responseTransform: function responseTransform(response, query) {
    // eslint-disable-line no-unused-vars
    return JSON.parse(response.body);
  }
};

exports['default'] = LogoutUserTransform;
module.exports = exports['default'];