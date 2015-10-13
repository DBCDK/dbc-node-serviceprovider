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
function registerServiceClient(config, client) {
  const {name, init} = client;

  if (!config.services || !config.services[name]) {
    Logger.warning(`No Config for ${name} client found in config.js`);
    return {};
  }

  if (!init) {
    throw new Error(`No init method not found on client ${name}`);
  }

  let conf = config.services[name];
  conf.logger = Logger;
  let methods = init(conf);
  if (typeof methods !== 'object') {
    throw new Error(`Expected type Object to be returned from ${name} client. Got ${typeof methods}`);
  }

  if (config.services[name].cache) {
    methods = ClientCache.CacheManager(config.services[name].cache).wrap(methods);
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
export default function ClientsFactory(config, logger) {
  Logger = logger;
  ClientCache.setLogger(Logger);
  return new Clients(config);
}
