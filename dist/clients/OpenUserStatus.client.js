'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _dbcNodeOpenuserstatusClient = require('dbc-node-openuserstatus-client');

var _dbcNodeOpenuserstatusClient2 = _interopRequireDefault(_dbcNodeOpenuserstatusClient);

var OpenUserStatusClient = {
  name: 'openuserstatus',
  init: function init(config) {
    return (0, _dbcNodeOpenuserstatusClient2['default'])(config);
  }
};

exports['default'] = OpenUserStatusClient;
module.exports = exports['default'];