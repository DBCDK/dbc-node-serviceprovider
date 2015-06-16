'use strict';

import * as Provider from '../../Provider.js';

export default Provider.registerTransform({
  _query: '',
  events() {
    return ['getFilterGuides'];
  },

  getSuggestions(request) {
    const OpenSuggest = this.services.get('opensuggest');
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
    })
  },

  responseTransform(data) {
    return this.extractWordsForFilter(data.suggestions, this._query);
  },

  extractWordsForFilter(suggestions, query) {
    return suggestions.map((element) => {
      return element.suggestion;
    });
  }

});
