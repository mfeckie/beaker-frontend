import Ember from 'ember';
import HighchartsInitializer from '../../../initializers/highcharts';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | highcharts', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  HighchartsInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
