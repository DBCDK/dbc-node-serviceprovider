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
    return this.cancelOrder({
      agencyId: 'DK-' + request.agencyId,
      orderId: request.orderId,
      orderType: request.orderType,
      userId: request.userId,
      pinCode: request.pinCode
    });
  },

  responseTransform(response) {

    let result = prep.checkCancelOrderResponse(response);

    let error = null;

    let orderCancelled = false;

    const orderId = response.orderId;

    if (result.hasOwnProperty('error')) {
      error = result.error;
    }
    else {
      orderCancelled = (response['ous:cancelOrderResponse']['ous:cancelOrderStatus'][0].hasOwnProperty('ous:orderCancelled'));
    }

    response = {orderId: orderId, orderCancelled: orderCancelled, error: error};

    return response;
  }

};

export default CancelOrderTransform;
