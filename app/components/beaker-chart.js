/* globals Highcharts */

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
    const element = this.$();

    const data = this.get('data');

    const chart = element.highcharts({
      chart: {
        type: 'line',
        zoomType: 'x',
        width: 400,
        height: 400
      },
      title: {
        text: this.get('title')
      },
      xAxis: {
        type: 'datetime'
      },
      series: data,
    });

    this.set('chart', chart.highcharts());
  }
});
