'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _dispatcherJs = require('./dispatcher.js');

var _dispatcherJs2 = _interopRequireDefault(_dispatcherJs);

var dispatcher = null;

function setupSocketListeners(services) {
  var PopSuggest = services.PopSuggest;
  dispatcher.listen('getPopSuggestions', PopSuggest.getSuggestions);
}

function setUpSocket(socket, api) {
  dispatcher = (0, _dispatcherJs2['default'])();
  dispatcher.init(socket);
  setupSocketListeners(api);
}

exports['default'] = { setUpSocket: setUpSocket };
module.exports = exports['default'];