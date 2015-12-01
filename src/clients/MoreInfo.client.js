'use strict';

import MoreInfo from 'dbc-node-moreinfo-client';

const MoreInfoClient = {
  name: 'moreinfo',
  init(config) {
    return MoreInfo(config);
  }
};

export default MoreInfoClient;
