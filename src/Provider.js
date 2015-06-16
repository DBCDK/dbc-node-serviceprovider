'use strict';

/**
 * @file
 * Basic service provider. Discovers and initializes the transforms and
 * initializes the dispatcher if sockets are available.
 */

import path from 'path';
import walker from 'walk';
import {merge} from 'lodash';
import Dispatcher from './lib/dispatcher.js';

import Clients from './clients.js';

const TRANSFORMS = [];

/**
 * Passes the map with webservices to the transforms
 *
 * @param {Object[]} transforms Array with transforms
 * @param {Map} services The available webservice clients
 * @return {Object[]}
 */
function registerServicesOnTransforms(transforms, services) {
  transforms.every((transform) => {
    transform._setServices(services);
  });
}

/**
 * Traverses the filetree under ./transformers and looks for files named
 * transform.js. All files found with that name are considered a transform and
 * added to the pool of transforms that later will be passed to the
 * disspatchers.
 */
function discoverTransforms() {
  const walkOptions = {
    listeners: {
      file: (root, fileStats, next) => {
        if (fileStats.name.indexOf('transform.js') >= 0) {
          require(path.join(root, fileStats.name));
        }
        next();
      },
      errors: (root, nodeStatsArray, next) => {
        if (nodeStatsArray[0].error) {
          console.log(nodeStatsArray[0].error);
          console.log('at: ' + path.join(root, nodeStatsArray[0].name));
        }
        next();
      }
    }
  };
  walker.walkSync(path.join(__dirname, 'transformers'), walkOptions);
}

/**
 * Initialization of the provider and the underlying services.
 *
 * @param {Object || null} config Object containing the necessary parameters.
 * @param {Socket} socket If communication with the parent application should
 * go through a socket it should be provided here. Currently there's no
 * alternative to using socket.
 * @param {Object[]} transforms An array of transforms to register in the
 * serviceprovider.
 */
export function init(config = null, socket = null) {
  if (!config) {
    throw new Error('No configuration was provided');
  }

  // configure the services based on the given configuration object
  const services = Clients(config);
  discoverTransforms();
  registerServicesOnTransforms(TRANSFORMS, services);

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

  if (transform._setServices) {
    throw new Error('_setServices is a protected method and should not be declared manually in transforms');
  }

  const baseTransform = {
    services: null,
    _setServices(services) {
      this.services = services;
    }
  };

  transform = merge(transform, baseTransform);

  TRANSFORMS.push(transform);
  return transform;
}
