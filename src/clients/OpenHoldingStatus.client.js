'use strict';

import OpenHoldingStatus from 'dbc-node-openholdingstatus-client';

const OpenHoldingStatusClient = {
  name: 'openholdingstatus',
  init(config) {
    return OpenHoldingStatus(config);
  }
};

export default OpenHoldingStatusClient;
