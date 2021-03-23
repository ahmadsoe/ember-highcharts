import buildOptions, { EMPTY_CHART_CONTENT } from 'ember-highcharts/utils/build-options';
import { module, test } from 'qunit';

module('Unit | Utility | build-options', function() {
  test('it merges a sample theme and chartOptions correctly', function(assert) {
    const sampleTheme = {
      colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
      title: {
        style: {
          color: '#000',
          font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
        }
      },
      subtitle: {
        style: {
          color: '#666666',
          font: 'bold 12px "Trebuchet MS", Verdana, sans-serif'
        }
      },
      legend: {
        itemStyle: {
          font: '9pt Trebuchet MS, Verdana, sans-serif',
          color: 'black'
        },
        itemHoverStyle: {
          color: 'gray'
        }
      }
    };

    const chartOptions = {
      colors: ['#000000', '#FFFFFF'],
      title: {
        style: {
          color: '#FF00FF',
          fontWeight: 'bold'
        }
      },
      legend: {
        itemHoverStyle: {
          color: 'blue'
        }
      }
    };

    const postMergeOptions = {
      colors: [
        '#058DC7',
        '#50B432',
        '#ED561B',
        '#DDDF00',
        '#24CBE5',
        '#64E572',
        '#FF9655',
        '#FFF263',
        '#6AF9C4',
        '#000000',
        '#FFFFFF'
      ],
      title: {
        style: {
          color: '#FF00FF',
          font: 'bold 16px "Trebuchet MS", Verdana, sans-serif',
          fontWeight: 'bold'
        }
      },
      series: [
        {
          color: '#aaaaaa',
          data: 0,
          id: 'noData'
        }
      ],
      subtitle: {
        style: {
          color: '#666666',
          font: 'bold 12px "Trebuchet MS", Verdana, sans-serif'
        }
      },
      legend: {
        itemStyle: {
          font: '9pt Trebuchet MS, Verdana, sans-serif',
          color: 'black'
        },
        itemHoverStyle: {
          color: 'blue'
        }
      }
    };

    const result = buildOptions(sampleTheme, chartOptions, []);

    assert.deepEqual(result, postMergeOptions);
  });

  test('it returns a series with empty chart content when given nothing', function(assert) {
    const result = buildOptions();
    assert.deepEqual(result, {
      series: EMPTY_CHART_CONTENT,
    });
  });

  test('it provides a series of the given content when only given content', function(assert) {
    const result = buildOptions(undefined, undefined, [ 'my awesome content' ]);

    const postMergeOptions = {
      series: [ "my awesome content" ],
    };

    assert.deepEqual(result, postMergeOptions);
  });
});
