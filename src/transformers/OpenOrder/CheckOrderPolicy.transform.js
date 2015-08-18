'use strict';

import * as prep from './response-preparation.js';

const CheckOrderPolicyTransform = {

  event() {
    return 'getOrderPolicy';
  },

  checkOrderPolicy(request) {
    return this.callServiceClient('openorder', 'checkOrderPolicy', request);
  },

  requestTransform(event, request) {
    return this.checkOrderPolicy({
      pickupAgencyId: request.pickupAgencyId,
      pid: request.pid
    });
  },

  responseTransform(response) {

    let data = {};
    data.result = [];
    data.info = {};
    data.error = [];

    let result = prep.checkResponse(response);

    if (result.hasOwnProperty('error')) {
      data.error.push(result.error);
      return data;
    }

    data.result = {
      canOrder: result.checkOrderPolicyResponse.orderPossible[0]
    };

    return data;
  }

};

export default CheckOrderPolicyTransform;
