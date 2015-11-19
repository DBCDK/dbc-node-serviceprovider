'use strict';

import * as OpenHoldingStatus from 'dbc-node-openholdingstatus-client';

const OpenHoldingStatusClient = {
  name: 'openholdingstatus',
  init(config) {
    OpenHoldingStatus.init(config);
    return OpenHoldingStatus.METHODS;
  }
};

export default OpenHoldingStatusClient;
