'use strict';

import EntitySuggest from 'dbc-node-entitysuggest';

const EntitySuggestClient = {
  name: 'entitysuggest',
  init(config) {
    return EntitySuggest(config);
  }
};

export default EntitySuggestClient;
