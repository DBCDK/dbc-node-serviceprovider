'use strict';

import * as Provider from '../../Provider.js';

export default Provider.registerTransform({
  _query: '',
  events() {
    return ['getRecommendations'];
  },

  requestTransform(event, list) {
    console.log(this.services.get('recommend'));
    return this.services.get('recommend').getRecommendations(list);
  },

  responseTransform(data) {
    return this.extractWorkInformation(data.result);
  },

  extractWorkInformation(result) {
    console.log(result);
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
