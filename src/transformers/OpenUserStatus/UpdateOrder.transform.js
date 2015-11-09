'use strict';

import * as prep from './response-preparation.js';

const UpdateOrderTransform = {

  event() {
    return 'updateOrder';
  },

  updateOrder(request) {
    return this.callServiceClient('openuserstatus', 'updateOrder', request);
  },

  requestTransform(event, request) {
    return this.updateOrder({
      agencyId: 'DK-' + request.agencyId,
      orderId: request.orderId,
      pickUpAgency: request.pickUpAgency,
      userId: request.userId,
      pinCode: request.pinCode
    });
  },

  responseTransform(response) {

    let result = prep.checkUpdateOrderResponse(response);

    let error = null;

    let orderUpdated = false;
    let dueDate = null;
    let orderId = null;

    if (result.hasOwnProperty('error')) {
      error = result.error;
    }
    else {
      orderUpdated = (response['ous:updateOrderResponse']['ous:updateOrderStatus'][0].hasOwnProperty('ous:orderUpdated'));
      orderId = response['ous:updateOrderResponse']['ous:updateOrderStatus'][0]['ous:orderId'][0];
    }

    response = {orderId: orderId, orderUpdated: orderUpdated, error: error};

    return response;
  }

};

export default UpdateOrderTransform;
