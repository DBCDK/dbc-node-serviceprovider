'use strict';

import Dispatcher from './dispatcher.js';

// services


function SocketProvider() {
  let dispatcher = null;

  function setUpSocket(socket) {
    dispatcher = Dispatcher();
    dispatcher.init(socket);
  }

  function setupSocketListeners() {
    //dispatcher.listen('getSuggestions', OpenSuggest.getSuggestions); //TODO implement method for retreiving suggestions
  }

  return {
    setUpSocket: setUpSocket
  };
}

export default SocketProvider;
