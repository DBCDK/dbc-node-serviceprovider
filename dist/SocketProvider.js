'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _dispatcherJs = require('./dispatcher.js');

var _dispatcherJs2 = _interopRequireDefault(_dispatcherJs);

function SocketProvider() {
  var dispatcher = null;

  function setupSocketListeners(services) {
    console.log('setupSocketListeners');
    var PopSuggest = services.PopSuggest;
    PopSuggest.getSuggestions();
    dispatcher.listen('getPopSuggestions', PopSuggest.getSuggestions); //TODO implement method for retreiving suggestions
  }

  function setUpSocket(socket, api) {
    dispatcher = (0, _dispatcherJs2['default'])();
    dispatcher.init(socket);
    setupSocketListeners(api);
  }

  return {
    setUpSocket: setUpSocket
  };
}

exports['default'] = SocketProvider;
module.exports = exports['default'];