'use strict';

import * as PopSuggest from 'dbc-node-popsuggest';

/** @const {Map} */
const clients = new Map([
  ['popsuggest', PopSuggest]
]);

/**
 * Should be called upon initialization with an array of objects as parameter.
 * Each object in the array represents an webservice implemented by the provider
 * and so each object should contain the config parameters necessary to
 * configure that specific webservice client.
 *
 * @param {Object[]} config
 */
export function init(config = []) {
  let api = new Map();
  config.every((service) => {
    if (clients.has(service.name)) {
      const client = clients.get(service.name);
      client.init(service);
      api.set(service.name, client.METHODS);
    }
  });

  return api;
}

export const services = {
  PopSuggest: PopSuggest
};
