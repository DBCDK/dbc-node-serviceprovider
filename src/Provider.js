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
import ServiceClients from './lib/ServiceClients.js';
import {getEventsOfType} from './lib/Events.js';

let Provider = {};
let Logger = console;
Logger.warning = Logger.error;
Logger.notice = Logger.log;

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
  Dispatcher(socket, Provider, Logger);
  return Provider;
}

/**
 * Loads the bundles transforms and clients
 * @api public
 */
function bootstrap() {
  autoRequire(path.join(__dirname, 'transformers'), 'transform.js').map(Provider.registerTransform);
  autoRequire(path.join(__dirname, 'clients'), 'client.js').map(Provider.registerServiceClient);
  return Provider;
}

/**
 * Initialization of the provider and the underlying services.
 *
 * @param {Object} config Object containing the necessary parameters.
 * @param {Object} logger logger object with methods for logging.
 *
 * @api public
 */
export default function ProviderFactory(config, logger) {

  if (logger) {
    Logger = logger;
  }

  if (!config) {
    Logger.error('No configuration was provided');
  }

  let registerServiceClient = ServiceClients(config, Logger).registerServiceClient;

  Provider = {
    setupSockets,
    bootstrap,
    registerTransform,
    registerServiceClient,
    trigger,
    getEventsOfType
  };

  Logger.log('debug', 'The ServiceProvider was initialized with the following config: ', config);

  return Provider;
}
