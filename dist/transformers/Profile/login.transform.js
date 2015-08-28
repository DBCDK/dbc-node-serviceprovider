'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var LoginProfileTransform = {

  event: function event() {
    return 'loginProfile';
  },

  requestTransform: function requestTransform(event, query) {
    // eslint-disable-line no-unused-vars
    var promise = this.callServiceClient('profile', 'loginProfile', query);
    return promise;
  },

  responseTransform: function responseTransform(response, query) {
    // eslint-disable-line no-unused-vars
    return JSON.parse(response.body);
  }
};

exports['default'] = LoginProfileTransform;
module.exports = exports['default'];