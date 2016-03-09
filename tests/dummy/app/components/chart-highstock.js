import Ember from 'ember';
import stockData from '../data/stock';

export default Ember.Component.extend({

  chartOptions: {
    rangeSelector: {
      selected: 1
    },
    title: {
      text: 'Highstock: AAPL Stock Price'
    }
  },

  chartData: [{
    name: 'AAPL',
    data: stockData
  }]

});
