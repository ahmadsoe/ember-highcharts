import merge from 'deepmerge';
import Highcharts from 'highcharts';

export const EMPTY_CHART_CONTENT = [
  {
    id: 'noData',
    data: 0,
    color: '#aaaaaa',
  },
] as const;

export default function buildOptions(
  theme: Highcharts.Options = {},
  options: Highcharts.Options = {},
  content?: Highcharts.Options['series'],
) {
  // if 'no-data-to-display' module has been imported, keep empty series
  // and leave it to highcharts to show no data label.

  // @ts-expect-error TODO: determine is we still need showNoData
  const isEmpty = !Highcharts.Chart.prototype.showNoData && !content?.length;
  const chartOptions = merge(theme, options);
  const defaults = {
    series: isEmpty ? EMPTY_CHART_CONTENT : content,
  };

  return Object.assign(defaults, chartOptions);
}
