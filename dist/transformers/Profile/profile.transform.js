'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var CreateUserTransform = {

  event: function event() {
    return 'createUser';
  },

  requestTransform: function requestTransform(event, query) {
    // eslint-disable-line no-unused-vars
    var promise = this.callServiceClient('profile', 'createUser', query);
    return promise;
  },

  responseTransform: function responseTransform(response, query) {
    // eslint-disable-line no-unused-vars
    return response;
  }
};

exports['default'] = CreateUserTransform;
module.exports = exports['default'];