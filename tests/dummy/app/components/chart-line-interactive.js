import { copy } from 'ember-copy';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import commitStats from '../data/commit-stats';
import { action } from '@ember/object';

export default class BarBasic extends Component {
  @service('dynamic-chart')
  dynamicChart;

  chartOptions = {
    chart: {
      type: 'line'
    },
    title: {
      text: 'Repo commits'
    },
    xAxis: {
      type: 'category',
      title: {
        text: 'Week'
      }
    },
    yAxis: {
      title: {
        text: '# of Commits'
      }
    }
  }

  chartData = copy(commitStats, true);

  @action
  updateSeriesData() {
    let newChartData = this.dynamicChart.updateSeriesData(commitStats, 2, 52);
    this.chartData = newChartData;
  }

  @action
  fullUpdateToSeries() {
    let newChartData = this.dynamicChart.updateSeriesData(commitStats, 2, 52);

    // updated currentTime attribute causes series.update() to be used instead of series.setData()
    newChartData.forEach((series) => {
      series.currentTime = Date.now();
    });

    this.chartData = newChartData;
  }

  @action
  setSeriesCount(numSeries) {
    let newChartData = this.dynamicChart.updateSeriesCount(commitStats, numSeries);
    this.chartData = newChartData;
  }

}
