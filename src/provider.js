'use strict';

//import OpenSuggest from '';
import SocketProvider from './SocketProvider.js';
const socketProvider = new SocketProvider();

import * as api from './api.js';

export function init(config = null, socket = null) {
  if (!config) {
    throw new Error('No config provided');
  }

  api.init(config);

  if (socket) { //if no socket is provided an alternative shuld be set up
    console.log('Setting up socket');
    socketProvider.setUpSocket(socket, api.services);
  }
}
