'use strict';

/**
 * @file
 * Module for registering Provider clients
 */

import {forEach} from 'lodash';
import Events from './Events.js';
import ClientCache from './ClientCache.js';

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
function registerServiceClient(config, client) {
  const {name, init} = client;

  if (!config.services[name]) {
    throw new Error(`No Config for ${name} client in config.js`);
  }

  if (!init) {
    throw new Error(`No init method not found on client ${name}`);
  }

  let methods = init(config.services[name]);
  if (typeof methods !== 'object') {
    throw new Error(`No Config for ${name} client in config.js`);
  }

  if (config.cache) {
    methods = ClientCache(config.cache).wrap(methods);
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
 * @constructor
 */

function Clients (config) {

  if (!config && !config.services) {
    throw new Error(`A config object needs to be provided and it requires a services property`);
  }

  this.registerServiceClient = registerServiceClient.bind(this, config);
}

/**
 * Factory for creating Client instances
 *
 * @param config
 * @returns {Clients}
 * @constructor
 */
export default function ClientsFactory(config) {

  return new Clients(config);
}
