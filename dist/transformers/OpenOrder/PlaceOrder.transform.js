'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _responsePreparationJs = require('./response-preparation.js');

var prep = _interopRequireWildcard(_responsePreparationJs);

var PlaceOrderTransform = {

  event: function event() {
    return 'placeOrder';
  },

  getNeedBeforeDate: function getNeedBeforeDate(days) {
    var future = new Date();
    return new Date(future.setDate(future.getDate() + days)).toISOString();
  },

  placeOrder: function placeOrder(request) {
    return this.callServiceClient('openorder', 'placeOrder', request);
  },

  requestTransform: function requestTransform(event, request) {
    return this.placeOrder({
      agencyId: request.agencyId,
      pids: request.pids.split(','),
      userId: request.userId,
      needBeforeDate: this.getNeedBeforeDate(90)
    });
  },

  responseTransform: function responseTransform(response) {
    var data = {};
    data.result = {};
    data.info = { pids: response.pids };
    data.error = [];

    var result = prep.checkOrderResponse(response);

    if (result.hasOwnProperty('error')) {
      data.error.push(result.error);
      return data;
    }

    var orderPlaced = false;

    if (result.placeOrderResponse.hasOwnProperty('orderPlaced')) {
      orderPlaced = true;
    }

    data.result = {
      orderPlaced: orderPlaced
    };

    return data;
  }

};

exports['default'] = PlaceOrderTransform;
module.exports = exports['default'];