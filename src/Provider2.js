'use strict';

/**
 * @file
 * Basic service provider. Discovers and initializes the transforms and
 * initializes the dispatcher if sockets are available.
 */

import Dispatcher from './lib/dispatcher2';
import Transform from './lib/transforms';

/**
 * Initialization of the provider and the underlying services.
 *
 * @param {Object} config Object containing the necessary parameters.
 * @param {Object} logger logger object with methods for logging.
 *
 * @api public
 */
export default function Provider(logger, sockets) {

   /**
   * Object with all clients registered on the provider
   * @type {{}}
   */
  const clients = {};

  /**
   * Map of all transforms registered on the provider
   * @type {Map}
   */
  const transforms = new Map();

  /**
   * Method for registering a single transform
   * @param transform
   */
  function registerTransform(transform) {
    const name = transform.event();
    if (transforms.has(name)) {
      throw new Error(`Event '${name}' already registered`);
    }
    else {
      transforms.set(name, Transform(transform, clients, logger));
    }
  }

  /**
   * Method for registering a service client
   *
   * @param name
   * @param client
   */
  function registerServiceClient(name, client) {
    if (clients[name]) {
      throw new Error(`Client '${name}' already registered`);
    }
    clients[name] = client;
  }

  /**
   * Initializes the use of sockets
   *
   * @param {Socket} socket If communication with the parent application should
   * go through a socket it should be provided here. Currently there's no
   * alternative to using socket.
   * @api public
   */
  function dispatcher(io) {
    Dispatcher(transforms, logger, io);
  }

  /**
   * method for applying middleware to the transform flow
   */
  function use() {

  }

  return {
    registerTransform,
    registerServiceClient,
    dispatcher
  };
}
