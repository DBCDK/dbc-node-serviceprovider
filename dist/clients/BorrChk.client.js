'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _dbcNodeBorchk = require('dbc-node-borchk');

var Borchk = _interopRequireWildcard(_dbcNodeBorchk);

var BorrChk = {
  name: 'borchk',
  init: function init(config) {
    Borchk.init(config);
    return Borchk.METHODS;
  }
};

exports['default'] = BorrChk;
module.exports = exports['default'];