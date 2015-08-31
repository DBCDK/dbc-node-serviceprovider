'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _lodash = require('lodash');

var OpenAgencyTransform = {

  event: function event() {
    return 'getOpenAgency';
  },

  getOpenAgencyRequest: function getOpenAgencyRequest(id) {
    return this.callServiceClient('openagency', 'getOpenAgency', {
      id: id
    });
  },

  requestTransform: function requestTransform(event, query) {
    if (event === 'getOpenAgency') {
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
      data = {
        agencyName: response.pickupAgency.agencyName,
        branchId: response.pickupAgency.branchId,
        branchNameDan: (0, _lodash.isArray)(response.pickupAgency.branchName) ? response.pickupAgency.branchName[0].$value : response.pickupAgency.branchName.$value,
        branchPhone: response.pickupAgency.branchPhone,
        branchEmail: response.pickupAgency.branchEmail,
        postalAddress: response.pickupAgency.postalAddress,
        postalCode: response.pickupAgency.postalCode,
        city: response.pickupAgency.city,
        openingHoursDan: (0, _lodash.isArray)(response.pickupAgency.openingHours) ? response.pickupAgency.openingHours[0].$value : response.pickupAgency.openingHours.$value,
        branchWebsiteUrl: response.pickupAgency.branchWebsiteUrl
      };
    }
    data.query = query;

    return data;
  }
};

exports['default'] = OpenAgencyTransform;
module.exports = exports['default'];