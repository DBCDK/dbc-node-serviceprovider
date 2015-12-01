'use strict';

import PopSuggest from 'dbc-node-popsuggest';

const PopSuggestClient = {
  name: 'popsuggest',
  init(config) {
    return PopSuggest(config);
  }
};

export default PopSuggestClient;
