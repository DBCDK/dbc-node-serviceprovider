'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = Clients;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _dbcNodePopsuggest = require('dbc-node-popsuggest');

var PopSuggest = _interopRequireWildcard(_dbcNodePopsuggest);

var _dbcNodeOpensuggest = require('dbc-node-opensuggest');

var _dbcNodeOpensuggest2 = _interopRequireDefault(_dbcNodeOpensuggest);

var _dbcNodeOpensearchClient = require('dbc-node-opensearch-client');

var OpenSearch = _interopRequireWildcard(_dbcNodeOpensearchClient);

var _dbcNodeMoreinfoClient = require('dbc-node-moreinfo-client');

var MoreInfo = _interopRequireWildcard(_dbcNodeMoreinfoClient);

/**
 * Initialize Clients with configuration
 *
 * Should be called upon initialization with an config object as parameter.
 * Each key in the object represents an webservice implemented by the provider
 * and so each object should contain the config parameters necessary to
 * configure that specific webservice client.
 *
 * @todo The implementation here is temporary. The provider should give methods for reqistering new clients
 *
 * @param {Object} config
 */

function Clients() {
  var config = arguments[0] === undefined ? {} : arguments[0];

  var services = new Map();
  if (config.popsuggest) {
    PopSuggest.init(config.popsuggest);
    services.set('popsuggest', PopSuggest.METHODS);
  }
  if (config.opensuggest) {
    services.set('opensuggest', (0, _dbcNodeOpensuggest2['default'])(config.opensuggest.endpoint));
  }
  if (config.searchresultlist) {
    OpenSearch.init(config.searchresultlist);
    services.set('searchresultlist'), OpenSearch.METHODS;
  }
  if (config.searchresultlist) {
    MoreInfo.init(config.coverimage);
    services.set('coverimage'), MoreInfo.METHODS;
  }
  return services;
}

module.exports = exports['default'];