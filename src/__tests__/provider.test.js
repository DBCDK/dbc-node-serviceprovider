'use strict';

/**
 * @file Testing the Dispatcher class in dispatcher.js
 */
import * as Provider from '../Provider.js';
import {expect, assert} from 'chai';

describe('Testing methods on the Provider', () => {

  it('assert methods are accessible', () => {
    assert.isNotNull(Provider);

    assert.isNotNull(Provider.init);
    assert.isFunction(Provider.init);

    assert.isNotNull(Provider.registerTransform);
    assert.isFunction(Provider.registerTransform);
  });

  it('Test the registerTransform method', () => {
    let expected = {services: null, events: true, requestTransform: true, responseTransform: true};
    let test = {events: true, requestTransform: true, responseTransform: true};
    expect(Provider.registerTransform(test)).to.eql(expected);

    test = {
      events: true,
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

    test = {events: true};
    expect(() => Provider.registerTransform(test)).to.throw(Error);

    test = {events: true, requestTransform: true};
    expect(() => Provider.registerTransform(test)).to.throw(Error);

    test = {events: true, requestTransform: true, responseTransform: true};
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
});
