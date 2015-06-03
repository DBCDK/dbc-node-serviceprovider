'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.init = init;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

//import OpenSuggest from '';

var _SocketProviderJs = require('./SocketProvider.js');

var _SocketProviderJs2 = _interopRequireDefault(_SocketProviderJs);

var endPoint = '';

function init() {
  var endpoint = arguments[0] === undefined ? null : arguments[0];
  var socket = arguments[1] === undefined ? null : arguments[1];

  if (!endpoint) {
    throw new Error('No endpoint provided');
  }
  endPoint = endpoint;

  if (socket) {
    console.log('Setting up socket');
    _SocketProviderJs2['default'].setUpSocket(socket);
  }
}