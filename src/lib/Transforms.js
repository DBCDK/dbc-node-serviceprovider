'use strict';

/**
 * @file
 * Module for registering all transforms
 */

import {extend} from 'lodash';
import Events from './Events.js';

/**
 * Base Transform Methods that are inherited
 *
 * @type {{callClient: Function}}
 */
const BaseTransform = {
  callClient(client, method, params) {
    const event = `${client}::${method}`;
    return Events.getEvent('client', event)(params);
  }
};

/**
 * Registers all events on a transform
 *
 * if an event already exists. An error is thrown
 *
 * @param events
 * @param transform
 * @api private
 */
function registerEvents(event, transform) {
  if (event) {
    Events.addEvent('transform', event, transform);
  }
}

/**
 * Factory method for the transforms defined in /transformers
 *
 * @param {Object} transform
 * @return {Object}
 * @throws {Error}
 * @api public
 */
function registerTransform(transform) {
  if (!transform.event) {
    throw new Error('No event method not found on transform');
  }

  if (!transform.requestTransform) {
    throw new Error('No requestTransform method not found on transform');
  }

  if (!transform.responseTransform) {
    throw new Error('No responseTransform method not found on transform');
  }

  registerEvents(transform.event(), transform);

  extend(transform, BaseTransform);

  return transform;
}


export default {registerTransform};
