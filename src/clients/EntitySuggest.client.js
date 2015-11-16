'use strict';

import * as EntitySuggest from 'dbc-node-entitysuggest';

const EntitySuggestClient = {
  name: 'entitysuggest',
  init(config) {
    return EntitySuggest.init(config);
  }
};

export default EntitySuggestClient;
