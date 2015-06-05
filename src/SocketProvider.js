'use strict';

import Dispatcher from './dispatcher.js';

let dispatcher = null;

function setupSocketListeners(services) {
  const PopSuggest = services.PopSuggest;
  dispatcher.listen('getPopSuggestions', PopSuggest.getSuggestions);
}

function setUpSocket(socket, api) {
  dispatcher = Dispatcher();
  dispatcher.init(socket);
  setupSocketListeners(api);
}

export default {setUpSocket: setUpSocket};
