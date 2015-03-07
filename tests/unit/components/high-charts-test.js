import {
  moduleForComponent,
  test
} from 'ember-qunit';
import { initialize } from '../../../initializers/highcharts';

moduleForComponent('high-charts', 'HighChartsComponent', {
  // specify the other units that are required for this test
  needs: [ 'highcharts-config:application' ],
  beforeEach: function() {
    let container = this.container;
    initialize(container);
  }
});

test('it renders', function(assert) {
  assert.expect(2);

  // creates the component instance
  let component = this.subject();
  assert.equal(component._state, 'preRender');

  // appends the component to the page
  this.render(assert);
  assert.equal(component._state, 'inDOM');
});

test('has default options', function(assert) {
  assert.expect(1);

  let element = this.render();
  let credit  = element.find(':contains(Highcharts.com)');

  assert.equal(credit.length, 0, 'Highcharts default credits not present');
});

test('has local options', function(assert) {
  assert.expect(1);

  let element = this.render();
  let credit  = element.find(':contains(ember-highcharts-configured-title)');

  assert.notEqual(credit.length, 0, 'ember-highcharts-configured-title credits present');
});


test('Highstock has navigator', function(assert) {
  this.subject({
    mode: 'StockChart',
    chartOptions: {
      rangeSelector: {
        selected: 1
      },
      title: {
        text: 'AAPL Stock Price'
      }
    },
    content: [{
      name: 'AAPL',
      data: [
        [1147651200000, 67.79],
        [1147737600000, 64.98],
        [1147824000000, 65.26]
      ]
    }]
  });
  var element = this.append();
  var navigator = element.find('.highcharts-navigator');
  assert.notEqual(navigator.length, 0, '.highcharts-navigator present');
});
