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

    const { content, chart, mode } = this.getProperties('content', 'chart', 'mode');
    if (!content || !chart) {
      return;
    }

    let noData = chart.get('noData');
    if (noData != null) {
      noData.remove();
    }

    const contentSeriesMap = content.reduce((contentSeriesMap, contentSeries) => {
      contentSeriesMap[contentSeries.name] = contentSeries;
      return contentSeriesMap;
    }, {});

    // remove and update current series
    const chartSeriesToRemove = [];
    chart.series.forEach((series) => {
      if (series.name === 'Navigator' && mode === 'StockChart') {
        return;
      }

      const contentSeries = contentSeriesMap[series.name];
      if (!contentSeries) {
        return chartSeriesToRemove.push(series);
      }

      series.setData(contentSeries.data, false, false, false);
    });
    chartSeriesToRemove.forEach((series) => series.remove(false));

    const chartSeriesNames = chart.series.map((series) => series.name);

    // add new series
    content.forEach((contentSeries) => {
      if (chartSeriesNames.indexOf(contentSeries.name) >= 0) {
        return;
      }
      chart.addSeries(contentSeries, false);
    });

    // reset navigator data
    if (chart.xAxis.length > 0) {
      chart.xAxis[0].setExtremes();
    }

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
