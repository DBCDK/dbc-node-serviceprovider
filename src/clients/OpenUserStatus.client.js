'use strict';

import OpenUserStatus from 'dbc-node-openuserstatus-client';

const OpenUserStatusClient = {
  name: 'openuserstatus',
  init(config) {
    return OpenUserStatus(config);
  }
};

export default OpenUserStatusClient;
