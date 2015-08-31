'use strict';

import * as OpenAgency from 'dbc-node-openagency-client';

const OpenAgencyClient = {
  name: 'openagency',
  init(config) {
    OpenAgency.init(config);
    return OpenAgency.METHODS;
  }
};

export default OpenAgencyClient;
