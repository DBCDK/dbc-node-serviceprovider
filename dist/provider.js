'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.init = init;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _SocketProviderJs = require('./SocketProvider.js');

var _SocketProviderJs2 = _interopRequireDefault(_SocketProviderJs);

var _apiJs = require('./api.js');

var api = _interopRequireWildcard(_apiJs);

function init() {
  var config = arguments[0] === undefined ? null : arguments[0];
  var socket = arguments[1] === undefined ? null : arguments[1];

  if (!config) {
    throw new Error('No config provided');
  }

  api.init(config);

  if (socket) {
    // if no socket is provided an alternative shuld be set up TODO non-socket.io setup
    console.log('Setting up socket');
    _SocketProviderJs2['default'].setUpSocket(socket, api.services);
  }
}