import type Highcharts from 'highcharts';

export function getSeriesMap(seriesGroup: Array<Highcharts.SeriesOptionsType>) {
  const seriesMap = seriesGroup.reduce(
    (seriesMap, seriesItem) => {
      seriesMap[seriesItem.name as string] = seriesItem;
      return seriesMap;
    },
    {} as { [key: string]: Highcharts.SeriesOptionsType },
  );

  return seriesMap;
}

export function getSeriesChanges(
  contentSeries: Highcharts.Series,
  series: Highcharts.Series,
) {
  const updatedKeys = Object.keys(contentSeries).filter((key) => {
    const isValidKey = key !== 'data' && key.charAt(0) !== '_';
    const isValidType =
      ['object', 'function'].indexOf(
        typeof contentSeries[key as keyof object],
      ) === -1;
    const isTheSame =
      contentSeries[key as keyof object] === series[key as keyof object];

    return isValidKey && isValidType && !isTheSame;
  });

  // returns a list of updated keys
  return updatedKeys;
}
