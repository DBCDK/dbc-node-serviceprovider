'use strict';

import * as OpenOrder from 'dbc-node-openorder-client';

const OpenOrderClient = {
  name: 'openorder',
  init(config) {
    OpenOrder.init(config);
    return OpenOrder.METHODS;
  }
};

export default OpenOrderClient;
