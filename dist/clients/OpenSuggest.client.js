'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _dbcNodeOpensuggest = require('dbc-node-opensuggest');

var _dbcNodeOpensuggest2 = _interopRequireDefault(_dbcNodeOpensuggest);

var OpenSuggestClient = {
  name: 'opensuggest',
  init: function init(config) {
    return (0, _dbcNodeOpensuggest2['default'])(config.endpoint);
  }
};

exports['default'] = OpenSuggestClient;
module.exports = exports['default'];