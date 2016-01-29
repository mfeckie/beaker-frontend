/* globals _ */

import Ember from 'ember';

export default Ember.Component.extend({
  updateInterval: 30000,
  updateIntervalDisplay: Ember.computed('updateInterval', {
    get () {
      return this.get('updateInterval') / 1000;
    },
    set (key, value) {
      this.set('updateInterval', value * 1000);
    }
  }),
  didInsertElement () {
    this.getData();
  },
  metrics: Ember.computed('data.[]', function () {
    const metrics = this.get('data');
    return Object.keys(metrics || {});
  }),
  getData () {
    const success = (data) => {
      this.set('data', this.formatData(data));
      Ember.run.later(() => {
        this.updateData();
      }, this.get('updateInterval'));
    };

    Ember.$.getJSON('beaker/api/aggregated').then(success);
  },
  updateData() {
    const success = (data) => {
      this.set('data', this.formatData(data));
      Ember.run.later(() => {
        this.updateData();
      }, this.get('updateInterval'));
    };
    Ember.$.getJSON('beaker/api/aggregated').then(success);
  },
  formatData(data) {
    const keys = Object.keys(data);

    const metrics = keys.map((keyName) => {

      const rawData = data[keyName];

      const avg = rawData.map((item) => {
        return {
          x: new Date(item.time),
          y: item.average
        };
      });

      const min = rawData.map((item) => {
        return {
          x: new Date(item.time),
          y: item.min
        };
      });

      const max = rawData.map((item) => {
        return {
          x: new Date(item.time),
          y: item.max
        };
      });

      const series = [
        {
          name: 'Average',
          data: _.sortBy(avg, 'x')
        },
        {
          name: 'Minimun',
          data: _.sortBy(min, 'x')
        },
        {
          name: 'Maximum',
          data: _.sortBy(max, 'x')
        }
      ];

      return {
        title: keyName,
        series: series
      };
    });
    return metrics;
  }
});
