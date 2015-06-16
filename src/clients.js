'use strict';

import * as PopSuggest from 'dbc-node-popsuggest';
import OpenSuggest from 'dbc-node-opensuggest';

/**
 * Initialize Clients with configuration
 *
 * Should be called upon initialization with an config object as parameter.
 * Each key in the object represents an webservice implemented by the provider
 * and so each object should contain the config parameters necessary to
 * configure that specific webservice client.
 *
 * @todo The implementation here is temporary. The provider should give methods for reqistering new clients
 *
 * @param {Object} config
 */
export default function Clients(config = {}) {
  let services = new Map();
  if (config.popsuggest) {
    PopSuggest.init(config.popsuggest);
    services.set('popsuggest', PopSuggest.METHODS);
  }
  if (config.opensuggest) {
    services.set('opensuggest', OpenSuggest(config.opensuggest.endpoint));
  }
  return services;
}
