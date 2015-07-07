'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _dbcNodeRecommendations = require('dbc-node-recommendations');

var _dbcNodeRecommendations2 = _interopRequireDefault(_dbcNodeRecommendations);

var _ProviderJs = require('../Provider.js');

var ServiceProvider = _interopRequireWildcard(_ProviderJs);

exports['default'] = ServiceProvider.registerClient({
  name: 'recommend',
  init: function init(config) {
    return (0, _dbcNodeRecommendations2['default'])(config.endpoint);
  }
});
module.exports = exports['default'];