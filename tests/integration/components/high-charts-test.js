import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import {
  lineChartOptions,
  cityData
} from '../constants';

moduleForComponent('high-charts', 'Integration | Component | High Charts', {
  integration: true
});

test('should add a series', function(assert) {
  assert.expect(2);

  this.cityData = cityData;
  this.lineChartOptions = lineChartOptions;
  this.render(hbs`
    {{high-charts content=cityData chartOptions=lineChartOptions}}
  `);

  assert.equal($('.highcharts-legend .highcharts-legend-item').length, 3, 'incorrect series count');

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
  assert.equal($('.highcharts-legend .highcharts-legend-item').length, 4, 'incorrect series count');
});

test('should remove a series', function(assert) {
  assert.expect(2);

  this.cityData = cityData;
  this.lineChartOptions = lineChartOptions;
  this.render(hbs`
    {{high-charts content=cityData chartOptions=lineChartOptions}}
  `);

  assert.equal($('.highcharts-legend .highcharts-legend-item').length, 3, 'incorrect series count');

  // remove a series from chart content
  let cityDataCopy = Ember.copy(cityData, true);
  cityDataCopy = cityDataCopy.slice(0, 2);

  this.set('cityData', cityDataCopy);
  assert.equal($('.highcharts-legend .highcharts-legend-item').length, 2, 'incorrect series count');
});
