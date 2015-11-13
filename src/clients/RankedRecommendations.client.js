'use strict';

import Recommendations from 'dbc-node-ranked-recommendations-client';

const RecommendationsClient = {
  name: 'recommendranked',
  init(config) {
    return Recommendations(config.endpoint, config.filters);
  }
};

export default RecommendationsClient;
