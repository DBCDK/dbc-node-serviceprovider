'use strict';

import OpenSuggestClient from 'dbc-node-opensuggest';
import * as ServiceProvider from '../Provider.js';

export default ServiceProvider.registerClient({
  name: 'opensuggest',
  init(config) {
    return OpenSuggestClient(config.endpoint);
  }
});
