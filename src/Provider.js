'use strict';

/**
 * @file
 * Basic service provider. Discovers and initializes the transforms and
 * initializes the dispatcher if sockets are available.
 */

import path from 'path';
import autoRequire from './lib/AutoRequire.js';
import Dispatcher from './lib/dispatcher';
import {registerTransform} from './lib/Transforms.js';
import trigger from './lib/Trigger.js';
import Clients from './lib/Clients.js';
import {getEventsOfType} from './lib/Events.js';

let Provider = {};
/**
 * Initializes the use of sockets
 *
 * @param {Socket} socket If communication with the parent application should
 * go through a socket it should be provided here. Currently there's no
 * alternative to using socket.
 * @api public
 */
function setupSockets(socket) {
  this.bootstrap();
  Dispatcher(socket, Provider);
  return Provider;
}


/**
 * Loads the bundles transforms and clients
 * @api public
 */
function bootstrap() {
  autoRequire(path.join(__dirname, 'transformers'), 'transform.js').map(Provider.registerTransform);
  autoRequire(path.join(__dirname, 'clients'), 'client.js').map(Provider.registerClient);
  return Provider;
}

/**
 * Initialization of the provider and the underlying services.
 *
 * @param {Object} config Object containing the necessary parameters.
 *
 * @api public
 */

export default function ProviderFactory(config) {
  if (!config) {
    throw new Error('No configuration was provided');
  }

  let registerClient = Clients(config).registerClient;

  Provider = {
    setupSockets,
    bootstrap,
    registerTransform,
    registerClient,
    trigger,
    getEventsOfType
  };

  return Provider;
}
