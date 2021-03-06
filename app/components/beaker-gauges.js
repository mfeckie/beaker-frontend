import Ember from 'ember';

export default Ember.Component.extend({
  updateInterval: 1000,
  min: 0,
  max: 1000,
  didInsertElement () {
    this.getData();
  },
  gauges: Ember.computed('data.[]', function () {
    const data = this.get('data');

    return Object.keys(data || {});
  }),
  getData () {
    const success = (data) => {

      const gaugeData = this.formatData(data);

      this.set('data', gaugeData);

      Ember.run.later(() => {
        this.updateData();
      }, this.get('updateInterval'));
    };
    Ember.$.get('beaker/api/gauges').then(success);
  },
  formatData (data) {
    const keys = Object.keys(data);

    return keys.map((gauge) => {
      return {
        name: gauge,
        value: data[gauge].value,
        min: data[gauge].min,
        max: data[gauge].max
      };
    });

  },
  updateData() {
    const success = (data) => {
      this.set('data', this.formatData(data));

      Ember.run.later(() => {
        this.updateData();
      }, this.get('updateInterval'));
    };
    Ember.$.get('beaker/api/gauges').then(success);
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
