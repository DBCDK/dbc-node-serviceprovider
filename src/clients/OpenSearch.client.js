'use strict';

import * as OpenSearch from 'dbc-node-opensearch-client';
import * as ServiceProvider from '../Provider.js';

export default ServiceProvider.registerClient({
  name: 'opensearch',
  init(config) {
    OpenSearch.init(config);
    return OpenSearch.METHODS;
  }
});