'use strict';

import * as PopSuggest from 'dbc-node-popsuggest';
import OpenSuggest from 'dbc-node-opensuggest';
import * as OpenSearch from 'dbc-node-opensearch-client';
import * as MoreInfo from 'dbc-node-moreinfo-client';

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
  if (config.opensearch) {
    OpenSearch.init(config.opensearch);
    services.set('opensearch', OpenSearch.METHODS);
  }
  if (config.moreinfo) {
    MoreInfo.init(config.moreinfo);
    services.set('coverimage', {getMoreInfoResult : MoreInfo.getMoreInfoResult});
  }
  return services;
}
