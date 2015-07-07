'use strict';

import * as Provider from '../../Provider.js';
import OpenSuggest from '../../clients/OpenSuggest.client.js';


export default Provider.registerTransform({
  _query: '',
  events() {
    return ['getFilterGuides'];
  },

  getSuggestions(request) {
    return OpenSuggest.getSuggestions({
      profile: 'opac',
      agency: '150013',
      index: request.index,
      query: request.query
    });
  },

  requestTransform(event, query) {
    this._query = query;
    return this.getSuggestions({
      index: 'scanphrase.title',
      query
    });
  },

  responseTransform(data) {
    return this.extractWordsForFilter(data.suggestions, this._query);
  },

  extractWordsForFilter(suggestions) {
    return suggestions.map((element) => {
      return element.suggestion;
    });
  }

});
