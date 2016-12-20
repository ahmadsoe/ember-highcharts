import Ember from 'ember';

export default Ember.Service.extend({

  getRandomInt(min, max) {
    return parseInt(Math.random() * (max - min) + min, 10);
  },

  updateSeriesData(chartData, rangeStart, rangeEnd) {
    let numPoints = this.getRandomInt(rangeStart, rangeEnd);
    return chartData.map((series) => {
      return {
        name: series.name,
        data: series.data.slice(0, numPoints)
      };
    });
  },

  updateSeriesCount(chartData, numSeries) {
    let chartDataCopy = Ember.copy(chartData, true);
    return chartDataCopy.slice(0, numSeries);
  }
});
