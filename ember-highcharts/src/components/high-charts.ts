import Component from '@glimmer/component';

import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

import { getOwner } from '@ember/application';
import type Owner from '@ember/owner';
import { scheduleOnce } from '@ember/runloop';
import { waitForPromise } from '@ember/test-waiters';

import type { default as _Highcharts } from 'highcharts';

import buildOptions from '../utils/build-options.ts';
import { setDefaultHighChartOptions } from '../utils/option-loader.ts';
import { getSeriesMap, getSeriesChanges } from '../utils/chart-data.ts';

/* Map ember-highcharts modes to Highcharts methods
 * https://api.highcharts.com/class-reference/Highcharts.html
 */
const CHART_TYPES = {
  StockChart: 'stockChart',
  Map: 'mapChart',
  Gantt: 'ganttChart',
  undefined: 'chart',
} as const;

interface HighChartsSignature<Content extends Highcharts.Options['series']> {
  Element: HTMLDivElement;
  Args: {
    /**
     * The callback argument is optional and allows you to pass in a function that runs when the chart has finished loading
     */
    callback?: Highcharts.ChartCallbackFunction;
    /**
     * The `content` argument matches up with the `series` option in the Highcharts/Highstock/Highmaps API.
     * Use this option to set the series data for your chart.
     */
    content?: Content;
    /**
     * The `chartOptions` argument is a generic object for setting different options with Highcharts/Highstock/Highmaps.
     * Use this option to set things like the chart title and axis settings.
     */
    chartOptions: Highcharts.Options;
    /**
     * The mode argument is optional and it determines whether to use Highcharts, Highstock, or Highmaps.
     */
    mode?: 'Gantt' | 'Map' | 'StockChart';
    /**
     * The `theme` argument is optional and it allows you to pass in a Highcharts theme.
     */
    theme?: Highcharts.Options;
  };
  Blocks: {
    default: [chart: Highcharts.Chart | null];
  };
}

export default class HighCharts<
  Content extends Highcharts.Options['series'],
> extends Component<HighChartsSignature<Content>> {
  @tracked highchartsInstance?: typeof _Highcharts;

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
  el: HTMLDivElement | undefined = undefined;

  @tracked
  chart: Highcharts.Chart | null = null;

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
    const highchartsModeFunction =
      this.highchartsInstance?.[mode as keyof object];
    if (element && typeof highchartsModeFunction === 'function') {
      // eslint-disable-next-line @typescript-eslint/ban-types
      const chart = (highchartsModeFunction as Function)(
        element,
        ...completeChartOptions,
      );
      this.chart = chart;
    }
  }

  @action
  async onDidInsert(el: HTMLDivElement) {
    await this._importHighchartsDeps();
    this.el = el;
    this.drawAfterRender();
    setDefaultHighChartOptions(getOwner(this) as Owner);
  }

  @action
  onDidUpdate(
    _elem: unknown,
    [content, chartOptions, mode]: [
      HighChartsSignature<Content>['Args']['content'],
      HighChartsSignature<Content>['Args']['chartOptions'],
      HighChartsSignature<Content>['Args']['mode'],
    ],
  ) {
    const { chart } = this;

    if (!content || !chart) {
      return;
    }

    // Set any new chartOptions, do not redraw as we'll do that later
    chart.update(chartOptions, false);

    const isStockChart = mode === 'StockChart';
    // create maps to make series data easier to work with
    const contentSeriesMap = getSeriesMap(content);
    const chartSeriesMap = getSeriesMap(
      chart.series as unknown as Array<_Highcharts.SeriesOptionsType>,
    );

    // remove and update current series
    const chartSeriesToRemove: Array<Highcharts.Series> = [];

    chart.series.forEach((series) => {
      if (isStockChart && series.name.match(/^Navigator/)) {
        return;
      }

      const contentSeries = contentSeriesMap[
        series.name
      ] as unknown as _Highcharts.Series;

      if (!contentSeries) {
        return chartSeriesToRemove.push(series);
      }

      const updatedKeys = getSeriesChanges(contentSeries, series);

      // call series.update() when other series attributes like pointStart have changed
      if (updatedKeys.length) {
        series.update(
          contentSeries as unknown as _Highcharts.SeriesOptionsType,
          false,
        );
      } else {
        series.setData(contentSeries.data, false);
      }
    });

    chartSeriesToRemove.forEach((series) => series.remove(false));

    // add new series
    content.forEach((contentSeries) => {
      // eslint-disable-next-line no-prototype-builtins
      if (!chartSeriesMap.hasOwnProperty(contentSeries.name as string)) {
        chart.addSeries(contentSeries, false);
      }
    });

    // reset navigator data
    if (isStockChart && chart.xAxis.length) {
      chart.xAxis[0]?.setExtremes();
    }

    return chart.redraw();
  }

  willDestroy() {
    super.willDestroy();

    this.chart?.destroy();
  }

  // This one is needed because in
  // in webpack builds we will have module contents directly in `tmpModule`
  // in vite builds we will have module contents in `tmpModule.default`
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _webpackVsVite(newModule: any) {
    return newModule.default || newModule;
  }

  // As per [this change](https://www.highcharts.com/docs/getting-started/version-12) in v12
  async _preV12MaybeImport(newModule: Promise<unknown>) {
    const highchartModule = this._webpackVsVite(
      await waitForPromise(newModule),
    );

    typeof highchartModule === 'function' &&
      highchartModule(this.highchartsInstance);
  }

  /**
   * Dynamically imports the necessary pieces from Highcharts, based on chart type and options.
   */
  async _importHighchartsDeps() {
    this.highchartsInstance = this._webpackVsVite(
      await waitForPromise(import('highcharts')),
    );

    if (this.args.mode === 'Map') {
      await this._preV12MaybeImport(import('highcharts/modules/map'));
    } else if (this.args.mode === 'StockChart') {
      await this._preV12MaybeImport(import('highcharts/modules/stock'));
    }

    await this._preV12MaybeImport(import('highcharts/modules/accessibility'));

    // 3d support
    if (this.args.chartOptions?.chart?.options3d) {
      await this._preV12MaybeImport(import('highcharts/modules/boost'));
      await this._preV12MaybeImport(import('highcharts/highcharts-3d'));
    }

    // Drilldown support
    if (this.args.chartOptions?.drilldown) {
      await this._preV12MaybeImport(import('highcharts/modules/drilldown'));
    }

    if (this.args.chartOptions?.chart?.type === 'funnel') {
      await this._preV12MaybeImport(import('highcharts/modules/funnel'));
    }

    if (this.args.chartOptions?.chart?.type === 'heatmap') {
      await this._preV12MaybeImport(import('highcharts/modules/heatmap'));
      await this._preV12MaybeImport(import('highcharts/highcharts-more'));
    }

    if (this.args.chartOptions?.chart?.type === 'solidgauge') {
      await this._preV12MaybeImport(import('highcharts/modules/solid-gauge'));
      await this._preV12MaybeImport(import('highcharts/highcharts-more'));
    }

    if (
      this.args.chartOptions?.chart?.type === 'treegraph' ||
      this.args.chartOptions?.chart?.type === 'treemap'
    ) {
      await this._preV12MaybeImport(import('highcharts/modules/treemap'));
    }

    if (this.args.chartOptions?.chart?.type === 'treegraph') {
      await this._preV12MaybeImport(import('highcharts/modules/treegraph'));
    }

    if (this.args.chartOptions?.chart?.type === 'waterfall') {
      await this._preV12MaybeImport(import('highcharts/highcharts-more'));
    }

    if (this.args.chartOptions?.chart?.polar === true) {
      await this._preV12MaybeImport(import('highcharts/highcharts-more'));
    }
  }
}
