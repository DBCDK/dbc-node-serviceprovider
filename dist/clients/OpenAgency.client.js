'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _dbcNodeOpenagencyClient = require('dbc-node-openagency-client');

var OpenAgency = _interopRequireWildcard(_dbcNodeOpenagencyClient);

var OpenAgencyClient = {
  name: 'openagency',
  init: function init(config) {
    OpenAgency.init(config);
    return OpenAgency.METHODS;
  }
};

exports['default'] = OpenAgencyClient;
module.exports = exports['default'];