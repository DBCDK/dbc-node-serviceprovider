'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _responsePreparationJs = require('./response-preparation.js');

var prep = _interopRequireWildcard(_responsePreparationJs);

var UpdateOrderTransform = {

  event: function event() {
    return 'updateOrder';
  },

  updateOrder: function updateOrder(request) {
    return this.callServiceClient('openuserstatus', 'updateOrder', request);
  },

  requestTransform: function requestTransform(event, request, connection) {

    var passport = connection.request.session.passport || { user: { id: '', uid: '' } };

    return this.updateOrder({
      agencyId: 'DK-' + passport.user.agencyid,
      orderId: request.orderId,
      pickUpAgency: request.pickUpAgencyId,
      userId: passport.user.loanerid,
      pinCode: passport.user.pincode
    });
  },

  responseTransform: function responseTransform(response) {

    var result = prep.checkUpdateOrderResponse(response);

    var error = null;

    var orderUpdated = false;
    var orderId = null;

    if (result.hasOwnProperty('error')) {
      error = result.error;
    } else {
      orderUpdated = response['ous:updateOrderResponse']['ous:updateOrderStatus'][0].hasOwnProperty('ous:orderUpdated');
      orderId = response['ous:updateOrderResponse']['ous:updateOrderStatus'][0]['ous:orderId'][0];
    }

    response = { orderId: orderId, orderUpdated: orderUpdated, error: error };

    return response;
  }

};

exports['default'] = UpdateOrderTransform;
module.exports = exports['default'];