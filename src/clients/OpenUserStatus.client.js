'use strict';

import * as OpenUserStatus from 'dbc-node-openuserstatus-client';

const OpenUserStatusClient = {
  name: 'openuserstatus',
  init(config) {
    OpenUserStatus.init(config);
    return OpenUserStatus.METHODS;
  }
};

export default OpenUserStatusClient;
