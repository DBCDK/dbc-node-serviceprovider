'use strict';

import * as PopSuggest from 'dbc-node-popsuggest';

/** @const {Map} */
const clients = new Map([
  ['popsuggest', PopSuggest]
]);

/**
 * Should be called upon initialization with an array of object as parameter.
 * Each object in the array represents an webservice implemented by the provider
 * and so each object should contain the config parameters necessary to
 * configure that specific webservice client.
 *
 * @param {Object[]} config
 */
export function init(config = []) {
  config.forEach((service) => {
    if (clients.has(service.name)) {
      const client = clients.get(service.name);
      client.init(service);
    }
  });
}

export const services = {
  PopSuggest: PopSuggest
};
