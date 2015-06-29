'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.init = init;
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
var Clients = new Map();
var _config = {};
/**
 * Passes the map with webservices to the transforms
 *
 * @param {Object[]} transforms Array with transforms
 * @param {Map} services The available webservice clients
 * @return {Object[]}
 */
function registerServicesOnTransforms(transforms, services) {
  transforms.forEach(function (transform) {
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

function init() {
  var config = arguments[0] === undefined ? null : arguments[0];
  var socket = arguments[1] === undefined ? null : arguments[1];

  if (!config) {
    throw new Error('No configuration was provided');
  }
  _config = config;

  // configure the services based on the given configuration object
  (0, _bootstrap.autoRequire)('transformers', 'transform.js');
  (0, _bootstrap.autoRequire)('clients', 'client.js');
  registerServicesOnTransforms(TRANSFORMS, Clients);

  if (socket) {
    // if no socket is provided an alternative shuld be set up TODO non-socket.io setup
    console.log('Setting up socket');
    var dispatcher = new _libDispatcherJs2['default']();
    dispatcher.init(socket, TRANSFORMS);
  }
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

function registerClient(client) {
  var methods = client.init(_config[client.name]);
  Clients.set(client.name, methods);
}