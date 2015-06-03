'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.init = init;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _dbcNodePopsuggest = require('dbc-node-popsuggest');

var PopSuggest = _interopRequireWildcard(_dbcNodePopsuggest);

function init(config) {
  console.log(config);
}

var services = {
  PopSuggest: PopSuggest
};
exports.services = services;