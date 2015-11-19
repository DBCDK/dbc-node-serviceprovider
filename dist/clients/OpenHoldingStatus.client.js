'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _dbcNodeOpenholdingstatusClient = require('dbc-node-openholdingstatus-client');

var OpenHoldingStatus = _interopRequireWildcard(_dbcNodeOpenholdingstatusClient);

var OpenHoldingStatusClient = {
  name: 'openholdingstatus',
  init: function init(config) {
    OpenHoldingStatus.init(config);
    return OpenHoldingStatus.METHODS;
  }
};

exports['default'] = OpenHoldingStatusClient;
module.exports = exports['default'];