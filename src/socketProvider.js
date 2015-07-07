'use strict';

import Dispatcher from './lib/dispatcher.js';

let dispatcher = null;

export function setUpSocket(socket, api, transforms) {
  dispatcher = new Dispatcher();
  dispatcher.init(socket, transforms);
}
