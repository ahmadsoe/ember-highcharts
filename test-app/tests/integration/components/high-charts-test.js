import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled, waitFor } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

import {
  lineChartOptions,
  stockChartOptions,
  cityData,
  stockData,
  updatedStockData,
} from '../constants';

module('Integration | Component | High Charts', function (hooks) {
  setupRenderingTest(hooks);

  test('should include local options', async function (assert) {
    await render(hbs`
      <HighCharts />
    `);

    // custom highcharts-configs/application.js is auto-loaded from tests/dummy/app
    assert
      .dom('.highcharts-credits')
      .doesNotIncludeText('Highcharts.com', 'default credits not present');
    assert
      .dom('.highcharts-credits')
      .hasText(
        'ember-highcharts-configured-title',
        'expected credits text present',
      );
  });

  test('should render empty series for no chart content', async function (assert) {
    this.content = [];

    await render(hbs`
      <HighCharts
        @content={{this.cityData}}
        @chartOptions={{this.lineChartOptions}}
      />
    `);

    assert
      .dom('.highcharts-legend .highcharts-legend-item text')
      .exists({ count: 1 }, 'expected one series');
    assert
      .dom('.highcharts-legend .highcharts-legend-item text')
      .hasText('Series 1', 'expected default series name');
  });

  test('should add a series', async function (assert) {
    this.cityData = cityData;
    this.lineChartOptions = lineChartOptions;
    await render(hbs`
      <HighCharts
        @content={{this.cityData}}
        @chartOptions={{this.lineChartOptions}}
      />
    `);

    assert
      .dom('.highcharts-legend .highcharts-legend-item')
      .exists({ count: 3 }, 'base series count');

    // add a series to chart content
    let cityDataCopy = structuredClone(cityData);
    cityDataCopy.push({
      name: 'San Francisco',
      data: [
        [1, 7.0],
        [2, 9.5],
        [3, 9.5],
      ],
    });

    this.set('cityData', cityDataCopy);
    assert
      .dom('.highcharts-legend .highcharts-legend-item')
      .exists({ count: 4 }, 'new series count');
  });

  test('should remove a series', async function (assert) {
    this.cityData = cityData;
    this.lineChartOptions = lineChartOptions;
    await render(hbs`
      <HighCharts
        @content={{this.cityData}}
        @chartOptions={{this.lineChartOptions}}
      />
    `);

    assert
      .dom('.highcharts-legend .highcharts-legend-item')
      .exists({ count: 3 }, 'base series count');

    // remove a series from chart content
    let cityDataCopy = structuredClone(cityData);
    cityDataCopy = cityDataCopy.slice(0, 2);

    this.set('cityData', cityDataCopy);
    assert
      .dom('.highcharts-legend .highcharts-legend-item')
      .exists({ count: 2 }, 'new series count');
  });

  test('should have navigator series for highstock', async function (assert) {
    this.stockData = stockData;
    this.stockChartOptions = stockChartOptions;

    await render(hbs`
      <HighCharts
        @mode="StockChart"
        @content={{this.stockData}}
        @chartOptions={{this.stockChartOptions}}
      />
    `);

    await waitFor('.highcharts-navigator');

    assert
      .dom('.highcharts-navigator')
      .exists({ count: 1 }, '.highcharts-navigator class is present');
  });

  test('should update data on all svg paths on highstock chart', async function (assert) {
    this.set('stockChartOptions', stockChartOptions);
    this.set('stockData', stockData);

    await render(hbs`
      <HighCharts
        @mode="StockChart"
        @content={{this.stockData}}
        @chartOptions={{this.stockChartOptions}}
      />
    `);

    let generateDArray = () => {
      let highchartSeries = Array.from(
        document.querySelectorAll('.highcharts-series'),
      );
      return highchartSeries.map((series) => {
        return series.querySelector('path').getAttribute('d');
      });
    };

    let dVals = generateDArray();

    this.set('stockData', updatedStockData);
    await settled();
    let newDVals = generateDArray();
    await settled();

    assert.notEqual(dVals[1], newDVals[1]);
  });

  test('should yield the chart instance when used in block form', async function (assert) {
    this.set('cityData', cityData);
    this.set('lineChartOptions', lineChartOptions);

    await render(hbs`
      <HighCharts
        @content={{this.cityData}}
        @chartOptions={{this.lineChartOptions}} as |chart|>
        <span class="chart-test-content">{{chart.series.length}}</span>
      </HighCharts>
    `);

    assert
      .dom('.chart-test-content')
      .hasText('3', 'chart instance series count');
  });

  test('should accept "falsy" mode attribute for default highcharts operation', async function (assert) {
    await render(hbs`
      <HighCharts />
    `);
    assert
      .dom('.highcharts-container')
      .exists({ count: 1 }, 'we rendered a chart without a mode specified');

    await render(hbs`
      <HighCharts @mode="" />
    `);
    assert
      .dom('.highcharts-container')
      .exists({ count: 1 }, 'we rendered a chart with empty string mode');

    await render(hbs`
      <HighCharts @mode={{false}}/>
    `);
    assert
      .dom('.highcharts-container')
      .exists({ count: 1 }, 'we rendered a chart with false boolean mode');

    await render(hbs`
      <HighCharts @mode={{null}}/>
    `);
    assert
      .dom('.highcharts-container')
      .exists({ count: 1 }, 'we rendered a chart with null mode');
  });

  test('should call passed in callback once the chart has loaded', async function (assert) {
    const done = assert.async();

    this.cityData = cityData;
    this.lineChartOptions = lineChartOptions;
    this.callBackFunc = () => {
      assert.ok(true, 'Callback function was called');
      done();
    };

    await render(hbs`
      <HighCharts
        @content={{this.cityData}}
        @chartOptions={{this.lineChartOptions}}
        @callback={{this.callBackFunc}}
      />
    `);
  });

  test('should update when the chartOptions change', async function (assert) {
    this.cityData = cityData;
    this.lineChartOptions = lineChartOptions;

    await render(hbs`
      <HighCharts
        @content={{this.cityData}}
        @chartOptions={{this.lineChartOptions}}
      />
    `);

    assert.strictEqual(
      document.querySelector('.highcharts-title').textContent,
      'Series Test',
      'Title is correct',
    );
    assert.strictEqual(
      document.querySelector('.highcharts-subtitle').textContent,
      '',
      'Subtitle is empty',
    );

    this.set('lineChartOptions', { subtitle: { text: 'Updated!' } });

    assert.strictEqual(
      document.querySelector('.highcharts-title').textContent,
      'Series Test',
      'Title remains the same',
    );
    assert.strictEqual(
      document.querySelector('.highcharts-subtitle').textContent,
      'Updated!',
      'new series count',
    );
  });
});
