'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _dbcNodePopsuggest = require('dbc-node-popsuggest');

var _dbcNodePopsuggest2 = _interopRequireDefault(_dbcNodePopsuggest);

var PopSuggestClient = {
  name: 'popsuggest',
  init: function init(config) {
    return (0, _dbcNodePopsuggest2['default'])(config);
  }
};

exports['default'] = PopSuggestClient;
module.exports = exports['default'];