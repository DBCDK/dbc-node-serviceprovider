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
        branchNameDan: this.determineBranchName(response.pickupAgency.branchName),
        branchPhone: response.pickupAgency.branchPhone,
        branchEmail: response.pickupAgency.branchEmail,
        postalAddress: response.pickupAgency.postalAddress,
        postalCode: response.pickupAgency.postalCode,
        city: response.pickupAgency.city,
        openingHoursDan: this.determineOpeningHours(response.pickupAgency.openingHours),
        branchWebsiteUrl: response.pickupAgency.branchWebsiteUrl
      };
    }
    data.query = query;

    return data;
  },

  determineOpeningHours: function determineOpeningHours(openingHours) {
    var hours = '';
    if ((0, _lodash.isArray)(openingHours)) {
      hours = openingHours[0].$value;
    } else if (openingHours) {
      hours = openingHours.$value;
    }

    return hours;
  },

  determineBranchName: function determineBranchName(branchName) {
    if ((0, _lodash.isArray)(branchName)) {
      return branchName[0].$value;
    }

    return branchName.$value;
  }
};

exports['default'] = OpenAgencyTransform;
module.exports = exports['default'];