import { find, waitFor, waitUntil } from '@ember/test-helpers';

import Highcharts from 'highcharts';

type ChartContainerElement = {
  dataset: {
    highchartsChart: string;
  };
};

/**
 * Finds the Highcharts chart container for a given chart and returns the Highcharts.Chart for it.
 * This is useful for testing that the options for the chart are what you expect.
 * @param selector The selector for your chart wrapper element
 */
export async function getHighchartsChart(selector: string) {
  await waitFor(`${selector} .chart-container`);

  const chartContainer = find(
    `${selector} .chart-container`,
  ) as unknown as ChartContainerElement;

  await waitUntil(
    () => Highcharts.charts[Number(chartContainer.dataset.highchartsChart)],
  );

  return Highcharts.charts[
    Number(chartContainer.dataset.highchartsChart)
  ] as Highcharts.Chart;
}
