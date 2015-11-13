'use strict';

import Recommendations from 'dbc-node-recommendations';

const RecommendationsClient = {
  name: 'recommend',
  init(config) {
    return Recommendations(config.endpoint, config.filters);
  }
};

export default RecommendationsClient;
