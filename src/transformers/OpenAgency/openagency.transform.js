'use strict';

import {isArray, isEmpty} from 'lodash';

const OpenAgencyTransform = {

  event() {
    return 'getOpenAgency';
  },

  getOpenAgencyRequest(id) {
    return this.callServiceClient('openagency', 'getOpenAgency', {
      id: id
    });
  },

  requestTransform(event, query) {
    if (event === 'getOpenAgency') {
      return this.getOpenAgencyRequest(query);
    }
  },

  responseTransform(response, query) {
    let data;
    if (response.error) {
      data = {
        error: true,
        statusCode: response.error.statusCode,
        statusMessage: response.error.statusMessage
      };
    }
    else if (isEmpty(response)) {
      data = {
        isEmpty: true
      };
    }
    else {
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

  determineOpeningHours(openingHours) {
    let hours = '';
    if (isArray(openingHours)) {
      hours = openingHours[0].$value;
    }
    else if (openingHours) {
      hours = openingHours.$value;
    }

    return hours;
  },

  determineBranchName(branchName) {
    if (isArray(branchName)) {
      return branchName[0].$value;
    }

    return branchName.$value;
  }
};

export default OpenAgencyTransform;
