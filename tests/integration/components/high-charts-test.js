import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import {
  lineChartOptions,
  stockChartOptions,
  cityData,
  stockData
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
  assert.equal(this.$('text:contains(Highcharts.com)').length, 0, 'default credits not present');
  assert.notEqual(this.$(':contains(ember-highcharts-configured-title)').length, 0,
    'expected credits text present');
});

test('should add a series', function(assert) {
  assert.expect(2);

  this.cityData = cityData;
  this.lineChartOptions = lineChartOptions;
  this.render(hbs`
    {{high-charts content=cityData chartOptions=lineChartOptions}}
  `);

  assert.equal(this.$('.highcharts-legend .highcharts-legend-item').length, 3, 'base series count');

  // add a series to chart content
  let cityDataCopy = Ember.copy(cityData, true);
  cityDataCopy.push({
    name: 'San Fransico',
    data: [
      [1, 7.0],
      [2, 9.5],
      [3, 9.5]
    ]
  });

  this.set('cityData', cityDataCopy);
  assert.equal(this.$('.highcharts-legend .highcharts-legend-item').length, 4, 'new series count');
});

test('should remove a series', function(assert) {
  assert.expect(2);

  this.cityData = cityData;
  this.lineChartOptions = lineChartOptions;
  this.render(hbs`
    {{high-charts content=cityData chartOptions=lineChartOptions}}
  `);

  assert.equal(this.$('.highcharts-legend .highcharts-legend-item').length, 3, 'base series count');

  // remove a series from chart content
  let cityDataCopy = Ember.copy(cityData, true);
  cityDataCopy = cityDataCopy.slice(0, 2);

  this.set('cityData', cityDataCopy);
  assert.equal(this.$('.highcharts-legend .highcharts-legend-item').length, 2, 'new series count');
});

test('should have navigator series for highstock', function(assert) {
  assert.expect(1);

  this.stockData = stockData;
  this.stockChartOptions = stockChartOptions;

  this.render(hbs`
    {{high-charts mode="StockChart" content=stockData chartOptions=stockChartOptions}}
  `);

  assert.equal(this.$('.highcharts-navigator').length, 1, '.highcharts-navigator class is present');
});
