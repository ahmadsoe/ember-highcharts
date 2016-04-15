import Ember from 'ember';
import stockData from '../data/stock';

export default Ember.Component.extend({

  dynamicChart: Ember.inject.service('dynamic-chart'),

  chartOptions: {
    rangeSelector: {
      selected: 1
    },
    title: {
      text: 'Highstock: AAPL Stock Price'
    }
  },

  chartData: Ember.copy(stockData, true),

  actions: {

    updateSeriesData() {
      let newChartData = this.get('dynamicChart').updateSeriesData(stockData, 100, 514);
      this.set('chartData', newChartData);
    },

    setSeriesCount(numSeries) {
      let newChartData = this.get('dynamicChart').updateSeriesCount(stockData, numSeries);
      this.set('chartData', newChartData);
    }

  }

});
