'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var CreateProfileTransform = {

  event: function event() {
    return 'createProfile';
  },

  requestTransform: function requestTransform(event, query) {
    // eslint-disable-line no-unused-vars
    var promise = this.callServiceClient('profile', 'createProfile', query);
    return promise;
  },

  responseTransform: function responseTransform(response, query) {
    // eslint-disable-line no-unused-vars
    return JSON.parse(response.body);
  }
};

exports['default'] = CreateProfileTransform;
module.exports = exports['default'];