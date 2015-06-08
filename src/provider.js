'use strict';

import SocketProvider from './SocketProvider.js';

import * as api from './api.js';

/**
 * Initialization of the provider and the underlying services.
 *
 * @param {Object || null} config Object containing the necessary parameters.
 * @param {Socket} socket If communication with the parent application should
 * go through a socket it should be provided here. Currently there's no
 * alternative to using socket.
 */
export function init(config = null, socket = null) {
  if (!config) {
    throw new Error('No configuration was provided');
  }

  api.init(config);

  if (socket) { // if no socket is provided an alternative shuld be set up TODO non-socket.io setup
    console.log('Setting up socket');
    SocketProvider.setUpSocket(socket, api.services);
  }
}
