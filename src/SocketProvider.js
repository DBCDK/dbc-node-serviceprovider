'use strict';

import Dispatcher from './dispatcher.js';

function SocketProvider() {
  let dispatcher = null;

  function setupSocketListeners(services) {
    const PopSuggest = services.PopSuggest;

    dispatcher.listen('getPopSuggestions', PopSuggest.getSuggestions); //TODO implement method for retreiving suggestions
  }

  function setUpSocket(socket, api) {
    dispatcher = Dispatcher();
    dispatcher.init(socket);
    setupSocketListeners(api);
  }

  return {
    setUpSocket: setUpSocket
  };
}

export default SocketProvider;
