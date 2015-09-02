'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _openagencyJs = require('./openagency.js');

var _openagencyJs2 = _interopRequireDefault(_openagencyJs);

var SearchOpenAgencyTransform = {

  event: function event() {
    return 'searchOpenAgency';
  },

  searchOpenAgencyRequest: function searchOpenAgencyRequest(query) {
    return this.callServiceClient('openagency', 'searchOpenAgency', {
      query: query
    });
  },

  requestTransform: function requestTransform(event, query) {
    if (event === 'searchOpenAgency') {
      return this.searchOpenAgencyRequest(query);
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
      response.pickupAgency = (0, _lodash.isArray)(response.pickupAgency) ? response.pickupAgency : [response.pickupAgency];
      data = {
        agencies: response.pickupAgency.map(function (val) {
          return (0, _openagencyJs2['default'])(val);
        })
      };
    }
    data.query = query;

    return data;
  }
};

exports['default'] = SearchOpenAgencyTransform;
module.exports = exports['default'];