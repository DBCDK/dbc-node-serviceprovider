'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _dbcNodeMobilsoegProfileClient = require('dbc-node-mobilsoeg-profile-client');

var _dbcNodeMobilsoegProfileClient2 = _interopRequireDefault(_dbcNodeMobilsoegProfileClient);

var ProfileClient = {
  name: 'mobilSoegProfile',
  init: function init(config) {
    return (0, _dbcNodeMobilsoegProfileClient2['default'])(config);
  }
};

exports['default'] = ProfileClient;
module.exports = exports['default'];