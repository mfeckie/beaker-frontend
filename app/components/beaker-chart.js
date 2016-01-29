import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['beaker-chart'],
  didInsertElement () {
    this.initialRender();
  },
  initialRender () {
    const element = this.$();

    const data = this.get('data')[this.get('metricKey')];

    const chart = element.highcharts({
      chart: {
        type: 'line',
        zoomType: 'x',
        width: 400,
        height: 300,
        style: {
          fontFamily: 'Jura'
        }
      },
      title: {
        text: data.title,
        style: {
          textTransform: 'none'
        }
      },
      xAxis: {
        type: 'datetime'
      },
      series: data.series,
    });

    this.set('chart', chart.highcharts());
  },
  updateData: Ember.observer('data.[]', function () {
    const data = this.get('data')[this.get('metricKey')];
    const chart = this.get('chart');
    data.series.forEach((dataset, index) => {
      chart.series[index].setData(dataset.data);
    });
  })
});
