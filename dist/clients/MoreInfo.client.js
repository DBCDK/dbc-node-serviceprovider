'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _dbcNodeMoreinfoClient = require('dbc-node-moreinfo-client');

var _dbcNodeMoreinfoClient2 = _interopRequireDefault(_dbcNodeMoreinfoClient);

var MoreInfoClient = {
  name: 'moreinfo',
  init: function init(config) {
    return (0, _dbcNodeMoreinfoClient2['default'])(config);
  }
};

exports['default'] = MoreInfoClient;
module.exports = exports['default'];