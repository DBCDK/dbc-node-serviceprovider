'use strict';

import * as OpenSearch from 'dbc-node-opensearch-client';

const OpenSearchClient = {
  name: 'opensearch',
  init(config) {
    OpenSearch.init(config);
    return OpenSearch.METHODS;
  }
};

export default OpenSearchClient;
