'use strict';

import Events from '../lib/Events.js';
import {expect} from 'chai';

describe('Testing the Events methods', () => {
  it('adds and gets event', () => {
    Events.addEvent('testType', 'testEvent', 'some value');
    expect(Events.getEvent('testType', 'testEvent')).to.be.equal('some value');
  });
  it('gets events of type', () => {
    let testEvents = Events.getEventsOfType('testType');
    expect(testEvents.has('testEvent')).to.be.equal(true);
  });
  it('reset all events', () => {
    expect(Events.getEvent('testType', 'testEvent')).to.be.equal('some value');
    Events.resetEvents();
    expect(() => Events.getEvent('testType', 'testEvent')).to.throw(Error);
  });
});
