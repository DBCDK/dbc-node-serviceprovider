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

  requestTransform: function requestTransform(event, request, connection) {
    var passport = connection.request.session.passport || { user: { id: '', uid: '' } };

    var params = {
      agencyId: 'DK-' + passport.user.agencyid,
      userId: passport.user.loanerid,
      pinCode: passport.user.pincode
    };

    return this.getUserStatus(params);
  },

  getOrderData: function getOrderData(orderedItems, orders) {

    var ready = 0;
    orders['ous:order'].forEach(function (order) {
      var o = undefined;
      o = {};
      o.author = order['ous:author'] ? order['ous:author'][0] : '';
      o.title = order['ous:title'][0];
      o.status = order['ous:orderStatus'][0];
      o.pickUpAgency = order['ous:pickUpAgency'][0].replace('DK-', '');
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
      var date = new Date(loan['ous:dateDue'][0]);
      var soonDate = new Date(new Date().getTime() + 48 * 60 * 60 * 1000);
      l.overdue = date < new Date();
      l.dueSoon = date < soonDate && date > new Date();
      l.loanId = loan['ous:loanId'][0];
      loanedItems.loans.push(l);
    });
  },

  getFiscalTransactionData: function getFiscalTransactionData(fiscalTransaction, fiscal) {

    var f = undefined;

    fiscal['ous:fiscalTransaction'].forEach(function (item) {
      f = {};
      f.author = item['ous:author'] ? item['ous:author'][0] : null;
      f.title = item['ous:title'] ? item['ous:title'][0] : null;
      f.amount = parseInt(item['ous:fiscalTransactionAmount'], 10) ? parseInt(item['ous:fiscalTransactionAmount'][0], 10) : null;
      f.currency = item['ous:fiscalTransactionCurrency'] ? item['ous:fiscalTransactionCurrency'][0] : null;
      f.date = item['ous:fiscalTransactionDate'] ? item['ous:fiscalTransactionDate'][0] : null;
      f.type = item['ous:fiscalTransactionType'] ? item['ous:fiscalTransactionType'][0] : null;
      fiscalTransaction.items.push(f);
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

    orderedItems.orders = [];
    if (orderedItems.count > 0) {
      this.getOrderData(orderedItems, orders);
    }

    data.result.orderedItems = orderedItems;

    var loans = result['ous:getUserStatusResponse']['ous:userStatus'][0]['ous:loanedItems'][0];

    var loanedItems = {};
    loanedItems.count = parseInt(loans['ous:loansCount'][0], 10);

    loanedItems.loans = [];
    if (loanedItems.count > 0) {
      this.getLoanData(loanedItems, loans);
    }

    data.result.loanedItems = loanedItems;

    if (result['ous:getUserStatusResponse']['ous:userStatus'][0]['ous:fiscalAccount']) {

      var fiscal = result['ous:getUserStatusResponse']['ous:userStatus'][0]['ous:fiscalAccount'][0];

      var fiscalTransaction = {};
      fiscalTransaction.totalAmount = parseInt(fiscal['ous:totalAmount'][0], 10);
      fiscalTransaction.currency = fiscal['ous:totalAmountCurrency'][0];

      fiscalTransaction.items = [];
      if (fiscalTransaction.totalAmount > 0) {
        this.getFiscalTransactionData(fiscalTransaction, fiscal);
      }

      data.result.fiscalAccount = fiscalTransaction;
    } else {
      data.result.fiscalAccount = {
        items: []
      };
    }

    return data;
  }

};

exports['default'] = GetUserStatusTransform;
module.exports = exports['default'];