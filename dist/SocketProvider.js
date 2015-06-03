'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _dispatcherJs = require('./dispatcher.js');

var _dispatcherJs2 = _interopRequireDefault(_dispatcherJs);

// services

function SocketProvider() {
  var dispatcher = null;

  function setUpSocket(socket) {
    dispatcher = (0, _dispatcherJs2['default'])();
    dispatcher.init(socket);
  }

  function setupSocketListeners() {}

  return {
    setUpSocket: setUpSocket
  };
}

exports['default'] = SocketProvider;
module.exports = exports['default'];

//dispatcher.listen('getSuggestions', OpenSuggest.getSuggestions); //TODO implement method for retreiving suggestions