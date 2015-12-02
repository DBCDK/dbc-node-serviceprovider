'use strict';

/**
 * @file
 * Module for registering Provider clients
 */

import {forEach} from 'lodash';
import Events from './Events.js';
import * as ClientCache from './ClientCache.js';

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
  if (cache) {
    methods = ClientCache.CacheManager(cache).wrap(methods, 60 * 60 * 24);
  }

  return registerMethods(methods, name);
}
