'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _dbcNodeMobilsoegProfileClient = require('dbc-node-mobilsoeg-profile-client');

var MobilSoegProfile = _interopRequireWildcard(_dbcNodeMobilsoegProfileClient);

var ProfileClient = {
  name: 'mobilSoegProfile',
  init: function init(config) {
    MobilSoegProfile.init(config);
    return MobilSoegProfile.METHODS;
  }
};

exports['default'] = ProfileClient;
module.exports = exports['default'];