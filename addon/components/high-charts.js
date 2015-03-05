import Ember from 'ember';
import { setDefaultHighChartOptions } from '../utils/option-loader';

export default Ember.Component.extend({
  classNames: ['highcharts-wrapper'],
  content: undefined,
  mode:    undefined,
  chartOptions: undefined,
  chart: null,

  buildOptions: Ember.computed('chartOptions', 'content.@each.isLoaded', function() {
    var chartContent, chartOptions, defaults;
    chartOptions = this.getWithDefault('chartOptions', {});
    chartContent = this.get('content.length') ? this.get('content') : [{
      id: 'noData',
      data: 0,
      color: '#aaaaaa'
    }];
    defaults = {
      series: chartContent
    };
    return Ember.merge(defaults, chartOptions);
  }),

  _renderChart: (function() {
    this.drawLater();
    setDefaultHighChartOptions(this.container);
  }).on('didInsertElement'),

  contentDidChange: Ember.observer('content.@each.isLoaded', function() {
    var chart;
    if (!(this.get('content') && this.get('chart'))) {
      return;
    }
    chart = this.get('chart');
    return this.get('content').forEach(function(series, idx) {
      var _ref;
      if ((_ref = chart.get('noData')) != null) {
        _ref.remove();
      }
      if (chart.series[idx]) {
        return chart.series[idx].setData(series.data);
      } else {
        return chart.addSeries(series);
      }
    });
  }),

  drawLater: function() {
    Ember.run.scheduleOnce('afterRender', this, 'draw');
  },

  draw: function() {
    var options, mode, $element, chart;
    options = [ this.get('buildOptions') ];
    mode = this.get('mode');
    if ( typeof mode === 'string' && !!mode) {
      options.unshift(mode);
    };
    Ember.Logger.debug('mode', mode);
    $element = this.$();
    chart = $element.highcharts.apply($element, options).highcharts();
    this.set('chart', chart);
  },

  _destroyChart: (function() {
    this._super();
    this.get('chart').destroy();
  }).on('willDestroyElement')
});
