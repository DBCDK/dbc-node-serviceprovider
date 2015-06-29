'use strict';

import * as PopSuggest from 'dbc-node-popsuggest';
import * as ServiceProvider from '../Provider.js';

export default ServiceProvider.registerClient({
  name: 'popsuggest',
  init(config) {
    PopSuggest.init(config);
    return PopSuggest.METHODS;
  }
});