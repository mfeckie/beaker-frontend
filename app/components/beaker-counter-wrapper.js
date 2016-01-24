import Ember from 'ember';

export default Ember.Component.extend({
  updateInterval: 5000,
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
  }
});
