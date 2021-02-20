/* WORK IN PROGRESS */

import Modifier from 'ember-modifier';

import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

import { getOwner } from '@ember/application';
import { run } from '@ember/runloop';

import { setDefaultHighChartOptions } from '../utils/option-loader';
import { getSeriesMap, getSeriesChanges } from '../utils/chart-data';
import { CHART_TYPES } from '../utils/chart-types';

import { assign } from '@ember/polyfills';
import merge from 'deepmerge';

export default class ProcessModifier extends Modifier {

  @tracked
  chart = null;

  get content() {
    return this.args.named.content ?? undefined;
  }

  get chartOptions() {
    return this.args.named.chartOptions ?? undefined;
  }

  get mode() {
    return this.args.named.mode ?? undefined;
  }

  get theme() {
    return this.args.named.theme ?? undefined;
  }

  get callback() {
    return this.args.named.callback ?? undefined;
  }

  get buildOptions() {
    const chartOptions = merge(this.theme, this.chartOptions ?? {});
    let chartContent = this.content;

    // if 'no-data-to-display' module has been imported, keep empty series and leave it to highcharts to show no data label.
    // eslint-disable-next-line no-undef
    if (!this.content?.length && !Highcharts.Chart.prototype.showNoData) {
      chartContent = [{
        id: 'noData',
        data: 0,
        color: '#aaaaaa'
      }];
    }

    const defaults = { series: chartContent };

    return assign(defaults, chartOptions);
  }

  drawAfterRender() {
    run.scheduleOnce('afterRender', this, 'draw');
  }

  draw() {
    const element = this.element?.querySelector('.chart-container');

    const mode = CHART_TYPES[this.mode];
    console.log('this.mode', this.mode, 'mode', mode);
    const completeChartOptions = [this.buildOptions, this.callback];

    if (element) {
      // eslint-disable-next-line no-undef
      const chart = Highcharts[mode](element, ...completeChartOptions);
      this.args.named.setChart(chart);
    }
  }

  didInstall() {
    console.log('modifier::didInstall');
    this.drawAfterRender();
    setDefaultHighChartOptions(getOwner(this));
  }

  didReceiveArguments() {
    console.log('modifier::didReceiveArguments');
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

  willDestroy() {
    this.chart?.destroy();
  }
}
