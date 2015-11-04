'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _responsePreparationJs = require('./response-preparation.js');

var prep = _interopRequireWildcard(_responsePreparationJs);

var CancelOrderTransform = {

  event: function event() {
    return 'cancelOrder';
  },

  cancelOrder: function cancelOrder(request) {
    return this.callServiceClient('openuserstatus', 'cancelOrder', request);
  },

  requestTransform: function requestTransform(event, request) {
    return this.getUserStatus({
      agencyId: 'DK-' + request.agencyId,
      orderId: request.orderId,
      orderType: request.orderType,
      userId: request.userId,
      pinCode: request.pinCode
    });
  },

  responseTransform: function responseTransform(response) {
    var data = {};
    data.result = {};
    data.info = {};
    data.error = [];

    var result = prep.checkCancelOrderResponse(response);

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

exports['default'] = CancelOrderTransform;
module.exports = exports['default'];