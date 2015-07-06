'use strict';

/**
 * @file
 * Basic service provider. Discovers and initializes the transforms and
 * initializes the dispatcher if sockets are available.
 */

import {autoRequire} from './bootstrap';
import {merge} from 'lodash';
import Dispatcher from './lib/dispatcher.js';

const TRANSFORMS = [];
let _config;

/**
 * Initialization of the provider and the underlying services.
 *
 * @param {Object || null} config Object containing the necessary parameters.
 * @param {Socket} socket If communication with the parent application should
 * go through a socket it should be provided here. Currently there's no
 * alternative to using socket.
 */
export function init(config) {
  if (!config) {
    throw new Error('No configuration was provided');
  }
  _config = config;

  return {
    sockets: setupSockets
  };
}

/**
 * configure the services based on the given configuration object
 *
 * @constructor
 */
export function setupSockets(socket) {
  autoRequire('transformers', 'transform.js');
  const dispatcher = new Dispatcher();
  dispatcher.init(socket, TRANSFORMS);
}

/**
 * Factory method for the transforms defined in /transformers
 *
 * @param {Object} transform
 * @return {Object}
 */
export function registerTransform(transform) {
  if (transform.services) {
    throw new Error('services is a protected field and should not be declared manually in transforms');
  }

  if (!transform.events) {
    throw new Error('No events method not found on transform');
  }

  if (!transform.requestTransform) {
    throw new Error('No requestTransform method not found on transform');
  }

  if (!transform.responseTransform) {
    throw new Error('No responseTransform method not found on transform');
  }

  const baseTransform = {
    services: null
  };

  transform = merge(transform, baseTransform);

  TRANSFORMS.push(transform);
  return transform;
}

/**
 * Register clients on the provider, providing them with configurations
 *
 * @param client
 * @returns {*}
 */
export function registerClient(client) {
  if(!_config) {
    throw new Error(`Config.js needs to be initialized on ServiceProvider before initializing ${client.name} client`);
  }
  if(!_config[client.name]) {
    throw new Error(`No Config for ${client.name} client in config.js`);
  }
  if (!client.init) {
    throw new Error(`No init method not found on client ${client.name}`);
  }
  const methods = client.init(_config[client.name]);
  if (typeof methods !== 'object'){
    throw new Error(`No Config for ${client.name} client in config.js`);
  }

  return methods;
}
