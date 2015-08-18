'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _dbcNodeOpenorderClient = require('dbc-node-openorder-client');

var OpenOrder = _interopRequireWildcard(_dbcNodeOpenorderClient);

var OpenOrderClient = {
  name: 'openorder',
  init: function init(config) {
    OpenOrder.init(config);
    return OpenOrder.METHODS;
  }
};

exports['default'] = OpenOrderClient;
module.exports = exports['default'];