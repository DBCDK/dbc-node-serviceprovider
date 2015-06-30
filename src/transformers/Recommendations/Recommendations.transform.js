'use strict';

import * as Provider from '../../Provider.js';
import Recommendations from '../../clients/Recommendations.client.js';

export default Provider.registerTransform({
  _query: '',
  events() {
    return ['getRecommendations'];
  },

  requestTransform(event, list) {
    return Recommendations.getRecommendations(list);
  },

  responseTransform(data) {
    return this.extractWorkInformation(data.result);
  },

  extractWorkInformation(result) {
    return result.map((element) => {
      return {
        identifiers: [element[0]],
        title: element[1].title,
        creator: element[1].creator,
        workType: 'book' //@todo Hardcoded for now, change to real worktype
      }
    });
  }

});
