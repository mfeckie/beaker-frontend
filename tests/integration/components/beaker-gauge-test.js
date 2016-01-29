import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('beaker-gauge', 'Integration | Component | beaker gauge', {
  integration: true
});

test('it renders', function(assert) {
  this.set('gaugeName', 'Test Gauge');
  this.set('data', [{name: 'Test Gauge'}]);
  this.set('index', 0);

  this.render(hbs`{{beaker-gauge gaugeName=gauge data=data gaugeKey=index}}`);
  const regex = /Test Gauge/;

  assert.ok(regex.test(this.$().text().trim()));
});
