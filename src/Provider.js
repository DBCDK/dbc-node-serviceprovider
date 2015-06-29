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
const Clients = new Map();
let _config = {};
/**
 * Passes the map with webservices to the transforms
 *
 * @param {Object[]} transforms Array with transforms
 * @param {Map} services The available webservice clients
 * @return {Object[]}
 */
function registerServicesOnTransforms(transforms, services) {
  transforms.forEach((transform) => {
    transform.services = services;
  });
}

/**
 * Initialization of the provider and the underlying services.
 *
 * @param {Object || null} config Object containing the necessary parameters.
 * @param {Socket} socket If communication with the parent application should
 * go through a socket it should be provided here. Currently there's no
 * alternative to using socket.
 */
export function init(config = null, socket = null) {
  if (!config) {
    throw new Error('No configuration was provided');
  }
  _config = config;

  // configure the services based on the given configuration object
  autoRequire('transformers', 'transform.js');
  autoRequire('clients', 'client.js');
  registerServicesOnTransforms(TRANSFORMS, Clients);

  if (socket) { // if no socket is provided an alternative shuld be set up TODO non-socket.io setup
    console.log('Setting up socket');
    const dispatcher = new Dispatcher();
    dispatcher.init(socket, TRANSFORMS);
  }
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

export function registerClient(client) {
  const methods = client.init(_config[client.name]);
  Clients.set(client.name, methods);
}
