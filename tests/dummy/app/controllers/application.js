import Ember from 'ember';
import stockData from '../data/stock';

export default Ember.Controller.extend({
  chartOptions: {
    chart: {
      type: 'bar'
    },
    title: {
      text: 'Fruit Consumption'
    },
    xAxis: {
      categories: ['Apples', 'Bananas', 'Oranges']
    },
    yAxis: {
      title: {
        text: 'Fruit eaten'
      }
    }
  },
  chartData: [{
    name: 'Jane',
    data: [1, 0, 4]
  }, {
    name: 'John',
    data: [5, 7, 3]
  }],

  stockChartOptions: {
    rangeSelector: {
      selected: 1
    },
    title: {
      text: 'Highstock: AAPL Stock Price'
    }
  },

  stockChartData: [{
    name: 'AAPL',
    data: stockData
  }]
});
