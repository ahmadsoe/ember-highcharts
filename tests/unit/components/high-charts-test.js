import {
  moduleForComponent,
  test
} from 'ember-qunit';
import { initialize } from '../../../app/initializers/highcharts';

moduleForComponent('high-charts', 'HighChartsComponent', {
  // specify the other units that are required for this test
  needs: [ 'highcharts-config:application' ],
  beforeEach: function(container) {
    initialize(container);
  }
});

test('it renders', function(assert) {
  assert.expect(2);

  // creates the component instance
  var component = this.subject();
  assert.equal(component._state, 'preRender');

  // appends the component to the page
  this.append(assert);
  assert.equal(component._state, 'inDOM');
});

test('has default options', function(assert) {
  assert.expect(1);

  var element = this.append();
  var credit  = element.find(':contains(Highcharts.com)');

  assert.equal(credit.length, 0, 'Highcharts default credits not present');
});

test('has local options', function(assert) {
  assert.expect(1);

  var element = this.append();
  var credit  = element.find(':contains(ember-highcharts-configured-title)');

  assert.notEqual(credit.length, 0, 'ember-highcharts-configured-title credits present');
});

test('stores reference to chart', function(assert) {
  assert.expect(1);

  var component = this.subject();
  var chart     = component.get('chart');

  assert.ok(chart);
});
