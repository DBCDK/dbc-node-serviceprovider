'use strict';

/**
 * @file Testing the Dispatcher class in dispatcher.js
 */
import * as Provider from '../Provider.js';
import {expect, assert} from 'chai';
import {extend} from 'lodash';

describe('Testing methods on the Provider', () => {

  it('assert methods are accessible', () => {
    assert.isNotNull(Provider);

    assert.isNotNull(Provider.init);
    assert.isFunction(Provider.init);

    assert.isNotNull(Provider.registerTransform);
    assert.isFunction(Provider.registerTransform);
  });

  it('Test the registerTransform method', () => {
    let events = function () {};
    let expected = {events, requestTransform: true, responseTransform: true, services: null};
    let test = {events, requestTransform: true, responseTransform: true};
    expect(Provider.registerTransform(test)).to.eql(expected);

    test = {
      events() {},
      requestTransform: true,
      responseTransform: true,
      someMethod() {
      }
    };
    expect(Provider.registerTransform(test)).to.have.keys('services', 'someMethod', 'events', 'requestTransform', 'responseTransform');

    test = {services: []};
    expect(() => Provider.registerTransform(test)).to.throw(Error);

    test = {};
    expect(() => Provider.registerTransform(test)).to.throw(Error);

    test = {events};
    expect(() => Provider.registerTransform(test)).to.throw(Error);

    test = {events, requestTransform: true};
    expect(() => Provider.registerTransform(test)).to.throw(Error);

    test = {events, requestTransform: true, responseTransform: true};
    expect(() => Provider.registerTransform(test)).to.not.throw(Error);
  });

  it('Test the init method', () => {
    expect(() => Provider.init()).to.throw(Error);
    expect(() => Provider.init()).to.throw('No configuration was provided');

    expect(() => Provider.init([])).to.not.throw(Error);
  });
  it('Test the registerClient method', () => {
    let client = {};
    expect(() => Provider.registerClient(client)).to.throw(Error);
    Provider.init({});
    expect(() => Provider.registerClient(client)).to.throw(Error);
    Provider.init({test: {}});
    client.name = 'test';
    expect(() => Provider.registerClient(client)).to.throw(Error);
    client.init = () => {
    };
    expect(() => Provider.registerClient(client)).to.throw(Error);
    client.init = () => {
      return {};
    };
    expect(() => Provider.registerClient(client)).to.not.throw(Error);
    let methods = Provider.registerClient(client);
    expect(methods).to.be.object; // eslint-disable-line no-unused-expressions
  });

  describe('Test registerEvent', () => {
    let provider = extend(Provider, {});
    it('throws error on duplicate eventnames', () => {
      let baseTransform = {requestTransform: true, responseTransform: true};
      let transform = extend(baseTransform, {
        name: 'testTransform',
        events() {
          return ['testRegisterEvent'];
        }
      });

      provider.registerTransform(transform);
      expect(() => provider.registerTransform(transform)).to.throw(Error);

    });
  });

  describe('Test the trigger function', () => {
    // No event has been reqistered
    it('Throws an error on unsupported events', () => {
      expect(() => Provider.trigger('testEvent', {test: 'testEvent is triggered'})).to.throw(Error);
    });
    it('Triggers an event', (done) => {
      Provider.registerTransform({
        events() {
          return ['testEvent'];
        },
        requestTransform(event, request) {
          return Promise.resolve(request);
        },
        responseTransform(response) {
          return response.test;
        }
      });
      let trigger = Provider.trigger('testEvent', {test: 'testEvent is triggered'});
      expect(trigger).to.have.length(1);
      trigger[0].then((result) => {
        expect(result).to.be.equal('testEvent is triggered');
        done();
      });
    });
  });
});
