'use strict';

/**
 * @file
 * Module for registering Provider clients
 */

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = ClientsFactory;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _EventsJs = require('./Events.js');

var _EventsJs2 = _interopRequireDefault(_EventsJs);

var _ClientCacheJs = require('./ClientCache.js');

var ClientCache = _interopRequireWildcard(_ClientCacheJs);

// Creates a fallback logger object
var Logger = console;

/**
 * Register clients on the provider, providing them with configurations
 *
 * @param client
 * @returns {*}
 */
function registerMethods(methods, clientName) {
  (0, _lodash.forEach)(methods, function (method, name) {
    _EventsJs2['default'].addEvent('client', clientName + '::' + name, method);
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
  var name = client.name;
  var init = client.init;

  if (!config.services || !config.services[name]) {
    Logger.warning('No Config for ' + name + ' client found in config.js');
    return {};
  }

  if (!init) {
    throw new Error('No init method not found on client ' + name);
  }

  var conf = config.services[name];
  var methods = init(conf);
  if (typeof methods !== 'object') {
    throw new Error('Expected type Object to be returned from ' + name + ' client. Got ' + typeof methods);
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
}

/**
 * Factory for creating Client instances
 *
 * @param config
 * @param {Object} logger
 * @returns {Clients}
 * @constructor
 */

function ClientsFactory(config, logger) {
  Logger = logger;
  ClientCache.setLogger(Logger);
  return new Clients(config);
}

module.exports = exports['default'];