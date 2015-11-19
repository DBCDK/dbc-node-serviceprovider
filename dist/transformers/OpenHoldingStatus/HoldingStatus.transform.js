'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _responsePreparationJs = require('./response-preparation.js');

var prep = _interopRequireWildcard(_responsePreparationJs);

var HoldingStatusTransform = {

  event: function event() {
    return 'holdingStatus';
  },

  holdingStatus: function holdingStatus(request) {
    return this.callServiceClient('openholdingstatus', 'getHolding', request);
  },

  requestTransform: function requestTransform(event, request) {

    var params = {
      responderId: request.agencyId,
      pid: request.pid
    };

    return this.holdingStatus(params);
  },

  responseTransform: function responseTransform(response) {
    var data = {};
    data.result = {};
    data.info = {};
    data.error = [];

    var result = prep.checkHoldingStatusResponse(response);

    if (result.hasOwnProperty('error')) {
      data.info.pid = result.pid;
      data.error.push(result.error);
      return data;
    }

    data.info.pid = response.responder.pid;

    data.result.available = response.responder.willLend === 'true';
    data.result.expectedDelievery = response.responder.expectedDelivery;

    var today = new Date().toUTCString();
    today = today.split(' ').slice(0, 4).join(' ');
    var expected = new Date(response.responder.expectedDelivery).toUTCString();
    expected = expected.split(' ').slice(0, 4).join(' ');

    data.result.now = expected === today;

    return data;
  }

};

exports['default'] = HoldingStatusTransform;
module.exports = exports['default'];