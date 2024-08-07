import merge from 'deepmerge';
import Highcharts from 'highcharts';

const EMPTY_CHART_CONTENT = [{
  id: 'noData',
  data: 0,
  color: '#aaaaaa'
}];
function buildOptions(theme = {}, options = {}, content) {
  // if 'no-data-to-display' module has been imported, keep empty series
  // and leave it to highcharts to show no data label.

  // @ts-expect-error TODO: determine is we still need showNoData
  const isEmpty = !Highcharts.Chart.prototype.showNoData && !content?.length;
  const chartOptions = merge(theme, options);
  const defaults = {
    series: isEmpty ? EMPTY_CHART_CONTENT : content
  };
  return Object.assign(defaults, chartOptions);
}

export { EMPTY_CHART_CONTENT, buildOptions as default };
//# sourceMappingURL=build-options.js.map
