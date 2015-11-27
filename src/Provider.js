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
import {getLoggingTrigger} from './lib/Trigger.js';
import registerServiceClient from './lib/ServiceClients.js';
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
  Dispatcher(Provider, Logger, socket);
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
export default function ProviderFactory(logger) {

  if (logger) {
    Logger = logger;
  }

  Provider = {
    setupSockets,
    registerTransform,
    registerServiceClient,
    trigger: getLoggingTrigger(logger),
    getEventsOfType
  };

  return Provider;
}
