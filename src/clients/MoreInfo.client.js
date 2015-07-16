'use strict';

import * as MoreInfo from 'dbc-node-moreinfo-client';

const MoreInfoClient = {
  name: 'moreinfo',
  init(config) {
    MoreInfo.init(config);
    return {getMoreInfoResult: MoreInfo.getMoreInfoResult};
  }
};

export default MoreInfoClient;
