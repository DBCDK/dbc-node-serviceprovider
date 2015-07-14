'use strict';

/**
 * @file
 * Basic service provider. Discovers and initializes the transforms and
 * initializes the dispatcher if sockets are available.
 */

import {autoRequire} from './bootstrap';
import {merge, isArray} from 'lodash';
import Dispatcher from './lib/dispatcher';
import CacheManager from './lib/ProviderCache';

const TRANSFORMS = [];
const _events = new Map();
let _config;
let cache;

/**
 * Registers all events on a transform
 *
 * if an event already exists. An error is thrown
 *
 * @param events
 * @param transform
 */
function registerEvents(events, transform) {
  if (events) {
    events.forEach((event)=> {
      if (_events.has(event)) {
        const name = _events.get(event).name || 'unnamed transform';
        throw new Error(`Event '${event}' already registered by ${name}`);
      }
      _events.set(event, transform);
    });
  }
}

/**
 * Handles the request and response transform callback and returns a promise, which resolves to the final
 * response.
 *
 * @param {Object} transform The transform object
 * @param {String} event
 * @param {Object || Array} query The query object/array
 */
function handleTriggerEvents(event, query) {
  const transform = _events.get(event);
  const request = transform.requestTransform(event, query);

  // make sure requests are an array
  const requestArray = isArray(request) && request || [request];

  // An array of promises is returned, one for each request in the request array
  // When each promise is resolved the transform response method is called.
  let result = requestArray.map((promise) => {
    return promise.then((response) => {
      const responseValue = transform.responseTransform(response, event);
      return responseValue;
    });
  });

  return result;
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

  if (config.cache) {
    cache = CacheManager(config.cache);
  }

  return {
    sockets: setupSockets
  };
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

  registerEvents(transform.events(), transform);

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
  if (!_config && !_config.services) {
    throw new Error(`Config.js needs to be initialized on ServiceProvider before initializing ${client.name} client`);
  }

  if (!_config.services[client.name]) {
    throw new Error(`No Config for ${client.name} client in config.js`);
  }

  if (!client.init) {
    throw new Error(`No init method not found on client ${client.name}`);
  }

  let methods = client.init(_config.services[client.name]);
  if (typeof methods !== 'object') {
    throw new Error(`No Config for ${client.name} client in config.js`);
  }

  if (cache) {
    methods = cache.wrap(methods);
  }

  return methods;
}

/**
 * Triggers an event with the given parameters. Returns an array of promises that resolves the request
 *
 * @param {String} event
 * @param {Object} params
 * @returns {Array}
 */
export function trigger(event, params) {

  if (!_events.has(event)) {
    throw new Error(`unsupported Event of type ${event}`);
  }
  return handleTriggerEvents(event, params);
}
