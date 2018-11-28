import { copy } from 'ember-copy';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import commitStats from '../data/commit-stats';

export default Component.extend({
  dynamicChart: service('dynamic-chart'),

  chartOptions: {
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
  },

  chartData: copy(commitStats, true),

  actions: {
    updateSeriesData() {
      let newChartData = this.get('dynamicChart').updateSeriesData(commitStats, 2, 52);
      this.set('chartData', newChartData);
    },

    fullUpdateToSeries() {
      let newChartData = this.get('dynamicChart').updateSeriesData(commitStats, 2, 52);

      // updated currentTime attribute causes series.update() to be used instead of series.setData()
      newChartData.forEach((series) => {
        series.currentTime = Date.now();
      });

      this.set('chartData', newChartData);
    },

    setSeriesCount(numSeries) {
      let newChartData = this.get('dynamicChart').updateSeriesCount(commitStats, numSeries);
      this.set('chartData', newChartData);
    }
  }
});
