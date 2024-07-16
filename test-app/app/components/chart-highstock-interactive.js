import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

import stockData from '../data/stock';

export default class BarBasic extends Component {
  @service('dynamic-chart')
  dynamicChart;

  chartOptions = {
    rangeSelector: {
      selected: 1,
    },
    title: {
      text: 'Highstock: AAPL Stock Price',
    },
  };

  @tracked
  chartData = structuredClone(stockData);

  @action
  updateSeriesData() {
    let newChartData = this.dynamicChart.updateSeriesData(stockData, 100, 514);
    this.chartData = newChartData;
  }

  @action
  setSeriesCount(numSeries) {
    let newChartData = this.dynamicChart.updateSeriesCount(
      stockData,
      numSeries,
    );
    this.chartData = newChartData;
  }
}
