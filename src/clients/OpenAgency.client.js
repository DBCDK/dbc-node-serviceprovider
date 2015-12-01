'use strict';

import OpenAgency from 'dbc-node-openagency-client';

const OpenAgencyClient = {
  name: 'openagency',
  init(config) {
    return OpenAgency(config);
  }
};

export default OpenAgencyClient;
