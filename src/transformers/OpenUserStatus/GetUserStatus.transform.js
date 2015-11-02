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

    if (orderedItems.count > 0) {
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
    }

    data.result.orderedItems = orderedItems;

    const loans = result['ous:getUserStatusResponse']['ous:userStatus'][0]['ous:loanedItems'][0];

    let loanedItems = {};
    loanedItems.count = loans['ous:loansCount'][0];

    if (loanedItems.count > 0) {
      loanedItems.loans = [];

      let l;

      loans['ous:loan'].forEach((loan) => {
        l = {};
        l.author = loan['ous:author'];
        l.title = loan['ous:title'];
        l.dueDate = loan['ous:dateDue'];
        loanedItems.loans.push(l);
      });
    }

    data.result.loanedItems = loanedItems;

    return data;
  }

};

export default GetUserStatusTransform;
