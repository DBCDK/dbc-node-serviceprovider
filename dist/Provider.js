'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.init = init;
exports.setupSockets = setupSockets;
exports.registerTransform = registerTransform;
exports.registerClient = registerClient;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * @file
 * Basic service provider. Discovers and initializes the transforms and
 * initializes the dispatcher if sockets are available.
 */

var _bootstrap = require('./bootstrap');

var _lodash = require('lodash');

var _libDispatcherJs = require('./lib/dispatcher.js');

var _libDispatcherJs2 = _interopRequireDefault(_libDispatcherJs);

var TRANSFORMS = [];
var _config = undefined;

/**
 * Initialization of the provider and the underlying services.
 *
 * @param {Object || null} config Object containing the necessary parameters.
 * @param {Socket} socket If communication with the parent application should
 * go through a socket it should be provided here. Currently there's no
 * alternative to using socket.
 */

function init(config) {
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

function setupSockets(socket) {
  (0, _bootstrap.autoRequire)('transformers', 'transform.js');
  var dispatcher = new _libDispatcherJs2['default']();
  dispatcher.init(socket, TRANSFORMS);
}

/**
 * Factory method for the transforms defined in /transformers
 *
 * @param {Object} transform
 * @return {Object}
 */

function registerTransform(transform) {
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

  var baseTransform = {
    services: null
  };

  transform = (0, _lodash.merge)(transform, baseTransform);

  TRANSFORMS.push(transform);
  return transform;
}

/**
 * Register clients on the provider, providing them with configurations
 *
 * @param client
 * @returns {*}
 */

function registerClient(client) {
  if (!_config) {
    throw new Error('Config.js needs to be initialized on ServiceProvider before initializing ' + client.name + ' client');
  }
  if (!_config[client.name]) {
    throw new Error('No Config for ' + client.name + ' client in config.js');
  }
  if (!client.init) {
    throw new Error('No init method not found on client ' + client.name);
  }
  var methods = client.init(_config[client.name]);
  if (typeof methods !== 'object') {
    throw new Error('No Config for ' + client.name + ' client in config.js');
  }

  return methods;
}