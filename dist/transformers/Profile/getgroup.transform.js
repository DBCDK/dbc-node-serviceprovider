'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var GetGroupTransform = {

  event: function event() {
    return 'getGroup';
  },

  requestTransform: function requestTransform(event, query, connection) {
    // eslint-disable-line no-unused-vars
    return this.callServiceClient('profile', 'getGroup', query);
  },

  responseTransform: function responseTransform(response, query, connection) {
    // eslint-disable-line no-unused-vars
    var loopbackGroup = JSON.parse(response.body);

    var group = loopbackGroup;

    return group;
  }
};

exports['default'] = GetGroupTransform;
module.exports = exports['default'];