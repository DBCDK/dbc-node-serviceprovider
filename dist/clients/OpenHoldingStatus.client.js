'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _dbcNodeOpenholdingstatusClient = require('dbc-node-openholdingstatus-client');

var _dbcNodeOpenholdingstatusClient2 = _interopRequireDefault(_dbcNodeOpenholdingstatusClient);

var OpenHoldingStatusClient = {
  name: 'openholdingstatus',
  init: function init(config) {
    return (0, _dbcNodeOpenholdingstatusClient2['default'])(config);
  }
};

exports['default'] = OpenHoldingStatusClient;
module.exports = exports['default'];