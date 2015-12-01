'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _dbcNodeOpenagencyClient = require('dbc-node-openagency-client');

var _dbcNodeOpenagencyClient2 = _interopRequireDefault(_dbcNodeOpenagencyClient);

var OpenAgencyClient = {
  name: 'openagency',
  init: function init(config) {
    return (0, _dbcNodeOpenagencyClient2['default'])(config);
  }
};

exports['default'] = OpenAgencyClient;
module.exports = exports['default'];