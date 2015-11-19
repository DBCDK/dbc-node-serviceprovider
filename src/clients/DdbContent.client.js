'use strict';

import * as DdbContent from 'dbc-node-ddbcontent-client';

const DdbContentClient = {
  name: 'ddbcontent',
  init(config) {
    return DdbContent.init(config);
  }
};

export default DdbContentClient;
