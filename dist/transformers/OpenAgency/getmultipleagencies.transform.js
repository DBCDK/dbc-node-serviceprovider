'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _openagencyJs = require('./openagency.js');

var _openagencyJs2 = _interopRequireDefault(_openagencyJs);

var OpenAgencyTransform = {

  event: function event() {
    return 'getMultiOpenAgency';
  },

  getOpenAgencyRequest: function getOpenAgencyRequest(id) {
    var ids = (0, _lodash.isArray)(id) ? id : [id];

    return this.callServiceClient('openagency', 'getOpenAgency', {
      id: ids
    });
  },

  requestTransform: function requestTransform(event, query) {
    if (event === 'getMultiOpenAgency') {
      return this.getOpenAgencyRequest(query);
    }
  },

  responseTransform: function responseTransform(response, query) {
    var data = undefined;
    if (response.error) {
      data = {
        error: true,
        statusCode: response.error.statusCode,
        statusMessage: response.error.statusMessage
      };
    } else if ((0, _lodash.isEmpty)(response)) {
      data = {
        isEmpty: true
      };
    } else {
      data = (0, _openagencyJs2['default'])(response.pickupAgency);
    }
    data.query = query;

    return data;
  }
};

exports['default'] = OpenAgencyTransform;
module.exports = exports['default'];