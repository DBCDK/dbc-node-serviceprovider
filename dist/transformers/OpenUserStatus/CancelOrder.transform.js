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

  requestTransform: function requestTransform(event, request, connection) {

    var passport = connection.request.session.passport || { user: { id: '', uid: '' } };

    return this.cancelOrder({
      agencyId: 'DK-' + passport.user.agencyid,
      orderId: request.orderId,
      orderType: request.orderType,
      userId: passport.user.loanerid,
      pinCode: passport.user.pincode
    });
  },

  responseTransform: function responseTransform(response) {

    var result = prep.checkCancelOrderResponse(response);

    var error = null;

    var orderCancelled = false;

    var orderId = response.orderId;

    if (result.hasOwnProperty('error')) {
      error = result.error;
    } else {
      orderCancelled = response['ous:cancelOrderResponse']['ous:cancelOrderStatus'][0].hasOwnProperty('ous:orderCancelled');
    }

    response = { orderId: orderId, orderCancelled: orderCancelled, error: error };

    return response;
  }

};

exports['default'] = CancelOrderTransform;
module.exports = exports['default'];