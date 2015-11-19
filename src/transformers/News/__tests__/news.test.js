'use strict';
import {expect} from 'chai';
import sinon from 'sinon';
import Provider from '../../../Provider.js';
import DdbContentClient from '../../../clients/DdbContent.client.js';
import NewsTransform from '../news.transform.js';
import newsListResponse from './data/newslistReponse.js';

// until all systems run on node >=5.0.0, it is neccesary to test where request is installed
let request;
try {
  request = require('dbc-node-ddbcontent-client/node_modules/request');
} catch (e) {
  request = require('request');
}

describe('Test News transform', () => {
  let provider;
  before('setup provider', () => {
    const config = {
      services: {
        ddbcontent: {
          endpoint: 'http://am.fs_rest.dev.inlead.dk/web',
          agency: '100000',
          key: 'b2573a3ea77a938fa86dc9fa05c99888f26992e9'
        }
      }
    };
    provider = Provider(config);
    provider.registerServiceClient(DdbContentClient);
    provider.registerTransform(NewsTransform);
  });

  afterEach('restore stub', () => {
    request.get.restore();
  });

  it('Trigger getNewsList', (done) => {
    sinon
      .stub(request, 'get')
      .yields(null, {statusCode: 200}, JSON.stringify(newsListResponse));

    const getNewsList = provider.trigger('getNewsList', {
      amount: 2,
      sort: 'nid'
    });

    getNewsList[0].then(response => {
      const expected = [{
        id: 'id1',
        title: 'title 1',
        lead: 'lead 1',
        body: '<p>body 1</p>',
        image: null
      }, {
        id: 'id2',
        title: 'title 2',
        lead: 'lead 2',
        body: '<p>body 2</p>',
        image: 'imagedata'
      }];
      expect(response).to.deep.equal(expected);

      done();
    }).catch(err => done(err));
  });

  it('Trigger getNewsList no results', (done) => {
    sinon
      .stub(request, 'get')
      .yields(null, {statusCode: 200}, JSON.stringify({}));

    const getNewsList = provider.trigger('getNewsList', {});

    getNewsList[0].then(response => {
      expect(response).to.deep.equal([]);
      done();
    }).catch(err => done(err));
  });
});
