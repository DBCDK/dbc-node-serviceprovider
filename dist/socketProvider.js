'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.setUpSocket = setUpSocket;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _libDispatcherJs = require('./lib/dispatcher.js');

var _libDispatcherJs2 = _interopRequireDefault(_libDispatcherJs);

var dispatcher = null;

function setUpSocket(socket, api, transforms) {
  dispatcher = new _libDispatcherJs2['default']();
  dispatcher.init(socket, transforms);
}