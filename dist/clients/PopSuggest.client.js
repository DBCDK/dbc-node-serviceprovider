'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _dbcNodePopsuggest = require('dbc-node-popsuggest');

var PopSuggest = _interopRequireWildcard(_dbcNodePopsuggest);

var PopSuggestClient = {
  name: 'popsuggest',
  init: function init(config) {
    PopSuggest.init(config);
    return PopSuggest.METHODS;
  }
};

exports['default'] = PopSuggestClient;
module.exports = exports['default'];