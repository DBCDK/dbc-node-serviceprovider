'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _dbcNodeOpensearchClient = require('dbc-node-opensearch-client');

var _dbcNodeOpensearchClient2 = _interopRequireDefault(_dbcNodeOpensearchClient);

var OpenSearchClient = {
  name: 'opensearch',
  init: function init(config) {
    return (0, _dbcNodeOpensearchClient2['default'])(config);
  }
};

exports['default'] = OpenSearchClient;
module.exports = exports['default'];