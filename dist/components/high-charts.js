import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { getOwner } from '@ember/application';
import { scheduleOnce } from '@ember/runloop';
import { waitForPromise } from '@ember/test-waiters';
import buildOptions from '../utils/build-options.js';
import { setDefaultHighChartOptions } from '../utils/option-loader.js';
import { getSeriesMap, getSeriesChanges } from '../utils/chart-data.js';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i, n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("<div\n  class=\"highcharts-wrapper\"\n  {{did-insert this.onDidInsert}}\n  {{did-update this.onDidUpdate this.content this.chartOptions this.mode}}\n  ...attributes\n>\n  <div class=\"chart-container\"></div>\n  {{yield this.chart}}\n</div>");

let Highcharts;

/* Map ember-highcharts modes to Highcharts methods
 * https://api.highcharts.com/class-reference/Highcharts.html
 */
const CHART_TYPES = {
  StockChart: 'stockChart',
  Map: 'mapChart',
  Gantt: 'ganttChart',
  undefined: 'chart'
};
class HighCharts extends Component {
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
  static {
    g(this.prototype, "el", [tracked], function () {
      return undefined;
    });
  }
  #el = (i(this, "el"), void 0);
  static {
    g(this.prototype, "chart", [tracked], function () {
      return null;
    });
  }
  #chart = (i(this, "chart"), void 0);
  get buildOptions() {
    return buildOptions(this.theme, this.chartOptions, this.content);
  }
  drawAfterRender() {
    // eslint-disable-next-line ember/no-runloop
    scheduleOnce('afterRender', this, this.draw);
  }
  draw() {
    const element = this.el?.querySelector('.chart-container');

    // for any mode that is falsy ('', undefined, false), set it to default 'chart'
    const mode = CHART_TYPES[`${this.mode}`] ?? CHART_TYPES.undefined;
    const completeChartOptions = [this.buildOptions, this.callback];
    const highchartsModeFunction = Highcharts[mode];
    if (element && typeof highchartsModeFunction === 'function') {
      // eslint-disable-next-line @typescript-eslint/ban-types
      const chart = highchartsModeFunction(element, ...completeChartOptions);
      this.chart = chart;
    }
  }
  async onDidInsert(el) {
    await this._importHighchartsDeps();
    this.el = el;
    this.drawAfterRender();
    setDefaultHighChartOptions(getOwner(this));
  }
  static {
    n(this.prototype, "onDidInsert", [action]);
  }
  onDidUpdate(_elem, [content, chartOptions, mode]) {
    const {
      chart
    } = this;
    if (!content || !chart) {
      return;
    }

    // Set any new chartOptions, do not redraw as we'll do that later
    chart.update(chartOptions, false);
    const isStockChart = mode === 'StockChart';
    // create maps to make series data easier to work with
    const contentSeriesMap = getSeriesMap(content);
    const chartSeriesMap = getSeriesMap(chart.series);

    // remove and update current series
    const chartSeriesToRemove = [];
    chart.series.forEach(series => {
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
    chartSeriesToRemove.forEach(series => series.remove(false));

    // add new series
    content.forEach(contentSeries => {
      // eslint-disable-next-line no-prototype-builtins
      if (!chartSeriesMap.hasOwnProperty(contentSeries.name)) {
        chart.addSeries(contentSeries, false);
      }
    });

    // reset navigator data
    if (isStockChart && chart.xAxis.length) {
      chart.xAxis[0]?.setExtremes();
    }
    return chart.redraw();
  }
  static {
    n(this.prototype, "onDidUpdate", [action]);
  }
  willDestroy() {
    super.willDestroy();
    this.chart?.destroy();
  }

  /**
   * Dynamically imports the necessary pieces from Highcharts, based on chart type and options.
   */
  async _importHighchartsDeps() {
    if (this.args.mode === 'Map') {
      Highcharts = await waitForPromise(import('highcharts/highmaps'));
    } else if (this.args.mode === 'StockChart') {
      Highcharts = await waitForPromise(import('highcharts/highstock'));
    } else {
      Highcharts = await waitForPromise(import('highcharts'));
    }
    const Accessibility = await waitForPromise(import('highcharts/modules/accessibility'));
    Accessibility.default(Highcharts);

    // 3d support
    if (this.args.chartOptions?.chart?.options3d) {
      const Boost = await waitForPromise(import('highcharts/modules/boost'));
      Boost.default(Highcharts);
      const Highcharts3d = await waitForPromise(import('highcharts/highcharts-3d'));
      Highcharts3d.default(Highcharts);
    }

    // Drilldown support
    if (this.args.chartOptions?.drilldown) {
      const Drilldown = await waitForPromise(import('highcharts/modules/drilldown'));
      Drilldown.default(Highcharts);
    }
    if (this.args.chartOptions?.chart?.type === 'funnel') {
      const Funnel = await waitForPromise(import('highcharts/modules/funnel'));
      Funnel.default(Highcharts);
    }
    if (this.args.chartOptions?.chart?.type === 'heatmap') {
      const Heatmap = await waitForPromise(import('highcharts/modules/heatmap'));
      const More = await waitForPromise(import('highcharts/highcharts-more'));
      More.default(Highcharts);
      Heatmap.default(Highcharts);
    }
    if (this.args.chartOptions?.chart?.type === 'solidgauge') {
      const SolidGauge = await waitForPromise(import('highcharts/modules/solid-gauge'));
      const More = await waitForPromise(import('highcharts/highcharts-more'));
      More.default(Highcharts);
      SolidGauge.default(Highcharts);
    }
    if (this.args.chartOptions?.chart?.type === 'treegraph' || this.args.chartOptions?.chart?.type === 'treemap') {
      const Treemap = await import('highcharts/modules/treemap');
      Treemap.default(Highcharts);
    }
    if (this.args.chartOptions?.chart?.type === 'treegraph') {
      const Treegraph = await import('highcharts/modules/treegraph');
      Treegraph.default(Highcharts);
    }
    if (this.args.chartOptions?.chart?.type === 'waterfall') {
      const More = await waitForPromise(import('highcharts/highcharts-more'));
      More.default(Highcharts);
    }
    if (this.args.chartOptions?.chart?.polar === true) {
      const More = await waitForPromise(import('highcharts/highcharts-more'));
      More.default(Highcharts);
    }
  }
}
setComponentTemplate(TEMPLATE, HighCharts);

export { HighCharts as default };
//# sourceMappingURL=high-charts.js.map
