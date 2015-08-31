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
        branchNameDan: (isArray(response.pickupAgency.branchName)) ? response.pickupAgency.branchName[0].$value : response.pickupAgency.branchName.$value,
        branchPhone: response.pickupAgency.branchPhone,
        branchEmail: response.pickupAgency.branchEmail,
        postalAddress: response.pickupAgency.postalAddress,
        postalCode: response.pickupAgency.postalCode,
        city: response.pickupAgency.city,
        openingHoursDan: (isArray(response.pickupAgency.openingHours)) ? response.pickupAgency.openingHours[0].$value : response.pickupAgency.openingHours.$value,
        branchWebsiteUrl: response.pickupAgency.branchWebsiteUrl
      };
    }
    data.query = query;

    return data;
  }
};

export default OpenAgencyTransform;
