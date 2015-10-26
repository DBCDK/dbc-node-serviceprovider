'use strict';

/**
 * @file
 * Basic service provider. Discovers and initializes the transforms and
 * initializes the dispatcher if sockets are available.
 */

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = ProviderFactory;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _libAutoRequireJs = require('./lib/AutoRequire.js');

var _libAutoRequireJs2 = _interopRequireDefault(_libAutoRequireJs);

var _libDispatcher = require('./lib/dispatcher');

var _libDispatcher2 = _interopRequireDefault(_libDispatcher);

var _libTransformsJs = require('./lib/Transforms.js');

var _libTriggerJs = require('./lib/Trigger.js');

var _libServiceClientsJs = require('./lib/ServiceClients.js');

var _libServiceClientsJs2 = _interopRequireDefault(_libServiceClientsJs);

var _libEventsJs = require('./lib/Events.js');

var Provider = {};
var Logger = console;
Logger.warning = Logger.error;
Logger.notice = Logger.log;

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
  (0, _libDispatcher2['default'])(socket, Provider, Logger);
  return Provider;
}

/**
 * Loads the bundles transforms and clients
 * @api public
 */
function bootstrap() {
  (0, _libAutoRequireJs2['default'])(_path2['default'].join(__dirname, 'transformers'), 'transform.js').map(Provider.registerTransform);
  (0, _libAutoRequireJs2['default'])(_path2['default'].join(__dirname, 'clients'), 'client.js').map(Provider.registerServiceClient);
  return Provider;
}

/**
 * Initialization of the provider and the underlying services.
 *
 * @param {Object} config Object containing the necessary parameters.
 * @param {Object} logger logger object with methods for logging.
 *
 * @api public
 */

function ProviderFactory(config, logger) {

  if (logger) {
    Logger = logger;
  }

  if (!config) {
    Logger.error('No configuration was provided');
  }

  var registerServiceClient = (0, _libServiceClientsJs2['default'])(config, Logger).registerServiceClient;

  Provider = {
    setupSockets: setupSockets,
    bootstrap: bootstrap,
    registerTransform: _libTransformsJs.registerTransform,
    registerServiceClient: registerServiceClient,
    trigger: (0, _libTriggerJs.getLoggingTrigger)(logger),
    getEventsOfType: _libEventsJs.getEventsOfType
  };

  Logger.log('debug', 'The ServiceProvider was initialized with the following config: ', config);

  return Provider;
}

module.exports = exports['default'];