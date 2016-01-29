import Ember from 'ember';

export default Ember.Component.extend({
  gaugeClassNumber: Ember.computed('number', function () {
    const number = this.get('number') % 3;
    return `beaker-counter-${number}`;
  }),
  didInsertElement () {
    this.initialRender();
  },
  initialRender () {
    const element = this.$();

    const gaugeData = this.get('data')[this.get('gaugeKey')];

    const gauge = element.highcharts({
      chart: {
        type: 'solidgauge',
        height: 200,
        width: 300
      },
      title: {
        text: gaugeData.name
      },
      plotOptions: {
        series: {
          animation: false
        }
      },
      pane: {
        center: ['50%', '70%'],
        size: '140%',
        startAngle: -90,
        endAngle: 90,
        background:{
          backgroundColor: (Highcharts.theme && Highcharts.theme.background2),
          innerRadius: '60%',
          outerRadius: '100%',
          shape: 'arc'
        }
      },
      yAxis: {
        tickWidth: 1,
        min: gaugeData.min,
        max: gaugeData.max

      },
      series: [
        {
          name: gaugeData.title,
          data: [gaugeData.value]
        }
      ]
    });

    this.set('gauge', gauge);
  },
  updateGauge: Ember.observer('data', function () {
    const gauge = this.get('gauge').highcharts();
    const data = this.get('data');

    gauge.series[0].setData([data[this.get('gaugeKey')].value]);
  })
});
