import Ember from 'ember';
import _lang from 'lodash/lang';
import _collection from 'lodash/collection';
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

const _seriesWithoutData = function(series) {
  // we ignore 'data' key, as if nothing else changed
  // we'll update only data series. Also, we should
  // ignore keys starting with _ (underscore) to avoid
  // comparing system properties
  return _collection.reduce(series, (result, value, key) => {
    if (key === 'data' || key.match(/^_/)) {
      return result;
    } else {
      result[key] = value;
    }
    return result;
  }, {});
};

export default Component.extend({
  classNames: ['highcharts-wrapper'],
  content: undefined,
  mode: undefined,
  chartOptions: undefined,
  chart: null,
  theme: undefined,
  callback: undefined,

  _previousSeries: null,

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

    const { content, _previousSeries, chart, mode } = this.getProperties('content', '_previousSeries', 'chart', 'mode');
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

    const previousSeriesMap = (_previousSeries || []).reduce((previousSeriesMap, chartSeries) => {
      previousSeriesMap[chartSeries.name] = chartSeries;
      return previousSeriesMap;
    }, {});

    // remove and update current series
    const chartSeriesToRemove = [];

    chart.series.forEach((series) => {
      if (isStockChart && series.name === 'Navigator') {
        return;
      }

      const contentSeries = contentSeriesMap[series.name];
      const previousSeries = previousSeriesMap[series.name];

      if (!contentSeries) {
        return chartSeriesToRemove.push(series);
      }

      if (_lang.isEqual(_seriesWithoutData(previousSeries), _seriesWithoutData(contentSeries))) {
        series.setData(contentSeries.data, false);
      } else {
        series.update(contentSeries, false);
      }
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

    set(this, '_previousSeries', content);

    return chart.redraw();
  },

  drawAfterRender() {
    run.scheduleOnce('afterRender', this, 'draw');
  },

  draw() {
    let buildOptions = get(this, 'buildOptions');
    let completeChartOptions = [ buildOptions, get(this, 'callback') ];
    let mode = get(this, 'mode');

    if (typeof mode === 'string' && !!mode) {
      completeChartOptions.unshift(mode);
    }

    let $element = this.$();
    if ($element) {
      let chart = $element.highcharts.apply($element, completeChartOptions).highcharts();
      set(this, 'chart', chart);

      if (buildOptions.series) {
        set(this, '_previousSeries', buildOptions.series);
      }
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
