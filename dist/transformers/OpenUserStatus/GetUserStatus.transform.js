'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _responsePreparationJs = require('./response-preparation.js');

var prep = _interopRequireWildcard(_responsePreparationJs);

var GetUserStatusTransform = {

  event: function event() {
    return 'getUserStatus';
  },

  getUserStatus: function getUserStatus(request) {
    return this.callServiceClient('openuserstatus', 'getUserStatus', request);
  },

  requestTransform: function requestTransform(event, request) {
    return this.getUserStatus({
      agencyId: 'DK-' + request.agencyId,
      userId: request.userId,
      pinCode: request.pinCode
    });
  },

  getOrderData: function getOrderData(orderedItems, orders) {

    var ready = 0;
    orders['ous:order'].forEach(function (order) {
      var o = undefined;
      o = {};
      o.author = order['ous:author'] ? order['ous:author'][0] : '';
      o.title = order['ous:title'][0];
      o.status = order['ous:orderStatus'][0];
      o.pickUpAgency = order['ous:pickUpAgency'][0];
      if (o.status === 'Available for pickup') {
        o.pickUpExpiryDate = order['ous:pickUpExpiryDate'][0];
      } else {
        o.queue = order['ous:holdQueuePosition'] ? order['ous:holdQueuePosition'][0] : null;
      }
      o.orderId = order['ous:orderId'][0];
      o.orderType = order['ous:orderType'][0];
      orderedItems.orders.push(o);
      if (o.status === 'Available for pickup') {
        ready++;
      }
    });
    orderedItems.readyForPickUp = ready;
  },

  getLoanData: function getLoanData(loanedItems, loans) {

    var l = undefined;

    loans['ous:loan'].forEach(function (loan) {
      l = {};
      l.author = loan['ous:author'] ? loan['ous:author'][0] : null;
      l.title = loan['ous:title'] ? loan['ous:title'][0] : null;
      l.dueDate = loan['ous:dateDue'][0];
      l.loanId = loan['ous:loanId'][0];
      loanedItems.loans.push(l);
    });
  },

  responseTransform: function responseTransform(response) {
    var data = {};
    data.result = {};
    data.info = {};
    data.error = [];

    var result = prep.checkUserStatusResponse(response);

    if (result.hasOwnProperty('error')) {
      data.error.push(result.error);
      return data;
    }

    data.info.userId = response['ous:getUserStatusResponse']['ous:userId'][0];

    var orders = result['ous:getUserStatusResponse']['ous:userStatus'][0]['ous:orderedItems'][0];

    var orderedItems = {};
    orderedItems.count = parseInt(orders['ous:ordersCount'][0], 10);

    if (orderedItems.count > 0) {
      orderedItems.orders = [];
      this.getOrderData(orderedItems, orders);
    }

    data.result.orderedItems = orderedItems;

    var loans = result['ous:getUserStatusResponse']['ous:userStatus'][0]['ous:loanedItems'][0];

    var loanedItems = {};
    loanedItems.count = parseInt(loans['ous:loansCount'][0], 10);

    if (loanedItems.count > 0) {
      loanedItems.loans = [];
      this.getLoanData(loanedItems, loans);
    }

    data.result.loanedItems = loanedItems;

    return data;
  }

};

exports['default'] = GetUserStatusTransform;
module.exports = exports['default'];