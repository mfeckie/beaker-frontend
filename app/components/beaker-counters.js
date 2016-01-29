import Ember from 'ember';

export default Ember.Component.extend({
  updateInterval: 1000,
  didInsertElement () {
    this.updateData();
  },
  updateData () {
    const success = (data) => {
      this.set('counters', data);
      Ember.run.later(() => {
        this.updateData();
      }, this.get('updateInterval'));
    };
    Ember.$.get('beaker/api/counters').then(success);
  },
  updateIntervalDisplay: Ember.computed('updateInterval', {
    get () {
      return this.get('updateInterval') / 1000;
    },
    set (key, value) {
      this.set('updateInterval', value * 1000);
    }
  })
});
