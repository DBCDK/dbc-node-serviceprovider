'use strict';

import DdbContent from 'dbc-node-ddbcontent-client';

const DdbContentClient = {
  name: 'ddbcontent',
  init(config) {
    return DdbContent(config);
  }
};

export default DdbContentClient;
