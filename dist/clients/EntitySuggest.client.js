'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _dbcNodeEntitysuggest = require('dbc-node-entitysuggest');

var EntitySuggest = _interopRequireWildcard(_dbcNodeEntitysuggest);

var EntitySuggestClient = {
  name: 'entitysuggest',
  init: function init(config) {
    return EntitySuggest.init(config);
  }
};

exports['default'] = EntitySuggestClient;
module.exports = exports['default'];