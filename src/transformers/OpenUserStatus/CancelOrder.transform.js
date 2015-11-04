'use strict';

import * as prep from './response-preparation.js';

const CancelOrderTransform = {

  event() {
    return 'cancelOrder';
  },

  cancelOrder(request) {
    return this.callServiceClient('openuserstatus', 'cancelOrder', request);
  },

  requestTransform(event, request) {
    return this.getUserStatus({
      agencyId: 'DK-' + request.agencyId,
      orderId: request.orderId,
      orderType: request.orderType,
      userId: request.userId,
      pinCode: request.pinCode
    });
  },

  responseTransform(response) {
    let data = {};
    data.result = {};
    data.info = {};
    data.error = [];

    let result = prep.checkCancelOrderResponse(response);

    if (result.hasOwnProperty('error')) {
      data.error.push(result.error);
      return data;
    }

    data.info.orderId = response['ous:cancelOrderResponse']['ous:cancelOrderStatus'][0]['ous:orderId'];

    if (response['ous:cancelOrderResponse']['ous:cancelOrderStatus'][0].hasOwnProperty('ous:orderCancelled')) {
      data.result.orderCancelled = true;
    } else {
      data.result.orderCancelled = false;
    }

    return data;
  }

};

export default CancelOrderTransform;
