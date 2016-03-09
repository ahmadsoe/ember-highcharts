import Ember from 'ember';
import commitStats from '../data/commit-stats';

export default Ember.Component.extend({

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

  chartData: Ember.copy(commitStats, true),

  getRandomInt(min, max) {
    return parseInt(Math.random() * (max - min) + min, 10);
  },

  actions: {

    updateSeriesData() {

      console.log('updateSeriesData');

      let numPoints = this.getRandomInt(1, 52);
      let commitStatsCopy = Ember.copy(commitStats, true);

      commitStatsCopy.forEach(repo => {
        repo.data = repo.data.slice(0, numPoints);
      });

      this.set('chartData', commitStatsCopy);

    },

    setSeriesCount(numSeries) {
      console.log('setSeriesCount:', numSeries);
      let commitStatsCopy = Ember.copy(commitStats, true);
      this.set('chartData', commitStatsCopy.slice(0, numSeries));
    },

    setChartType(chartType) {
      console.log('setChartType:', chartType);
      this.set('chartOptions.chart.type', chartType);
    }


  }

});
