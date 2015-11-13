'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _dbcNodeRankedRecommendationsClient = require('dbc-node-ranked-recommendations-client');

var _dbcNodeRankedRecommendationsClient2 = _interopRequireDefault(_dbcNodeRankedRecommendationsClient);

var RecommendationsClient = {
  name: 'recommendranked',
  init: function init(config) {
    return (0, _dbcNodeRankedRecommendationsClient2['default'])(config.endpoint, config.filters);
  }
};

exports['default'] = RecommendationsClient;
module.exports = exports['default'];