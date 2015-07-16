'use strict';

import * as PopSuggest from 'dbc-node-popsuggest';

const PopSuggestClient = {
  name: 'popsuggest',
  init(config) {
    PopSuggest.init(config);
    return PopSuggest.METHODS;
  }
};

export default PopSuggestClient;
