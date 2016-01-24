import Ember from 'ember';

export default Ember.Component.extend({
  counterClassNumber: Ember.computed('number', function () {
    const number = this.get('number') % 3;
    return `beaker-counter-${number}`;
  })
});
