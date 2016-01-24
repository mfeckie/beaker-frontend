/* globals Highcharts, _ */

import Ember from 'ember';

export default Ember.Component.extend({
  pollInterval: 30000,
  didInsertElement () {

    Highcharts.setOptions({
      global: {
        timezoneOffset: new Date().getTimezoneOffset()
      }
    });

    this.initialRender();

  },
  initialRender () {
    const success = (data) => {

      if(Object.keys(data).length == 0) {
        return Ember.run.later(() => { this.initialRender() }, this.get('pollInterval'));
      }

      const element = this.$('#container');

      const series = this.formatData(data);

      const chart = element.highcharts({
        chart: {
          type: 'line',
          zoomType: 'x'
        },
        title: {
          text: 'Average response'
        },
        xAxis: {
          type: 'datetime'
        },
        series,
      });

      this.set('chart', chart.highcharts());
      Ember.run.later(() => { this.updateChart() }, this.get('pollInterval'));
    }
    Ember.$.getJSON('/beaker/api/aggregated').then(success);

  },
  formatData (data) {
    const key = Object.keys(data)[0];

    const rawData = data[key];

    const avg = rawData.map((item) => {
      return {
        x: new Date(item.time),
        y: item.average
      }
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
        name: 'Average response',
        data: _.sortBy(avg, 'x')
      },
      {
        name: 'Minimun response',
        data: _.sortBy(min, 'x')
      },
      {
        name: 'Maximum response',
        data: _.sortBy(max, 'x')
      }
    ];

    return series;

  },
  updateChart () {
    const chart = this.get('chart');

    const success = (data) => {
      const series = this.formatData(data);
      series.forEach((metric, index) => {
        chart.series[index].update(metric);
      })

      Ember.run.later(() => { this.updateChart() }, this.get('pollInterval'));
    };
    Ember.$.get('/beaker/api/aggregated', success)
  }

});
