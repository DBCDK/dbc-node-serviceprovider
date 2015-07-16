'use strict';

const RecommendationsTransform = {
  events() {
    return ['getRecommendations'];
  },

  requestTransform(event, list) {
    return this.callClient('recommend::getRecommendations', list);
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
        workType: 'book' // @todo Hardcoded for now, change to real worktype
      };
    });
  }
};

export default RecommendationsTransform;
