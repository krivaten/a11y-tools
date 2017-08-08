import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-checkbox-input', 'Integration | Component | ui checkbox input', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ui-checkbox-input}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#ui-checkbox-input}}
      template block text
    {{/ui-checkbox-input}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
