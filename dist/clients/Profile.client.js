'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _dbcNodeProfileClient = require('dbc-node-profile-client');

var _dbcNodeProfileClient2 = _interopRequireDefault(_dbcNodeProfileClient);

var ProfileClient = {
  name: 'profile',
  init: function init(config) {
    return (0, _dbcNodeProfileClient2['default'])(config);
  }
};

exports['default'] = ProfileClient;
module.exports = exports['default'];