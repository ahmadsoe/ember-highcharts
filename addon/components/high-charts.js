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

    const isStockChart = mode === 'StockChart';


    // create maps to make series data easier to work with
    const contentSeriesMap = content.reduce((contentSeriesMap, contentSeries) => {
      contentSeriesMap[contentSeries.name] = contentSeries;
      return contentSeriesMap;
    }, {});

    const chartSeriesMap = chart.series.reduce((chartSeriesMap, chartSeries) => {
      chartSeriesMap[chartSeries.name] = chartSeries;
      return chartSeriesMap;
    }, {});


    // remove and update current series
    const chartSeriesToRemove = [];

    chart.series.forEach((series) => {
      if (isStockChart && series.name === 'Navigator') {
        return;
      }

      const contentSeries = contentSeriesMap[series.name];

      if (!contentSeries) {
        return chartSeriesToRemove.push(series);
      }

      series.setData(contentSeries.data, false);
    });

    chartSeriesToRemove.forEach((series) => series.remove(false));


    // add new series
    content.forEach((contentSeries) => {
      if (!chartSeriesMap.hasOwnProperty(contentSeries.name)) {
        chart.addSeries(contentSeries, false);
      }
    });


    // reset navigator data
    if (isStockChart && chart.xAxis.length) {
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
