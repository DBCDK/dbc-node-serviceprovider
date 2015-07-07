'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _dbcNodeOpensuggest = require('dbc-node-opensuggest');

var _dbcNodeOpensuggest2 = _interopRequireDefault(_dbcNodeOpensuggest);

var _ProviderJs = require('../Provider.js');

var ServiceProvider = _interopRequireWildcard(_ProviderJs);

exports['default'] = ServiceProvider.registerClient({
  name: 'opensuggest',
  init: function init(config) {
    return (0, _dbcNodeOpensuggest2['default'])(config.endpoint);
  }
});
module.exports = exports['default'];