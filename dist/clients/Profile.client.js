'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _dbcNodeProfileClient = require('dbc-node-profile-client');

var Profile = _interopRequireWildcard(_dbcNodeProfileClient);

var ProfileClient = {
  name: 'profile',
  init: function init(config) {
    return Profile.init(config);
  }
};

exports['default'] = ProfileClient;
module.exports = exports['default'];