'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _dbcNodeOpenorderClient = require('dbc-node-openorder-client');

var _dbcNodeOpenorderClient2 = _interopRequireDefault(_dbcNodeOpenorderClient);

var OpenOrderClient = {
  name: 'openorder',
  init: function init(config) {
    return (0, _dbcNodeOpenorderClient2['default'])(config);
  }
};

exports['default'] = OpenOrderClient;
module.exports = exports['default'];