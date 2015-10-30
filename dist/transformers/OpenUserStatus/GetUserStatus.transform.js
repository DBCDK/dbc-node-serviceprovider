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

  responseTransform: function responseTransform(response) {
    var data = {};
    data.result = {};
    data.info = { userId: response['ous:getUserStatusResponse']['ous:userId'] };
    data.error = [];

    var result = prep.checkUserStatusResponse(response);

    if (result.hasOwnProperty('error')) {
      data.error.push(result.error);
      return data;
    }

    var orders = result['ous:getUserStatusResponse']['ous:userStatus'][0]['ous:orderedItems'][0];

    var orderedItems = {};
    orderedItems.count = orders['ous:ordersCount'][0];
    orderedItems.orders = [];

    var o = undefined;

    orders['ous:order'].forEach(function (order) {
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

exports['default'] = GetUserStatusTransform;
module.exports = exports['default'];