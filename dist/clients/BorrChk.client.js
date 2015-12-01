'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _dbcNodeBorchk = require('dbc-node-borchk');

var _dbcNodeBorchk2 = _interopRequireDefault(_dbcNodeBorchk);

var BorrChk = {
  name: 'borchk',
  init: function init(config) {
    return (0, _dbcNodeBorchk2['default'])(config);
  }
};

exports['default'] = BorrChk;
module.exports = exports['default'];