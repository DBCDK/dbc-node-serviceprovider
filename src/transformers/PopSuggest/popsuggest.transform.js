'use strict';

import * as Provider from '../../Provider.js';
import {isArray, isEmpty} from 'lodash';

export default Provider.registerTransform({

  events() {
    let eventsArr = [];

    if (this.services.has('popsuggest')) {
      eventsArr.push('getPopSuggestions');
    }

    return eventsArr;
  },

  getPopSuggestionsRequest(query) {
    const PopSuggest = this.services.get('popsuggest');
    return PopSuggest.getSuggestions([
      {
        index: 'term.creator',
        query: query,
        fields: ['display.creator']
      },
      {
        index: 'term.title',
        query: query,
        fields: ['fedoraPid', 'display.title']
      },
      {
        index: 'term.subject',
        query: query,
        fields: ['term.subject']
      }
    ]);
  },

  requestTransform(event, query) {
    if (event === 'getPopSuggestions') {
      return this.getPopSuggestionsRequest(query);
    }
  },

  responseTransform(response, query) {
    let data = {};

    if (response.error) {
      data = {
        error: true,
        statusCode: response.error.statusCode,
        statusMessage: response.error.statusMessage
      };
    }
    else if (isEmpty(response.response.docs)) {
      data.isEmpty = true;
      data.index = this._getIndex(response);
    }
    else {
      data = this._parseData(response);
      data.query = query;
    }

    return data;
  },

  _getIndex(response) {
    let index = '';
    if (isArray(response.responseHeader.qf)) {
      index = response.responseHeader.qf.join();
    }
    else {
      index = response.responseHeader.qf.join();
    }

    return index.replace(',rec.collectionIdentifier', '');
  },

  _parseData(response) {
    const index = this._getIndex(response);
    let data = {
      index: index,
      docs: []
    };

    switch (index) {
      case 'term.creator':
        let creators = this._getCreators(response.response.docs);
        if (creators.length >= 1) {
          data.docs = creators;
        }

        break;
      case 'term.title':
        let titles = this._getTitles(response.response.docs);
        if (titles.length >= 1) {
          data.docs = titles;
        }
        break;
      case 'term.subject':
        let subjects = this._getSubjects(response.response.docs);
        if (subjects.length >= 1) {
          data.docs = subjects;
        }
        break;
      default:
        break;
    }

    return data;
  },

  _getCreators: function(docs) {
    let creators = [];
    let counter = 0;
    docs.forEach((value) => {
      if (value['display.creator'] && counter < 5) {
        creators.push({
          text: value['display.creator'].join()
        });
        counter++;
      }
    });

    return creators;
  },

  _getTitles: function(docs) {
    let titles = [];
    let counter = 0;
    docs.forEach((value) => {
      if (value['display.title'] && counter < 5) {
        titles.push({
          text: value['display.title'].join(),
          pid: value.fedoraPid
        });
        counter++;
      }
    });

    return titles;
  },

  _getSubjects: function(docs) {
    let creators = [];
    let counter = 0;
    docs.forEach((value) => {
      if (value['term.subject'] && counter < 5) {
        creators.push({
          text: value['term.subject'].join()
        });
        counter++;
      }
    });

    return creators;
  }
});
