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
    Events.add('client', `${clientName}::${name}`, method);
  });

  return methods;
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

  this.registerClient = function registerClient(client) {
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
  };
}

/**
 * Factory for creating Client instances
 *
 * @param config
 * @returns {Clients}
 * @constructor
 */
export default function ClientsFactory (config) {

  return new Clients(config);
}
