import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('beaker-gauges', 'Integration | Component | beaker gauges', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{beaker-gauges}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#beaker-gauges}}
      template block text
    {{/beaker-gauges}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
