import Service from '@ember/service';
import cloneDeep from 'lodash-es/cloneDeep';

const clone = window.structuredClone ?? cloneDeep;

export default class DynamicChart extends Service {
  getRandomInt(min, max) {
    return parseInt(Math.random() * (max - min) + min, 10);
  }

  updateSeriesData(chartData, rangeStart, rangeEnd) {
    let numPoints = this.getRandomInt(rangeStart, rangeEnd);
    return chartData.map((series) => {
      return {
        name: series.name,
        data: series.data.slice(0, numPoints),
      };
    });
  }

  updateSeriesCount(chartData, numSeries) {
    let chartDataCopy = clone(chartData);
    return chartDataCopy.slice(0, numSeries);
  }
}
