'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _dbcNodeDdbcontentClient = require('dbc-node-ddbcontent-client');

var DdbContent = _interopRequireWildcard(_dbcNodeDdbcontentClient);

var DdbContentClient = {
  name: 'ddbcontent',
  init: function init(config) {
    return DdbContent.init(config);
  }
};

exports['default'] = DdbContentClient;
module.exports = exports['default'];