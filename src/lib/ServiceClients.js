'use strict';

/**
 * @file
 * Module for registering Provider clients
 */

import {forEach} from 'lodash';
import Events from './Events.js';
import * as ClientCache from './ClientCache.js';

let Logger;

/**
 * Register clients on the provider, providing them with configurations
 *
 * @param client
 * @returns {*}
 */
function registerMethods(methods, clientName) {
  forEach(methods, (method, name) => {
    Events.addEvent('client', `${clientName}::${name}`, method);
  });

  return methods;
}

/**
 * Registers a new client with the given configuration
 *
 * @param {Object} client
 * @param {Object} config
 * @returns {Object} methods on the service
 * @api public
 */
export default function registerServiceClient(name, methods, cache) {
  console.log(name, methods);
  if (cache) {
    methods = ClientCache.CacheManager(cache).wrap(methods, 60 * 60 * 24);
  }
  return registerMethods(methods, name);
}

/**
 * Client constructor.
 *
 * Initialized a client instance with a config file, used to populate the individual client implementations
 * with configurations
 *
 * @param config
 * @param logger
 * @constructor
 */
function Clients(config) {

  if (!config || !config.services) {
    Logger.error('A config object needs to be provided and it requires a services property');
  }

  this.registerServiceClient = registerServiceClient.bind(this, config);
  this.logger = Logger;
}

/**
 * Factory for creating Client instances
 *
 * @param config
 * @param {Object} logger
 * @returns {Clients}
 * @constructor
 */
export function ClientsFactory(logger) {
  Logger = logger;
  ClientCache.setLogger(Logger);
  return new Clients();
}
