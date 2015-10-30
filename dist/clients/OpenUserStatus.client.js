'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _dbcNodeOpenuserstatusClient = require('dbc-node-openuserstatus-client');

var OpenUserStatus = _interopRequireWildcard(_dbcNodeOpenuserstatusClient);

var OpenUserStatusClient = {
  name: 'openuserstatus',
  init: function init(config) {
    OpenUserStatus.init(config);
    return OpenUserStatus.METHODS;
  }
};

exports['default'] = OpenUserStatusClient;
module.exports = exports['default'];