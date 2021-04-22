import { assign } from '@ember/polyfills';
import merge from 'deepmerge';

export const EMPTY_CHART_CONTENT = [Object.freeze({
  id: 'noData',
  data: 0,
  color: '#aaaaaa'
})];


export default function buildOptions(theme, options = {}, content) {
  // if 'no-data-to-display' module has been imported, keep empty series
  // and leave it to highcharts to show no data label.

  const isEmpty = !Highcharts.Chart.prototype.showNoData && !content?.length;
  const chartOptions = merge(theme, options);
  const defaults = {
    series: isEmpty ? EMPTY_CHART_CONTENT : content,
  };

  return assign(defaults, chartOptions);
}
