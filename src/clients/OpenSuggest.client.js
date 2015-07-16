'use strict';

import OpenSuggest from 'dbc-node-opensuggest';

const OpenSuggestClient = {
  name: 'opensuggest',
  init(config) {
    return OpenSuggest(config.endpoint);
  }
};

export default OpenSuggestClient;
