'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = ProviderFactory;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * @file
 * Basic service provider. Discovers and initializes the transforms and
 * initializes the dispatcher if sockets are available.
 */

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _libAutoRequireJs = require('./lib/AutoRequire.js');

var _libAutoRequireJs2 = _interopRequireDefault(_libAutoRequireJs);

var _libDispatcher = require('./lib/dispatcher');

var _libDispatcher2 = _interopRequireDefault(_libDispatcher);

var _libTransformsJs = require('./lib/Transforms.js');

var _libTriggerJs = require('./lib/Trigger.js');

var _libTriggerJs2 = _interopRequireDefault(_libTriggerJs);

var _libClientsJs = require('./lib/Clients.js');

var _libClientsJs2 = _interopRequireDefault(_libClientsJs);

var _libEventsJs = require('./lib/Events.js');

var Provider = {};
/**
 * Initializes the use of sockets
 *
 * @param {Socket} socket If communication with the parent application should
 * go through a socket it should be provided here. Currently there's no
 * alternative to using socket.
 * @api public
 */
function setupSockets(socket) {
  this.bootstrap();
  (0, _libDispatcher2['default'])(socket, Provider);
  return Provider;
}

/**
 * Loads the bundles transforms and clients
 * @api public
 */
function bootstrap() {
  (0, _libAutoRequireJs2['default'])(_path2['default'].join(__dirname, 'transformers'), 'transform.js').map(Provider.registerTransform);
  (0, _libAutoRequireJs2['default'])(_path2['default'].join(__dirname, 'clients'), 'client.js').map(Provider.registerClient);
  return Provider;
}

/**
 * Initialization of the provider and the underlying services.
 *
 * @param {Object} config Object containing the necessary parameters.
 *
 * @api public
 */

function ProviderFactory(config) {
  if (!config) {
    throw new Error('No configuration was provided');
  }

  var registerClient = (0, _libClientsJs2['default'])(config).registerClient;

  Provider = {
    setupSockets: setupSockets,
    bootstrap: bootstrap,
    registerTransform: _libTransformsJs.registerTransform,
    registerClient: registerClient,
    trigger: _libTriggerJs2['default'],
    getEventsOfType: _libEventsJs.getEventsOfType
  };

  return Provider;
}

module.exports = exports['default'];