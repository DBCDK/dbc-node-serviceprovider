'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _dbcNodeOpensearchClient = require('dbc-node-opensearch-client');

var OpenSearch = _interopRequireWildcard(_dbcNodeOpensearchClient);

var _ProviderJs = require('../Provider.js');

var ServiceProvider = _interopRequireWildcard(_ProviderJs);

exports['default'] = ServiceProvider.registerClient({
  name: 'opensearch',
  init: function init(config) {
    OpenSearch.init(config);
    return OpenSearch.METHODS;
  }
});
module.exports = exports['default'];