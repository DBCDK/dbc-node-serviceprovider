'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.init = init;
exports.registerTransform = registerTransform;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * @file
 * Basic service provider. Discovers and initializes the transforms and
 * initializes the dispatcher if sockets are available.
 */

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _walk = require('walk');

var _walk2 = _interopRequireDefault(_walk);

var _lodash = require('lodash');

var _libDispatcherJs = require('./lib/dispatcher.js');

var _libDispatcherJs2 = _interopRequireDefault(_libDispatcherJs);

var _clientsJs = require('./clients.js');

var _clientsJs2 = _interopRequireDefault(_clientsJs);

var TRANSFORMS = [];

/**
 * Passes the map with webservices to the transforms
 *
 * @param {Object[]} transforms Array with transforms
 * @param {Map} services The available webservice clients
 * @return {Object[]}
 */
function registerServicesOnTransforms(transforms, services) {
  transforms.every(function (transform) {
    transform.services = services;
  });
}

/**
 * Traverses the filetree under ./transformers and looks for files named
 * transform.js. All files found with that name are considered a transform and
 * added to the pool of transforms that later will be passed to the
 * disspatchers.
 */
function discoverTransforms() {
  var walkOptions = {
    listeners: {
      file: function file(root, fileStats, next) {
        if (fileStats.name.indexOf('transform.js') >= 0) {
          require(_path2['default'].join(root, fileStats.name));
        }
        next();
      },
      errors: function errors(root, nodeStatsArray, next) {
        if (nodeStatsArray[0].error) {
          console.log(nodeStatsArray[0].error);
          console.log(' at: ' + _path2['default'].join(root, nodeStatsArray[0].name));
        }
        next();
      }
    }
  };
  _walk2['default'].walkSync(_path2['default'].join(__dirname, 'transformers'), walkOptions);
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

  // configure the services based on the given configuration object
  var services = (0, _clientsJs2['default'])(config);
  discoverTransforms();
  registerServicesOnTransforms(TRANSFORMS, services);

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

  var baseTransform = {
    services: null
  };

  transform = (0, _lodash.merge)(transform, baseTransform);

  TRANSFORMS.push(transform);
  return transform;
}