import Ember from 'ember';
import { setDefaultHighChartOptions } from '../utils/option-loader';

const {
  computed,
  getWithDefault,
  get,
  set,
  merge,
  on,
  observer,
  run
} = Ember;

export default Ember.Component.extend({
  classNames: ['highcharts-wrapper'],
  content: undefined,
  mode:    undefined,
  chartOptions: undefined,
  chart: null,
  theme: undefined,

  buildOptions: computed('chartOptions', 'content.@each.isLoaded', function() {
    let chartOptions = Ember.$.extend(true, {}, this.get('theme'), this.get('chartOptions'));
    let chartContent = get(this, 'content.length') ? get(this, 'content') : [{
      id    : 'noData',
      data  : 0,
      color : '#aaaaaa'
    }];

    let defaults = { series: chartContent };

    return merge(defaults, chartOptions);
  }),

  contentDidChange: observer('content.@each.isLoaded', function() {
    if (!(get(this, 'content') && get(this, 'chart'))) {
      return;
    }

    let chart  = get(this, 'chart');
    let noData = chart.get('noData');

    if (noData != null) {
      noData.remove();
    }

    return get(this, 'content').forEach((series, idx) => {
      if (chart.series[idx]) {
        return chart.series[idx].setData(series.data);
      } else {
        return chart.addSeries(series);
      }
    });
  }),

  drawAfterRender() {
    run.scheduleOnce('afterRender', this, 'draw');
  },

  draw() {
    let options = [ get(this, 'buildOptions') ];
    let mode  = get(this, 'mode');

    if (typeof mode === 'string' && !!mode) {
      options.unshift(mode);
    }

    let $element = this.$();
    let chart    = $element.highcharts.apply($element, options).highcharts();

    set(this, 'chart', chart);
  },

  _renderChart: on('didInsertElement', function() {
    this.drawAfterRender();
    setDefaultHighChartOptions(this.container);
  }),

  _destroyChart: on('willDestroyElement', function() {
    this._super();
    get(this, 'chart').destroy();
  })
});
