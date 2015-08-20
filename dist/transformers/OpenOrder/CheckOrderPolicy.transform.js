'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _responsePreparationJs = require('./response-preparation.js');

var prep = _interopRequireWildcard(_responsePreparationJs);

var CheckOrderPolicyTransform = {

  event: function event() {
    return 'getOrderPolicy';
  },

  checkOrderPolicy: function checkOrderPolicy(request) {
    return this.callServiceClient('openorder', 'checkOrderPolicy', request);
  },

  requestTransform: function requestTransform(event, request) {
    return this.checkOrderPolicy({
      agencyId: request.agencyId,
      pids: request.pids
    });
  },

  responseTransform: function responseTransform(response) {
    var data = {};
    data.result = {};
    data.info = { pids: response.pids };
    data.error = [];

    var result = prep.checkResponse(response);

    if (result.hasOwnProperty('error')) {
      data.error.push(result.error);
      return data;
    }

    data.result = {
      canOrder: result.checkOrderPolicyResponse.orderPossible[0]
    };

    return data;
  }

};

exports['default'] = CheckOrderPolicyTransform;
module.exports = exports['default'];