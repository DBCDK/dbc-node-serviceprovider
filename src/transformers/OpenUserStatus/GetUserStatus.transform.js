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

  getOrderData(orderedItems, orders) {

    let ready = 0;
    orders['ous:order'].forEach((order) => {
      let o;
      o = {};
      o.author = (order['ous:author']) ? order['ous:author'][0] : '';
      o.title = order['ous:title'][0];
      o.status = order['ous:orderStatus'][0];
      o.pickUpAgency = order['ous:pickUpAgency'][0];
      if (o.status === 'Available for pickup') {
        o.pickUpExpiryDate = order['ous:pickUpExpiryDate'][0];
      }
      else {
        o.queue = (order['ous:holdQueuePosition']) ? order['ous:holdQueuePosition'][0] : null;
      }
      o.orderId = order['ous:orderId'][0];
      orderedItems.orders.push(o);
      if (o.status === 'Available for pickup') {
        ready++;
      }
    });
    orderedItems.readyForPickUp = ready;

  },

  getLoanData(loanedItems, loans) {

    let l;

    loans['ous:loan'].forEach((loan) => {
      l = {};
      l.author = (loan['ous:author']) ? loan['ous:author'][0] : null;
      l.title = (loan['ous:title']) ? loan['ous:title'][0] : null;
      l.dueDate = loan['ous:dateDue'][0];
      l.loanId = loan['ous:loanId'][0];
      loanedItems.loans.push(l);
    });

  },

  responseTransform(response) {
    let data = {};
    data.result = {};
    data.info = {};
    data.error = [];

    let result = prep.checkUserStatusResponse(response);

    if (result.hasOwnProperty('error')) {
      data.error.push(result.error);
      return data;
    }

    data.info.userId = response['ous:getUserStatusResponse']['ous:userId'][0];

    const orders = result['ous:getUserStatusResponse']['ous:userStatus'][0]['ous:orderedItems'][0];


    let orderedItems = {};
    orderedItems.count = parseInt(orders['ous:ordersCount'][0], 10);

    if (orderedItems.count > 0) {
      orderedItems.orders = [];
      this.getOrderData(orderedItems, orders);
    }


    data.result.orderedItems = orderedItems;

    const loans = result['ous:getUserStatusResponse']['ous:userStatus'][0]['ous:loanedItems'][0];

    let loanedItems = {};
    loanedItems.count = parseInt(loans['ous:loansCount'][0], 10);

    if (loanedItems.count > 0) {
      loanedItems.loans = [];
      this.getLoanData(loanedItems, loans);
    }

    data.result.loanedItems = loanedItems;

    return data;
  }

};

export default GetUserStatusTransform;
