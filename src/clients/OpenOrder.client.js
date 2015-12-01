'use strict';

import OpenOrder from 'dbc-node-openorder-client';

const OpenOrderClient = {
  name: 'openorder',
  init(config) {
    return OpenOrder(config);
  }
};

export default OpenOrderClient;
