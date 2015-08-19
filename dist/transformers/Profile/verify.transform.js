'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var VerifyEmailTransform = {

  event: function event() {
    return 'verifyEmail';
  },

  requestTransform: function requestTransform(event, query) {
    // eslint-disable-line no-unused-vars
    var promise = this.callServiceClient('profile', 'verifyEmail', query);
    return promise;
  },

  responseTransform: function responseTransform(response, query) {
    // eslint-disable-line no-unused-vars
    return JSON.parse(response.body);
  }
};

exports['default'] = VerifyEmailTransform;
module.exports = exports['default'];