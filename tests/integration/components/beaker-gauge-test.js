import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('beaker-gauge', 'Integration | Component | beaker gauge', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"

  this.render(hbs`{{beaker-gauge}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:"
  this.render(hbs`
    {{#beaker-gauge}}
      template block text
    {{/beaker-gauge}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
