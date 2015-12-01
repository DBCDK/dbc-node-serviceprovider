'use strict';

/**
 * @file
 * Basic service provider. Discovers and initializes the transforms and
 * initializes the dispatcher if sockets are available.
 */

import Dispatcher from './lib/dispatcher';
//import {registerTransform} from './lib/Transforms.js';
import Trigger from './lib/Trigger.js';
//import registerServiceClient from './lib/ServiceClients.js';
//import {getEventsOfType} from './lib/Events.js';
import {extend} from 'lodash';

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
export default function Provider(logger, sockets) {

  let clients = {};
  const transforms = new Map();

  function registerTransform(transform) {
    const name = transform.event();
    if (transforms.has(name)) {
      throw new Error(`Event '${name}' already registered`);
    }
    else {
      transforms.set(name, transform);
    }
  }

  function registerServiceClient(name, client) {
    if (clients[name]) {
      throw new Error(`Client '${name}' already registered`);
    }
    clients[name] = client;
  }

  function trigger(event, params, context) {
    const transform = transforms.get(event);
    return Trigger(transform, params, context, logger);
  }

  function use() {

  }

  if (logger) {
    Logger = logger;
  }

  return {
    setupSockets,
    registerTransform,
    registerServiceClient,
    trigger
  };
}
