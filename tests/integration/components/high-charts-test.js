import { copy } from 'ember-copy';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

import {
  lineChartOptions,
  stockChartOptions,
  cityData,
  stockData,
  updatedStockData
} from '../constants';

module('Integration | Component | High Charts', function(hooks) {
  setupRenderingTest(hooks);

  test('should include local options', async function(assert) {
    assert.expect(2);

    await render(hbs`
      <HighCharts />
    `);

    // custom highcharts-configs/application.js is auto-loaded from tests/dummy/app
    let highchartsCreditsText = document.querySelector('.highcharts-credits').textContent.trim();
    assert.notOk(highchartsCreditsText.match('Highcharts.com'), 'default credits not present');
    assert.equal(highchartsCreditsText, 'ember-highcharts-configured-title', 'expected credits text present');
  });

  test('should render empty series for no chart content', async function(assert) {
    assert.expect(2);

    this.content = [];

    await render(hbs`
      <HighCharts
        @content={{this.cityData}}
        @chartOptions={{this.lineChartOptions}}
      />
    `);

    let legend = document.querySelectorAll('.highcharts-legend .highcharts-legend-item text');
    assert.equal(legend.length, 1, 'expected one series');
    assert.equal(legend[0].textContent.trim(), 'Series 1', 'expected default series name');
  });

  test('should add a series', async function(assert) {
    assert.expect(2);

    this.cityData = cityData;
    this.lineChartOptions = lineChartOptions;
    await render(hbs`
      <HighCharts
        @content={{this.cityData}}
        @chartOptions={{this.lineChartOptions}}
      />
    `);

    assert.equal(document.querySelectorAll('.highcharts-legend .highcharts-legend-item').length, 3, 'base series count');

    // add a series to chart content
    let cityDataCopy = copy(cityData, true);
    cityDataCopy.push({
      name: 'San Francisco',
      data: [
        [1, 7.0],
        [2, 9.5],
        [3, 9.5]
      ]
    });

    this.set('cityData', cityDataCopy);
    assert.equal(document.querySelectorAll('.highcharts-legend .highcharts-legend-item').length, 4, 'new series count');
  });

  test('should remove a series', async function(assert) {
    assert.expect(2);

    this.cityData = cityData;
    this.lineChartOptions = lineChartOptions;
    await render(hbs`
      <HighCharts
        @content={{this.cityData}}
        @chartOptions={{this.lineChartOptions}}
      />
    `);

    assert.equal(document.querySelectorAll('.highcharts-legend .highcharts-legend-item').length, 3, 'base series count');

    // remove a series from chart content
    let cityDataCopy = copy(cityData, true);
    cityDataCopy = cityDataCopy.slice(0, 2);

    this.set('cityData', cityDataCopy);
    assert.equal(document.querySelectorAll('.highcharts-legend .highcharts-legend-item').length, 2, 'new series count');
  });

  test('should have navigator series for highstock', async function(assert) {
    assert.expect(1);

    this.stockData = stockData;
    this.stockChartOptions = stockChartOptions;

    await render(hbs`
      <HighCharts
        @mode="StockChart"
        @content={{this.stockData}}
        @chartOptions={{this.stockChartOptions}}
      />
    `);

    assert.equal(document.querySelectorAll('.highcharts-navigator').length, 1, '.highcharts-navigator class is present');
  });

  test('should update data on all svg paths on highstock chart', async function(assert) {
    assert.expect(1);

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
      let highchartSeries = Array.from(document.querySelectorAll('.highcharts-series'));
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

  test('should yield the chart instance when used in block form', async function(assert) {
    this.set('cityData', cityData);
    this.set('lineChartOptions', lineChartOptions);
    await render(hbs`
      <HighCharts
        @content={{this.cityData}}
        @chartOptions={{this.lineChartOptions}} as |chart|>
        <span class="chart-test-content">{{chart.series.length}}</span>
      </HighCharts>
    `);

    assert.equal(document.querySelector('.chart-test-content').textContent, 3, 'chart instance series count');
  });

  test('should accept "falsy" mode attribute for default highcharts operation', async function(assert) {
    assert.expect(4);

    await render(hbs`
      <HighCharts />
    `);
    assert.equal(document.querySelectorAll('.highcharts-container').length, 1, 'we rendered a chart without a mode specified');

    await render(hbs`
      <HighCharts @mode={{""}}/>
    `);
    assert.equal(document.querySelectorAll('.highcharts-container').length, 1, 'we rendered a chart with empty string mode');

    await render(hbs`
      <HighCharts @mode={{false}}/>
    `);
    assert.equal(document.querySelectorAll('.highcharts-container').length, 1, 'we rendered a chart with false boolean mode');

    await render(hbs`
      <HighCharts @mode={{null}}/>
    `);
    assert.equal(document.querySelectorAll('.highcharts-container').length, 1, 'we rendered a chart with null mode');
  });
});
