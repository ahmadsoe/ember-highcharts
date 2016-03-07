import Ember from 'ember';
import { setDefaultHighChartOptions } from '../utils/option-loader';
import getOwner from 'ember-getowner-polyfill';

const {
  Component,
  computed,
  get,
  set,
  merge,
  on,
  run,
  $
} = Ember;

export default Component.extend({
  classNames: ['highcharts-wrapper'],
  content: undefined,
  mode: undefined,
  chartOptions: undefined,
  chart: null,
  theme: undefined,
  callback: undefined,

  buildOptions: computed('chartOptions', 'content.[]', function() {
    let chartOptions = $.extend(true, {}, get(this, 'theme'), get(this, 'chartOptions'));
    let chartContent = get(this, 'content.length') ? get(this, 'content') : [{
      id: 'noData',
      data: 0,
      color: '#aaaaaa'
    }];

    let defaults = { series: chartContent };

    return merge(defaults, chartOptions);
  }),

  didReceiveAttrs() {
    this._super(...arguments);

    if (!(get(this, 'content') && get(this, 'chart'))) {
      return;
    }

    let chart = get(this, 'chart');
    let noData = chart.get('noData');

    if (noData != null) {
      noData.remove();
    }

    let numToRemove = chart.series.length - get(this, 'content').length;

    for (let i = numToRemove; i > 0; i--) {

      let lastIndex = chart.series.length - 1;

      if (chart.series[lastIndex]) {
        chart.series[lastIndex].remove(false);
      }

    }

    get(this, 'content').forEach((series, idx) => {

      if (chart.series[idx]) {
        return chart.series[idx].setData(series.data, false);
      } else {
        return chart.addSeries(series, false);
      }
    });

    return chart.redraw();

  },

  drawAfterRender() {
    run.scheduleOnce('afterRender', this, 'draw');
  },

  draw() {
    let completeChartOptions = [ get(this, 'buildOptions'), get(this, 'callback') ];
    let mode = get(this, 'mode');

    if (typeof mode === 'string' && !!mode) {
      completeChartOptions.unshift(mode);
    }

    let $element = this.$();
    if ($element) {
      let chart = $element.highcharts.apply($element, completeChartOptions).highcharts();
      set(this, 'chart', chart);
    }
  },

  _renderChart: on('didInsertElement', function() {
    this.drawAfterRender();
    setDefaultHighChartOptions(getOwner(this));
  }),

  _destroyChart: on('willDestroyElement', function() {
    if (get(this, 'chart')) {
      get(this, 'chart').destroy();
    }
  })
});
