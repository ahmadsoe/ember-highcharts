import Ember from 'ember';
import { setDefaultHighChartOptions } from '../utils/option-loader';
import getOwner from 'ember-getowner-polyfill';

const {
  Component,
  computed,
  get,
  set,
  on,
  run,
  $
} = Ember;

const assign = Ember.assign || Ember.merge;

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

    return assign(defaults, chartOptions);
  }),

  didReceiveAttrs() {
    this._super(...arguments);

    const content = get(this, 'content');
    const chart = get(this, 'chart');
    if (!content || !chart) return;

    let noData = chart.get('noData');
    if (noData != null) noData.remove();

    // remove series that aren't navigator
    const seriesToRemove = chart.series.filter((series) => (series.name !== 'Navigator'));
    seriesToRemove.forEach((series) => series.remove(false));

    // readd and add new series
    content.forEach((series) => chart.addSeries(series, false));

    // reset navigator data
    if (chart.xAxis.length > 0) chart.xAxis[0].setExtremes();

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
