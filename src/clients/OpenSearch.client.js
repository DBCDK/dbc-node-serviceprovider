'use strict';

import OpenSearch from 'dbc-node-opensearch-client';

const OpenSearchClient = {
  name: 'opensearch',
  init(config) {
    return OpenSearch(config);
  }
};

export default OpenSearchClient;
