'use strict';

import * as prep from './response-preparation.js';

const GetUserStatusTransform = {

  event() {
    return 'getUserStatus';
  },

  getUserStatus(request) {
    return this.callServiceClient('openuserstatus', 'getUserStatus', request);
  },

  requestTransform(event, request) {
    return this.getUserStatus({
      agencyId: 'DK-' + request.agencyId,
      userId: request.userId,
      pinCode: request.pinCode
    });
  },

  responseTransform(response) {
    let data = {};
    data.result = {};
    data.info = {userId: response['ous:getUserStatusResponse']['ous:userId']};
    data.error = [];

    let result = prep.checkUserStatusResponse(response);

    if (result.hasOwnProperty('error')) {
      data.error.push(result.error);
      return data;
    }

    const orders = result['ous:getUserStatusResponse']['ous:userStatus'][0]['ous:orderedItems'][0];

    let orderedItems = {};
    orderedItems.count = orders['ous:ordersCount'][0];
    orderedItems.orders = [];

    let o;

    orders['ous:order'].forEach((order) => {
      o = {};
      o.author = order['ous:author'];
      o.title = order['ous:title'];
      o.queue = order['ous:holdQueuePosition'];
      o.pickUpAgency = order['ous:pickUpAgency'];
      o.pickUpExpiryDate = order['ous:pickUpExpiryDate'];
      o.status = order['ous:orderStatus'];
      orderedItems.orders.push(o);
    });

    data.result.orderedItems = orderedItems;

    return data;
  }

};

export default GetUserStatusTransform;
