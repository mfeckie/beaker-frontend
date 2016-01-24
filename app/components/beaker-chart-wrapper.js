/* globals _ */

import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['chart-flex-row'],
  didInsertElement () {
    this.getData();
  },
  getData () {
    const success = (data) => {
      this.set('metrics', this.formatData(data));
      Ember.run.later(() => { this.getData(); }, 30000);
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
