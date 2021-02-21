import Component from '@glimmer/component';

import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

import { getOwner } from '@ember/application';
import { run } from '@ember/runloop';

import { setDefaultHighChartOptions } from '../utils/option-loader';
import { getSeriesMap, getSeriesChanges } from '../utils/chart-data';

import { assign } from '@ember/polyfills';
import merge from 'deepmerge';

const CHART_TYPES = Object.freeze({
  StockChart: 'stockChart',
  Map: 'mapChart',
  undefined: 'chart',
});

const EMPTY_CHART_CONTENT = [Object.freeze({
  id: 'noData',
  data: 0,
  color: '#aaaaaa'
})];

export default class HighCharts extends Component {
  get content() {
    return this.args.content ?? undefined;
  }

  get chartOptions() {
    return this.args.chartOptions ?? undefined;
  }

  get mode() {
    return this.args.mode ?? undefined;
  }

  get theme() {
    return this.args.theme ?? undefined;
  }

  get callback() {
    return this.args.callback ?? undefined;
  }

  @tracked
  el = undefined;

  @tracked
  chart = null;

  get buildOptions() {
    const chartOptions = merge(this.theme, this.chartOptions ?? {});
    let chartContent = this.content;

    // if 'no-data-to-display' module has been imported, keep empty series and leave it to highcharts to show no data label.
    // eslint-disable-next-line no-undef
    if (!this.content?.length && !Highcharts.Chart.prototype.showNoData) {
      chartContent = EMPTY_CHART_CONTENT;
    }

    const defaults = { series: chartContent };

    return assign(defaults, chartOptions);
  }

  drawAfterRender() {
    run.scheduleOnce('afterRender', this, 'draw');
  }

  draw() {
    const element = this.el?.querySelector('.chart-container');

    // for any mode that is falsy ('', undefined, false), set it to default 'chart'
    const mode = CHART_TYPES[this.mode] ?? CHART_TYPES.undefined;
    const completeChartOptions = [this.buildOptions, this.callback];

    if (element) {
      // eslint-disable-next-line no-undef
      const chart = Highcharts[mode](element, ...completeChartOptions);
      this.chart = chart;
    }
  }


  @action
  onDidInsert(el) {
    this.el = el;
    this.drawAfterRender();
    setDefaultHighChartOptions(getOwner(this));
  }

  @action
  onDidUpdate() {
    const { content, chart, mode } = this;

    if (!content || !chart) {
      return;
    }

    const isStockChart = mode === 'StockChart';
    // create maps to make series data easier to work with
    const contentSeriesMap = getSeriesMap(content);
    const chartSeriesMap = getSeriesMap(chart.series);

    // remove and update current series
    const chartSeriesToRemove = [];

    chart.series.forEach((series) => {
      if (isStockChart && series.name.match(/^Navigator/)) {
        return;
      }

      const contentSeries = contentSeriesMap[series.name];

      if (!contentSeries) {
        return chartSeriesToRemove.push(series);
      }

      const updatedKeys = getSeriesChanges(contentSeries, series);

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
  }

  @action
  setChart(chart) {
    this.chart = chart;
  }

  willDestroy(...args) {
    super.willDestroy(...args);

    this.chart?.destroy();
  }
}
