'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = ClientsFactory;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * @file
 * Module for registering Provider clients
 */

var _lodash = require('lodash');

var _EventsJs = require('./Events.js');

var _EventsJs2 = _interopRequireDefault(_EventsJs);

var _ClientCacheJs = require('./ClientCache.js');

var _ClientCacheJs2 = _interopRequireDefault(_ClientCacheJs);

/**
 * Register clients on the provider, providing them with configurations
 *
 * @param client
 * @returns {*}
 */

function registerMethods(methods, clientName) {
  (0, _lodash.forEach)(methods, function (method, name) {
    _EventsJs2['default'].add('client', clientName + '::' + name, method);
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

function Clients(config) {

  if (!config && !config.services) {
    throw new Error('A config object needs to be provided and it requires a services property');
  }

  this.registerClient = function registerClient(client) {
    var name = client.name;
    var init = client.init;

    if (!config.services[name]) {
      throw new Error('No Config for ' + name + ' client in config.js');
    }

    if (!init) {
      throw new Error('No init method not found on client ' + name);
    }

    var methods = init(config.services[name]);
    if (typeof methods !== 'object') {
      throw new Error('No Config for ' + name + ' client in config.js');
    }

    if (config.cache) {
      methods = (0, _ClientCacheJs2['default'])(config.cache).wrap(methods);
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

function ClientsFactory(config) {

  return new Clients(config);
}

module.exports = exports['default'];