import { getSeriesMap, getSeriesChanges } from 'ember-highcharts/utils/chart-data';
import { module, test } from 'qunit';

module('Unit | Utility | Chart data');

test('#getSeriesMap returns valid object', function(assert) {
  let seriesGroup = [
    { name: 'series1', data: [1, 2] },
    { name: 'series2', data: [3, 4] }
  ];

  let expectedSeriesMap = {
    series1: {
      name: 'series1',
      data: [1, 2]
    },
    series2: {
      name: 'series2',
      data: [3, 4]
    }
  };

  assert.deepEqual(getSeriesMap(seriesGroup), expectedSeriesMap);
});

test('#getSeriesChanges detects "name" key change', function(assert) {
  let contentSeries = {
    name: 'new series name',
    data: [1, 2]
  };

  let series = {
    name: 'series1',
    data: [1, 2]
  };

  let keys = getSeriesChanges(contentSeries, series);

  assert.equal(keys.length, 1);
  assert.equal(keys[0], 'name');
});

test('#getSeriesChanges ignores changes for invalid keys', function(assert) {
  let contentSeries = {
    name: 'new series name',
    data: [3, 4],
    _legendItemPos: 2,
    obj: { foo: 'buzz' },
    fun: () => console.log('more fun') // eslint-disable-line no-console
  };

  let series = {
    name: 'series1',
    data: [1, 2],
    _legendItemPos: 1,
    obj: { foo: 'bar' },
    fun: () => console.log('fun') // eslint-disable-line no-console
  };

  let keys = getSeriesChanges(contentSeries, series);

  assert.equal(keys.indexOf('data'), -1, 'expected "data" key to be ignored');
  assert.equal(keys.indexOf('_legendItemPos'), -1, 'expected private keys to be ignored');
  assert.equal(keys.indexOf('obj'), -1, 'expected object types to be ignored');
  assert.equal(keys.indexOf('fun'), -1, 'expected function types to be ignored');

  assert.equal(keys.length, 1);
  assert.equal(keys[0], 'name');
});
