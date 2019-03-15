import { copy } from '@ember/object/internals';
import { assign } from '@ember/polyfills';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import {
  lineChartOptions,
  stockChartOptions,
  cityData,
  stockData,
  updatedStockData
} from '../constants';

moduleForComponent('high-charts', 'Integration | Component | High Charts', {
  integration: true
});

test('should include local options', function(assert) {
  assert.expect(2);

  this.render(hbs`
    {{high-charts}}
  `);

  // custom highcharts-configs/application.js is auto-loaded from tests/dummy/app
  let highchartsCreditsText = document.querySelector('.highcharts-credits').textContent.trim();
  assert.notOk(highchartsCreditsText.match('Highcharts.com'), 'default credits not present');
  assert.equal(highchartsCreditsText, 'ember-highcharts-configured-title', 'expected credits text present');
});

test('should render empty series for no chart content', function(assert) {
  assert.expect(2);

  this.content = [];

  this.render(hbs`
    {{high-charts content=content chartOptions=lineChartOptions}}
  `);

  let legend = document.querySelectorAll('.highcharts-legend .highcharts-legend-item text');
  assert.equal(legend.length, 1, 'expected one series');
  assert.equal(legend[0].textContent.trim(), 'Series 1', 'expected default series name');
});

test('should add a series', function(assert) {
  assert.expect(2);

  this.cityData = cityData;
  this.lineChartOptions = lineChartOptions;
  this.render(hbs`
    {{high-charts content=cityData chartOptions=lineChartOptions}}
  `);

  assert.equal(document.querySelectorAll('.highcharts-legend .highcharts-legend-item').length, 3, 'base series count');

  // add a series to chart content
  let cityDataCopy = copy(cityData, true);
  cityDataCopy.push({
    name: 'San Fransico',
    data: [
      [1, 7.0],
      [2, 9.5],
      [3, 9.5]
    ]
  });

  this.set('cityData', cityDataCopy);
  assert.equal(document.querySelectorAll('.highcharts-legend .highcharts-legend-item').length, 4, 'new series count');
});

test('should remove a series', function(assert) {
  assert.expect(2);

  this.cityData = cityData;
  this.lineChartOptions = lineChartOptions;
  this.render(hbs`
    {{high-charts content=cityData chartOptions=lineChartOptions}}
  `);

  assert.equal(document.querySelectorAll('.highcharts-legend .highcharts-legend-item').length, 3, 'base series count');

  // remove a series from chart content
  let cityDataCopy = copy(cityData, true);
  cityDataCopy = cityDataCopy.slice(0, 2);

  this.set('cityData', cityDataCopy);
  assert.equal(document.querySelectorAll('.highcharts-legend .highcharts-legend-item').length, 2, 'new series count');
});

test('should have navigator series for highstock', function(assert) {
  assert.expect(1);

  this.stockData = stockData;
  this.stockChartOptions = stockChartOptions;

  this.render(hbs`
    {{high-charts mode="StockChart" content=stockData chartOptions=stockChartOptions}}
  `);

  assert.equal(document.querySelectorAll('.highcharts-navigator').length, 1, '.highcharts-navigator class is present');
});

test('should update data on all svg paths on highstock chart', function(assert) {
  assert.expect(1);

  this.set('stockChartOptions', stockChartOptions);
  this.set('stockData', stockData);

  this.render(hbs`
    {{high-charts mode="StockChart" content=stockData chartOptions=stockChartOptions}}
  `);

  let generateDArray = () => {
    let highchartSeries = Array.from(document.querySelectorAll('.highcharts-series'));
    return highchartSeries.map((series) => {
      return series.querySelector('path').getAttribute('d');
    });
  };

  let dVals = generateDArray();

  this.set('stockData', updatedStockData);
  let newDVals = generateDArray();

  assert.notEqual(dVals[1], newDVals[1]);
});

test('should yield the chart instance when used in block form', function(assert) {
  this.set('cityData', cityData);
  this.set('lineChartOptions', lineChartOptions);
  this.render(hbs`
    {{#high-charts content=cityData chartOptions=lineChartOptions as |chart|}}
      <span class="chart-test-content">{{chart.series.length}}</span>
    {{/high-charts}}
  `);

  assert.equal(document.querySelector('.chart-test-content').textContent, 3, 'chart instance series count');
});

test('should accept "falsy" mode attribute for default highcharts operation', function(assert) {
  assert.expect(4);

  this.render(hbs`
    {{high-charts}}
  `);
  assert.equal(document.querySelectorAll('.highcharts-container').length, 1, 'we rendered a chart without a mode specified');

  this.render(hbs`
    {{high-charts mode=""}}
  `);
  assert.equal(document.querySelectorAll('.highcharts-container').length, 1, 'we rendered a chart with empty string mode');

  this.render(hbs`
    {{high-charts mode=false}}
  `);
  assert.equal(document.querySelectorAll('.highcharts-container').length, 1, 'we rendered a chart with false boolean mode');

  this.render(hbs`
    {{high-charts mode=null}}
  `);
  assert.equal(document.querySelectorAll('.highcharts-container').length, 1, 'we rendered a chart with null mode');
});

test('chart should reflect updated chart options when set on the component', function(assert) {
  let newTitle = 'New Title';
  this.set('cityData', cityData);
  this.set('lineChartOptions', lineChartOptions);
  this.render(hbs`
    {{high-charts content=cityData chartOptions=lineChartOptions}}
  `);

  assert.equal(document.querySelector('.highcharts-title').textContent, lineChartOptions.title.text, 'chart title is correct');

  this.set('lineChartOptions', assign({}, lineChartOptions, { title: { text: newTitle } }));

  assert.equal(document.querySelector('.highcharts-title').textContent, newTitle, 'chart title is updated');
});
