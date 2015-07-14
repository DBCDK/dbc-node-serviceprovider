'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.setUpSocket = setUpSocket;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _dispatcherJs = require('./dispatcher.js');

var _dispatcherJs2 = _interopRequireDefault(_dispatcherJs);

var dispatcher = null;

function setUpSocket(socket, api, transforms) {
  dispatcher = new _dispatcherJs2['default']();
  dispatcher.init(socket, transforms);
}