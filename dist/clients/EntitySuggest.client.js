'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _dbcNodeEntitysuggest = require('dbc-node-entitysuggest');

var _dbcNodeEntitysuggest2 = _interopRequireDefault(_dbcNodeEntitysuggest);

var EntitySuggestClient = {
  name: 'entitysuggest',
  init: function init(config) {
    return (0, _dbcNodeEntitysuggest2['default'])(config);
  }
};

exports['default'] = EntitySuggestClient;
module.exports = exports['default'];