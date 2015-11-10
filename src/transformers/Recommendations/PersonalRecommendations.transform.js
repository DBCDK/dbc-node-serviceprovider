'use strict';

const PersonalRecommendationsTransform = {
  event() {
    return 'getPersonalRecommendations';
  },

  requestTransform(event, params) {
    return new Promise((resolve) => {
      let ret = {generic: [], personal: []};
      let recs = this.callServiceClient('recommend', 'getRecommendations', {
        likes: [params.work],
        dislikes: []
      });

      params.likes.unshift(params.work);

      let precs = this.callServiceClient('recommendranked', 'getPersonalRecommendations', {
        like: params.likes
      });

      recs.then((res) => {
        ret.generic = res.result;
      });

      precs.then((res) => {
        ret.personal = res.result;
        resolve(ret);
      });
    });
  },

  responseTransform(data) {
    return {
      personal: this.extractWorkInformation(data.personal),
      generic: this.extractWorkInformation(data.generic)
    };
  },

  extractWorkInformation(result) {
    return result.map((element) => {
      return {
        identifiers: [element[0]],
        title: element[1].title,
        creator: element[1].creator,
        workType: 'book'
      };
    });
  }
};

export default PersonalRecommendationsTransform;
