import { copy } from 'ember-copy';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import stockData from '../data/stock';

export default Component.extend({
  dynamicChart: service('dynamic-chart'),

  chartOptions: {
    rangeSelector: {
      selected: 1
    },
    title: {
      text: 'Highstock: AAPL Stock Price'
    }
  },

  chartData: copy(stockData, true),

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
