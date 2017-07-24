/* global Highcharts */
import Ember from 'ember';
import { setDefaultHighChartOptions } from '../utils/option-loader';
import { getSeriesMap, getSeriesChanges } from '../utils/chart-data';
import layout from 'ember-highcharts/templates/components/high-charts';

const {
  Component,
  computed,
  get,
  getOwner,
  getProperties,
  set,
  run,
  $
} = Ember;

const assign = Ember.assign || Ember.merge;

export default Component.extend({
  layout,
  classNames: ['highcharts-wrapper'],
  content: undefined,
  mode: undefined,
  chartOptions: undefined,
  chart: null,
  theme: undefined,
  callback: undefined,

  buildOptions: computed('chartOptions', 'content.[]', function() {
    let chartOptions = $.extend(true, {}, get(this, 'theme'), get(this, 'chartOptions'));
    let chartContent = get(this, 'content');

    // if 'no-data-to-display' module has been imported, keep empty series and leave it to highcharts to show no data label.
    if (!get(this, 'content.length') && !Highcharts.Chart.prototype.showNoData) {
      chartContent = [{
        id: 'noData',
        data: 0,
        color: '#aaaaaa'
      }];
    }

    let defaults = { series: chartContent };

    return assign(defaults, chartOptions);
  }),

  didReceiveAttrs() {
    this._super(...arguments);

    let { content, chart, mode } = getProperties(this, 'content', 'chart', 'mode');

    if (!content || !chart) {
      return;
    }

    let isStockChart = mode === 'StockChart';

    // create maps to make series data easier to work with
    let contentSeriesMap = getSeriesMap(content);
    let chartSeriesMap = getSeriesMap(chart.series);

    // remove and update current series
    let chartSeriesToRemove = [];

    chart.series.forEach((series) => {
      if (isStockChart && series.name.match(/^Navigator/)) {
        return;
      }

      let contentSeries = contentSeriesMap[series.name];

      if (!contentSeries) {
        return chartSeriesToRemove.push(series);
      }

      let updatedKeys = getSeriesChanges(contentSeries, series);

      // call series.update() when other series attributes like pointStart have changed
      if (updatedKeys.length) {
        series.update(contentSeries, false);
      } else {
        series.setData(contentSeries.data, false);
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

    return chart.redraw();
  },

  drawAfterRender() {
    run.scheduleOnce('afterRender', this, 'draw');
  },

  draw() {
    let $element = this.$('.chart-container');
    let mode = get(this, 'mode');
    let completeChartOptions = [get(this, 'buildOptions'), get(this, 'callback')];

    if (typeof mode === 'string' && !!mode) {
      completeChartOptions.unshift(mode);
    }

    if ($element) {
      let chart = $element.highcharts(...completeChartOptions).highcharts();
      set(this, 'chart', chart);
    }
  },

  didInsertElement() {
    this._super(...arguments);

    this.drawAfterRender();
    setDefaultHighChartOptions(getOwner(this));
  },

  willDestroyElement() {
    this._super(...arguments);

    if (get(this, 'chart')) {
      get(this, 'chart').destroy();
    }
  }
});
