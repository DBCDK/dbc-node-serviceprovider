'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.init = init;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _dbcNodePopsuggest = require('dbc-node-popsuggest');

var PopSuggest = _interopRequireWildcard(_dbcNodePopsuggest);

/** @const {Map} */
var clients = new Map([['popsuggest', PopSuggest]]);

/**
 * Should be called upon initialization with an array of object as parameter.
 * Each object in the array represents an webservice implemented by the provider
 * and so each object should contain the config parameters necessary to
 * configure that specific webservice client.
 *
 * @param {Object[]} config
 */

function init() {
  var config = arguments[0] === undefined ? [] : arguments[0];

  config.forEach(function (service) {
    if (clients.has(service.name)) {
      var client = clients.get(service.name);
      client.init(service);
    }
  });
}

var services = {
  PopSuggest: PopSuggest
};
exports.services = services;