'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _dbcNodeRecommendations = require('dbc-node-recommendations');

var _dbcNodeRecommendations2 = _interopRequireDefault(_dbcNodeRecommendations);

var RecommendationsClient = {
  name: 'recommend',
  init: function init(config) {
    return (0, _dbcNodeRecommendations2['default'])(config.endpoint, config.filters);
  }
};

exports['default'] = RecommendationsClient;
module.exports = exports['default'];