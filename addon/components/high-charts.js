import { assign } from '@ember/polyfills';
import Component from '@ember/component';
import { getOwner } from '@ember/application';
import { set, getProperties, get, computed } from '@ember/object';
import { run } from '@ember/runloop';
import { setDefaultHighChartOptions } from '../utils/option-loader';
import { getSeriesMap, getSeriesChanges } from '../utils/chart-data';
import layout from 'ember-highcharts/templates/components/high-charts';
import merge from 'deepmerge';

/* Map ember-highcharts modes to Highcharts methods
 * https://api.highcharts.com/class-reference/Highcharts.html
 */
const CHART_TYPES = {
  StockChart: 'stockChart',
  Map: 'mapChart',
  Gantt: 'ganttChart',
  undefined: 'chart'
};

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
    let theme = get(this, 'theme');
    if (theme === undefined) {
      theme = {};
    }

    let passedChartOptions = get(this, 'chartOptions');
    if (passedChartOptions === undefined) {
      passedChartOptions = {};
    }

    let chartOptions = merge(theme, passedChartOptions);
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
      // eslint-disable-next-line no-prototype-builtins
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
    let element = this.element && this.element.querySelector('.chart-container');
    let modeAttr = get(this, 'mode') || undefined;
    let mode = CHART_TYPES[modeAttr];
    let completeChartOptions = [get(this, 'buildOptions'), get(this, 'callback')];

    if (element) {
      let chart = Highcharts[mode](element, ...completeChartOptions);
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
