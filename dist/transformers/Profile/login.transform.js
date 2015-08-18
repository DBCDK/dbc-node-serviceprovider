'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var LoginUserTransform = {

  event: function event() {
    return 'loginUser';
  },

  requestTransform: function requestTransform(event, query) {
    // eslint-disable-line no-unused-vars
    var promise = this.callServiceClient('profile', 'loginUser', query);
    return promise;
  },

  responseTransform: function responseTransform(response, query) {
    // eslint-disable-line no-unused-vars
    return JSON.parse(response.body);
  }
};

exports['default'] = LoginUserTransform;
module.exports = exports['default'];