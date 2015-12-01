'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _dbcNodeDdbcontentClient = require('dbc-node-ddbcontent-client');

var _dbcNodeDdbcontentClient2 = _interopRequireDefault(_dbcNodeDdbcontentClient);

var DdbContentClient = {
  name: 'ddbcontent',
  init: function init(config) {
    return (0, _dbcNodeDdbcontentClient2['default'])(config);
  }
};

exports['default'] = DdbContentClient;
module.exports = exports['default'];