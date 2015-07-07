'use strict';

import * as MoreInfo from 'dbc-node-moreinfo-client';
import * as ServiceProvider from '../Provider.js';

export default ServiceProvider.registerClient({
  name: 'moreinfo',
  init(config) {
    MoreInfo.init(config);
    return {getMoreInfoResult: MoreInfo.getMoreInfoResult};
  }
});
