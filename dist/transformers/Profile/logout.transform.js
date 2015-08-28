'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var LogoutProfileTransform = {

  event: function event() {
    return 'logoutProfile';
  },

  requestTransform: function requestTransform(event, query) {
    // eslint-disable-line no-unused-vars
    var promise = this.callServiceClient('profile', 'logoutProfile', query);
    return promise;
  },

  responseTransform: function responseTransform(response, query) {
    // eslint-disable-line no-unused-vars
    return JSON.parse(response.body);
  }
};

exports['default'] = LogoutProfileTransform;
module.exports = exports['default'];