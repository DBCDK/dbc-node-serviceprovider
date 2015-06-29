'use strict';

import Recommendations from 'dbc-node-recommendations';
import * as ServiceProvider from '../Provider.js';

export default ServiceProvider.registerClient({
  name: 'recommend',
  init(config) {
    return Recommendations(config.endpoint);
  }
});