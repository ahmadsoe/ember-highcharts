import { module, skip } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Component | high-charts', function(hooks) {
  setupTest(hooks);

  this.sampleTheme = {
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

  this.postMergeOptions = {
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

  // TODO: `factoryFor.create` is failing
  skip('it merges the theme and chartOptions correctly', function(assert) {
    let component = this.owner.factoryFor('component:ember-highcharts@high-charts').create({
      content: [],
      theme: this.sampleTheme,
      chartOptions: {
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
      }
    });
    let mergedChartOptions = component.get('buildOptions');
    assert.deepEqual(mergedChartOptions, this.postMergeOptions);
  });
});
