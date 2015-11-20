'use strict';

const pickupAgencyListTransform = {
  event() {
    return 'pickupAgencyList';
  },

  requestTransform(event, params) {
    return this.callServiceClient('openagency', 'getAgencyBranches', params.agencyid);
  },

  responseTransform(data) {
    console.error(data);
    return {};
  }
};

export default pickupAgencyListTransform;
