/* globals Highcharts */
export function initialize(/* application */) {
  Highcharts.setOptions({
    global: {
      timezoneOffset: new Date().getTimezoneOffset()
    }
  });
}

export default {
  name: 'highcharts',
  initialize
};
