'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var NewsByIdTransform = {

  event: function event() {
    return 'getNewsById';
  },

  requestTransform: function requestTransform(event, query) {
    return this.callServiceClient('ddbcontent', 'getContentById', query);
  },

  responseTransform: function responseTransform(response, query) {
    if (!response.items || response.items.length === 0) {
      return { nid: query.node, error: 'unknown id' };
    }
    var item = response.items;
    var fields = item.fields;

    var data = {
      id: item.id,
      nid: item.nid,
      title: fields.title && fields.title.value || null,
      lead: fields.field_ding_news_lead && fields.field_ding_news_lead.value || null,
      body: fields.field_ding_news_body && fields.field_ding_news_body.value || null,
      image: fields.field_ding_news_list_image && fields.field_ding_news_list_image.value[0] || null
    };

    return data;
  }
};

exports['default'] = NewsByIdTransform;
module.exports = exports['default'];