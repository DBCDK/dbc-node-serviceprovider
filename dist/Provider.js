'use strict';

/**
 * @file
 * Basic service provider. Discovers and initializes the transforms and
 * initializes the dispatcher if sockets are available.
 */

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = Provider;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _libDispatcher = require('./lib/Dispatcher');

var _libDispatcher2 = _interopRequireDefault(_libDispatcher);

var _libTransforms = require('./lib/Transforms');

var _libTransforms2 = _interopRequireDefault(_libTransforms);

/**
 * Initialization of the provider and the underlying services.
 *
 * @param {Object} config Object containing the necessary parameters.
 * @param {Object} logger logger object with methods for logging.
 *
 * @api public
 */

function Provider(logger) {

  /**
   * Object with all clients registered on the provider
   * @type {{}}
   */
  var clients = {};

  /**
   * Map of all transforms registered on the provider
   * @type {Map}
   */
  var transforms = new Map();

  /**
   * Method for registering a single transform
   * @param transform
   */
  function registerTransform(transformObject) {
    var name = transformObject.event();
    if (transforms.has(name)) {
      throw new Error('Event \'' + name + '\' already registered');
    }
    var transform = (0, _libTransforms2['default'])(transformObject, clients, logger);
    transforms.set(name, transform);

    return transform;
  }

  /**
   * Method for registering a service client
   *
   * @param name
   * @param client
   */
  function registerServiceClient(name, client) {
    if (clients[name]) {
      throw new Error('Client \'' + name + '\' already registered');
    }
    clients[name] = client;

    return clients;
  }

  /**
   * Initializes the use of sockets
   *
   * @param {Socket} socket If communication with the parent application should
   * go through a socket it should be provided here. Currently there's no
   * alternative to using socket.
   * @api public
   */
  function dispatcher(io) {
    (0, _libDispatcher2['default'])(transforms, logger, io);
  }

  function trigger(event, params, context) {
    return transforms.get(event).trigger(params, context);
  }

  return {
    registerTransform: registerTransform,
    registerServiceClient: registerServiceClient,
    dispatcher: dispatcher,
    trigger: trigger
  };
}

module.exports = exports['default'];